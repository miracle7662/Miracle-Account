import React, { useEffect, useState, memo, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { Card, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Folder, Trash, Plus, Printer, Whatsapp } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/common';
import FarmerBillPreview from './FarmerBillPreview';



axios.defaults.baseURL = 'http://localhost:3001';

interface CustomerBillLineItem {
  id?: number;
  itemName: string;
  qty: number;
  customerAmt: number;
  commission: number; // Repurposed as farmer share per unit for farmer bill
  katala: number; // Add katala field
  customerName?: string;
  soudano?: string;
  soudaDate?: string;
  total?: number;
  farmerAmount: number; // Add this to store the per-unit farmer amount
  soudaItemsId: number; // Add this to uniquely identify the souda item
}

interface CustomerBillHeader {
  BillID?: number;
  BillNo: string;
  CustomerName: string; // Repurposed as FarmerName
  CustomerNo?: number; // Repurposed as FarmerNo
  BillDate: string;
  fromDate?: string;
  toDate?: string;
  TotalItems: number;
  TotalCustomerAmt: number;
  TotalCommission: number; // Repurposed as Total Farmer Share
  Created_by_id?: number;
  Updated_date?: string;
  StatusCode?: number;
}

interface Farmer {
  LedgerId: number;
  Name: string;
  FarmerNo?: number;
}


interface PanItem {
  product_id: number;
  product_nameeg: string;
}

interface CustomModalProps {
  showModal: boolean;
  loading: boolean;
  currentBill: CustomerBillHeader | null;
  billNo: string;
  farmerID: number | undefined;
  billDate: string;
  items: CustomerBillLineItem[];
  tempItemName: string;
  tempQty: number;
  tempCustomerAmt: number;
  tempCommission: number;
  farmers: Farmer[];
  bills: CustomerBillHeader[];
  panItems: PanItem[];
  dalali: number;
  hamali: number;
  vatav: number;
  previousDate: string;
  previousBalance: number;
  previousAdvance: number;
  katalaAmount: number;
  transportCharges: number;
  discount: number;
  selectedFromDate: string;
  selectedToDate: string;
  selectedBillDate: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setFarmerID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setBillDate: React.Dispatch<React.SetStateAction<string>>;
  setTempItemName: React.Dispatch<React.SetStateAction<string>>;
  setTempQty: React.Dispatch<React.SetStateAction<number>>;
  setTempCustomerAmt: React.Dispatch<React.SetStateAction<number>>;
  setTempCommission: React.Dispatch<React.SetStateAction<number>>;
  setPanItems: React.Dispatch<React.SetStateAction<PanItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: React.Dispatch<React.SetStateAction<CustomerBillLineItem[]>>;
  setDalali: React.Dispatch<React.SetStateAction<number>>;
  setHamali: React.Dispatch<React.SetStateAction<number>>;
  setVatav: React.Dispatch<React.SetStateAction<number>>;
  setPreviousDate: React.Dispatch<React.SetStateAction<string>>;
  setPreviousBalance: React.Dispatch<React.SetStateAction<number>>;
  setPreviousAdvance: React.Dispatch<React.SetStateAction<number>>;
  setKatalaAmount: React.Dispatch<React.SetStateAction<number>>;
  setTransportCharges: React.Dispatch<React.SetStateAction<number>>;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setSelectedFromDate: React.Dispatch<React.SetStateAction<string>>;
  setSelectedToDate: React.Dispatch<React.SetStateAction<string>>;
  setSelectedBillDate: React.Dispatch<React.SetStateAction<string>>;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  handleSubmit: () => void;
  calculateTotals: () => { totalItems: number; totalCustomerAmt: number; totalCommission: number; totalKatala: number };
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleEditItem: (index: number) => void;
  cancelEditItem: () => void;
  dalaliPercent: number;
  hamaliRate: number;
  vatavRate: number;
  onDalaliChange: (value: number) => void;
  onHamaliChange: (value: number) => void;
  onVatavChange: (value: number) => void;
  formatDate: (dateString: string | undefined) => string;
}

const CustomModal: React.FC<CustomModalProps> = memo(({
  showModal,
  loading,
  currentBill,
  billNo,
  farmerID,
  billDate,
  items,
  tempItemName,
  tempQty,
  tempCustomerAmt,
  tempCommission,
  farmers,
  bills,
  panItems,
  dalali,
  hamali,
  vatav,
  previousDate,
  previousBalance,
  previousAdvance,
  katalaAmount,
  transportCharges,
  discount,
  selectedFromDate,
  selectedToDate,
  selectedBillDate,
  setShowModal,
  setFarmerID,
  setBillDate,
  setTempItemName,
  setTempQty,
  setTempCustomerAmt,
  setTempCommission,
  setPanItems,
  setLoading,
  setItems,
  setDalali,
  setHamali,
  setVatav,
  setPreviousDate,
  setPreviousBalance,
  setPreviousAdvance,
  setKatalaAmount,
  setTransportCharges,
  setDiscount,
  setSelectedFromDate,
  setSelectedToDate,
  setSelectedBillDate,
  handleAddItem,
  handleRemoveItem,
  handleSubmit,
  calculateTotals,
  editingIndex,
  setEditingIndex,
  handleEditItem,
  cancelEditItem,
  dalaliPercent,
  hamaliRate,
  vatavRate,
  onDalaliChange,
  onHamaliChange,
  onVatavChange,
  formatDate,
}) => {
  const { t } = useTranslation();
  const farmerSelectRef = useRef<any>(null);
  const generateBillRef = useRef<HTMLButtonElement>(null);
  const previousAdvanceRef = useRef<HTMLInputElement>(null);
  const [minFromDate, ] = useState('');
  
  const handleGenerateBill = useCallback(async () => {
    if (!farmerID) {
      alert("Please select farmer first.");
      return;
    }

    try {
      setLoading(true);

      // Fetch Souda items
      const response = await axios.get(`/api/farmerbill/generate-bill-data/${farmerID}?fromDate=${selectedFromDate}&toDate=${selectedToDate}`);
      const soudaItems = response.data || [];

      if (!soudaItems || soudaItems.length === 0) {
        toast.success('No outstanding Souda items found for this farmer.');
        setItems([]);
        setLoading(false);
        return;
      }

      // Map Souda items to CustomerBillLineItem format (extended for farmer bill)
      const mappedItems: CustomerBillLineItem[] = soudaItems.map((item: any) => ({
        soudaItemsId: Number(item.SoudaID), // Keep track of the original item ID
        itemName: item.ItemName,
        qty: Number(item.Quantity),
        customerAmt: Number(item.CustomerAmount),
        farmerAmount: Number(item.FarmerAmount || 0), // Store the per-unit farmer amount
        commission: 0, // Commission is not directly used here, set to 0
        katala: Number(item.Katala || 0), // Set katala from the database field
        customerName: item.CustomerName, // Fetched from mandiledger
        soudano: item.SoudaNo,
        soudaDate: item.SoudaDate,
        totalTel: Number(item.Quantity), // Assuming TotalTel is the same as Quantity
      }));

      // Set items (for farmer bill, these represent souda transactions with customer details)
      setItems(mappedItems);
      toast.success(`Loaded ${mappedItems.length} Souda items for farmer (showing customers who took souda)`);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          toast.error(`Failed to load data: ${error.response.data.message || error.response.statusText}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error('Failed to load data: Network or request setup error.');
        }
      } else {
        toast.error('An unexpected error occurred while generating the bill.');
      }
    } finally {
      setLoading(false);
      previousAdvanceRef.current?.focus();
    }
  }, [farmerID, selectedFromDate, selectedToDate, setLoading, setItems]);
  

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        farmerSelectRef.current?.focus();
      }, 100);
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal && items.length === 0 && farmerID === undefined) {
      setTimeout(() => {
        farmerSelectRef.current?.focus();
      }, 100);
    }
  }, [showModal, items.length, farmerID]);



  useEffect(() => {
    if (!tempItemName && panItems.length > 0) {
      const firstItem = panItems[0];
      setTempItemName(firstItem.product_nameeg);
    }
  }, [tempItemName, panItems, setTempItemName]);

  useEffect(() => {
    if (farmerID && !currentBill) {
      const fetchLastBill = async () => {
        try {
          const response = await axios.get(`/api/farmerbill/last/${farmerID}`);
          const { previousDate, previousBalance,  } = response.data;
          setPreviousDate(previousDate || '');
          setPreviousBalance(previousBalance || 0);

        } catch (error) {
          console.error('Error fetching last bill data:', error);
        }
      };
      fetchLastBill();
    }
  }, [farmerID]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (
    e.key === 'F9' &&
    !e.ctrlKey &&
    !e.altKey &&
    !e.shiftKey &&
    !e.metaKey
  ) {
    e.preventDefault();
    handleSubmit();
  }
    if (e.key === 'Enter') {
      if (e.target instanceof HTMLTextAreaElement && e.shiftKey) {
        // Allow Shift+Enter for new lines in textareas
        return;
      }
      // Disable Enter functionality in the table
      const target = e.target as HTMLElement;
      if (target.closest('table')) {
        return;
      }
      // For farmer select: if target is react-select input and farmer selected, generate bill
      if (target.classList.contains('react-select__input') && farmerID !== undefined) {
        e.preventDefault();
        handleGenerateBill();
        return;
      }
      e.preventDefault();
      const form = target.closest('form') || target.closest('.modal-body');
      if (form) {
        const focusableElements = form.querySelectorAll(
          'input:not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
        );
        const currentIndex = Array.from(focusableElements).indexOf(target);
        if (currentIndex !== -1) {
          if (currentIndex < focusableElements.length - 1) {
            // Move to the next focusable element
            (focusableElements[currentIndex + 1] as HTMLElement).focus();
          } else {
            // If it's the last element, trigger form submission
            handleSubmit();
          }
        }
      }
    }
  }, [farmerID, handleGenerateBill, handleSubmit]);

  // ---- ALL HOOKS MUST BE HERE ----

  // ------------------------------
  if (!showModal) return null;

 const { totalItems,  totalCommission,   totalKatala } =
  calculateTotals();

// compute total qty
const totalQty = items.reduce((s, it) => s + Number(it.qty || 0), 0);

// compute item-level totals
const totalCustomerAmtCalc = items.reduce(
  (s, it) => s + Number(it.customerAmt || 0) * Number(it.qty || 0),
  0
);

const totalCommissionCalc = items.reduce(
  (s, it) => s + Number(it.farmerAmount || 0) * Number(it.qty || 0),
  0
);
console.log('Total Customer Amount Calculation:', totalCustomerAmtCalc);

// TOTAL of rows (same as table "Total")
const totalRows = totalCommissionCalc ;

// company rates
const calculatedDalali = (totalRows * dalaliPercent) / 100;
const calculatedHamali = Number(hamaliRate) * totalQty;
const calculatedVatav = Number(vatavRate) * totalQty;

// HEADER EXTRAS (correct)
// const headerExtras =
//   Number(previousBalance || 0) -
//   Number(previousAdvance || 0) +
//   Number(totalKatala || 0) +
//   Number(transportCharges || 0);

// TOTAL EXPENSE
const totalExpense =
  calculatedDalali +
  calculatedHamali +
  calculatedVatav +
  totalKatala +
  transportCharges +
  Number(discount || 0);

// FINAL BILL
const totalBill = totalRows  - totalExpense;
console.log('Total Bill Calculation Details:');

// table total
const grandTotal = totalRows;
console.log('Grand Total:', grandTotal);

  const farmerOptions = farmers
    .filter(farmer => farmer.FarmerNo !== undefined)
    .map(farmer => ({
      value: farmer.FarmerNo!,
      label: `${farmer.FarmerNo} - ${farmer.Name}`
    }));

  const selectedFarmer = farmers.find(f => f.FarmerNo === farmerID);
  const farmerName = selectedFarmer ? `${selectedFarmer.FarmerNo} - ${selectedFarmer.Name}` : '';

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setEditingIndex(null);
      }}
      size="xl"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5 className="mb-0" style={{ color: '#6f42c1' }}>
            <strong>{currentBill ? t('farmer_bill.modal_title_edit') : t('farmer_bill.modal_title_add')}</strong>
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none', padding: '0.5rem' }}>
        {/* ===================== ROW 1 ===================== */}
        <div className="row mb-3 align-items-center">
          {/* FARMER NAME (Left) */}
          <div className="col-md-6 d-flex align-items-center">
            <label
              className="form-label fw-bold me-2"
              style={{ color: '#6f42c1', width: '140px' }}
            >
              {t('farmer_bill.farmer_name_label')} <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="flex-grow-1">
              <Select
                ref={farmerSelectRef}
                options={farmerOptions}
                value={farmerOptions.find(opt => opt.value === farmerID) || null}
                onChange={(selected) => { 
                  setFarmerID(selected?.value); 
                  if (selected) {
                    setTimeout(() => generateBillRef.current?.focus(), 100);
                  }
                }}
                placeholder={t('farmer_bill.select_farmer_placeholder')}
                isSearchable
                isDisabled={loading}
              />
            </div>
          </div>

          {/* BILL NO (Right) */}
          <div className="col-md-3 offset-md-3">
            <div className="d-flex align-items-center justify-content-end">
            <label
              className="form-label fw-bold me-2"
                style={{ color: '#6f42c1', flexShrink: 0, width: '70px' }}
            >
              {t('farmer_bill.bill_no_label')}
            </label>
            <input
              type="text"
                className="form-control text-end"
              value={billNo}
              readOnly
              disabled={loading}
              style={{
                borderRadius: '6px',
                padding: '6px 10px',
                backgroundColor: '#e9ecef',
              }}
            />
            </div>
          </div>
        </div>

        {/* ===================== ROW 2 ===================== */}
        <div className="row mb-3 align-items-center">
          {/* FROM DATE */}
          <div className="col-md-3 d-flex align-items-center">
            <label
              className="form-label fw-bold me-2"
              style={{ color: '#6f42c1', width: '100px' }}
            >
              {t('farmer_bill.date_label')}
            </label>
            <input
              type="date"
              className="form-control"
              value={selectedFromDate}
              min={minFromDate}
              onChange={(e) => setSelectedFromDate(e.target.value)}
            />
          </div>

          {/* TO DATE */}
          <div className="col-md-3 d-flex align-items-center">
            <label
              className="form-label fw-bold me-2"
              style={{ color: '#6f42c1', width: '80px' }}
            >
              {t('farmer_bill.to_date_label')}
            </label>
             <input
              type="date"
              className="form-control"
              value={selectedToDate}
              onChange={(e) => setSelectedToDate(e.target.value)}
            />
          </div>

          {/* GENERATE BILL BUTTON */}
          <div className="col-md-3 d-flex align-items-center">
            <button
              ref={generateBillRef}
              className="btn btn-success"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                width: '70%', // Optional: use smaller width like '120px' if you want
              }}
              onClick={handleGenerateBill}
              disabled={!farmerID || loading}
            >
              {t('farmer_bill.generate_bill_button')}
            </button>
          </div>

          {/* TODAY DATE */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
            <label
              className="form-label fw-bold me-2"
                style={{ color: '#6f42c1', flexShrink: 0, width: '70px' }}
            >
              {t('farmer_bill.today_label')}
            </label>
            <input
              type="date"
                className="form-control"

              value={selectedBillDate}
              onChange={(e) => setSelectedBillDate(e.target.value)}

              style={{
                borderRadius: '6px',
                backgroundColor: '#e9ecef',
              }}
            />
            </div>
          </div>
        </div>

        {/* Add/Edit Item Section */}

        {/* Items List */}
        <div className="mb-3">
          <div className="table-responsive" style={{ borderRadius: '8px', overflow: 'auto', height: '320px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Table bordered size="sm" style={{ fontSize: '14px', margin: 0 }}>
              <thead style={{ backgroundColor: '#e9ecef' }}>
                <tr>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '5%' }}>{t('farmer_bill.table_sr_no')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '8%' }}>{t('farmer_bill.table_souda_no')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '10%' }}>{t('farmer_bill.table_souda_date')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '20%' }}>{t('farmer_bill.table_customer_name')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '12%' }}>{t('farmer_bill.table_farmer_amount')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '12%' }}>{t('farmer_bill.table_customer_amount')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '12%' }}>{t('farmer_bill.table_katala')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '5%' }}>{t('farmer_bill.table_total_qty')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '15%' }}>{t('farmer_bill.table_item')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '4%' }}>Customer Total</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '4%' }}>Farmer Total</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '5%' }}>{t('farmer_bill.table_actions')}</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center text-muted py-4" style={{ border: '1px solid #dee2e6' }}>
                      <Folder className="me-2" size={24} />
                      No items added yet. Add items using the form above to proceed.
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={item.soudaItemsId || index} style={{ verticalAlign: 'middle' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{item.soudano || ''}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.soudaDate ? formatDate(item.soudaDate) : ''}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.customerName || farmerName}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.farmerAmount).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.customerAmt ).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.katala ).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{item.total || item.qty}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.itemName}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.customerAmt * item.qty).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.farmerAmount * item.qty).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>
                        <button
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => handleEditItem(index)}
                          disabled={loading}
                          style={{ fontSize: '12px', padding: '3px 6px', opacity: loading ? 0.5 : 1 }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemoveItem(index)}
                          disabled={loading}
                          style={{ fontSize: '12px', padding: '3px 6px', opacity: loading ? 0.5 : 1 }}
                        >
                          <Trash size={12} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {items.length > 0 && (
                  <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                    <td colSpan={4} style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>Totals:</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}></td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}></td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalKatala.toFixed(2)}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalItems}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px' }}></td>
                   <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalCustomerAmtCalc.toFixed(2)}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalCommissionCalc.toFixed(2)}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px' }}></td> {/* Action column */}
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* --- BILL SUMMARY SECTION BELOW TABLE --- */}
        <style>
          {`
    .row-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
    }

    .row-item {
      width: calc(16.66% - 16px); /* 6 per row */
      display: flex;
      align-items: center;
    }

    .label-w {
      width: 120px;
      font-weight: bold;
      color: #6f42c1;
      font-size: 12px;
      margin-right: 8px;
    }

    /* Silent / subtle highlight for inputs */
    .form-control {
      background-color: #light;  /* light gray */
      border: 1px solid #ced4da;  /* soft border */
      border-radius: 4px;
      padding: 4px 8px;
    }

    .form-control:focus {
      background-color: #f8f9fa;  /* keep background same on focus */
      box-shadow: none;           /* remove default blue glow */
      border-color: #adb5bd;      /* slightly darker border on focus */
    }
      /* SPECIAL HIGHLIGHT for Total, Total Expense, Total Bill */
.special-highlight {
  background-color: #cdf2ffff !important;   /* soft yellow */
  border: 1px solid #008ae0ff !important;   /* golden border */
  font-weight: bold;
  color: #856404;                         /* dark-gold text */
}
  .special-highlight1 {
   box-shadow: none;   
   box-border: none;        /* remove default blue glow */
      border-color: none;      /* slightly darker border on focus */
  font-weight: ;
  color: #0f0485ff; 
  font-size: 22px;                        /* dark-gold text */
}

  `}
        </style>


        {/* ================= FIRST ROW ================= */}
        <div className="row-flex">
          <div className="row-item">
            <label className="label-w">{t('farmer_bill.previous_date_label')}</label>
            <input
              type="date"
              className="form-control"
              value={previousDate}
              readOnly
              style={{ width: '100px' }}
            />
          </div>


          <div className="row-item">
            <label className="label-w">{t('farmer_bill.previous_balance_label')}</label>
            <input type="number" value={previousBalance} className="form-control text-end" readOnly />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.previous_advance_label')}</label>
            <input ref={previousAdvanceRef} type="number" value={previousAdvance} onChange={(e) => setPreviousAdvance(parseFloat(e.target.value) || 0)} className="form-control text-end" onFocus={(e) => e.target.select()} />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.katala_amount_label')}</label>
            <input type="number" value={totalKatala.toFixed(2)} className="form-control text-end" readOnly />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.transport_charges_label')}</label>
            <input type="number" value={transportCharges} onChange={(e) => setTransportCharges(parseFloat(e.target.value) || 0)} className="form-control text-end" onFocus={(e) => e.target.select()} />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.total_label')}</label>
            <input type="number" value={totalCommission.toFixed(2)} readOnly className="form-control text-end special-highlight" style={{ width: '150px' }} />
          </div>

          
        </div>

        {/* ================= SECOND ROW ================= */}
        <div className="row-flex">
          <div className="row-item">
            <label className="label-w">{t('farmer_bill.dalali_label')}</label>
            <input type="number" value={dalali.toFixed(2)} onChange={(e) => onDalaliChange(parseFloat(e.target.value) || 0)} className="form-control text-end" readOnly />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.hamali_label')}</label>
            <input type="number" value={hamali.toFixed(2)} onChange={(e) => onHamaliChange(parseFloat(e.target.value) || 0)} className="form-control text-end" readOnly />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.vatav_label')}</label>
            <input type="number" value={vatav.toFixed(2)} onChange={(e) => onVatavChange(parseFloat(e.target.value) || 0)} className="form-control text-end" readOnly />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.discount_label')}</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} className="form-control text-end" onFocus={(e) => e.target.select()} />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.total_expense_label')}</label>
            <input type="number" value={totalExpense.toFixed(2)} readOnly className="form-control text-end special-highlight" />
          </div>

          <div className="row-item">
            <label className="label-w">{t('farmer_bill.total_bill_label')}</label>
            <input type="number" value={totalBill.toFixed(2)} readOnly className="form-control text-end special-highlight" style={{ width: '150px' }} />
          </div>
          
          
          
        </div>

      </Modal.Body>
<Modal.Footer style={{ padding: "0.5rem 1rem" }} className="d-flex justify-content-between align-items-center">

  {/* Centered Input */}
 <div className="flex-grow-1 d-flex justify-content-center">
  <span className="fw-bold special-highlight1 text-end">
    {(previousBalance + totalBill).toFixed(2)}
  </span>
</div>


  {/* Buttons on Right */}
  <div className="d-flex gap-2">
    <Button
      variant="outline-secondary"
      onClick={() => {
        setShowModal(false);
        setEditingIndex(null);
      }}
      disabled={loading}
    >
      {t("farmer_bill.back_button")}
    </Button>

    <Button
      variant="primary"
      onClick={handleSubmit}
      disabled={!farmerID || items.length === 0 || loading}
      style={{ backgroundColor: "#6f42c1", borderColor: "#6f42c1" }}
    >
      {loading ? (
        t("farmer_bill.saving_button")
      ) : (
        <>
          {currentBill
            ? t("farmer_bill.update_button")
            : t("farmer_bill.save_button")}
          {" "} <strong>(F9)</strong>
        </>
      )}
    </Button>
  </div>

</Modal.Footer>

    </Modal>
  );
});

const FarmerBillMaster: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [bills, setBills] = useState<CustomerBillHeader[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // If invalid date, return as is
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [showModal, setShowModal] = useState(false);
  const [currentBill, setCurrentBill] = useState<CustomerBillHeader | null>(null);
  const [billNo, setBillNo] = useState('');
  const [farmerID, setFarmerID] = useState<number | undefined>(undefined);
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<CustomerBillLineItem[]>([]);
  const [tempItemName, setTempItemName] = useState('');
  const [tempQty, setTempQty] = useState(0);
  const [tempCustomerAmt, setTempCustomerAmt] = useState(0);
  const [tempCommission, setTempCommission] = useState(0);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [panItems, setPanItems] = useState<PanItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [dalali, setDalali] = useState(0);
  const [hamali, setHamali] = useState(0);
  const [vatav, setVatav] = useState(0);
  const [dalaliPercent, setDalaliPercent] = useState(0);
  const [hamaliRate, setHamaliRate] = useState(0);
  const [vatavRate, setVatavRate] = useState(0);
  const [previousDate, setPreviousDate] = useState('');
  const [previousBalance, setPreviousBalance] = useState(0);
  const [previousAdvance, setPreviousAdvance] = useState(0);
  const [katalaAmount, setKatalaAmount] = useState(0);
  const [transportCharges, setTransportCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedToDate, setSelectedToDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBillDate, setSelectedBillDate] = useState(new Date().toISOString().split('T')[0]);

  // Set up axios Authorization header
  useEffect(() => {
    if (user?.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
  }, [user?.token]);

  const calculateTotals = useCallback((): { totalItems: number; totalCustomerAmt: number; totalCommission: number; totalKatala: number } => {
    const totalItems = items.reduce((sum, item) => sum + (item.total || item.qty), 0);
    const totalCustomerAmt = items.reduce((sum, item) => sum + (item.customerAmt * item.qty), 0);
    const totalCommission = items.reduce((sum, item) => sum + (item.farmerAmount * item.qty), 0); // This is now Total Farmer Amount
    const totalKatala = items.reduce((sum, item) => sum + (item.katala ), 0);
    return { totalItems, totalCustomerAmt, totalCommission, totalKatala };
  }, [items]);

  // Auto-calculate dalali, hamali, vatav based on company rates and items
  useEffect(() => {
    if (items.length === 0) {
      setDalali(0);
      setHamali(0);
      setVatav(0);
      return;
    }

    const totalQty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
    const totalRows = items.reduce(
      (sum, item) => sum   + (Number(item.farmerAmount || 0)) * Number(item.qty || 0),
      0
    );

    const calculatedDalali = (totalRows * dalaliPercent) / 100;
    const calculatedHamali = hamaliRate * totalQty;
    const calculatedVatav = vatavRate * totalQty;

    setDalali(calculatedDalali);
    setHamali(calculatedHamali);
    setVatav(calculatedVatav);
  }, [items, dalaliPercent, hamaliRate, vatavRate]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const query = user?.companyid ? `?companyId=${user.companyid}` : '';
      const res = await fetch(`http://localhost:3001/api/farmerbill/${query}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch bills');
      const data = await res.json();
      const mappedBills: CustomerBillHeader[] = data.map((bill: any) => ({
        BillID: bill.farBillID,
        BillNo: bill.farBillNumber,
        CustomerName: bill.FarmerName, // FarmerName
        CustomerNo: bill.FarmerID, // FarmerI
        BillDate: bill.farBillDate,
        fromDate: bill.farfromDate,
        toDate: bill.fartoDate,
        TotalItems: bill.TotalItems,
        TotalCustomerAmt: bill.FinalBillAmount,
        TotalCommission: bill.KatalaAmount,
        Created_by_id: bill.Created_by_id,
        Updated_date: bill.Updated_date,
        StatusCode: bill.StatusCode,
      }));
      setBills(mappedBills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      toast.error('Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };

  const fetchPanItems = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/products', {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch pan items');
      const data = await res.json();
      setPanItems(data);
      if (data.length > 0 && !tempItemName) {
        setTempItemName(data[0].product_nameeg);
      }
    } catch (error) {
      toast.error('Failed to fetch pan items');
    }
  };

  const handleBillSubmit = async () => {
    if (!farmerID || !billDate || items.length === 0) {
      toast.error('Please select Farmer, set Date, and add at least one item');
      return;
    }

    const { totalItems,   totalKatala } =
  calculateTotals();

// compute total qty
const totalQty = items.reduce((s, it) => s + Number(it.qty || 0), 0);

// compute item-level totals
const totalCustomerAmtCalc = items.reduce(
  (s, it) => s + Number(it.customerAmt || 0) * Number(it.qty || 0),
  0
);
console.log('Total Customer Amount Calculation:', totalCustomerAmtCalc);

const totalCommissionCalc = items.reduce(
  (s, it) => s + Number(it.farmerAmount || 0) * Number(it.qty || 0),
  0
);

// TOTAL of rows (same as table "Total")
const totalRows = totalCommissionCalc ;

// company rates
const calculatedDalali = (totalRows * dalaliPercent) / 100;
const calculatedHamali = Number(hamaliRate) * totalQty;
const calculatedVatav = Number(vatavRate) * totalQty;

// // HEADER EXTRAS (correct)
// const headerExtras =
//   Number(previousBalance || 0) -
//   Number(previousAdvance || 0) +
//   Number(totalKatala || 0) +
//   Number(transportCharges || 0);

// TOTAL EXPENSE
const totalExpense =
  calculatedDalali +
  calculatedHamali +
  calculatedVatav +
  totalKatala +
  transportCharges +
  Number(discount || 0);

// FINAL BILL
const totalBill = totalRows  - totalExpense;

// table total

    const selectedFarmer = farmers.find(f => f.FarmerNo === farmerID);

    const itemsPayload = items.map(item => ({
      SoudaID: item.soudaItemsId,
      CustomerID: item.customerName ? undefined : farmerID, // Only if no specific customer
      CustomerName: item.customerName || selectedFarmer?.Name || '',
      ItemName: item.itemName,
      Quantity: item.qty,
      FarmerAmount: item.farmerAmount,
      CustomerAmount: item.customerAmt,
      Katala: item.katala,
      Total: (item.customerAmt + item.farmerAmount) * item.qty,
    }));

    const payload = {
      farBillNumber: billNo || '',
      FarmerID: farmerID!,
      FarmerName: selectedFarmer ? selectedFarmer.Name : '',
      farBillDate: selectedBillDate,
      farfromDate: selectedFromDate,
      fartoDate: selectedToDate,
      TotalItems: totalItems,
      TotalAmount: totalCommissionCalc,
      commission: dalali,
      Dalali: dalali,
      Hamali: hamali,
      Vatav: vatav,
      TransportCharges: transportCharges,
      Discount: discount,
      TotalExpense: totalExpense,
      FinalBillAmount: totalBill,
      PreviousBalance: previousBalance,
      PreviousAdvance: previousAdvance,
      PreviousBalanceDate: previousDate,
      KatalaAmount: totalKatala,
      items: itemsPayload,
      Created_by_id: 1,
      companyid: user?.companyid,
    };

    console.log('Saving Farmer Bill with payload:', payload);

    setLoading(true);
    try {
      let res;
      if (currentBill && currentBill.BillID) {
        res = await fetch(`http://localhost:3001/api/farmerbill/${currentBill.BillID}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('http://localhost:3001/api/farmerbill/add', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) {
        // Try to get more specific error info from the response body
        const errorData = await res.json().catch(() => null); // Gracefully handle non-JSON responses
        const serverMessage = errorData?.message || errorData?.error || `Request failed with status ${res.status}`;
        console.error('Server error response:', errorData);
        throw new Error(serverMessage);
      }

      const result = await res.json();
      if (!currentBill) {
        if (result.BillNo) setBillNo(result.BillNo);
      }
      toast.success(`Farmer Bill ${currentBill ? 'updated' : 'added'} successfully`);

      // Refresh the bills list after save
      await fetchBills();

      if (currentBill) {
        // If it was an update, close the modal.
        setShowModal(false);
      } else {
        // If it was a new entry, keep modal open and reset for the next entry.
        setCurrentBill(null);
        setFarmerID(undefined);
        setBillDate(new Date().toISOString().split('T')[0]);
        setItems([]);
        setTempItemName('');
        setTempQty(0);
        setTempCustomerAmt(0);
        setTempCommission(0);
        setEditingIndex(null);
        setDalali(0);
        setHamali(0);
        setVatav(0);
        setPreviousDate('');
        setPreviousBalance(0);
        setPreviousAdvance(0);
        setKatalaAmount(0);
        setTransportCharges(0);
        setDiscount(0);
        // Fetch next Bill No
        try {
          const res = await fetch('http://localhost:3001/api/farmerbill/nextNo', {
            headers: {
              'Authorization': `Bearer ${user?.token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) throw new Error('Failed to fetch next Bill No');
          const data = await res.json();
          setBillNo(data.nextBillNo || '');
        } catch (error) {
          console.error('Failed to fetch next Bill No');
        }
      }
      
    } catch (error) {
      console.error('Error saving Farmer Bill:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Error saving Farmer Bill: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  

  const fetchFarmers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/mandi-ledger/farmers', {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch farmers');
      const data = await res.json();
      setFarmers(data);
    } catch (error) {
      toast.error('Failed to fetch farmers list');
    }
  };

  const fetchCompanyMaster = async () => {
    try {
      if (!user?.companyid) {
        console.warn('No company ID available');
        return;
      }
      
      const res = await fetch(`http://localhost:3001/api/companymaster/${user.companyid}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch company master');
      const company = await res.json();
      console.log('Fetched company data:', company);
      console.log('Dalali value:', company.dalali);
      console.log('Hamali value:', company.hamali);
      console.log('Vatav value:', company.vatav);
      // Parse dalali to remove % and convert to number
      const dalaliValue = typeof company.dalali === 'string' ? parseFloat(company.dalali.replace('%', '')) || 0 : Number(company.dalali) || 0;
      setDalaliPercent(dalaliValue);
      setHamaliRate(Number(company.hamali) || 0);
      setVatavRate(Number(company.vatav) || 0);
    } catch (error) {
      console.error('Failed to fetch company master:', error);
      toast.error('Failed to fetch company master values');
    }
  };

  useEffect(() => {
    fetchFarmers();
    fetchPanItems();
    fetchBills();
    fetchCompanyMaster();
  }, [user?.companyid]);

  const handleAdd = async () => {
    // First, fetch the next Bill No to ensure it's loaded before opening the modal
    try {
      const res = await fetch('http://localhost:3001/api/farmerbill/nextNo', {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch next Bill No');
      const data = await res.json();
      setBillNo(data.nextBillNo || '');
    } catch (error) {
      toast.error('Failed to load Bill No');
      setBillNo('');
    }

    // Then, reset all other states
    setCurrentBill(null);
    setFarmerID(undefined);
    setBillDate(new Date().toISOString().split('T')[0]);
    setItems([]);
    setTempItemName('');
    setTempQty(0);
    setTempCustomerAmt(0);
    setTempCommission(0);
    setEditingIndex(null);
    setDalali(0);
    setHamali(0);
    setVatav(0);
    await fetchCompanyMaster(); // Fetch and set default values for dalali, hamali, vatav
    setPreviousDate('');
    setPreviousBalance(0);
    setPreviousAdvance(0);
    setKatalaAmount(0);
    setTransportCharges(0);
    setDiscount(0);
    setSelectedFromDate(new Date().toISOString().split('T')[0]);
    setSelectedToDate(new Date().toISOString().split('T')[0]);
    setSelectedBillDate(new Date().toISOString().split('T')[0]);

    if (panItems.length > 0) {
      setTempItemName(panItems[0].product_nameeg);
    }

    // Finally, open the modal after Bill No is set
    setShowModal(true);
  };

  const handleEdit = async (bill: CustomerBillHeader) => {
    try {
      const res = await fetch(`http://localhost:3001/api/farmerbill/${bill.BillID}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch Bill details');
      const data = await res.json();      
      // Fetch company master defaults first
      await fetchCompanyMaster(); 
      // Override with saved values (auto-calc will adjust based on items/rates)
      setDalali(data.commission || 0);
      setHamali(data.Hamali || 0);
      setVatav(data.Vatav || 0);
      setPreviousDate(data.PreviousBalanceDate || '');
      setPreviousBalance(data.PreviousBalance || 0);
      setPreviousAdvance(data.PreviousAdvance || 0);
      setKatalaAmount(data.KatalaAmount || 0);
      setTransportCharges(data.TransportCharges || 0);
      setDiscount(data.Discount || 0);
      const mappedItems: CustomerBillLineItem[] = data.details.map((item: any) => ({
        id: item.DetailID,
        itemName: item.ItemName,
        qty: item.Quantity,
        customerAmt: item.CustomerAmount,
        commission: item.Commission || 0,
        katala: item.Katala || 0,
        farmerAmount: item.FarmerAmount || 0,
        soudaItemsId: item.SoudaID || 0,
        customerName: item.CustomerName,
        soudano: item.SoudaNo,
        soudaDate: item.SoudaDate,
      }));
      setItems(mappedItems);
      setCurrentBill(bill);
      setBillNo(bill.BillNo);
      setFarmerID(bill.CustomerNo);
       setBillDate(new Date().toISOString().split('T')[0]);
      setSelectedFromDate(data.farfromDate || bill.BillDate);
      setSelectedToDate(data.fartoDate || bill.BillDate);
       setSelectedBillDate(new Date().toISOString().split('T')[0]);
      setShowModal(true);
      setEditingIndex(null);
    } catch (error) {
      toast.error('Failed to load items for edit');
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This Farmer Bill entry will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/farmerbill/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) throw new Error('Delete failed');
        toast.success('Deleted successfully');
        await fetchBills();

      } catch {
        toast.error('Failed to delete Farmer Bill');
      }
    }
  };

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewBill, setPreviewBill] = useState<any | null>(null);
  const [previewItems, setPreviewItems] = useState<any[]>([]);

  const handlePrint = async (bill: CustomerBillHeader) => {
    if (!bill.BillID) {
      toast.error("Bill ID is missing.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/api/farmerbill/${bill.BillID}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch Bill details for preview');
      const data = await res.json();

      const previewHeader = {
        billNumber: data.farBillNumber,
        billDate: formatDate(data.farBillDate),
        customerName: data.FarmerName,
        farmerName: data.FarmerName,
        farmerno: data.FarmerID,
        farmerAddress: data.FarmerAddress || undefined,
        fromDate: formatDate(data.farfromDate),
        toDate: formatDate(data.fartoDate),
        lastBillDate: data.PreviousBalanceDate ? formatDate(data.PreviousBalanceDate) : undefined,
        lastBalance: data.PreviousBalance || undefined,
        dalali: data.commission || undefined,
        shillak: data.Hamali || undefined,
        vatav: data.Vatav || undefined,
        jama: data.TransportCharges || undefined,
        advance: data.PreviousAdvance || undefined,
        katala: data.KatalaAmount || undefined,
        discount: data.Discount || undefined,
        totalKharch: data.TotalExpense || undefined,
        totalAmount: data.TotalAmount || undefined,
        totalBaki: data.FinalBillAmount || undefined,
      };

      setPreviewBill(previewHeader);
      setPreviewItems(data.details.map((d: any) => ({ farmerName: d.CustomerName || data.FarmerName, qty: d.Quantity, rate: d.FarmerAmount, amount: d.FarmerAmount * d.Quantity, soudaDate: formatDate(d.SoudaDate) })));
      setShowPreviewModal(true);
    } catch (error) {
      toast.error('Failed to load bill for preview.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (bill: CustomerBillHeader) => {
    // Implement WhatsApp share logic, e.g., open WhatsApp with bill details
    console.log('Sharing bill via WhatsApp:', bill.BillID);
    toast ('WhatsApp share functionality to be implemented');
  };

  const handleAddItem = () => {
    if (!tempItemName || tempQty <= 0 || tempCustomerAmt < 0 || tempCommission < 0) {
      toast.error('Please fill all required fields with valid values (Qty > 0, Amounts >= 0)');
      return;
    }
    const newItem: CustomerBillLineItem = {
      itemName: tempItemName,
      qty: tempQty,
      customerAmt: tempCustomerAmt,
      commission: tempCommission,
      katala: 0, // Default value
      farmerAmount: 0, // Default value
      soudaItemsId: 0, // Default value
    };
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = newItem;
      setItems(updatedItems);
      toast.success('Item updated successfully');
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
      toast.success('Item added successfully');
    }
    setTempItemName('');
    setTempQty(0);
    setTempCustomerAmt(0);
    setTempCommission(0);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    toast('Item removed');
    if (editingIndex !== null && editingIndex === index) {
      cancelEditItem();
    }
  };

  const handleEditItem = (index: number) => {
    const item = items[index];
    setTempItemName(item.itemName);
    setTempQty(item.qty);
    setTempCustomerAmt(item.customerAmt);
    setTempCommission(item.commission);
    setEditingIndex(index);
  };

  const cancelEditItem = () => {
    setTempItemName('');
    setTempQty(0);
    setTempCustomerAmt(0);
    setTempCommission(0);
    setEditingIndex(null);
  };

  const onDalaliChange = (value: number) => setDalali(value);
  const onHamaliChange = (value: number) => setHamali(value);
  const onVatavChange = (value: number) => setVatav(value);

  // Filter bills based on search text and date range
  const filteredBills = bills.filter(bill => {
    const billDate = new Date(bill.BillDate);
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const matchesSearch = searchText === '' ||
      bill.BillNo.toLowerCase().includes(searchText.toLowerCase()) ||
      bill.CustomerName.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = billDate >= from && billDate <= to;
    return matchesSearch && matchesDate;
  });

  return (
    <>
      <Card className="m-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>{t('farmer_bill.page_title')}</h4>
          <Button variant="success" onClick={handleAdd}>
            <Plus className="me-1" /> {t('farmer_bill.add_button')}
          </Button>
        </div>

        {/* Filter Section */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder={t('farmer_bill.search_placeholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <Button variant="outline-primary" onClick={() => { setSearchText(''); setFromDate(new Date().toISOString().split('T')[0]); setToDate(new Date().toISOString().split('T')[0]); }}>
              {t('farmer_bill.clear_filters_button')}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>{t('farmer_bill.table_bill_no')}</th>
                <th>{t('farmer_bill.table_farmer_name')}</th>
                <th>{t('farmer_bill.table_bill_date')}</th>
                <th>{t('farmer_bill.table_bill_from_to')}</th>
                <th>{t('farmer_bill.table_katala')}</th>
                <th>{t('farmer_bill.table_total_items')}</th>
                <th>{t('farmer_bill.table_total_amount')}</th>
                <th>{t('farmer_bill.table_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.length === 0 ? (
                <tr><td colSpan={8} className="text-center">No records found</td></tr>
              ) : (
                filteredBills.map(bill => (
                  <tr key={bill.BillID}>
                    <td>{bill.BillNo}</td>
                    <td>{bill.CustomerName}</td>
                    <td>{formatDate(bill.BillDate)}</td>
                    <td>{formatDate(bill.fromDate)} to {formatDate(bill.toDate)}</td>
                    <td>{bill.TotalCommission}</td>
                    <td>{bill.TotalItems}</td>
                    <td>{bill.TotalCustomerAmt}</td>
                    <td>
                      <Button variant="outline-info" size="sm" className="me-1" onClick={() => handlePrint(bill)}>
                        <Printer size={12} />
                      </Button>
                      <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleWhatsApp(bill)}>
                        <Whatsapp size={12} />
                      </Button>
                      <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(bill)}>Edit</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(bill.BillID)}>
                        <Trash size={12} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Card>

      <CustomModal
        key={dalali}
        showModal={showModal}
        loading={loading}
        currentBill={currentBill}
        billNo={billNo}
        farmerID={farmerID}
        billDate={billDate}
        items={items}
        tempItemName={tempItemName}
        tempQty={tempQty}
        tempCustomerAmt={tempCustomerAmt}
        tempCommission={tempCommission}
        farmers={farmers}
        bills={bills}
        panItems={panItems}
        dalali={dalali}
        hamali={hamali}
        vatav={vatav}
        previousDate={previousDate}
        previousBalance={previousBalance}
        previousAdvance={previousAdvance}
        katalaAmount={katalaAmount}
        transportCharges={transportCharges}
        discount={discount}
        setShowModal={setShowModal}
        setFarmerID={setFarmerID}
        setBillDate={setBillDate}
        setTempItemName={setTempItemName}
        setTempQty={setTempQty}
        setTempCustomerAmt={setTempCustomerAmt}
        setTempCommission={setTempCommission}
        setPanItems={setPanItems}
        setLoading={setLoading}
        setItems={setItems}
        setDalali={setDalali}
        setHamali={setHamali}
        setVatav={setVatav}
        setPreviousDate={setPreviousDate}
        setPreviousBalance={setPreviousBalance}
        setPreviousAdvance={setPreviousAdvance}
        setKatalaAmount={setKatalaAmount}
        setTransportCharges={setTransportCharges}
        setDiscount={setDiscount}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleSubmit={handleBillSubmit}
        calculateTotals={calculateTotals}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        handleEditItem={handleEditItem}
        cancelEditItem={cancelEditItem}
        dalaliPercent={dalaliPercent}
        selectedFromDate={selectedFromDate}
        selectedToDate={selectedToDate}
        selectedBillDate={selectedBillDate}
        setSelectedFromDate={setSelectedFromDate}
        setSelectedToDate={setSelectedToDate}
        setSelectedBillDate={setSelectedBillDate}
        hamaliRate={hamaliRate}
        vatavRate={vatavRate}
        onDalaliChange={onDalaliChange}
        onHamaliChange={onHamaliChange}
        onVatavChange={onVatavChange}
        formatDate={formatDate}
      />

      {previewBill && (
        <FarmerBillPreview
          show={showPreviewModal}
          onHide={() => setShowPreviewModal(false)}
          bill={previewBill}
          items={previewItems}
        />
      )}
    </>
  );
};

export default FarmerBillMaster;