import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Row, Col, Badge, Form, Spinner } from 'react-bootstrap';
import { Plus, FileText, Download } from 'react-bootstrap-icons';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuthContext } from '@/common';

interface LedgerAccount {
  LedgerId: string;
  LedgerNo: string;
  CustomerNo?: string;
  FarmerNo?: string;
  Name: string;
  OpeningBalance: string;
  OpeningBalanceDate?: string;
  AccountType: string;
  currentBalance: number;
}

type LedgerType = 'customer' | 'farmer' | 'all';

const LedgerAccount: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState<LedgerType>('all');
  const [ledgerAccounts, setLedgerAccounts] = useState<LedgerAccount[]>([]);
  const [selectedLedger, setSelectedLedger] = useState<LedgerAccount | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Date filters
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadLedgerAccounts();
    setSelectedLedger(null); // Reset selected ledger when tab changes
  }, [activeTab, user]);

  const loadLedgerAccounts = async () => {
    try {
      const response = await axios.get(`/api/ledger-account/${activeTab}`);
      setLedgerAccounts(response.data);
    } catch (error) {
      console.error('Error loading ledger accounts:', error);
      toast.error(t('ledger_account.failed_to_load_accounts'));
    }
  };

  const loadLedgerDetails = async (ledger: LedgerAccount | null) => {
    if (!ledger) {
      setUnifiedEntries([]);
      return;
    }
    if (!fromDate || !toDate) {
      setUnifiedEntries([]);
      toast(t('ledger_account.select_date_message'));
      return;
    }
    try {
      setLoadingDetails(true);
      const endpoint = ledger.AccountType === 'SUNDRY CREDITORS(Supplier)' ? 'statement-farmer' : 'statement';
      const response = await axios.get(`/api/ledger-account/${ledger.LedgerId}/${endpoint}`, {
        params: { 
          fromDate, 
          toDate
        }
      });
      const entriesWithBalance = calculateRunningBalance(response.data, activeTab);
      setUnifiedEntries(entriesWithBalance);
    } catch (error) {
      // console.error('Error loading ledger details:', error?.response?.data || error?.message || error);
      toast.error(t('ledger_account.failed_to_load_details'));
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    loadLedgerDetails(selectedLedger);
  }, [selectedLedger, fromDate, toDate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDescription = (description: string) => {
    // Regex to match dates in yyyy-mm-dd format
    const dateRegex = /\b(\d{4})-(\d{2})-(\d{2})\b/g;
    return description.replace(dateRegex, (match, year, month, day) => {
      return `${day}-${month}-${year}`;
    });
  };

  // Unified Entry Interface
  interface UnifiedEntry {
    id?: string; // This will be the index from map
    Date: string;
    BillNo?: string;
    Description: string;
    Type: string; // e.g., 'Cash Book', 'Receipt', 'Payment', 'Bill', 'Debit/Credit'
    Debit: number;
    Credit: number;
    Balance: number;
    TotalItems?: number;
  }

  // Function to get badge variant based on type
  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'receipt': return 'success';
      case 'payment': return 'danger';
      case 'cash book': return 'info';
      case 'debit/credit': return 'warning';
      case 'opening': return 'info';
      case 'customer bill':
      case 'farmer bill': return 'primary';
      default: return 'secondary';
    }
  };

  // Compute unified entries
  const [unifiedEntries, setUnifiedEntries] = useState<UnifiedEntry[]>([]);

  // Calculate running balance
  const calculateRunningBalance = (entries: UnifiedEntry[], activeTab: LedgerType) => {
    let runningBalance = 0;
    return entries.map(entry => {
      if (activeTab === 'customer') {
        runningBalance += entry.Debit - entry.Credit;
      } else if (activeTab === 'farmer') {
        runningBalance += entry.Credit - entry.Debit;
      } else {
        runningBalance += entry.Debit - entry.Credit; // default for 'all'
      }
      return { ...entry, Balance: runningBalance };
    });
  };
  console.log('Unified Entries:', calculateRunningBalance);

  const options = ledgerAccounts.map(ledger => {
    let label = '';
    if (activeTab === 'customer') {
      label = `${ledger.CustomerNo} - ${ledger.Name}`;
    } else if (activeTab === 'farmer') {
      label = `${ledger.FarmerNo} - ${ledger.Name} `;
    } else {
      label = `${ledger.LedgerNo} - ${ledger.Name}`;
    }
    return {
      value: ledger.LedgerId,
      label
    };
  });

  const exportToPDF = () => {
    if (!selectedLedger || unifiedEntries.length === 0) {
      toast.error(t('ledger_account.no_data_to_export'));
      return;
    }

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text(`${selectedLedger.Name} - Ledger Statement`, 14, 20);

    // Add date range
    doc.setFontSize(12);
    doc.text(`From: ${fromDate} To: ${toDate}`, 14, 30);

    // Prepare table data
    const tableData = unifiedEntries.map(entry => [
      entry.Date,
      entry.BillNo || 'N/A',
      entry.Description,
      entry.Type,
      entry.Debit.toFixed(2),
      entry.Credit.toFixed(2),
      Number(entry.Balance).toFixed(2),
      entry.TotalItems || 'N/A'
    ]);

    // Add totals row
    const totalDebit = unifiedEntries.reduce((sum, entry) => sum + entry.Debit, 0);
    const totalCredit = unifiedEntries.reduce((sum, entry) => sum + entry.Credit, 0);
    const totalBalance = totalDebit - totalCredit;

    tableData.push([
      'Total',
      '',
      '',
      '',
      totalDebit.toFixed(2),
      totalCredit.toFixed(2),
      totalBalance.toFixed(2),
      ''
    ]);

    // Add table
    autoTable(doc, {
      head: [['Date', 'Bill No', 'Description', 'Type', 'Debit', 'Credit', 'Balance', 'Total Items']],
      body: tableData,
      startY: 40,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Save the PDF
    doc.save(`${selectedLedger.Name}_ledger_statement.pdf`);
    toast.success(t('ledger_account.export_success'));
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <h1>{t('ledger_account.title')}</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary" size="sm">
            <Plus /> {t('ledger_account.create_new_ledger')}
          </Button>
        </Col>
      </Row>

      {/* Tab Buttons */}
      <Row className="mb-3">
        <Col>
          <Button
            variant={activeTab === 'customer' ? 'primary' : 'outline-primary'}
            size="lg"
            onClick={() => setActiveTab('customer')}
          >
            {t('ledger_account.customer_ledgers')}
          </Button>{' '}
          <Button
            variant={activeTab === 'farmer' ? 'primary' : 'outline-primary'}
            size="lg"
            onClick={() => setActiveTab('farmer')}
          >
            {t('ledger_account.farmer_ledgers')}
          </Button>{' '}
          <Button
            variant={activeTab === 'all' ? 'primary' : 'outline-primary'}
            size="lg"
            onClick={() => setActiveTab('all')}
          >
            {t('ledger_account.all_ledgers')}
          </Button>
        </Col>
      </Row>

      {/* Ledger Selection Dropdown */}
      {ledgerAccounts.length > 0 && (
        <Form.Group className="mb-3">
          <Form.Label>
            {activeTab === 'customer'
              ? t('ledger_account.select_customer')
              : activeTab === 'farmer'
              ? t('ledger_account.select_farmer')
              : t('ledger_account.select_ledger')}
          </Form.Label>
          <Select
            value={selectedLedger ? options.find(option => option.value === selectedLedger.LedgerId) : null}
            onChange={(selectedOption) => {
              const ledger = selectedOption
                ? ledgerAccounts.find(item => item.LedgerId === selectedOption.value) || null
                : null;
              setSelectedLedger(ledger);
            }}
            options={options}
            placeholder={activeTab === 'customer'
              ? t('ledger_account.select_customer_placeholder')
              : activeTab === 'farmer'
              ? t('ledger_account.select_farmer_placeholder')
              : t('ledger_account.select_ledger_placeholder')}
            styles={{ container: (provided) => ({ ...provided, width: '50%' }) }}
          />
        </Form.Group>
      )}

      {/* Date Filters */}
      {selectedLedger && (
        <Row className="mb-3">
          <Col md={3}>
            <Form.Label>{t('ledger_account.from_date')}</Form.Label>
            <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Label>{t('ledger_account.to_date')}</Form.Label>
            <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </Col>
          <Col md={6} className="d-flex align-items-end">
            <Button variant="info" onClick={() => loadLedgerDetails(selectedLedger)} className="me-2">
              {t('ledger_account.show_statement')}
            </Button>
            <Button variant="success" onClick={exportToPDF} className="me-2">
              <Download /> {t('Pdf')}
            </Button>
            <Button variant="secondary" onClick={() => { setFromDate(''); setToDate(''); setUnifiedEntries([]); }}>
              {t('ledger_account.clear_filters')}
            </Button>
          </Col>
        </Row>
      )}

      {/* Unified Ledger Details - Single Card with Date-wise Table */}
      {selectedLedger && (
        <Card className="mb-3">
          <Card.Header>
            <h6 className="mb-0">
              <FileText className="me-2" />
              {t('ledger_account.ledger_details_summary')}
            </h6>
          </Card.Header>
          <Card.Body>
            {loadingDetails ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>{t('ledger_account.loading_details')}</p>
              </div>
            ) : (
              <>
                {/* Unified Table */}
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      <th>{t('ledger_account.date')}</th>
                      <th>{t('ledger_account.bill_no')}</th>
                      <th>{t('ledger_account.description')}</th>
                      <th className="text-end">Total Items</th>
                      <th>{t('ledger_account.type')}</th>
                      <th className="text-end">{t('ledger_account.debit')}</th>
                      <th className="text-end">{t('ledger_account.credit')}</th>
                      <th className="text-end">{t('ledger_account.balance')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unifiedEntries.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center">{t('ledger_account.no_entries_found')}</td>
                      </tr>
                    ) : (
                      unifiedEntries.map((entry, index) => (
                        <tr key={index}>
                          <td>{formatDate(entry.Date)}</td>
                          <td>{entry.BillNo || 'N/A'}</td>
                          <td>{formatDescription(entry.Description)}</td>
                           <td className="text-end">{entry.TotalItems || 'N/A'}</td>
                          <td>
                            <Badge bg={getTypeBadgeVariant(entry.Type)}>
                              {entry.Type}
                            </Badge>
                          </td>
                          <td className="text-end">{formatCurrency(entry.Debit)}</td>
                          <td className="text-end">{formatCurrency(entry.Credit)}</td>
                          <td className={`text-end ${Number(entry.Balance) >= 0 ? 'text-success' : 'text-danger'}`}>
                            {formatCurrency(Number(entry.Balance))}
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                  {unifiedEntries.length > 0 && (
                    <tfoot>
                      <tr className="table-dark">
                        <td colSpan={3} className="text-end fw-bold">Total</td>
                         <td className="text-end fw-bold">
                          {unifiedEntries.reduce((sum, entry) => sum + (entry.TotalItems || 0), 0)}
                        </td>
                        <td></td>
                        <td className="text-end fw-bold">
                          {formatCurrency(unifiedEntries.reduce((sum, entry) => sum + entry.Debit, 0))}
                        </td>
                        <td className="text-end fw-bold">
                          {formatCurrency(unifiedEntries.reduce((sum, entry) => sum + entry.Credit, 0))}
                        </td>
                        <td className={`text-end fw-bold ${(unifiedEntries.reduce((sum, entry) => sum + entry.Debit, 0) - unifiedEntries.reduce((sum, entry) => sum + entry.Credit, 0)) >= 0 ? 'text-success' : 'text-danger'}`}>
                          {formatCurrency(unifiedEntries.reduce((sum, entry) => sum + entry.Debit, 0) - unifiedEntries.reduce((sum, entry) => sum + entry.Credit, 0))}
                        </td>
                       
                      </tr>
                    </tfoot>
                  )}
                </Table>
              </>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
};


export default LedgerAccount;