import React, { useEffect, useState, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { Card, Button, Table, Pagination } from 'react-bootstrap';
import { Trash, Plus, FileEarmarkPdf, FileEarmarkExcel, Eye } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useAuthContext } from '@/common';
import CashBookPreview from './CashBookPreview.tsx';
import CashBookTablePreview from './CashBookTablePreview';

interface CashBookEntry {
  CashBookID?: number;
  TransactionDate: string;
  VoucherNumber?: string;
  TransactionType: string;
  PaymentMode: string;
  CashBankID?: number;
  CashBankIDName?: string;
  OppBankID?: number;
  OppBankIDName?: string;
  Amount: number;
  AccountType?: string;
  Description?: string;
  Created_by_id?: number;
  Updated_date?: string;
  StatusCode?: number;
  companyid?: number;
  yearid?: number;
}

interface CustomModalProps {
  showModal: boolean;
  loading: boolean;
  currentEntry: CashBookEntry | null;
  transactionDate: string;
  voucherNumber: string;
  transactionType: string;
  paymentMode: string;
  cashBankID: number | undefined;
  cashBankIDName: string;
  oppBankID: number | undefined;
  oppBankIDName: string;
  amount: number;
  accountType: string;
  description: string;
  cashBankOptions: any[];
  oppBankOptions: any[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionDate: React.Dispatch<React.SetStateAction<string>>;
  setVoucherNumber: React.Dispatch<React.SetStateAction<string>>;
  setTransactionType: React.Dispatch<React.SetStateAction<string>>;
  setPaymentMode: React.Dispatch<React.SetStateAction<string>>;
  setCashBankID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCashBankIDName: React.Dispatch<React.SetStateAction<string>>;
  setOppBankID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setOppBankIDName: React.Dispatch<React.SetStateAction<string>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  setAccountType: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const CustomModal: React.FC<CustomModalProps> = memo(({
  showModal,
  loading,
  currentEntry,
  transactionDate,
  voucherNumber,
  transactionType,
  paymentMode,
  cashBankID,
  cashBankIDName,
  oppBankID,
  oppBankIDName,
  amount,
  accountType,
  description,
  cashBankOptions,
  oppBankOptions,
  setShowModal,
  setTransactionDate,
  setVoucherNumber,
  setTransactionType,
  setPaymentMode,
  setCashBankID,
  setCashBankIDName,
  setOppBankID,
  setOppBankIDName,
  setAmount,
  setAccountType,
  setDescription,
  handleSubmit
}) => {
  const { t } = useTranslation();
  const transactionDateRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        transactionDateRef.current?.focus();
      }, 100);
    }
  }, [showModal]);

  if (!showModal) return null;

 

  const paymentModeOptions = [
    { value: 'Cash', label: t('cash_book.modal.payment_mode.cash') },
    { value: 'Bank', label: t('cash_book.modal.payment_mode.bank') },
    { value: 'Cheque', label: t('cash_book.modal.payment_mode.cheque') }
  ];



  const cashSelectedOption = cashBankOptions.find((opt) => opt.value === cashBankID) || 
    (cashBankID && cashBankIDName ? { value: cashBankID, label: cashBankIDName } : null);

  const oppSelectedOption = oppBankOptions.find((opt) => opt.value === oppBankID) || 
    (oppBankID && oppBankIDName ? { value: oppBankID, label: oppBankIDName } : null);

  // Prevent body scroll when modal is open
  

  return (
    <div
  className="modal"
  style={{
    display: showModal ? "block" : "none",
    background: "rgba(0,0,0,0.5)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1050,
  }}
>
  <div
    className="modal-content"
    style={{
      background: "white",
      padding: "10px 15px",
      maxWidth: "690px",
      margin: "50px auto",
      borderRadius: "8px",
      maxHeight: "90vh",
      overflowY: "auto",
    }}
  >
    {/* HEADER */}
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0" style={{ color: "#6f42c1" }}>
        <strong>{currentEntry ? t('cash_book.modal.title_edit') : t('cash_book.modal.title_add')}</strong>
      </h5>

      <button
        className="btn-close"
        onClick={() => setShowModal(false)}
        disabled={loading}
        style={{ opacity: loading ? 0.5 : 1 }}
      ></button>
    </div>

    {/* FORM START --------------------------------------------------- */}

    {/* Helper Inline Style */}
    {/** Use this class for every row */}
    <style>
      {`
        .formRow {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          gap: 10px;
        }
        .formLabel {
          width: 160px;
          font-weight: bold;
          color: #6f42c1;
          font-size: 14px;
        }
      `}
    </style>

    {/* Transaction Date */}
    {/* Row with 2 fields */}
<div className="d-flex gap-3 mb-3" style={{ width: "100%" }}>

  {/* LEFT FIELD ------------------------------------ */}
  <div className="formRow" style={{ flex: 1 }}>
    <label className="formLabel">
      {t('cash_book.modal.transaction_date')} <span style={{ color: "red" }}>*</span>
    </label>

    <input
      ref={transactionDateRef}
      type="date"
      className="form-control"
      value={transactionDate}
      onChange={(e) => setTransactionDate(e.target.value)}
      disabled={loading}
      style={{
        width: "50%",
        borderRadius: "6px",
        border: "1px solid #dee2e6",
        padding: "8px 12px",
      }}
      placeholder={t('cash_book.modal.transaction_date_placeholder')}
    />
  </div>

  {/* RIGHT FIELD ------------------------------------ */}
  <div className="formRow" style={{ flex: 1 }}>
    <label className="formLabel" style={{
        width: "10%",

      }}>{t('cash_book.modal.voucher_no')}</label>

    <input
      type="text"
      className="form-control"
      value={voucherNumber}
      onChange={(e) => setVoucherNumber(e.target.value)}
      disabled={loading}
      style={{
        width: "30%",
        borderRadius: "6px",
        border: "1px solid #dee2e6",
        padding: "8px 12px",
      }}
      placeholder={t('cash_book.modal.voucher_no_placeholder')}
    />
  </div>

</div>


    {/* Transaction Type Buttons */}
    <div className="formRow">
      <label className="formLabel">
        {t('cash_book.modal.transaction_type')} <span style={{ color: "red" }}>*</span>
      </label>

      <div className="d-flex w-50 gap-2">
        <Button
          variant={transactionType === "Receipt" ? "primary" : "outline-primary"}
          onClick={() => setTransactionType("Receipt")}
          disabled={loading}
          style={{ flex: 1, borderRadius: "6px", padding: "8px 12px", }}
        >
          {t('cash_book.modal.receipt')}
        </Button>

        <Button
          variant={transactionType === "Payment" ? "primary" : "outline-primary"}
          onClick={() => setTransactionType("Payment")}
          disabled={loading}
          style={{ flex: 1, borderRadius: "6px", padding: "8px 12px" }}
        >
          {t('cash_book.modal.payment')}
        </Button>
      </div>
    </div>

    {/* Cash/Bank Name */}
    <div className="formRow">
  <label className="formLabel">
    {t('cash_book.modal.cash_bank_name')} <span style={{ color: "red" }}>*</span>
  </label>

  <div
    style={{
      flex: 1,
      width: "50%",        // ⭐ 50% width
      maxWidth: "50%",     // ⭐ ensure strict 50%
    }}
  >
    <Select
      options={cashBankOptions}
      value={cashSelectedOption}
      onChange={(selected) => {
        setCashBankID(selected ? selected.value : undefined);
        setCashBankIDName(selected ? selected.label : '');
      }}
      placeholder={t('cash_book.modal.select_cash_bank_placeholder')}
      isSearchable
      isDisabled={loading}
    />
  </div>
</div>



     {/* Opposite Bank Name */}
    <div className="formRow">
      <label className="formLabel">{t('cash_book.modal.opposite_bank_name')}</label>

      <div style={{ flex: 1, width: "50%", maxWidth: "50%" }}>
        <Select
          options={oppBankOptions}
          value={oppSelectedOption}
          onChange={(selected) => {
            setOppBankID(selected ? selected.value : undefined);
            setOppBankIDName(selected ? selected.label : '');
          }}
          placeholder={t('cash_book.modal.select_opposite_bank_placeholder')}
          isSearchable
          isDisabled={loading}
        />
      </div>
    </div>

   

    {/* Amount */}
    <div className="formRow">
      <label className="formLabel">
        {t('cash_book.modal.amount')} <span style={{ color: "red" }}>*</span>
      </label>

      <input
        ref={amountRef}
        type="number"
        min="0"
        step="0.01"
        className="form-control"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value) || 0)}
        disabled={loading}
        style={{
           width: "25%",
          borderRadius: "6px",
          border: "1px solid #dee2e6",
          padding: "8px 12px",
        }}
        onFocus={(e) => e.target.select()}
        placeholder={t('cash_book.modal.amount_placeholder')}
      />
    </div>

     {/* Payment Mode */}
    <div className="formRow">
      <label className="formLabel">
        {t('cash_book.modal.payment_mode_label')} <span style={{ color: "red" }}>*</span>
      </label>

      <div style={{ flex: 1,width: "25%", maxWidth: "25%" }}>
        <Select
          options={paymentModeOptions}
          value={paymentModeOptions.find((opt) => opt.value === paymentMode)}
          onChange={(selected) => setPaymentMode(selected ? selected.value : "")}
          placeholder={t('cash_book.modal.select_payment_mode_placeholder')}
          isSearchable
          isDisabled={loading}
        />
      </div>
    </div>

  

   
   

    {/* Description */}
    <div className="formRow" style={{ alignItems: "flex-start" }}>
      <label className="formLabel mt-1">{t('cash_book.modal.description')}</label>

      <textarea
        ref={descriptionRef}
        className="form-control"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        style={{
          width: "50%",
          borderRadius: "6px",
          border: "1px solid #dee2e6",
          padding: "8px 12px",
        }}
        placeholder={t('cash_book.modal.description_placeholder')}
      />
    </div>

    {/* Footer Buttons */}
    <div className="d-flex justify-content-end mt-4">
      <button
        className="btn btn-outline-secondary me-2"
        onClick={() => setShowModal(false)}
        disabled={loading}
        style={{
          borderRadius: "6px",
          padding: "8px 20px",
          border: "1px solid #6c757d",
          opacity: loading ? 0.5 : 1,
        }}
      >
        {t('cash_book.button.back')}
      </button>

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={
          !transactionDate ||
          !transactionType ||
          !paymentMode ||
          !cashBankID ||
          amount <= 0 ||
          loading
        }
        style={{
          backgroundColor: "#6f42c1",
          borderColor: "#6f42c1",
          borderRadius: "6px",
          padding: "8px 25px",
          fontWeight: "bold",
          opacity:
            !transactionDate ||
            !transactionType ||
            !paymentMode ||
            !cashBankID ||
            amount <= 0 ||
            loading
              ? 0.5
              : 1,
        }}
      >
        💾 {loading ? t('cash_book.loading.saving') : currentEntry ? t('cash_book.button.update') : t('cash_book.button.save')}
      </button>
    </div>

    {/* FORM END ----------------------------------------------------- */}
  </div>
</div>

  );
});

const CashBook: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const [entries, setEntries] = useState<CashBookEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<CashBookEntry | null>(null);
  const [transactionDate, setTransactionDate] = useState('2025-11-25');
  const [voucherNumber, setVoucherNumber] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [cashBankID, setCashBankID] = useState<number | undefined>(undefined);
  const [cashBankIDName, setCashBankIDName] = useState('');
  const [oppBankID, setOppBankID] = useState<number | undefined>(undefined);
  const [oppBankIDName, setOppBankIDName] = useState('');
  const [amount, setAmount] = useState(0);
  const [accountType, setAccountType] = useState('');
  const [description, setDescription] = useState('');
  const [cashBankOptions, setCashBankOptions] = useState([]);
  const [oppBankOptions, setOppBankOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CashBookEntry | null>(null);
  const [showTablePreview, setShowTablePreview] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/api/cashbook?companyid=${user?.companyid}&yearid=${user?.yearid}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      toast.error(t('cash_book.toast.fetch_error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchCashBankOptions = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/mandi-ledger/cashbank?companyid=${user?.companyid}&yearid=${user?.yearid}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch cash bank options: ${res.statusText}`);
      const data = await res.json();
      const options = data.map((item: any) => ({
        value: item.LedgerId,
        label: item.Name
      }));
      setCashBankOptions(options);
    } catch (error) {
      console.error('Failed to fetch cash bank options:', error);
    }
  };

  const fetchOppBankOptions = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/mandi-ledger/oppbank?companyid=${user?.companyid}&yearid=${user?.yearid}`, {
      headers: {
        'Authorization': `Bearer ${user?.token}`,
      },
    });
    const data = await res.json();

    const formatted = data.map((item: any) => {
      let numberToShow = "";

      // ⭐ Account Type
      if (item.AccountType === "SUNDRY DEBTORS(Customer)") {
        numberToShow = item.CustomerNo || item.LedgerNo;
      }
      else if (item.AccountType === "SUNDRY CREDITORS(Supplier)") {
        numberToShow = item.FarmerNo || item.LedgerNo;
      }
      else {
        numberToShow = item.LedgerNo;  // Ledger or others
      }

      return {
        value: item.LedgerId,
        label: `${numberToShow} - ${item.Name} (${item.AccountType})`,
      };
    });

    setOppBankOptions(formatted);
  } catch (err) {
    console.error("Failed to load opposite bank options:", err);
  }
};



  useEffect(() => {
    if (user?.token) {
      fetchEntries();
      fetchCashBankOptions();
      fetchOppBankOptions();
    }
  }, [user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, fromDate, toDate]);

  const handleAdd = async () => {
    setCurrentEntry(null);
    setTransactionDate(new Date().toISOString().split('T')[0]);
    setTransactionType('');
    setPaymentMode('');
    setCashBankID(undefined);
    setCashBankIDName('');
    setOppBankID(undefined);
    setOppBankIDName('');
    setAmount(0);
    setAccountType('');
    setDescription('');

    // Fetch max voucher number
    try {
      const res = await fetch(`http://localhost:3001/api/cashbook/max-voucher-number?companyid=${user?.companyid}&yearid=${user?.yearid}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const nextVoucherNumber = data.maxVoucherNumber + 1;
        setVoucherNumber(nextVoucherNumber.toString());
      } else {
        setVoucherNumber('1');
      }
    } catch (error) {
      console.error('Failed to fetch max voucher number:', error);
      setVoucherNumber('1');
    }

    setShowModal(true);
  };

  const handleEdit = (entry: CashBookEntry) => {
    setCurrentEntry(entry);
    setTransactionDate(entry.TransactionDate);
    setVoucherNumber(entry.VoucherNumber || '');
    setTransactionType(entry.TransactionType);
    setPaymentMode(entry.PaymentMode);
    setCashBankID(entry.CashBankID);
    setCashBankIDName(entry.CashBankIDName || '');
    setOppBankID(entry.OppBankID);
    setOppBankIDName(entry.OppBankIDName || '');
    setAmount(entry.Amount);
    setAccountType(entry.AccountType || '');
    setDescription(entry.Description || '');
    setShowModal(true);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const result = await Swal.fire({
      title: t('cash_book.swal.confirm_title'),
      text: t('cash_book.swal.confirm_text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('cash_book.swal.confirm_button'),
      cancelButtonText: t('cash_book.swal.cancel_button'),
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/cashbook/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
        if (!res.ok) throw new Error('Delete failed');
        toast.success(t('cash_book.toast.delete_success'));
        fetchEntries();
      } catch {
        toast.error(t('cash_book.toast.delete_error'));
      }
    }
  };

  const handleSubmit = async () => {
    if (!transactionDate || !transactionType || !paymentMode || !cashBankID || amount <= 0) {
      toast.error(t('cash_book.toast.required_error'));
      return;
    }

    const payload = {
      TransactionDate: transactionDate,
      VoucherNumber: voucherNumber || null,
      TransactionType: transactionType,
      PaymentMode: paymentMode,
      CashBankID: cashBankID || null,
      CashBankIDName: cashBankIDName || null,
      OppBankID: oppBankID || null,
      OppBankIDName: oppBankIDName || null,
      Amount: amount,
      AccountType: accountType || null,
      Description: description || null,
      companyid: user?.companyid,
      yearid: user?.yearid,
      ...(currentEntry && currentEntry.CashBookID ? { 
        Updated_by_id: user?.userid,
      } : { 
        Created_by_id: user?.userid,
      }),
    };

    setLoading(true);
    try {
      let res;
      if (currentEntry && currentEntry.CashBookID) {
        res = await fetch(`http://localhost:3001/api/cashbook/${currentEntry.CashBookID}`, {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('http://localhost:3001/api/cashbook', {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error('Failed to save');
      toast.success(currentEntry ? t('cash_book.toast.update_success') : t('cash_book.toast.add_success'));
      setShowModal(false);
      fetchEntries();
    } catch {
      toast.error(t('cash_book.toast.save_error'));
    } finally {
      setLoading(false);
    }
  };

  // Filter entries based on search text and date range
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = searchText === '' ||
      (entry.Description && entry.Description.toLowerCase().includes(searchText.toLowerCase())) ||
      (entry.VoucherNumber && entry.VoucherNumber.toLowerCase().includes(searchText.toLowerCase())) ||
      entry.Amount.toString().includes(searchText);

    const entryDate = new Date(entry.TransactionDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesFromDate = !from || entryDate >= from;
    const matchesToDate = !to || entryDate <= to;

    return matchesSearch && matchesFromDate && matchesToDate;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(t('cash_book.export.pdf_title'), 20, 10);
    const tableColumn = [t('cash_book.table.id'), t('cash_book.table.date'), t('cash_book.table.voucher_no'), t('cash_book.table.ledger_name'), t('cash_book.table.type'), t('cash_book.table.payment_mode_label'), t('cash_book.table.amount'), t('cash_book.table.description')];
    const tableRows = filteredEntries.map(entry => [
      entry.CashBookID?.toString() || '-',
      entry.TransactionDate,
      entry.VoucherNumber || '-',
      entry.OppBankIDName || '-',
      entry.TransactionType,
      entry.PaymentMode,
      entry.Amount.toFixed(2),
      entry.Description || '-'
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save(t('cash_book.export.pdf_filename'));
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredEntries.map(entry => ({
      [t('cash_book.table.id')]: entry.CashBookID,
      [t('cash_book.table.date')]: entry.TransactionDate,
      [t('cash_book.table.voucher_no')]: entry.VoucherNumber || '-',
      [t('cash_book.table.ledger_name')]: entry.OppBankIDName || '-',
      [t('cash_book.table.type')]: entry.TransactionType,
      [t('cash_book.table.payment_mode')]: entry.PaymentMode,
      [t('cash_book.table.amount')]: entry.Amount,
      [t('cash_book.table.description')]: entry.Description || '-'
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t('cash_book.export.excel_sheet'));
    XLSX.writeFile(workbook, t('cash_book.export.excel_filename'));
  };

  return (
    <>
      <Card className="m-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>{t('cash_book.page_title')}</h4>
          <Button variant="success" onClick={handleAdd}>
            <Plus className="me-1" /> {t('cash_book.button.add_entry')}
          </Button>
        </div>

        {/* Search, Date Filters, and Export Buttons in Single Row */}
        <div className="d-flex gap-3 mb-3 align-items-center">
          <div className="flex-fill">
            <input
              type="text"
              className="form-control"
              placeholder={t('cash_book.placeholder.search')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" onClick={() => setShowTablePreview(true)}>
              <FileEarmarkPdf className="me-1" /> {t('cash_book.button.export_pdf')}
            </Button>
            <Button variant="outline-success" onClick={exportToExcel}>
              <FileEarmarkExcel className="me-1" /> {t('cash_book.button.export_excel')}
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="text-center p-4">{t('cash_book.loading_message')}</div>
        ) : (
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Table striped bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>{t('cash_book.table.id')}</th>
                  <th>{t('cash_book.table.date')}</th>
                  <th>{t('cash_book.table.voucher_no')}</th>
                  <th>{t('cash_book.table.ledger_name')}</th>
                  <th>{t('cash_book.table.type')}</th>
                  <th>{t('cash_book.table.payment_mode_label')}</th>
                  <th>{t('cash_book.table.amount')}</th>
                  <th>{t('cash_book.table.description')}</th>
                  <th>{t('cash_book.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEntries.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center">{t('cash_book.table.no_entries')}</td>
                  </tr>
                ) : (
                  paginatedEntries.map(entry => (
                    <tr key={entry.CashBookID}>
                      <td>{entry.CashBookID}</td>
                      <td>{formatDate(entry.TransactionDate)}</td>
                      <td>{entry.VoucherNumber || '-'}</td>
                      <td>{entry.OppBankIDName || '-'}</td>
                      <td>{entry.TransactionType}</td>
                      <td>{entry.PaymentMode}</td>
                      <td>{entry.Amount.toFixed(2)}</td>
                      <td>{entry.Description || '-'}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="me-1"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setShowPreview(true);
                          }}
                        >
                          <Eye size={12} />
                        </Button>
                        <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(entry)}>{t('cash_book.button.edit')}</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(entry.CashBookID)}>
                          <Trash size={12} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            <Pagination>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        )}
      </Card>

      <CustomModal
        showModal={showModal}
        loading={loading}
        currentEntry={currentEntry}
        transactionDate={transactionDate}
        voucherNumber={voucherNumber}
        transactionType={transactionType}
        paymentMode={paymentMode}
        cashBankID={cashBankID}
        cashBankIDName={cashBankIDName}
        oppBankOptions={oppBankOptions}
        oppBankID={oppBankID}
        oppBankIDName={oppBankIDName}
        amount={amount}
        accountType={accountType}
        description={description}
        cashBankOptions={cashBankOptions}
        setShowModal={setShowModal}
        setTransactionDate={setTransactionDate}
        setVoucherNumber={setVoucherNumber}
        setTransactionType={setTransactionType}
        setPaymentMode={setPaymentMode}
        setCashBankID={setCashBankID}
        setCashBankIDName={setCashBankIDName}
        setOppBankID={setOppBankID}
        setOppBankIDName={setOppBankIDName}
        setAmount={setAmount}
        setAccountType={setAccountType}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />

      <CashBookPreview
        show={showPreview}
        onHide={() => setShowPreview(false)}
        entry={selectedEntry}
      />

      <CashBookTablePreview
        show={showTablePreview}
        onHide={() => setShowTablePreview(false)}
        entries={filteredEntries}
        exportToPDF={exportToPDF}
      />
    </>
  );
};

export default CashBook;