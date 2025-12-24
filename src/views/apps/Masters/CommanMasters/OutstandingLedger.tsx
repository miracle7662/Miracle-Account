import React, { useState, useEffect, useMemo } from 'react';
import { Card, Table, Button, Stack, Form, Tabs, Tab } from 'react-bootstrap';
import { FileEarmarkPdf, FileEarmarkExcel } from 'react-bootstrap-icons';
import { Preloader } from '@/components/Misc/Preloader';
import TitleHelmet from '@/components/Common/TitleHelmet';
import { useAuthContext } from '@/common';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Interface for outstanding data
interface OutstandingItem {
  CustomerNo: number | null;
  FarmerNo: number | null;
  Name: string | null;
  Balance: number;
  LastBillDate: string | null;
  LastBillDaysCount: number;
  AccountType: string;
}

const OutstandingLedger: React.FC = () => {
  const [outstandingData, setOutstandingData] = useState<OutstandingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cutoffDate, setCutoffDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { user } = useAuthContext();

  // Fetch outstanding data from API
  const fetchOutstandingData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/mandi-ledger/outstanding?cutoffDate=${cutoffDate}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch outstanding data');
      }

      const data = await res.json();
      setOutstandingData(data);
    } catch (error) {
      console.error('Error fetching outstanding data:', error);
      toast.error('Failed to fetch outstanding data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutstandingData();
  }, [cutoffDate]);

  // Separate customers and farmers with search filtering
  const customers = useMemo(() => outstandingData.filter(item =>
    item.AccountType === 'SUNDRY DEBTORS(Customer)' &&
    (item.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '')
  ), [outstandingData, searchTerm]);
  const farmers = useMemo(() => outstandingData.filter(item =>
    item.AccountType === 'SUNDRY CREDITORS(Supplier)' &&
    (item.Name?.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '')
  ), [outstandingData, searchTerm]);

  // Format balance
  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(balance);
  };

  // Format date
  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN');
  };

  // Calculate total balance
  const calculateTotalBalance = (data: OutstandingItem[]) => {
    return data.reduce((total, item) => total + item.Balance, 0);
  };

  // Export to PDF
  const exportToPDF = (data: OutstandingItem[], title: string) => {
    try {
      const doc = new jsPDF();
      const tableColumn = ['Sr No', 'No', 'Name', 'Balance', 'Last Bill Date', 'Days Since Last Bill'];
      const tableRows: any[] = [];

      data.forEach((item, index) => {
        const rowData = [
          index + 1,
          item.CustomerNo || item.FarmerNo || 'N/A',
          item.Name || 'N/A',
          item.Balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          formatDate(item.LastBillDate),
          item.LastBillDaysCount
        ];
        tableRows.push(rowData);
      });

      // Add total row
      const totalBalance = calculateTotalBalance(data);
      tableRows.push(['', '', 'Total', totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), '', '']);

      doc.text(title, 14, 15);
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });
      doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF exported successfully');
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF');
    }
  };

  // Export to Excel
  const exportToExcel = (data: OutstandingItem[], title: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map((item, index) => ({
      'Sr No': index + 1,
      'No': item.CustomerNo || item.FarmerNo || 'N/A',
      'Name': item.Name || 'N/A',
      'Balance': item.Balance,
      'Last Bill Date': formatDate(item.LastBillDate),
      'Days Since Last Bill': item.LastBillDaysCount
    })));

    // Add total row
    const totalBalance = calculateTotalBalance(data);
    XLSX.utils.sheet_add_json(worksheet, [{ 'Sr No': '', 'No': '', 'Name': 'Total', 'Balance': totalBalance, 'Last Bill Date': '', 'Days Since Last Bill': '' }], { origin: -1 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title.replace(/\s+/g, '_')}.xlsx`);
  };

  return (
    <>
      <TitleHelmet title="Outstanding Ledger" />
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Outstanding Customers & Farmers</h5>
            <div className="d-flex gap-2">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => exportToPDF(customers, 'Outstanding_Customers')}
                disabled={customers.length === 0}
              >
                <FileEarmarkPdf className="me-1" />
                (Customers)
              </Button>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => exportToExcel(customers, 'Outstanding_Customers')}
                disabled={customers.length === 0}
              >
                <FileEarmarkExcel className="me-1" />
                (Customers)
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => exportToPDF(farmers, 'Outstanding_Farmers')}
                disabled={farmers.length === 0}
              >
                <FileEarmarkPdf className="me-1" />
                (Farmers)
              </Button>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => exportToExcel(farmers, 'Outstanding_Farmers')}
                disabled={farmers.length === 0}
              >
                <FileEarmarkExcel className="me-1" />
                (Farmers)
              </Button>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <Form.Label className="me-2">Cutoff Date:</Form.Label>
              <Form.Control
                type="date"
                value={cutoffDate}
                onChange={(e) => setCutoffDate(e.target.value)}
                style={{ width: 'auto' }}
              />
            </div>
            <div className="d-flex align-items-center">
              <Form.Label className="me-2">Search by Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name to search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '200px' }}
              />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Stack className="align-items-center justify-content-center" style={{ minHeight: '200px' }}>
              <Preloader />
            </Stack>
          ) : (
            <Tabs defaultActiveKey="customers" id="outstanding-tabs" className="mb-3">
              <Tab eventKey="customers" title="Customers (Debtors)">
                <p className="text-muted mb-3">Outstanding as of {formatDate(cutoffDate)}</p>
                {customers.length > 0 ? (
                  <Table responsive striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>Sr No</th>
                        <th>Customer No</th>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Last Bill Date</th>
                        <th>Days Since Last Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((item, index) => (
                        <tr key={index} className={item.LastBillDaysCount > 15 ? 'table-danger' : ''}>
                          <td>{index + 1}</td>
                          <td>{item.CustomerNo || 'N/A'}</td>
                          <td>{item.Name !== null && item.Name !== undefined ? item.Name : 'N/A'}</td>
                          <td className={item.Balance < 0 ? 'text-danger' : 'text-success'}>
                            {formatBalance(item.Balance)}
                          </td>
                          <td>{formatDate(item.LastBillDate)}</td>
                          <td className={item.LastBillDaysCount > 30 ? 'text-danger' : ''}>{item.LastBillDaysCount}</td>
                        </tr>
                      ))}
                      <tr className="table-secondary fw-bold">
                        <td colSpan={3}>Total</td>
                        <td className={calculateTotalBalance(customers) < 0 ? 'text-danger' : 'text-success'}>
                          {formatBalance(calculateTotalBalance(customers))}
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-muted">No outstanding customers found.</p>
                )}
              </Tab>
              <Tab eventKey="farmers" title="Farmers (Creditors)">
                <p className="text-muted mb-3">Outstanding as of {formatDate(cutoffDate)}</p>
                {farmers.length > 0 ? (
                  <Table responsive striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>Sr No</th>
                        <th>Farmer No</th>
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Last Bill Date</th>
                        <th>Days Since Last Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {farmers.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.FarmerNo || 'N/A'}</td>
                          <td>{item.Name !== null && item.Name !== undefined ? item.Name : 'N/A'}</td>
                          <td className={item.Balance < 0 ? 'text-danger' : 'text-success'}>
                            {formatBalance(item.Balance)}
                          </td>
                          <td>{formatDate(item.LastBillDate)}</td>
                          <td className={item.LastBillDaysCount > 30 ? 'text-danger' : ''}>{item.LastBillDaysCount}</td>
                        </tr>
                      ))}
                      <tr className="table-secondary fw-bold">
                        <td colSpan={3}>Total</td>
                        <td className={calculateTotalBalance(farmers) < 0 ? 'text-danger' : 'text-success'}>
                          {formatBalance(calculateTotalBalance(farmers))}
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-muted">No outstanding farmers found.</p>
                )}
              </Tab>
            </Tabs>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default OutstandingLedger;
