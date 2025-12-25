import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FileEarmarkPdf, FileEarmarkExcel } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useAuthContext } from '@/common';

interface PLData {
  period: {
    fromDate: string;
    toDate: string;
  };
  revenue: {
    items: Array<{
      category: string;
      description: string;
      amount: number;
      count: number;
    }>;
    total: number;
  };
  expenses: {
    items: Array<{
      category: string;
      description: string;
      amount: number;
      count: number;
    }>;
    total: number;
  };
  netProfitLoss: number;
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    netProfitLoss: number;
    isProfit: boolean;
  };
}

const PLReport: React.FC = () => {
  const { t } = useTranslation();
  console.log('Translation function:', t);
  const { user } = useAuthContext();

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // If invalid date, return as is
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [plData, setPlData] = useState<PLData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Default to last month
    return date.toISOString().split('T')[0];
  });
  const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);

  const fetchPLData = async () => {
    if (!fromDate || !toDate) {
      toast.error('Please select both from and to dates');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/pl-report?fromDate=${fromDate}&toDate=${toDate}`,
        {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch P&L data');
      }

      const data = await response.json();
      setPlData(data);
    } catch (error) {
      console.error('Error fetching P&L data:', error);
      toast.error('Failed to load Profit & Loss data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchPLData();
    }
  }, [user]);

  const exportToPDF = () => {
    if (!plData) return;

    const doc = new jsPDF();
    doc.text('Profit & Loss Statement', 20, 10);
    doc.text(`Period: ${formatDate(plData.period.fromDate)} to ${formatDate(plData.period.toDate)}`, 20, 20);

    // Revenue section
    let yPosition = 35;
    doc.text('REVENUE', 20, yPosition);
    yPosition += 10;

    const revenueTableData = plData.revenue.items.map(item => [
      item.category,
      item.description,
      item.amount.toFixed(2),
      item.count.toString()
    ]);

    autoTable(doc, {
      head: [['Category', 'Description', 'Amount', 'Count']],
      body: revenueTableData,
      startY: yPosition,
      theme: 'grid',
    });

    // Expenses section - start at fixed position after revenue
    yPosition = 120;
    doc.text('EXPENSES', 20, yPosition);
    yPosition += 10;

    const expenseTableData = plData.expenses.items.map(item => [
      item.category,
      item.description,
      item.amount.toFixed(2),
      item.count.toString()
    ]);

    autoTable(doc, {
      head: [['Category', 'Description', 'Amount', 'Count']],
      body: expenseTableData,
      startY: yPosition,
      theme: 'grid',
    });

    // Summary - start at fixed position after expenses
    yPosition = 200;
    doc.text('SUMMARY', 20, yPosition);
    yPosition += 10;

    const summaryData = [
      ['Total Revenue', plData.summary.totalRevenue.toFixed(2)],
      ['Total Expenses', plData.summary.totalExpenses.toFixed(2)],
      ['Net Profit/Loss', plData.summary.netProfitLoss.toFixed(2)]
    ];

    autoTable(doc, {
      head: [['Description', 'Amount']],
      body: summaryData,
      startY: yPosition,
      theme: 'grid',
    });

    doc.save(`PL_Report_${plData.period.fromDate}_to_${plData.period.toDate}.pdf`);
  };

  const exportToExcel = () => {
    if (!plData) return;

    const workbook = XLSX.utils.book_new();

    // Revenue sheet
    const revenueData = [
      ['PROFIT & LOSS STATEMENT'],
      [`Period: ${formatDate(plData.period.fromDate)} to ${formatDate(plData.period.toDate)}`],
      [''],
      ['REVENUE'],
      ['Category', 'Description', 'Amount', 'Count'],
      ...plData.revenue.items.map(item => [
        item.category,
        item.description,
        item.amount,
        item.count
      ]),
      ['Total Revenue', '', plData.revenue.total, '']
    ];

    const revenueSheet = XLSX.utils.aoa_to_sheet(revenueData);
    XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Revenue');

    // Expenses sheet
    const expenseData = [
      ['EXPENSES'],
      ['Category', 'Description', 'Amount', 'Count'],
      ...plData.expenses.items.map(item => [
        item.category,
        item.description,
        item.amount,
        item.count
      ]),
      ['Total Expenses', '', plData.expenses.total, '']
    ];

    const expenseSheet = XLSX.utils.aoa_to_sheet(expenseData);
    XLSX.utils.book_append_sheet(workbook, expenseSheet, 'Expenses');

    // Summary sheet
    const summaryData = [
      ['SUMMARY'],
      ['Description', 'Amount'],
      ['Total Revenue', plData.summary.totalRevenue],
      ['Total Expenses', plData.summary.totalExpenses],
      ['Net Profit/Loss', plData.summary.netProfitLoss]
    ];

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    XLSX.writeFile(workbook, `PL_Report_${formatDate(plData.period.fromDate)}_to_${formatDate(plData.period.toDate)}.xlsx`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="container-fluid">
      <Card className="m-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Profit & Loss Statement</h4>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={exportToPDF} disabled={!plData}>
              <FileEarmarkPdf className="me-1" /> Export PDF
            </Button>
            <Button variant="outline-success" onClick={exportToExcel} disabled={!plData}>
              <FileEarmarkExcel className="me-1" /> Export Excel
            </Button>
          </div>
        </div>

        {/* Date Filters */}
        <Row className="mb-3">
          <Col md={3}>
            <label className="form-label">From Date</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <label className="form-label">To Date</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button onClick={fetchPLData} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Generate Report'}
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" />
            <p className="mt-2">Loading Profit & Loss data...</p>
          </div>
        ) : plData ? (
          <>
            {/* Period Info */}
            <Alert variant="info" className="mb-3">
              <strong>Report Period:</strong> {formatDate(plData.period.fromDate)} to {formatDate(plData.period.toDate)}
            </Alert>

            <Row>
              {/* Revenue Section */}
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">Revenue (Income)</h5>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Description</th>
                          <th className="text-end">Amount</th>
                          <th className="text-center">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plData.revenue.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td className="text-end">{formatCurrency(item.amount)}</td>
                            <td className="text-center">{item.count}</td>
                          </tr>
                        ))}
                        <tr className="table-primary fw-bold">
                          <td colSpan={2}>Total Revenue</td>
                          <td className="text-end">{formatCurrency(plData.revenue.total)}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>

              {/* Expenses Section */}
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header className="bg-danger text-white">
                    <h5 className="mb-0">Expenses</h5>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Description</th>
                          <th className="text-end">Amount</th>
                          <th className="text-center">Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plData.expenses.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td className="text-end">{formatCurrency(item.amount)}</td>
                            <td className="text-center">{item.count}</td>
                          </tr>
                        ))}
                        <tr className="table-danger fw-bold">
                          <td colSpan={2}>Total Expenses</td>
                          <td className="text-end">{formatCurrency(plData.expenses.total)}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Summary Section */}
            <Card className="mt-3">
              <Card.Header className={plData.summary.isProfit ? "bg-success text-white" : "bg-danger text-white"}>
                <h5 className="mb-0">Summary</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="text-center">
                      <h6>Total Revenue</h6>
                      <h4 className="text-success">{formatCurrency(plData.summary.totalRevenue)}</h4>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h6>Total Expenses</h6>
                      <h4 className="text-danger">{formatCurrency(plData.summary.totalExpenses)}</h4>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h6>Net {plData.summary.isProfit ? 'Profit' : 'Loss'}</h6>
                      <h4 className={plData.summary.isProfit ? "text-success" : "text-danger"}>
                        {formatCurrency(Math.abs(plData.summary.netProfitLoss))}
                      </h4>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Alert variant="warning">
            No data available. Please select a date range and generate the report.
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default PLReport;
