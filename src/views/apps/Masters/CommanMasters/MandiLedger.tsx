import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Modal, Button, Form, Stack, Table, Pagination, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FileEarmarkPdf, FileEarmarkExcel } from "react-bootstrap-icons";
import Sanscript from 'sanscript';
import { useAuthContext } from '@/common';

type PageType = "customer" | "farmer" | "all";

interface PageConfig {
  titleKey: string;
  api: string;
  numberField: string;
  accountType: string;
}

interface ILedger {
  LedgerId?: string;
  LedgerNo: string;
  CustomerNo?: string;
  FarmerNo?: string;
  Name: string;
  MarathiName?: string;
  address: string;
  state_id?: string;
  state?: string;
  cityid?: string;
  city?: string;
  MobileNo: string;
  PhoneNo?: string;
  GstNo?: string;
  PanNo?: string;
  OpeningBalance: string;
  OpeningBalanceDate?: string;
  AccountTypeId?: string;
  AccountType: string;
  Status: number;
  createdbyid?: number;
  updatedbyid?: number;
  companyid?: number;
  yearid?: number;
}

interface AccountType {
  AccID: string;
  AccName: string;
}

// Fixed constants for account types matching backend names
const ACCOUNT_TYPE_SUNDRY_DEBTORS_NAME = "SUNDRY DEBTORS(Customer)";
const ACCOUNT_TYPE_SUNDRY_CREDITORS_NAME = "SUNDRY CREDITORS(Supplier)";

// Helper to get next auto-increment CustomerNo as string
const getNextCustomerNo = (data: ILedger[]): string => {
  if (!data || data.length === 0) return "1";
  const customerNos = data
    .filter((d) => d.CustomerNo)
    .map((d) => parseInt(d.CustomerNo || "0", 10))
    .filter((num) => !isNaN(num));
  const maxNo = customerNos.length > 0 ? Math.max(...customerNos) : 0;
  return String(maxNo + 1);
};

// Helper to get next auto-increment FarmerNo as string
const getNextFarmerNo = (data: ILedger[]): string => {
  if (!data || data.length === 0) return "1";
  const farmerNos = data
    .filter((d) => d.FarmerNo)
    .map((d) => parseInt(d.FarmerNo || "0", 10))
    .filter((num) => !isNaN(num));
  const maxNo = farmerNos.length > 0 ? Math.max(...farmerNos) : 0;
  return String(maxNo + 1);
};

// Helper to get next auto-increment LedgerNo as string
const getNextLedgerNo = (data: ILedger[]): string => {
  if (!data || data.length === 0) return "1";
  const ledgerNos = data
    .filter((d) => d.LedgerNo)
    .map((d) => parseInt(d.LedgerNo || "0", 10))
    .filter((num) => !isNaN(num));
  const maxNo = ledgerNos.length > 0 ? Math.max(...ledgerNos) : 0;
  return String(maxNo + 1);
};

const MandiLedger = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageType = (queryParams.get("type") ?? "all") as PageType;
  const { user } = useAuthContext();

  const [data, setData] = useState<ILedger[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const [form, setForm] = useState<ILedger>({
    LedgerNo: "",
    CustomerNo: "",
    FarmerNo: "",
    Name: "",
    MarathiName: "",
    address: "",
    state_id: "",
    cityid: "",
    MobileNo: "",
    PhoneNo: "",
    GstNo: "",
    PanNo: "",
    OpeningBalance: "",
    OpeningBalanceDate: "",
    AccountTypeId: "",
    AccountType: "",
    Status: 1,
    companyid: user?.companyid,
    yearid: user?.yearid,
  });

  const [states, setStates] = useState<{ stateid: string; state_name: string }[]>([]);
  const [cities, setCities] = useState<{ cityid: string; city_name: string }[]>([]);
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // PAGE CONFIG
  const pageConfig: Record<PageType, PageConfig> = {
    customer: {
      titleKey: "ledger.title.customer",
      api: "/api/mandi-ledger/sodacustomer",
      numberField: "CustomerNo",
      accountType: "Debtor",
    },
    farmer: {
      titleKey: "ledger.title.farmer",
      api: "/api/mandi-ledger/farmers",
      numberField: "FarmerNo",
      accountType: "Creditor",
    },
    all: {
      titleKey: "ledger.title.all",
      api: "/api/mandi-ledger/ledger",
      numberField: "",
      accountType: "",
    },
  };

  const current = pageConfig[pageType] || pageConfig.all;

  // FETCH DATA
  const loadData = useCallback(async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await axios.get<ILedger[]>(`${current.api}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      console.log("API Response Data:", res.data);
      console.log("First row state:", res.data[0]?.state);
      console.log("First row city:", res.data[0]?.city);
      console.log("All states:", res.data.map(row => row.state));
      console.log("All cities:", res.data.map(row => row.city));
      setData(res.data);
    } catch (err: any) {
      // Safe error handling to avoid reading undefined response property
      let errorMessage = t('ledger.error.unknown');
      if (err && err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      } else if (err && err.message) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      console.error("Fetch Error:", errorMessage);
      toast.error(t('ledger.toast.fetch_error', { message: errorMessage }));
    }
  }, [pageType, t, user?.companyid, user?.yearid, user?.token]);


  // Fetch states list from backend
  const loadStates = async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await axios.get(`/api/states${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      setStates(res.data);
    } catch (error) {
      toast.error(t('ledger.toast.states_error'));
    }
  };

  // Fetch cities for selected state
  const loadCities = async (stateId: string) => {
    try {
      if (stateId) {
        const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
        const res = await axios.get(`/api/cities/${stateId}${params}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
        setCities(res.data);
      } else {
        setCities([]);
      }
    } catch (error) {
      toast.error(t('ledger.toast.cities_error'));
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Load account types on component mount
  useEffect(() => {
    loadAccountTypes();
  }, [user?.companyid, user?.yearid, user?.token]);

  // Fetch states when modal is shown to populate dropdown
  useEffect(() => {
    if (showModal) {
      loadStates();
      loadAccountTypes();
    }
  }, [showModal]);

  // Fetch account types list from backend
  const loadAccountTypes = async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await axios.get(`/api/accounttype${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      setAccountTypes(res.data);
    } catch (error) {
      console.error("Failed to load account types", error);
      toast.error(t('ledger.toast.account_types_error'));
    }
  };

  // When state changes fetch cities list
  useEffect(() => {
    loadCities(form.state_id || "");
  }, [form.state_id]);

  // INPUT CHANGE
  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };
      // Auto-transliterate English Name to Marathi Name
      if (name === "Name") {
        if (value.trim()) {
          updatedForm.MarathiName = Sanscript.t(value, 'itrans', 'devanagari');
        } else {
          updatedForm.MarathiName = "";
        }
      }
      return updatedForm;
    });
  };

  // Enter key handler to focus next field, skipping readonly and disabled
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.currentTarget instanceof HTMLTextAreaElement) {
        if (e.shiftKey) {
          return; // Allow Shift+Enter for new line in textarea
        }
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      const form = e.currentTarget.closest('form');
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const currentIndex = elements.indexOf(e.currentTarget as HTMLElement);
        let targetIndex = currentIndex + 1;
        let focused = false;
        while (targetIndex < elements.length) {
          const element = elements[targetIndex];
          if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
            if (element.tagName === 'INPUT' && (element as HTMLInputElement).readOnly) {
              targetIndex++;
              continue;
            }
            if (element.tagName === 'SELECT' && (element as HTMLSelectElement).disabled) {
              targetIndex++;
              continue;
            }
            // Found a valid focusable element
            (element as HTMLElement).focus();
            focused = true;
            break;
          } else {
            targetIndex++;
          }
        }
        if (!focused && targetIndex >= elements.length) {
          saveRecord();
        }
      }
    }
  }, [form]); // Add form dependency if needed, but since saveRecord uses form, it's fine

  // OPEN ADD MODAL
  const openAddModal = () => {
    setEditingRow(null);
    let defaultAccountTypeId = "";
    const nextCustomerNo = getNextCustomerNo(data);
    const nextFarmerNo = getNextFarmerNo(data);
    const nextLedgerNo = getNextLedgerNo(data);

    if (pageType === "customer") {
      const accType = accountTypes.find((a) => a.AccName === ACCOUNT_TYPE_SUNDRY_DEBTORS_NAME);
      defaultAccountTypeId = accType ? accType.AccID : "";
    } else if (pageType === "farmer") {
      const accType = accountTypes.find((a) => a.AccName === ACCOUNT_TYPE_SUNDRY_CREDITORS_NAME);
      defaultAccountTypeId = accType ? accType.AccID : "";
    }

    setForm({
      LedgerNo: pageType === "all" ? nextLedgerNo : nextLedgerNo,
      CustomerNo: pageType === "customer" ? nextCustomerNo : "",
      FarmerNo: pageType === "farmer" ? nextFarmerNo : "",
      Name: "",
      MarathiName: "",
      address: "",
      state_id: "",
      cityid: "",
      MobileNo: "",
      PhoneNo: "",
      GstNo: "",
      PanNo: "",
      OpeningBalance: "",
      OpeningBalanceDate: "",
      AccountTypeId: defaultAccountTypeId,
      AccountType:
        pageType === "customer"
          ? ACCOUNT_TYPE_SUNDRY_DEBTORS_NAME
          : pageType === "farmer"
            ? ACCOUNT_TYPE_SUNDRY_CREDITORS_NAME
            : "",
      Status: 1,
      createdbyid: user?.userid,
      updatedbyid: user?.userid,
      companyid: user?.companyid,
      yearid: user?.yearid,
    });
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (row: ILedger) => {
    // When editing, the row from the table contains state and city names, but the form needs IDs.
    // We need to ensure state_id and cityid are set correctly.
    // The form will be populated with the full row, and then we'll load cities if a state_id exists.
    setEditingRow(row.LedgerId || "");
    setForm({ ...row }); // Use a copy to trigger useEffect for state_id
    setShowModal(true);
  };

  // SAVE RECORD (ADD/UPDATE)
  const saveRecord = async () => {
    try {
      const payload: any = { ...form };

      // Filter payload based on pageType to send only relevant number field
      if (pageType === "customer") {
        delete payload.FarmerNo;
        delete payload.LedgerNo;
      } else if (pageType === "farmer") {
        delete payload.CustomerNo;
        delete payload.LedgerNo;
      } else if (pageType === "all") {
        delete payload.CustomerNo;
        delete payload.FarmerNo;
      }

      // Validate required fields before proceeding
      if (pageType === "all" && (!payload.LedgerNo || payload.LedgerNo.trim() === "")) {
        toast.error(t('ledger.validation.ledger_no_required'));
        return;
      }

      if (!payload.Name || payload.Name.trim() === "") {
        toast.error(t('ledger.validation.name_required'));
        return;
      }

      // Assign CustomerNo or FarmerNo automatically if not set (for customer/farmer pages)
      if (pageType === "customer" && (!payload.CustomerNo || payload.CustomerNo === "")) {
        payload.CustomerNo = form.LedgerNo || ""; // Use form.LedgerNo as fallback
      }
      if (pageType === "farmer" && (!payload.FarmerNo || payload.FarmerNo === "")) {
        payload.FarmerNo = form.LedgerNo || ""; // Use form.LedgerNo as fallback
      }

      if (editingRow) {
        // UPDATE
        await axios.put(`/api/mandi-ledger/${editingRow}`, payload, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
      } else {
        // INSERT
        await axios.post("/api/mandi-ledger", payload, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
      }

      setShowModal(false);
      loadData();
      toast.success(editingRow ? t('ledger.toast.update_success') : t('ledger.toast.add_success'));
    } catch (err: unknown) {
      console.error("Save Error:", err);
      const errorMessage = (err as any)?.response?.data?.error || (err as any)?.message || 'Unknown error';
      toast.error(t('ledger.toast.save_error', { message: errorMessage }));
    }
  };

  // DELETE
  const deleteRow = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this ledger entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/mandi-ledger/${id}`, {
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
        loadData();
        toast.success(t('ledger.toast.delete_success'));
      } catch (err: unknown) {
        console.error("Delete Error:", err);
        toast.error(t('ledger.toast.delete_error'));
      }
    }
  };



  // Define columns for the table
  const columns = React.useMemo<ColumnDef<ILedger>[]>(() => [
    {
      accessorKey: 'LedgerId',
      header: t('ledger.table.ledger_id'),
      size: 80,
    },
    ...(pageType === "all" ? [{
      accessorKey: 'LedgerNo',
      header: t('ledger.table.ledger_no'),
      size: 100,
    }] : []),
    ...(pageType === "customer" ? [{
      accessorKey: 'CustomerNo',
      header: t('ledger.table.customer_no'),
      size: 100,
      cell: (info: any) => info.getValue() || "",
    }] : []),
    ...(pageType === "farmer" ? [{
      accessorKey: 'FarmerNo',
      header: t('ledger.table.farmer_no'),
      size: 100,
      cell: (info: any) => info.getValue() || "",
    }] : []),
    {
      accessorKey: 'Name',
      header: t('ledger.table.name'),
    },
    {
      accessorKey: 'MarathiName',
      header: t('ledger.table.marathi_name', { defaultValue: 'Marathi Name' }),
    },
    {
      accessorKey: 'address',
      header: t('ledger.table.address'),
      cell: info => {
        const row = info.row.original;
        return (
          <div>
            <div>{row.Name}{" "}
              {pageType === "customer" && row.AccountType === "Debtor" ? row.CustomerNo :
                pageType === "farmer" && row.AccountType === "Creditor" ? row.FarmerNo : ""}
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}>{row.address}</div>
          </div>
        );
      },
    },
    {
      accessorKey: 'state',
      header: t('ledger.table.state'),
      cell: info => info.getValue() || t('common.n_a'),
    },
    {
      accessorKey: 'city',
      header: t('ledger.table.city'),
      cell: info => info.getValue() || t('common.n_a'),
    },
    {
      accessorKey: 'MobileNo',
      header: t('ledger.table.mobile'),
    },
    {
      accessorKey: 'GstNo',
      header: t('ledger.table.gst'),
    },
    {
      accessorKey: 'OpeningBalance',
      header: t('ledger.table.opening_balance'),
    },
    {
      accessorKey: 'AccountType',
      header: t('ledger.table.account_type'),
    },
    {
      accessorKey: 'Status',
      header: t('ledger.table.status'),
      cell: info => (info.getValue() === 1 ? t('ledger.status.active') : t('ledger.status.inactive')),
    },
    {
      id: 'actions',
      header: t('ledger.table.actions'),
      cell: ({ row }) => (
        <Stack direction="horizontal" gap={2}>
          <Button
            size="sm"
            variant="warning"
            onClick={() => openEditModal(row.original)}
          >
            {t('ledger.button.edit')}
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => deleteRow(row.original.LedgerId || "")}
          >
            {t('ledger.button.delete')}
          </Button>
        </Stack>
      ),
    },
  ], [pageType, t]);

  // Filtered data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter(row =>
      row.Name.toLowerCase().includes(lower) ||
      (row.MarathiName && row.MarathiName.toLowerCase().includes(lower)) ||
      row.address.toLowerCase().includes(lower) ||
      row.MobileNo.toLowerCase().includes(lower) ||
      (row.GstNo && row.GstNo.toLowerCase().includes(lower)) ||
      (row.state && row.state.toLowerCase().includes(lower)) ||
      (row.city && row.city.toLowerCase().includes(lower))
    );
  }, [data, searchTerm]);

  // React Table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: searchTerm,
    },
  });

  // Pagination helper
  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const pageIndex = table.getState().pagination?.pageIndex || 0;
    const totalPages = table.getPageCount() || 1;
    let startPage = Math.max(0, pageIndex - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pageIndex}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(t(current.titleKey), 14, 10);

    // Define table columns based on pageType
    let tableColumns: string[] = [];
    if (pageType === "all") {
      tableColumns = [t('ledger.table.ledger_id'), t('ledger.table.ledger_no'), t('ledger.table.name'), t('ledger.table.marathi_name', { defaultValue: 'Marathi Name' }), t('ledger.table.address'), t('ledger.table.state'), t('ledger.table.city'), t('ledger.table.mobile'), t('ledger.table.gst'), t('ledger.table.opening_balance'), t('ledger.table.account_type'), t('ledger.table.status')];
    } else if (pageType === "customer") {
      tableColumns = [t('ledger.table.ledger_id'), t('ledger.table.customer_no'), t('ledger.table.name'), t('ledger.table.marathi_name', { defaultValue: 'Marathi Name' }), t('ledger.table.address'), t('ledger.table.state'), t('ledger.table.city'), t('ledger.table.mobile'), t('ledger.table.gst'), t('ledger.table.opening_balance'), t('ledger.table.account_type'), t('ledger.table.status')];
    } else if (pageType === "farmer") {
      tableColumns = [t('ledger.table.ledger_id'), t('ledger.table.farmer_no'), t('ledger.table.name'), t('ledger.table.marathi_name', { defaultValue: 'Marathi Name' }), t('ledger.table.address'), t('ledger.table.state'), t('ledger.table.city'), t('ledger.table.mobile'), t('ledger.table.gst'), t('ledger.table.opening_balance'), t('ledger.table.account_type'), t('ledger.table.status')];
    }

    const tableRows: (string | number)[][] = filteredData.map((ledger: ILedger) => {
      const row: (string | number)[] = [];
      row.push(ledger.LedgerId || '');
      if (pageType === "all") row.push(ledger.LedgerNo);
      if (pageType === "customer") row.push(ledger.CustomerNo || '');
      if (pageType === "farmer") row.push(ledger.FarmerNo || '');
      row.push(ledger.Name);
      row.push(ledger.MarathiName || '');
      row.push(ledger.address);
      row.push(ledger.state || t('common.n_a'));
      row.push(ledger.city || t('common.n_a'));
      row.push(ledger.MobileNo);
      row.push(ledger.GstNo || '');
      row.push(ledger.OpeningBalance);
      row.push(ledger.AccountType);
      row.push(ledger.Status === 1 ? t('ledger.status.active') : t('ledger.status.inactive'));
      return row;
    });

    autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
    doc.save(`${t(current.titleKey).replace(/\s+/g, '')}.pdf`);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const worksheetData = filteredData.map((ledger: ILedger) => {
      const row: any = {
        [t('ledger.table.ledger_id')]: ledger.LedgerId,
        [t('ledger.table.name')]: ledger.Name,
        [t('ledger.table.marathi_name', { defaultValue: 'Marathi Name' })]: ledger.MarathiName || '',
        [t('ledger.table.address')]: ledger.address,
        [t('ledger.table.state')]: ledger.state || t('common.n_a'),
        [t('ledger.table.city')]: ledger.city || t('common.n_a'),
        [t('ledger.table.mobile')]: ledger.MobileNo,
        [t('ledger.table.gst')]: ledger.GstNo || '',
        [t('ledger.table.opening_balance')]: ledger.OpeningBalance,
        [t('ledger.table.account_type')]: ledger.AccountType,
        [t('ledger.table.status')]: ledger.Status === 1 ? t('ledger.status.active') : t('ledger.status.inactive'),
      };
      if (pageType === "all") row[t('ledger.table.ledger_no')] = ledger.LedgerNo;
      if (pageType === "customer") row[t('ledger.table.customer_no')] = ledger.CustomerNo || '';
      if (pageType === "farmer") row[t('ledger.table.farmer_no')] = ledger.FarmerNo || '';
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, t(current.titleKey).replace(/\s+/g, ''));
    XLSX.writeFile(workbook, `${t(current.titleKey).replace(/\s+/g, '')}.xlsx`);
  };

  return (
    <>
      <Card className="m-1">
        <Card.Body>
          <Stack direction="horizontal" className="mb-3 justify-content-between align-items-center">
            <h4 className="mb-0">{t(current.titleKey)}</h4>
            <Button variant="success" onClick={openAddModal}>
              {t('ledger.button.add_new')}
            </Button>
          </Stack>

          {/* SEARCH INPUT AND EXPORT BUTTONS */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="w-50 me-3">
              <Form.Control
                type="text"
                placeholder={t('ledger.placeholder.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: "6px", border: "1px solid #dee2e6", padding: "8px 12px" }}

              />
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleExportPDF}
                title={t('ledger.button.export_pdf_title')}
                style={{ width: "100px" }}   // ← Increase width
              >
                <FileEarmarkPdf size={16} className="me-1" />
                {t('ledger.button.pdf')}
              </Button>

              <Button
                variant="outline-success"
                size="sm"
                onClick={handleExportExcel}
                title={t('ledger.button.export_excel_title')}
                style={{ width: "100px" }}   // ← Increase width
              >
                <FileEarmarkExcel size={16} className="me-1" />
                {t('ledger.button.excel')}
              </Button>

            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="bg-gray">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center">
                      {t('ledger.table.no_results')}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              {t('ledger.pagination.showing', {
                start: table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1,
                end: Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                ),
                total: table.getFilteredRowModel().rows.length
              })}
            </div>
            <Pagination>
              <Pagination.First
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              />
              <Pagination.Prev
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
              {getPaginationItems()}
              <Pagination.Next
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
              <Pagination.Last
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>

      {/* MODAL FORM */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        dialogClassName="small-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editingRow ? t('ledger.modal.edit_title') : t('ledger.modal.add_title')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form>
            {/* ⭐ FIRST ROW — CUSTOMER / FARMER / LEDGER NO (full width) */}
            <div className="row">
              {pageType === "customer" && (
                <div className="col-12 d-flex align-items-center mb-3">
                  <Form.Label className="me-2" style={{ width: "140px" }}>
                    {t('ledger.form.customer_no')}
                  </Form.Label>

                  <Form.Control
                    name="CustomerNo"
                    value={form.CustomerNo || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    readOnly={true}
                    placeholder={t('ledger.form.customer_no_placeholder')}
                    style={{ width: "200px" }}
                  />
                </div>
              )}

              {pageType === "farmer" && (
                <div className="col-12 d-flex align-items-center mb-3">
                  <Form.Label className="me-2" style={{ width: "140px" }}>
                    {t('ledger.form.farmer_no')}
                  </Form.Label>

                  <Form.Control
                    name="FarmerNo"
                    value={form.FarmerNo || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ledger.form.farmer_no_placeholder')}
                    style={{ width: "200px" }}
                  />
                </div>
              )}

              {pageType === "all" && (
                <div className="col-12 d-flex align-items-center mb-3">
                  <Form.Label className="me-2" style={{ width: "140px" }}>
                    {t('ledger.form.ledger_no')} <span className="text-danger">*</span>
                  </Form.Label>

                  <Form.Control
                    name="LedgerNo"
                    value={form.LedgerNo}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    required
                    readOnly={true}
                    placeholder={t('ledger.form.ledger_no_placeholder')}
                    style={{ width: "200px" }}
                  />
                </div>
              )}
            </div>

            {/* ⭐ SECOND ROW — NAME (ENGLISH) + NAME (MARATHI) */}
            <div className="row">

              {/* LEFT SIDE — NAME (ENGLISH) */}
              <div className="col-md-6 d-flex align-items-center mb-3">
                <Form.Label className="me-2" style={{ width: "130px" }}>
                  {t('ledger.form.name')} <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  name="Name"
                  value={form.Name}
                  onChange={updateForm}
                  onKeyDown={handleKeyDown}
                  required
                  placeholder={t('ledger.form.name_placeholder')}
                />
              </div>

              {/* RIGHT SIDE — NAME (MARATHI) */}
              <div className="col-md-6 d-flex align-items-center mb-3">
                <Form.Label className="me-2" style={{ width: "130px" }}>
                  {t('ledger.form.marathi_name', { defaultValue: 'Name (Marathi)' })}
                </Form.Label>

                <Form.Control
                  name="MarathiName"
                  value={form.MarathiName || ""}
                  onChange={updateForm}
                  onKeyDown={handleKeyDown}
                  placeholder={t('ledger.form.marathi_name_placeholder', { defaultValue: 'Auto-generated from English Name' })}
                />
              </div>

            </div>

            {/* ⭐ ADDRESS (full width 2 rows but label left + textbox right) */}
            <div className="d-flex align-items-start mb-3">
              <Form.Label className="me-3 mt-1" style={{ width: "140px" }}>
                {t('ledger.form.address')}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={form.address}
                onChange={updateForm}
                onKeyDown={handleKeyDown}
                placeholder={t('ledger.form.address_placeholder')}
              />
            </div>
            {/* NOW YOUR LEFT + RIGHT COLUMNS START */}
            <div className="row">
              {/* ... your existing left & right column fields remain same ... */}
            </div>

            <div className="row">

              {/* LEFT COLUMN */}
              <div className="col-md-6">

                {/* State */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.state')}
                  </Form.Label>
                  <Form.Select
                    name="state_id"
                    value={form.state_id || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">{t('ledger.form.select_state')}</option>
                    {states.map((s) => (
                      <option key={s.stateid} value={s.stateid}>
                        {s.state_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>


                {/* Mobile No */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.mobile_no')}
                  </Form.Label>
                  <Form.Control
                    name="MobileNo"
                    value={form.MobileNo}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ledger.form.mobile_no_placeholder')}
                  />
                </div>


                {/* Opening Balance */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.opening_balance')}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="OpeningBalance"
                    value={form.OpeningBalance}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ledger.form.opening_balance_placeholder')}
                  />
                </div>

                {/* GST No */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.gst_no')}
                  </Form.Label>
                  <Form.Control
                    name="GstNo"
                    value={form.GstNo || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ledger.form.gst_no_placeholder')}
                  />
                </div>
                {/* Account Type */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.account_type')}
                  </Form.Label>
                  <Form.Select
                    name="AccountTypeId"
                    value={form.AccountTypeId || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    disabled={pageType === "customer" || pageType === "farmer"}
                  >
                    <option value="">{t('ledger.form.select_account_type')}</option>
                    {(pageType === "customer"
                      ? accountTypes.filter((t) => t.AccName === ACCOUNT_TYPE_SUNDRY_DEBTORS_NAME)
                      : pageType === "farmer"
                        ? accountTypes.filter((t) => t.AccName === ACCOUNT_TYPE_SUNDRY_CREDITORS_NAME)
                        : accountTypes
                    ).map((t) => (
                      <option key={t.AccID} value={t.AccID}>
                        {t.AccName}
                      </option>
                    ))}
                  </Form.Select>
                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div className="col-md-6">

                {/* City */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.city')}
                  </Form.Label>
                  <Form.Select
                    name="cityid"
                    value={form.cityid || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="">{t('ledger.form.select_city')}</option>
                    {cities.map((city) => (
                      <option key={city.cityid} value={city.cityid}>
                        {city.city_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                {/* Phone No */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.phone_no')}
                  </Form.Label>
                  <Form.Control
                    name="PhoneNo"
                    value={form.PhoneNo || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ledger.form.phone_no_placeholder')}
                  />
                </div>

                {/* Opening Balance Date */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.opening_balance_date')}
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="OpeningBalanceDate"
                    value={form.OpeningBalanceDate || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  />
                </div>


                {/* PAN No */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.pan_no')}
                  </Form.Label>
                  <Form.Control
                    name="PanNo"
                    value={form.PanNo || ""}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ledger.form.pan_no_placeholder')}
                  />
                </div>



                {/* Status */}
                <div className="d-flex align-items-center mb-3">
                  <Form.Label className="me-3" style={{ width: "140px" }}>
                    {t('ledger.form.status')}
                  </Form.Label>
                  <Form.Select
                    name="Status"
                    value={form.Status}
                    onChange={updateForm}
                    onKeyDown={handleKeyDown}
                  >
                    <option value="1">{t('ledger.status.active')}</option>
                    <option value="0">{t('ledger.status.inactive')}</option>
                  </Form.Select>
                </div>

              </div>

            </div>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('ledger.button.close')}
          </Button>
           <Button variant="success" onClick={saveRecord}>
            {t('ledger.button.save')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default MandiLedger;