import React, { useEffect, useState, memo, useRef, useCallback } from 'react';
import Select from 'react-select';
import { Card, Button, Table, Modal } from 'react-bootstrap';
import { Folder, Trash, Plus, Printer, Whatsapp } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // Assuming react-i18next is set up for i18n
import { useAuthContext } from '@/common';
import CustomerBillPreview from './CustomerBillPreview';

interface CustomerBillLineItem {
  id?: number;
  farmerId?: number;
  farmerName: string;
  itemName: string;
  qty: number;
  customerAmt: number;
  commission: number;
  farmerAmt: number;
}

interface CustomerBillHeader {
  BillID?: number;
  custBillNumber: string;
  CustomerName: string;
  CustomerNo?: number;
  BillDate: string;
  TotalItems: number;
  TotalCustomerAmt: number;
  TotalCommission: number;
  Created_by_id?: number;
  Updated_date?: string;
  StatusCode?: number;
  previousDate?: string;
  previousBalance?: number;
  previousAdvance?: number;
  depositCash?: number;
  discount?: number;
  totaldiscount?: number;
  totalExpense?: number;
  totalBill?: number;
  finalBalance?: number;
  companyid?: number;
  yearid?: number;
}

interface Customer {
  LedgerId: number;
  Name: string;
  CustomerNo?: number;
}

interface PanItem {
  product_id: number;
  product_nameeg: string;
}

interface CustomModalProps {
  t: any; // Translation function
  showModal: boolean;
  loading: boolean;
  currentBill: CustomerBillHeader | null;
  custBillNumber: string;
  customerID: number | undefined;
  billDate: string;
  items: CustomerBillLineItem[];
  tempItemName: string;
  tempQty: number;
  tempCustomerAmt: number;
  tempCommission: number;
  customers: Customer[];
  panItems: PanItem[];
  previousDate: string;
  previousBalance: number;
  previousAdvance: number;
  transportCharges: number;
  discount: number;
  discountPercent: number;
  depositCash: number;
  totalExpense: number;
  totalBill: number;
  finalBalance: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomerID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setBillDate: React.Dispatch<React.SetStateAction<string>>;
  setcustBillNumber: React.Dispatch<React.SetStateAction<string>>;
  setTempItemName: React.Dispatch<React.SetStateAction<string>>;
  setTempQty: React.Dispatch<React.SetStateAction<number>>;
  setTempCustomerAmt: React.Dispatch<React.SetStateAction<number>>;
  setTempCommission: React.Dispatch<React.SetStateAction<number>>;
  setPanItems: React.Dispatch<React.SetStateAction<PanItem[]>>;
  setItems: React.Dispatch<React.SetStateAction<CustomerBillLineItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviousDate: React.Dispatch<React.SetStateAction<string>>;
  setPreviousBalance: React.Dispatch<React.SetStateAction<number>>;
  setPreviousAdvance: React.Dispatch<React.SetStateAction<number>>;
  setTransportCharges: React.Dispatch<React.SetStateAction<number>>;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setDiscountPercent: React.Dispatch<React.SetStateAction<number>>;
  setDepositCash: React.Dispatch<React.SetStateAction<number>>;
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>;
  setTotalBill: React.Dispatch<React.SetStateAction<number>>;
  setFinalBalance: React.Dispatch<React.SetStateAction<number>>;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  handleSubmit: () => void;
  calculateTotals: () => { totalItems: number; totalCustomerAmt: number; totalCommission: number; totalLineTotal: number; totalFarmerAmt: number };
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleEditItem: (index: number) => void;
  cancelEditItem: () => void;
  user: any;
}

const CustomModal: React.FC<CustomModalProps> = memo(({
  t,
  showModal,
  loading,
  currentBill,
  custBillNumber,
  customerID,
  billDate,
  items,
  tempItemName,
  tempQty,
  tempCustomerAmt,
  tempCommission,
  customers,
  panItems,
  previousDate,
  previousBalance,
  previousAdvance,
  transportCharges,
  discount,
  discountPercent,
  depositCash,
  totalExpense,
  totalBill,
  finalBalance,
  setShowModal,
  setCustomerID,
  setBillDate,
  setcustBillNumber,
  setTempItemName,
  setTempQty,
  setTempCustomerAmt,
  setTempCommission,
  setPanItems,
  setItems,
  setLoading,
  setPreviousDate,
  setPreviousBalance,
  setPreviousAdvance,
  setTransportCharges,
  setDiscount,
  setDiscountPercent,
  setDepositCash,
  setTotalExpense,
  setTotalBill,
  setFinalBalance,
  handleAddItem,
  handleRemoveItem,
  handleSubmit,
  calculateTotals,
  editingIndex,
  setEditingIndex,
  handleEditItem,
  cancelEditItem,
  user
}) => {
  const customerSelectRef = useRef<any>(null);
  const generateBillRef = useRef<HTMLButtonElement>(null);
  const depositCashRef = useRef<HTMLInputElement>(null);
  const previousAdvanceRef = useRef<HTMLInputElement>(null);
  const [, setCustomerSelected] = useState(false);
  


  useEffect(() => {
    if (showModal) {
      setCustomerSelected(false);
      setTimeout(() => {
        customerSelectRef.current?.focus();
      }, 100);
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal && items.length === 0 && customerID === undefined) {
      setTimeout(() => {
        customerSelectRef.current?.focus();
      }, 100);
    }
  }, [showModal, items.length, customerID]);

  useEffect(() => {
    if (!tempItemName && panItems.length > 0) {
      const firstItem = panItems[0];
      setTempItemName(firstItem.product_nameeg);
    }
  }, [tempItemName, panItems, setTempItemName]);



  // Auto-calculate bill summary when items or inputs change
  useEffect(() => {
    const { totalLineTotal, totalCommission: calcTotalCommission } = calculateTotals();
    const calculatedTotalExpense = transportCharges + calcTotalCommission;
    const calculatedTotalBill = totalLineTotal - discount;
    const calculatedFinalBalance =    calculatedTotalBill + calculatedTotalExpense - depositCash;

    setTotalExpense(calculatedTotalExpense);
    setTotalBill(calculatedTotalBill);
    setFinalBalance(calculatedFinalBalance);

    // Keep discount percent and amount in sync with totalLineTotal changes
    if (totalLineTotal > 0) {
        // If discount amount was the last thing changed, re-calculate percent
        const newPercent = (discount / totalLineTotal) * 100;
        if (Math.abs(newPercent - discountPercent) > 0.01) { // Check to avoid infinite loops
            setDiscountPercent(Number(newPercent.toFixed(2)));
        }
    } else {
        // If total is zero, both discount and percent should be zero
        setDiscount(0);
        setDiscountPercent(0);
    }

  }, [items, previousBalance, previousAdvance, transportCharges, discount, depositCash, calculateTotals, setTotalExpense, setTotalBill, setFinalBalance]);

  const { totalItems, totalCommission, totalLineTotal, totalFarmerAmt } = calculateTotals();

  const handleGenerateBill = useCallback(async () => {
    if (!customerID) {
      toast.error(t('customer_bill.select_customer_first_error'));
      return;
    }

    if (!billDate) {
      toast.error(t('customer_bill.select_bill_date_error'));
      return;
    }

    try {
      setLoading(true);

      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;

      // Check if bill already exists for this customer on this date
      const checkRes = await fetch(`http://localhost:3001/api/customerbill/check/${customerID}/${billDate}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!checkRes.ok) throw new Error('Failed to check bill existence');
      const checkData = await checkRes.json();

      if (checkData.exists) {
        toast.error(t('customer_bill.bill_exists_error', { date: billDate, billNumber: checkData.billNumber }));
        return;
      }

      // Fetch previous bill data
      const prevRes = await fetch(`http://localhost:3001/api/customerbill/last/${customerID}/${billDate}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!prevRes.ok) throw new Error('Failed to fetch previous bill data');
      const prevData = await prevRes.json();

      setPreviousDate(prevData.previousDate);
      setPreviousBalance(prevData.previousBalance);

      // Fetch Souda items
      const res = await fetch(`http://localhost:3001/api/souda/items/customer/${customerID}/${billDate}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch Souda items');
      const soudaItems = await res.json();

      // Map Souda items to CustomerBillLineItem format
      const mappedItems: CustomerBillLineItem[] = soudaItems.map((item: any) => ({
        farmerId: item.FarmerNo || 0,
        farmerName: item.FarmerName || '',
        itemName: item.ItemName,
        qty: item.Quantity,
        customerAmt: item.CustomerAmount,
        commission: item.Katala || 0, // Using Katala as commission
        farmerAmt: item.FarmerAmount || 0,
      }));

      // After setting items, fetch company commission and apply discount
      if (mappedItems.length > 0) {
        try {
          const companyRes = await fetch(`http://localhost:3001/api/companymaster/${user.companyid}`, {
            headers: { 'Authorization': `Bearer ${user.token}` },
          });
          if (companyRes.ok) {
            const companyData = await companyRes.json();
            const commissionPercent = companyData?.commission || 0;
            setDiscountPercent(commissionPercent);

            // Calculate totalLineTotal based on the newly fetched items
            const totalLineTotal = mappedItems.reduce((sum, item) => sum + (item.customerAmt * item.qty), 0);
            
            // Calculate and set the discount amount
            const amount = (commissionPercent * totalLineTotal) / 100;
            setDiscount(Number(amount.toFixed(2)));
          }
        } catch (error) {
            console.error("Failed to fetch company commission during bill generation:", error);
            // Reset discount if fetching fails
            setDiscountPercent(0);
            setDiscount(0);
        }
      }

      setItems(mappedItems);
      toast.success(t('customer_bill.souda_items_loaded', { count: mappedItems.length }));
    } catch (error) {
      console.error('Error in handleGenerateBill:', error);
      toast.error(t('customer_bill.failed_to_load_items'));
    } finally {
      setLoading(false);
      previousAdvanceRef.current?.focus();
    }
  }, [customerID, billDate, setLoading, setPreviousDate, setPreviousBalance, setItems, t, user, setDiscount, setDiscountPercent]);

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
      // For customer select: if target is react-select input and customer selected, generate bill
      if (target.classList.contains('react-select__input') && customerID !== undefined) {
        e.preventDefault();
        handleGenerateBill();
        return;
      }
      // For deposit cash: trigger submit
      if (target.id === 'depositCashInput') {
        e.preventDefault();
        handleSubmit();
        return;
      }
      e.preventDefault();
      const form = target.closest('form') || target.closest('.modal-body');
      if (form) {
        const focusableElements = form.querySelectorAll(
          'input:not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
        );
        const currentIndex = Array.from(focusableElements).indexOf(target);
        if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
          (focusableElements[currentIndex + 1] as HTMLElement).focus();
        }
      }
    }
  }, [customerID, handleGenerateBill, handleSubmit]);

  const customerOptions = customers
    .filter((customer: Customer) => customer.CustomerNo !== undefined)
    .map((customer: Customer) => ({
      value: customer.CustomerNo!,
      label: `${customer.CustomerNo} - ${customer.Name}`
    }));

  const handleCustomerChange = useCallback(async (selected: any) => {
    if (!selected) {
      setCustomerID(undefined);
      setPreviousDate('');
      setPreviousBalance(0);
      return;
    }
    const customerId = selected.value;
    setCustomerID(customerId);

    // Removed logic to fetch and set previous date and balance
    setPreviousDate('');
    setPreviousBalance(0);
  }, []);

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
            <strong>{t(currentBill ? 'customer_bill.modal_title_edit' : 'customer_bill.modal_title_add')}</strong>
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '0.5rem' }}>
        <div onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none' }}>

        {/* Customer Details */}
        <div className="row mb-3 g-3 align-items-end">

          {/* CUSTOMER NAME */}
          <div className="col-md-4">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
              {t('customer_bill.customer_name_label')} <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              ref={customerSelectRef}
              options={customerOptions}
              value={customerID !== undefined ? customerOptions.find(opt => opt.value === customerID) : null}
              onChange={handleCustomerChange}
              placeholder={t('customer_bill.select_customer_placeholder')}
              isSearchable
              isDisabled={loading}
            />
          </div>

          {/* DATE */}
         <div className="col-md-2">
  <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
    {t('customer_bill.date_label')}
  </label>

  <input
    type="date"
    className="form-control"
    value={billDate}
    onChange={(e) => setBillDate(e.target.value)}
    disabled={loading}
    style={{
      borderRadius: '6px',
      border: '1px solid #dee2e6',
      padding: '8px 12px',
    }}
  />
</div>

          {/* GENERATE BILL BUTTON */}
          <div className="col-md-3 d-flex align-items-end justify-content-start">
            <button
              ref={generateBillRef}
              className="btn btn-success"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                fontWeight: 'bold',
                width: '150px',
              }}
              onClick={handleGenerateBill}
              disabled={!customerID || loading}
            >
              {t('customer_bill.generate_bill_button')}
            </button>
          </div>

          {/* BILL NO */}
          <div className="col-md-2 ms-auto">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
              {t('customer_bill.bill_no_label')}
            </label>
            <input
              type="text"
              className="form-control text-end"
              value={custBillNumber}
              onChange={(e) => setcustBillNumber(e.target.value)}
              readOnly
              disabled={loading}
              style={{
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                padding: '8px 12px',
                backgroundColor: '#e9ecef',
              }}
            />
          </div>

        </div>

        {/* Items List */}
        <div className="mb-3">
          <div className="table-responsive" style={{ borderRadius: '8px', overflow: 'auto', height: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Table bordered size="sm" style={{ fontSize: '14px', margin: 0 }}>
              <thead style={{ backgroundColor: '#e9ecef' }}>
                <tr>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '5%' }}>{t('customer_bill.table_sr_no')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '5%' }}>{t('customer_bill.table_farmer_no')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '25%' }}>{t('customer_bill.table_farmer_name')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '15%' }}>{t('customer_bill.table_item')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '8%' }}>{t('customer_bill.table_qty')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '15%' }}>{t('customer_bill.table_customer_amt')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '10%' }}>{t('customer_bill.table_katala')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '15%' }}>{t('customer_bill.table_total')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '10%' }}>{t('customer_bill.table_actions')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '12%' }}>{t('customer_bill.table_farmer_amt')}</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center text-muted py-4" style={{ border: '1px solid #dee2e6' }}>
                      <Folder className="me-2" size={24} />
                      {t('customer_bill.no_items_message')}
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index} style={{ verticalAlign: 'middle' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.farmerId}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.farmerName}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.itemName}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.customerAmt ).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.commission ).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {((item.customerAmt) * item.qty).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>
                        <button
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => handleEditItem(index)}
                          disabled={loading}
                          style={{ fontSize: '12px', padding: '3px 6px', opacity: loading ? 0.5 : 1 }}
                        >
                          {t('common.edit_button')}
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
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {((item.farmerAmt) )}
                      </td>
                    </tr>
                  ))
                )}
                {items.length > 0 && (
                  <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                    <td colSpan={4} style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{t('customer_bill.totals_label')}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>{totalItems}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}></td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalCommission.toFixed(2)}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalLineTotal.toFixed(2)}</td>
                    <td></td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalFarmerAmt.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* --- BILL SUMMARY SECTION BELOW TABLE --- */}
        <style>
          {`
    .five-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .five-item {
      width: calc(20% - 16px); /* exactly 5 per row */
      display: flex;
      align-items: center;
    }

    .label-w {
      width: 120px;
      font-weight: bold;
      color: #6f42c1;
      font-size: 14px;
      margin-right: 8px;
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
   border: none;
  font-weight: bold;
  color: #0f0485ff;
  font-size: 22px;                        /* dark-gold text */
}
      
  `}
        </style>

        <div className="five-row">

          <div className="five-item">
            <label className="label-w">{t('customer_bill.previous_date_label')}</label>
            <input type="date" className="form-control equal-input" value={previousDate} onChange={(e) => setPreviousDate(e.target.value)} readOnly style={{ width: '130px' }} />
          </div>

          <div className="five-item">
            <label className="label-w">{t('customer_bill.previous_balance_label')}</label>
            <input type="number" value={previousBalance} onChange={(e) => setPreviousBalance(Number(e.target.value) || 0)} className="form-control text-end" readOnly />
          </div>

          <div className="five-item">
            <label className="label-w">{t('customer_bill.previous_advance_label')}</label>
            <input ref={previousAdvanceRef} type="number" value={previousAdvance} onChange={(e) => setPreviousAdvance(Number(e.target.value) || 0)} className="form-control text-end" onFocus={(e) => e.target.select()} />
          </div>

          <div className="five-item">
            <label className="label-w">{t('customer_bill.katala_amount_label')}</label>
            <input type="number" value={totalCommission.toFixed(2)} className="form-control text-end" readOnly />
          </div>

          <div className="five-item">
            <label className="label-w">{t('customer_bill.total_label')}</label>
            <input type="number" value={totalLineTotal.toFixed(2)} className="form-control text-end special-highlight" readOnly />
          </div>

          <div className="five-item">

          
  <label className="label-w">{t('customer_bill.discount_label')}</label>

  {/* PERCENTAGE INPUT (Editable) */}
  <input
    type="number"
    value={discountPercent}
    onChange={(e) => {
      const percent = Number(e.target.value) || 0;
      setDiscountPercent(percent);

      // convert % → amount
      const amount = (percent * totalLineTotal) / 100;
      setDiscount(Number(amount.toFixed(2)));
    }}
    className="form-control text-end"
    onFocus={(e) => e.target.select()}
    placeholder="%"
  />

  {/* AMOUNT INPUT (Editable) */}
  <input
    type="number"
    value={discount}
    onChange={(e) => {
      const amount = Number(e.target.value) || 0;
      setDiscount(amount);

      // convert amount → percentage
      const percent = totalLineTotal > 0 ? (amount / totalLineTotal) * 100 : 0;
      setDiscountPercent(Number(percent.toFixed(2)));
    }}
    className="form-control text-end"
    onFocus={(e) => e.target.select()}
    placeholder="Amount"
  />
</div>

            <div className="five-item">
            <label className="label-w">{t('customer_bill.transport_charges_label')}</label>
            <input type="number" value={transportCharges} onChange={(e) => setTransportCharges(Number(e.target.value) || 0)} className="form-control text-end" onFocus={(e) => e.target.select()} />
          </div>

         
          <div className="five-item">
            <label className="label-w"> {t('customer_bill.deposit_cash_label')}</label>
            <input ref={depositCashRef} id="depositCashInput" type="number" value={depositCash} onChange={(e) => setDepositCash(Number(e.target.value) || 0)} className="form-control text-end" onFocus={(e) => e.target.select()} />
          </div>

        
           <div className="five-item">
            <label className="label-w">{t('customer_bill.total_expense_label')}</label>
            <input type="number" value={totalExpense.toFixed(2)} className="form-control text-end" readOnly />
          </div>


          <div className="five-item">
            <label className="label-w">{t('customer_bill.total_bill_label')}</label>
            <input type="number" value={finalBalance.toFixed(2)} className="form-control text-end special-highlight" readOnly />
          </div>

         

        </div>

        </div>
      </Modal.Body>
     <Modal.Footer className="d-flex justify-content-between align-items-center">

  {/* Left: Centered Textbox Only */}
   <div className="flex-grow-1 d-flex justify-content-center">
  <span className="fw-bold special-highlight1 text-end">
    {(previousBalance + totalBill).toFixed(2)}
  </span>
</div>

  {/* Right: Buttons */}
  <div className="d-flex gap-2">
    <Button
      variant="outline-secondary"
      onClick={() => {
        setShowModal(false);
        setEditingIndex(null);
      }}
      disabled={loading}
    >
      {t("customer_bill.back_button")}
    </Button>

    <Button
      variant="primary"
      onClick={handleSubmit}
      disabled={!customerID || items.length === 0 || loading}
      style={{
        backgroundColor: "#6f42c1",
        borderColor: "#6f42c1",
      }}
    >
      💾{" "}
      {loading
        ? t("customer_bill.saving_button")
        : currentBill
        ? t("customer_bill.update_button")
        : t("customer_bill.save_button")}
      {" "} <strong>(F9)</strong>
    </Button>
  </div>
  
</Modal.Footer>

    </Modal>
  );
});

const CustomerBillMaster: React.FC = () => {
  const { t } = useTranslation(); // Hook for translations
  const { user } = useAuthContext();
  const [bills, setBills] = useState<CustomerBillHeader[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentBill, setCurrentBill] = useState<CustomerBillHeader | null>(null);
  const [selectedBill, setSelectedBill] = useState<CustomerBillHeader | null>(null);
  const [previewItems, setPreviewItems] = useState<CustomerBillLineItem[]>([]);
  const [custBillNumber, setcustBillNumber] = useState('');
  const [customerID, setCustomerID] = useState<number | undefined>(undefined);
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<CustomerBillLineItem[]>([]);
  const [tempItemName, setTempItemName] = useState('');
  const [tempQty, setTempQty] = useState(0);
  const [tempCustomerAmt, setTempCustomerAmt] = useState(0);
  const [tempCommission, setTempCommission] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [panItems, setPanItems] = useState<PanItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [previousDate, setPreviousDate] = useState('');
  const [previousBalance, setPreviousBalance] = useState(0);
  const [previousAdvance, setPreviousAdvance] = useState(0);
  const [transportCharges, setTransportCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [depositCash, setDepositCash] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  // const [billData, setBillData] = useState<any[]>([]);
  // const [billDataLoading, setBillDataLoading] = useState(false);

  const calculateTotals = useCallback(() => {
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalCustomerAmt = items.reduce((sum, item) => sum + (item.customerAmt * item.qty), 0);
    const totalCommission = items.reduce((sum, item) => sum + (item.commission ), 0);
    const totalLineTotal = totalCustomerAmt ;
    const totalFarmerAmt = items.reduce((sum, item) => sum + (item.farmerAmt* item.qty ), 0);
    return { totalItems, totalCustomerAmt, totalCommission, totalLineTotal, totalFarmerAmt };
  }, [items]);

const fetchBills = async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await fetch(`http://localhost:3001/api/customerbill/list${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch bills');
      const data = await res.json();
      const mappedBills: CustomerBillHeader[] = data.map((bill: any) => ({
        BillID: bill.custBillID,
        custBillNumber: bill.custBillNumber,
        CustomerName: bill.CustomerName,
        CustomerNo: bill.CustomerID,
        BillDate: bill.custBillDate,
        TotalItems: bill.TotalItems,
        TotalCustomerAmt: bill.TotalAmount,
        TotalCommission: bill.katalaAmount,
        Created_by_id: bill.Created_by_id,
        Updated_date: bill.Updated_date,
        StatusCode: bill.StatusCode,
        previousBalance: bill.PreviousBalance || 0,
        previousAdvance: bill.PreviousAdvance || 0,       
        discountPercent: bill.Discount || 0,
        discount: bill.TotalDiscount || 0,
        totalExpense: bill.TotalExpense || 0,
        finalBalance: bill.FinalBillAmount || 0,
        companyid: bill.companyid,
        yearid: bill.yearid,
      }));
      setBills(mappedBills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      toast.error(t('customer_bill.failed_to_fetch_bills'));
    } finally {
      setLoading(false);
    }
  };
  const fetchPanItems = async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await fetch(`http://localhost:3001/api/products${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch pan items');
      const data = await res.json();
      setPanItems(data);
      if (data.length > 0 && !tempItemName) {
        setTempItemName(data[0].product_nameeg);
      }
    } catch (error) {
      toast.error(t('souda.failed_to_fetch_pan_items'));
    }
  };

  const handleBillSubmit = async () => {
    if (!customerID || !billDate || items.length === 0) {
      toast.error(t('customer_bill.fill_required_fields_error'));
      return;
    }

    const { totalItems, totalLineTotal, totalCommission } = calculateTotals();

    const itemsPayload = items.map(item => ({
      FarmerID: item.farmerId || 0,
      FarmerName: item.farmerName,
      ItemName: item.itemName,
      Quantity: item.qty,
      CustomerAmount: item.customerAmt,
      Commission: item.commission,
    }));

    const payload = {
      custBillNumber: custBillNumber || '',
      CustomerNo: customerID!,
      BillDate: billDate,
      TotalItems: totalItems,
      TotalCustomerAmt: totalLineTotal,
      TotalCommission: totalCommission,
      Discount: discountPercent, // Send percentage
      TransportCharges: transportCharges,
      TotalExpense: totalExpense,
      PreviousBalance: previousBalance,
      PreviousAdvance: previousAdvance,
      DepositCash: depositCash,
      PreviousDate: previousDate || null,
      FinalBillAmount: finalBalance,
      items: itemsPayload,
      created_by_id: user?.userid || 1,
      companyid: user?.companyid,
      yearid: user?.yearid,
       TotalDiscount: discount, // Send calculated discount amount
    };

    setLoading(true);
    try {
      let res;
      if (currentBill && currentBill.BillID) {
        res = await fetch(`http://localhost:3001/api/customerbill/${currentBill.BillID}`, {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('http://localhost:3001/api/customerbill/add', {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(payload),
        });
      }
      if (!res.ok) throw new Error('Failed to save');
      const result = await res.json();
      if (!currentBill) {
        if (result.custBillNumber) setcustBillNumber(result.custBillNumber);
      }
      toast.success(currentBill ? t('customer_bill.customer_bill_updated_success') : t('customer_bill.customer_bill_added_success'));
      fetchBills(); // Refresh the bills list
      if (currentBill) {
        setShowModal(false);
      } else {
        setCurrentBill(null);
        setCustomerID(undefined);
        setBillDate(new Date().toISOString().split('T')[0]);
        setItems([]);
        setTempItemName('');
        setTempQty(0);
        setTempCustomerAmt(0);
        setTempCommission(0);
        setEditingIndex(null);
        setPreviousBalance(0);
        setPreviousAdvance(0);
        setDiscount(0);
        setTransportCharges(0);
        setDepositCash(0);
        setTotalExpense(0);
        setTotalBill(0);
        setFinalBalance(0);
        setPreviousDate('');
        // Fetch next bill number
        try {
          const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
          const res = await fetch(`http://localhost:3001/api/customerbill/nextNo${params}`, {
            headers: {
              'Authorization': `Bearer ${user?.token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setcustBillNumber(data.nextBillNo || 'CB-001');
          }
        } catch (error) {
          console.error('Failed to fetch next Bill No');
        }
      }
      
    } catch {
      toast.error(t('customer_bill.failed_to_save_bill'));
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}&date=${billDate}`;
      const res = await fetch(`http://localhost:3001/api/mandi-ledger/customers${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch customers');
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      toast.error(t('customer_bill.failed_to_fetch_customers'));
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCustomers();
      fetchPanItems();
      fetchBills();
    }
  }, [user, t, billDate]);

 const handleAdd = async () => {
  setCurrentBill(null);
  setCustomerID(undefined);
  setBillDate(new Date().toISOString().split('T')[0]);
  setItems([]);
  setTempItemName('');
  setTempQty(0);
  setTempCustomerAmt(0);
  setTempCommission(0);
  setEditingIndex(null);
  setPreviousBalance(0);
  setPreviousAdvance(0);
  setDiscount(0);
  setTransportCharges(0);
  setDepositCash(0);
  setTotalExpense(0);
  setTotalBill(0);
  setFinalBalance(0);
  setPreviousDate('');

  if (panItems.length > 0) {
    setTempItemName(panItems[0].product_nameeg);
  }

  // First: Fetch NEXT BILL NUMBER
  let nextBill = 'CB-001';

  try {
    const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
    const res = await fetch(`http://localhost:3001/api/customerbill/nextNo${params}`, {
      headers: {
        'Authorization': `Bearer ${user?.token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();

      console.log("API returned nextBillNo:", data.nextBillNo);  // 👈 Correct log

      nextBill = data.nextBillNo || 'CB-001';
    }
  } catch (error) {
    console.error("Failed to fetch next Bill No");
  }

  // Update state FIRST
  setcustBillNumber(nextBill);

  console.log("STATE SET nextBill:", nextBill);  // 👈 This prints final value used

  // Then open modal AFTER STATE IS UPDATED
  setTimeout(() => {
    setShowModal(true);
  }, 50);
};



  const handleEdit = async (bill: CustomerBillHeader) => {
    try {
      const res = await fetch(`http://localhost:3001/api/customerbill/${bill.BillID}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch Bill details');
      const data = await res.json();
      const mappedItems: CustomerBillLineItem[] = data.items.map((item: any) => ({
        id: item.ItemID,
        farmerId: item.FarmerID,
        farmerName: item.FarmerName || '',
        itemName: item.ItemName,
        qty: item.Quantity,
        customerAmt: item.CustomerAmount,
        farmerAmt: item.FarmerAmount || 0,
        commission: (item.CustomerAmount - item.FarmerAmount) || 0,
      }));
      setItems(mappedItems);
      setCurrentBill(bill);
      setcustBillNumber(bill.custBillNumber);
      setCustomerID(bill.CustomerNo);
      setBillDate(bill.BillDate);

      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      // Fetch previous bill data
      const prevRes = await fetch(`http://localhost:3001/api/customerbill/last/${bill.CustomerNo}/${bill.BillDate}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      const prevData = prevRes.ok ? await prevRes.json() : { previousDate: null, previousBalance: 0 };

      setPreviousDate(prevData.previousDate);
      setPreviousBalance(prevData.previousBalance);

      setPreviousAdvance(data.PreviousAdvance || 0);
      
      // On Edit, calculate and set the initial discount percentage from the stored amount
      const loadedDiscount = data.Discount || data.TotalDiscount || 0;
      const { totalLineTotal } = calculateTotals();
      if (totalLineTotal > 0) {
        const percent = (loadedDiscount / totalLineTotal) * 100;
        setDiscountPercent(Number(percent.toFixed(2)));
      } else {
        setDiscountPercent(0);
      }
      setDiscountPercent(data.Discount || 0);
      setDiscount( data.TotalDiscount || 0);
      setTransportCharges(data.TransportCharges || 0);
      setTotalExpense(data.TotalExpense || 0);
      setFinalBalance(data.FinalBillAmount || 0);

      // Calculate depositCash based on stored final balance
      const totalItemsCalc = mappedItems.reduce((sum, item) => sum + item.qty, 0);
      const totalCustomerAmtCalc = mappedItems.reduce((sum, item) => sum + (item.customerAmt * item.qty), 0);
      const totalCommissionCalc = mappedItems.reduce((sum, item) => sum + (item.commission), 0);
      const totalLineTotalCalc = totalCustomerAmtCalc + totalCommissionCalc;
      const calculatedTotalExpense = (data.TransportCharges || 0) + totalCommissionCalc;
      const calculatedTotalBill = totalLineTotalCalc - (data.TotalDiscount || 0);
      const calculatedDepositCash =  calculatedTotalBill + calculatedTotalExpense - data.FinalBillAmount;
      setDepositCash(calculatedDepositCash);
      // Use totalItemsCalc here
      console.log(totalItemsCalc); // Example usage

      setShowModal(true);
      setEditingIndex(null);
    } catch (error) {
      toast.error(t('customer_bill.failed_to_load_items'));
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const result = await Swal.fire({
      title: t('customer_bill.delete_confirmation_title'),
      text: t('customer_bill.delete_confirmation_text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('customer_bill.delete_confirm_button'),
      cancelButtonText: t('customer_bill.delete_cancel_button'),
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/customerbill/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
        if (!res.ok) throw new Error('Delete failed');
        toast.success(t('souda.delete_success'));
        fetchBills();
        
      } catch {
        toast.error(t('customer_bill.failed_to_delete_bill'));
      }
    }
  };

  const handlePrint = async (bill: CustomerBillHeader) => {
    try {
      const res = await fetch(`http://localhost:3001/api/customerbill/${bill.BillID}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch Bill details');
      const data = await res.json();
      const mappedItems: CustomerBillLineItem[] = data.items.map((item: any) => ({
        id: item.ItemID,
        farmerId: item.FarmerID,
        farmerName: item.FarmerName || '',
        itemName: item.ItemName,
        qty: item.Quantity,
        customerAmt: item.CustomerAmount,
        commission: (item.CustomerAmount - item.FarmerAmount) || 0,
        farmerAmt: item.FarmerAmount || 0,
      }));

      // Calculate totals
      const totalItems = mappedItems.reduce((sum, item) => sum + item.qty, 0);
      console.log("Total Items:", totalItems);
      const totalCustomerAmt = mappedItems.reduce((sum, item) => sum + (item.customerAmt * item.qty), 0);
      const totalCommission = mappedItems.reduce((sum, item) => sum + (item.commission * item.qty), 0);
      const totalLineTotal = totalCustomerAmt + totalCommission;

      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      // Fetch previous bill data
      const prevRes = await fetch(`http://localhost:3001/api/customerbill/last/${bill.CustomerNo}/${bill.BillDate}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      const prevData = prevRes.ok ? await prevRes.json() : { previousDate: null, previousBalance: 0 };

      // Calculate final balance
      const totalExpense = (data.TransportCharges || 0) + totalCommission;
      const totalBill = totalLineTotal - (data.TotalDiscount || 0);
      const finalBalance =  totalBill + totalExpense - data.FinalBillAmount;
      
      // Create bill object with all fields for preview
      const previewBill: CustomerBillHeader = {
        ...bill,
        previousDate: prevData.previousDate,
        previousBalance: prevData.previousBalance,
        previousAdvance: data.PreviousAdvance || 0,
        depositCash: data.DepositCash || 0,
        discount: data.Discount || 0,
        totaldiscount: data.TotalDiscount || 0,
        totalExpense: totalExpense,
        totalBill: totalBill,
        finalBalance: data.FinalBillAmount || finalBalance,
      };

      setSelectedBill(previewBill);
      setPreviewItems(mappedItems);
      setShowPreviewModal(true);
    } catch (error) {
      console.error('Error fetching bill details:', error);
      toast.error(t('customer_bill.failed_to_load_bill_details'));
    }
  };

  const handleWhatsApp = (bill: CustomerBillHeader) => {
    // Implement WhatsApp share logic, e.g., open WhatsApp with bill details
    console.log('Sharing bill via WhatsApp:', bill.BillID);
    toast(t('customer_bill.whatsapp_share_message'));
  };

  const handleAddItem = () => {
    if (!tempItemName || tempQty <= 0 || tempCustomerAmt < 0 || tempCommission < 0) {
      toast.error(t('customer_bill.fill_required_fields_error'));
      return;
    }
    const newItem: CustomerBillLineItem = {
      farmerName: '',
      itemName: tempItemName,
      qty: tempQty,
      customerAmt: tempCustomerAmt,
      commission: tempCommission,
      farmerAmt: tempCustomerAmt,
    };
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = newItem;
      setItems(updatedItems);
      toast.success(t('customer_bill.item_updated_success'));
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
      toast.success(t('customer_bill.item_added_success'));
    }
    setTempItemName('');
    setTempQty(0);
    setTempCustomerAmt(0);
    setTempCommission(0);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    toast(t('customer_bill.item_removed'));
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

  // Filter bills based on search text and date range
  const filteredBills = bills.filter(bill => {
    const matchesSearch = searchText === '' ||
      bill.custBillNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      bill.CustomerName.toLowerCase().includes(searchText.toLowerCase());
    const billDateObj = new Date(bill.BillDate);
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const matchesDate = billDateObj >= from && billDateObj <= to;
    return matchesSearch && matchesDate;
  });

  return (
    <>
      <Card className="m-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
           <h4>{t('customer_bill.page_title')}</h4>
          <Button variant="success" onClick={handleAdd}>
            <Plus className="me-1" /> {t('customer_bill.add_button')}
          </Button>
        </div>

        {/* Filter Row */}
        <div className="row mb-3 g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
                 {t('customer_bill.search_label')}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={t('customer_bill.search_placeholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                padding: '8px 12px',
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
               {t('customer_bill.from_date_label')}
            </label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              style={{
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                padding: '8px 12px',
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
              {t('customer_bill.to_date_label')}
            </label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              style={{
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                padding: '8px 12px',
              }}
            />
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSearchText('');
                setFromDate(new Date().toISOString().split('T')[0]);
                setToDate(new Date().toISOString().split('T')[0]);
              }}
              style={{
                borderRadius: '6px',
                padding: '8px 12px',
              }}
            >
              {t('customer_bill.clear_filters_button')}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center p-4">{t('customer_bill.loading_message')}</div>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>{t('customer_bill.table_bill_no')}</th>
                <th>{t('customer_bill.table_bill_date')}</th>
                <th>{t('customer_bill.table_customer_name')}</th>
                <th>{t('customer_bill.table_total_items')}</th>
                <th>{t('customer_bill.table_total_amount')}</th>
                <th>{t('customer_bill.table_katala')}</th>
                <th>{t('customer_bill.table_actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.length === 0 ? (
                <tr><td colSpan={7} className="text-center">{t('customer_bill.no_records_found')}</td></tr>
              ) : (
                filteredBills.map(bill => (
                  <tr key={bill.BillID}>
                    <td>{bill.custBillNumber}</td>
                    <td>{bill.BillDate}</td>
                    <td>{bill.CustomerName}</td>
                    <td>{bill.TotalItems}</td>
                    <td>{bill.TotalCustomerAmt}</td>
                    <td>{bill.TotalCommission}</td>
                    <td>
                      <Button variant="outline-info" size="sm" className="me-1" onClick={() => handlePrint(bill)}>
                        <Printer size={12} />
                      </Button>
                      <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleWhatsApp(bill)}>
                        <Whatsapp size={12} />
                      </Button>
                      <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(bill)}>{t('common.edit_button')}</Button>
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
        t={t}
        showModal={showModal}
        loading={loading}
        currentBill={currentBill}
        custBillNumber={custBillNumber}
        customerID={customerID}
        billDate={billDate}
        items={items}
        tempItemName={tempItemName}
        tempQty={tempQty}
        tempCustomerAmt={tempCustomerAmt}
        tempCommission={tempCommission}
        customers={customers}
        panItems={panItems}
        previousDate={previousDate}
        previousBalance={previousBalance}
        previousAdvance={previousAdvance}
        transportCharges={transportCharges}
        discount={discount}
        depositCash={depositCash}
        totalExpense={totalExpense}
        totalBill={totalBill}
        discountPercent={discountPercent}
        finalBalance={finalBalance}
        setShowModal={setShowModal}
        setCustomerID={setCustomerID}
        setBillDate={setBillDate}
        setTempItemName={setTempItemName}
        setTempQty={setTempQty}
        setTempCustomerAmt={setTempCustomerAmt}
        setTempCommission={setTempCommission}
        setPanItems={setPanItems}
        setItems={setItems}
        setcustBillNumber={setcustBillNumber}
        setLoading={setLoading}
        setPreviousDate={setPreviousDate}
        setPreviousBalance={setPreviousBalance}
        setPreviousAdvance={setPreviousAdvance}
        setTransportCharges={setTransportCharges}
        setDiscount={setDiscount}
        setDiscountPercent={setDiscountPercent}
        setDepositCash={setDepositCash}
        setTotalExpense={setTotalExpense}
        setTotalBill={setTotalBill}
        setFinalBalance={setFinalBalance}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleSubmit={handleBillSubmit}
        calculateTotals={calculateTotals}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        handleEditItem={handleEditItem}
        cancelEditItem={cancelEditItem}
        user={user}
      />

      {selectedBill && (
        <CustomerBillPreview
          show={showPreviewModal}
          onHide={() => setShowPreviewModal(false)}
          bill={selectedBill}
          items={previewItems}
        />
      )}
    </>
  );
};

export default CustomerBillMaster;