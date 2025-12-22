import React, { useEffect, useState, memo, useRef } from 'react';
import Select from 'react-select';
import { Card, Button, Table } from 'react-bootstrap';
import { Folder, Trash, Plus, FileEarmarkPdf, FileEarmarkExcel } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@/common';


interface SoudaLineItem {
  id?: number;
  customerName: string;
  CustomerNo?: number;
  itemName: string;
  qty: number;
  farmerAmt: number;
  customerAmt: number;
  katala: number;
}

interface SoudaHeader {
  SoudaID?: number;
  SoudaNo: string;
  FarmerName: string;
  customerName: string;
  CustomerNo?: number;
  FarmerNo?: number;
  SoudaDate: string;
  TotalItems: number;
  TotalFarmerAmt: number;
  TotalCustomerAmt: number;
  TotalKatala: number;
  Created_by_id?: number;
  Updated_date?: string;
  StatusCode?: number;
  companyid?: number;
  yearid?: number;
}

interface Farmer {
  LedgerId: number;
  Name: string;
  FarmerNo?: number;
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
  showModal: boolean;
  loading: boolean;
  currentSouda: SoudaHeader | null;
  soudaNo: string;
  farmerID: number | undefined;
  soudaDate: string;
  items: SoudaLineItem[];
  tempCustomerNo: number | undefined;
  tempCustomerName: string;
  tempItemName: string;
  tempQty: number;
  tempFarmerAmt: number;
  tempCustomerAmt: number;
  tempKatala: number;
  farmers: Farmer[];
  customers: Customer[];
  panItems: PanItem[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSoudaNo: React.Dispatch<React.SetStateAction<string>>;
  setFarmerID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSoudaDate: React.Dispatch<React.SetStateAction<string>>;
  setTempCustomerNo: React.Dispatch<React.SetStateAction<number | undefined>>;
  setTempCustomerName: React.Dispatch<React.SetStateAction<string>>;
  setTempItemName: React.Dispatch<React.SetStateAction<string>>;
  setTempQty: React.Dispatch<React.SetStateAction<number>>;
  setTempFarmerAmt: React.Dispatch<React.SetStateAction<number>>;
  setTempCustomerAmt: React.Dispatch<React.SetStateAction<number>>;
  setTempKatala: React.Dispatch<React.SetStateAction<number>>;
  setPanItems: React.Dispatch<React.SetStateAction<PanItem[]>>;
  handleAddItem: () => void;
  handleRemoveItem: (index: number) => void;
  handleSubmit: () => void;
  calculateTotals: () => { totalItems: number; totalFarmerAmt: number; totalCustomerAmt: number; totalKatala: number };
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleEditItem: (index: number) => void;
  cancelEditItem: () => void;
  item_readonly: boolean;
  katala_readonly: boolean;
  user: any;
}

const CustomModal: React.FC<CustomModalProps> = memo(({
  showModal,
  loading,
  currentSouda,
  soudaNo,
  farmerID,
  soudaDate,
  items,
  tempCustomerNo,
  tempCustomerName,
  tempItemName,
  tempQty,
  tempFarmerAmt,
  tempCustomerAmt,
  tempKatala,
  farmers,
  customers,
  panItems,
  setShowModal,
  setSoudaNo,
  setFarmerID,
  setSoudaDate,
  setTempCustomerNo,
  setTempCustomerName,
  setTempItemName,
  setTempQty,
  setTempFarmerAmt,
  setTempCustomerAmt,
  setTempKatala,
  setPanItems,
  handleAddItem,
  handleRemoveItem,
  handleSubmit,
  calculateTotals,
  editingIndex,
  setEditingIndex,
  handleEditItem,
  cancelEditItem,
  item_readonly,
  katala_readonly,
  user
}) => {
  const { t } = useTranslation();
  const farmerSelectRef = useRef<any>(null);
  const customerSelectRef = useRef<any>(null);
  const itemSelectRef = useRef<any>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const farmerAmtRef = useRef<HTMLInputElement>(null);
  const customerAmtRef = useRef<HTMLInputElement>(null);
  const katalaRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const prevTempCustomerNoRef = useRef<number | undefined>(undefined);

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
    if (prevTempCustomerNoRef.current !== undefined &&
      tempCustomerNo === undefined &&
      editingIndex === null &&
      items.length > 0) {
      setTimeout(() => {
        customerSelectRef.current?.focus();
      }, 100);
    }
    prevTempCustomerNoRef.current = tempCustomerNo;
  }, [tempCustomerNo, editingIndex, items.length, showModal]);

  useEffect(() => {
    if (tempCustomerNo && !tempItemName && panItems.length > 0) {
      const firstItem = panItems[0];
      setTempItemName(firstItem.product_nameeg);
    }
  }, [tempCustomerNo, tempItemName, panItems, setTempItemName]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // F9 to save the entire Souda
      if (event.key === 'F9' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        // Check if form is valid to submit, same as the save button's disabled logic
        if (farmerID && items.length > 0 && !loading) {
          handleSubmit();
        }
      }

      // F8 to add an item to the list
      if (event.key === 'F8' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        // Check if item form is valid, same as the "Add" button's disabled logic
        const isItemFormValid = tempCustomerNo && tempItemName && tempQty > 0 && !loading;
        if (isItemFormValid) {
          handleAddItem();
        }
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModal, handleSubmit, handleAddItem, farmerID, items, loading, tempCustomerNo, tempItemName, tempQty]);

  if (!showModal) return null;

  const { totalItems, totalFarmerAmt, totalCustomerAmt, totalKatala } = calculateTotals();

  const farmerOptions = farmers
    .filter(farmer => farmer.FarmerNo !== undefined)
    .map(farmer => ({
      value: farmer.FarmerNo!,
      label: `${farmer.FarmerNo} - ${farmer.Name}`
    }));

  const customerOptions = customers
    .filter(customer => customer.CustomerNo !== undefined)
    .map(customer => ({
      value: customer.CustomerNo!,
      label: `${customer.CustomerNo} - ${customer.Name}`
    }));

  const panItemOptions = panItems.map(item => ({
    value: item.product_nameeg,
    label: `${item.product_id} - ${item.product_nameeg}`
  }));

  return (
    <div
      className="modal"
      style={{
        display: showModal ? 'block' : 'none',
        background: 'rgba(0,0,0,0.5)',
        position: 'fixed',
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
          background: 'white',
          padding: '10px',
          maxWidth: '1000px',
          margin: '50px auto',
          borderRadius: '8px',
          maxHeight: '150vh',
          overflowY: 'auto',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0" style={{ color: '#6f42c1' }}>
            <strong>{currentSouda ? t('souda.modal_title_edit_souda') : t('souda.modal_title_add_souda')}</strong>
          </h5>
          <button
            className="btn-close"
            onClick={() => {
              setShowModal(false);
              setEditingIndex(null);
            }}
            disabled={loading}
            style={{ opacity: loading ? 0.5 : 1 }}
          ></button>
        </div>

        {/* Farmer Details */}
        <div className="row mb-3 g-3">
          <div className="col-md-7">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
              {t('souda.farmer_name_label')} <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              ref={farmerSelectRef}
              options={farmerOptions}
              value={farmerID !== undefined ? farmerOptions.find(opt => opt.value === farmerID) : null}
              onChange={(selected) => setFarmerID(selected ? selected.value : undefined)}
              placeholder={t('souda.select_farmer_placeholder')}
              isSearchable
              isDisabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setTimeout(() => customerSelectRef.current?.focus(), 0);
                }
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '14px' }}>
              {t('souda.date_label')}
            </label>
            <input
              type="date"
              className="form-control"
              value={soudaDate}
              onChange={(e) => setSoudaDate(e.target.value)}
              disabled={loading}
              style={{ borderRadius: '6px', border: '1px solid #dee2e6', padding: '8px 12px' }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
              {t('souda.no_label')}
            </label>
            <input
              type="text"
              className="form-control"
              value={soudaNo}
              onChange={(e) => setSoudaNo(e.target.value)}
              disabled={loading}
              style={{ borderRadius: '6px', border: '1px solid #dee2e6', padding: '8px 12px' }}
            />
          </div>
        </div>

        {/* Add/Edit Item Section */}
        <div className="mb-4" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '3px', border: '1px solid #dee2e6', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
                {t('souda.customer_name_label')} <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                ref={customerSelectRef}
                options={customerOptions}
                value={tempCustomerNo !== undefined ? customerOptions.find(opt => opt.value === tempCustomerNo) : null}
                onChange={(selected) => {
                  const val = selected ? selected.value : undefined;
                  setTempCustomerNo(val);
                  const cust = customers.find(c => c.CustomerNo === val);
                  setTempCustomerName(cust ? cust.Name : '');
                }}
                placeholder={t('souda.select_customer_placeholder')}
                isSearchable
                isDisabled={loading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (item_readonly) {
                      // Skip Item field if it's readonly
                      setTimeout(() => qtyRef.current?.focus(), 0);
                    } else {
                      setTimeout(() => itemSelectRef.current?.focus(), 0);
                    }
                  }
                }}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
                {t('souda.item_name_label')} <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                ref={itemSelectRef}
                options={panItemOptions}
                value={tempItemName ? panItemOptions.find(opt => opt.value === tempItemName) : null}
                onChange={(selected) => setTempItemName(selected ? selected.value : '')}
                placeholder={t('souda.select_item_placeholder')}
                isSearchable
                isDisabled={loading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setTimeout(() => qtyRef.current?.focus(), 0);
                  }
                }}
              />
            </div>
            <div className="col-md-1">
              <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
                {t('souda.qty_label')}
              </label>
              <input
                ref={qtyRef}
                type="number"
                min="1"
                className="form-control"
                value={tempQty}
                onChange={(e) => setTempQty(Number(e.target.value) || 0)}
                disabled={loading}
                style={{ borderRadius: '6px', border: '1px solid #dee2e6', padding: '8px 12px' }}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    farmerAmtRef.current?.focus();
                  }
                }}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
                {t('souda.farmer_amt_label')}
              </label>
              <input
                ref={farmerAmtRef}
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                value={tempFarmerAmt}
                onChange={(e) => {
                  const value = Number(e.target.value) || 0;
                  setTempFarmerAmt(value);
                  setTempCustomerAmt(value);
                }}
                disabled={loading}
                style={{ borderRadius: '6px', border: '1px solid #dee2e6', padding: '8px 12px' }}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    customerAmtRef.current?.focus();
                  }
                }}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
                {t('souda.customer_amt_label')}
              </label>
              <input
                ref={customerAmtRef}
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                value={tempCustomerAmt}
                onChange={(e) => setTempCustomerAmt(Number(e.target.value) || 0)}
                disabled={loading}
                style={{ borderRadius: '6px', border: '1px solid #dee2e6', padding: '8px 12px' }}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // If Katala is readonly, add the item directly on Enter
                    if (katala_readonly) {
                      e.preventDefault();
                      setTimeout(() => handleAddItem(), 0);
                    } else {
                      katalaRef.current?.focus();
                    }
                  }
                }}
              />
            </div>
            <div className="col-md-1">
              <label className="form-label fw-bold" style={{ color: '#6f42c1', fontSize: '12px' }}>
                {t('souda.katala_label')}
              </label>
              <input
                ref={katalaRef}
                type="number"
                min="0"
                step="0.01"
                className="form-control"
                value={tempKatala}
                onChange={(e) => setTempKatala(Number(e.target.value) || 0)}
                disabled={loading}
                style={{ borderRadius: '6px', border: '1px solid #dee2e6', padding: '8px 12px' }}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addButtonRef.current?.focus();
                  }
                }}
              />
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button
                ref={addButtonRef}
                className="btn"
                onClick={handleAddItem}
                disabled={!tempCustomerNo || !tempItemName || tempQty <= 0 || loading}
                style={{
                  backgroundColor: '#6f42c1',
                  borderColor: '#6f42c1',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontWeight: 'bold',
                  height: 'fit-content',
                  opacity: (!tempCustomerNo || !tempItemName || tempQty <= 0 || loading) ? 0.5 : 1
                }}
              >
                {editingIndex !== null ? t('souda.update_button') : t('souda.add_button')}
              </button>

            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-3">
          <div className="table-responsive" style={{ borderRadius: '8px', overflow: 'hidden', height: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Table bordered size="sm" style={{ fontSize: '14px', margin: 0 }}>
              <thead style={{ backgroundColor: '#e9ecef' }}>
                <tr>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '15%' }}>{t('souda.item_table_customer_name')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '15%' }}>{t('souda.item_table_item_name')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '8%' }}>{t('souda.item_table_qty')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '12%' }}>{t('souda.item_table_farmer_amt')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '12%' }}>{t('souda.item_table_customer_amt')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '10%' }}>{t('souda.item_table_katala')}</th>
                  <th style={{ border: '1px solid #dee2e6', padding: '6px', fontWeight: 'bold', width: '8%' }}>{t('souda.item_table_action')}</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4" style={{ border: '1px solid #dee2e6' }}>
                      <Folder className="me-2" size={24} />
                      {t('souda.no_items_message')}
                    </td>
                  </tr>
                ) : (
                  items.map((item, index) => (
                    <tr key={index} style={{ verticalAlign: 'middle' }}>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.customerName}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px' }}>{item.itemName}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.farmerAmt).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.customerAmt).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>
                        {(item.katala).toFixed(2)}
                      </td>
                      <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>
                        <button
                          className="btn btn-outline-primary btn-sm me-1"
                          onClick={() => handleEditItem(index)}
                          disabled={loading}
                          style={{ fontSize: '12px', padding: '3px 6px', opacity: loading ? 0.5 : 1 }}
                        >
                          {t('souda.edit_button')}
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
                    <td colSpan={2} style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>Totals:</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'center' }}>{totalItems}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalFarmerAmt}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalCustomerAmt}</td>
                    <td style={{ border: '1px solid #dee2e6', padding: '6px', textAlign: 'right' }}>{totalKatala}</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              setShowModal(false);
              setEditingIndex(null);
            }}
            disabled={loading}
            style={{ borderRadius: '6px', padding: '8px 20px', border: '1px solid #6c757d', opacity: loading ? 0.5 : 1 }}
          >
            {t('souda.back_button')}
          </button>
         <button
  className="btn btn-primary"
  onClick={handleSubmit}
  disabled={!farmerID || items.length === 0 || loading}
  style={{
    backgroundColor: '#6f42c1',
    borderColor: '#6f42c1',
    borderRadius: '6px',
    padding: '8px 25px',
    fontWeight: 'bold',
    opacity: (!farmerID || items.length === 0 || loading) ? 0.5 : 1
  }}
>
  {loading
    ? `${t('souda.saving_button')} (F9)`
    : currentSouda
      ? `${t('souda.update_button')} (F9)`
      : `${t('souda.save_button')} (F9)`
  }
</button>

        </div>
      </div>
    </div>
  );
});

const SoudaMaster: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [soudas, setSoudas] = useState<SoudaHeader[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentSouda, setCurrentSouda] = useState<SoudaHeader | null>(null);
  const [soudaNo, setSoudaNo] = useState('');
  const [farmerID, setFarmerID] = useState<number | undefined>(undefined);
  const [soudaDate, setSoudaDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<SoudaLineItem[]>([]);
  const [tempCustomerNo, setTempCustomerNo] = useState<number | undefined>(undefined);
  const [tempCustomerName, setTempCustomerName] = useState('');
  const [tempItemName, setTempItemName] = useState('');
  const [tempQty, setTempQty] = useState(0);
  const [tempFarmerAmt, setTempFarmerAmt] = useState(0);
  const [tempCustomerAmt, setTempCustomerAmt] = useState(0);
  const [tempKatala, setTempKatala] = useState(0);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [panItems, setPanItems] = useState<PanItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [companySettings, setCompanySettings] = useState({
    item_readonly: false,
    katala_readonly: false,
  });

  const calculateTotals = () => {
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const totalFarmerAmt = items.reduce((sum, item) => sum + (item.farmerAmt * item.qty), 0);
    const totalCustomerAmt = items.reduce((sum, item) => sum + (item.customerAmt * item.qty), 0);
    const totalKatala = items.reduce((sum, item) => sum + (item.katala ), 0);
    return { totalItems, totalFarmerAmt, totalCustomerAmt, totalKatala };
  };

  const fetchCompanySettings = async () => {
    if (!user?.companyid) return;
    try {
      const res = await fetch(`http://localhost:3001/api/companymaster/${user.companyid}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch company settings');
      const data = await res.json();
      setCompanySettings({
        item_readonly: !!data.item_readonly,
        katala_readonly: !!data.katala_readonly,
      });
    } catch (error) {
      console.error('Failed to fetch company settings:', error);
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
      toast.error('Failed to fetch pan items');
    }
  };

  const handleSoudaSubmit = async () => {
    if (!farmerID || !soudaDate || items.length === 0) {
      toast.error('Please select Farmer, set Date, and add at least one item');
      return;
    }

    const { totalItems, totalFarmerAmt, totalCustomerAmt, totalKatala } = calculateTotals();

    const itemsPayload = items.map(item => ({
      CustomerNo: item.CustomerNo,
      CustomerName: item.customerName,
      ItemName: item.itemName,
      Quantity: item.qty,
      FarmerAmount: item.farmerAmt,
      CustomerAmount: item.customerAmt,
      Katala: item.katala,
      FarmerNo: farmerID!,
    }));

    // Include SoudaNo in payload for update to match backend update requirement
    const payload = {
      SoudaNo: currentSouda ? currentSouda.SoudaNo : undefined,
      FarmerNo: farmerID!,
      SoudaDate: soudaDate,
      TotalItems: totalItems,
      TotalFarmerAmt: totalFarmerAmt,
      TotalCustomerAmt: totalCustomerAmt,
      TotalKatala: totalKatala,
      items: itemsPayload,
      created_by_id: user?.userid || 1,
      companyid: user?.companyid,
      yearid: user?.yearid,
    };

    setLoading(true);
    try {
      let res;
      if (currentSouda && currentSouda.SoudaID) {
        res = await fetch(`http://localhost:3001/api/souda/${currentSouda.SoudaID}`, {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('http://localhost:3001/api/souda', {
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
      if (!currentSouda) {
        // Set generated SoudaNo from backend response
        if (result.SoudaNo) setSoudaNo(result.SoudaNo);
      }
      toast.success(`Souda ${currentSouda ? 'updated' : 'added'} successfully`);

      if (currentSouda) {
        // If it was an update, close the modal.
        setShowModal(false);
      } else {
        // If it was a new entry, keep modal open and reset for the next entry.
        setCurrentSouda(null);
        setFarmerID(undefined);
        setSoudaDate(new Date().toISOString().split('T')[0]);
        setItems([]);
        setTempCustomerNo(undefined);
        setTempCustomerName('');
        setTempItemName('');
        setTempQty(0);
        setTempFarmerAmt(0);
        setTempCustomerAmt(0);
        setTempKatala(0);
        setEditingIndex(null);
        // Fetch next SoudaNo
        try {
          const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
          const res = await fetch(`http://localhost:3001/api/souda/nextNo${params}`, {
            headers: {
              'Authorization': `Bearer ${user?.token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setSoudaNo(data.nextSoudaNo || '');
          }
        } catch (error) {
          console.error('Failed to fetch next Souda No');
        }
      }
      fetchSoudas();
    } catch {
      toast.error('Error saving Souda');
    } finally {
      setLoading(false);
    }
  };

  const fetchSoudas = async () => {
    setLoading(true);
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await fetch(`http://localhost:3001/api/souda${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      const response = await res.json();
      setSoudas(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch Souda data');
    } finally {
      setLoading(false);
    }
  };

  const fetchFarmers = async () => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await fetch(`http://localhost:3001/api/mandi-ledger/farmers${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch farmers');
      const data = await res.json();
      setFarmers(data);
    } catch (error) {
      toast.error('Failed to fetch farmers list');
    }
  };

 const fetchCustomers = async () => {
  try {
    if (!user?.token) return;

    const res = await fetch(
      'http://localhost:3001/api/mandi-ledger/sodacustomer',
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!res.ok) throw new Error('Failed to fetch customers');

    const data = await res.json();
    setCustomers(data);

  } catch (error) {
    toast.error('Failed to fetch customers list');
  }
};


  useEffect(() => {
    if (user?.token) {
      fetchSoudas();
      fetchFarmers();
      fetchCustomers();
      fetchPanItems();
      fetchCompanySettings();
    }
  }, [user]);

  const handleAdd = async () => {
    setCurrentSouda(null);
    setFarmerID(undefined);
    setSoudaDate(new Date().toISOString().split('T')[0]);
    setItems([]);
    setTempCustomerNo(undefined);
    setTempCustomerName('');
    setTempItemName('');
    setTempQty(0);
    setTempFarmerAmt(0);
    setTempCustomerAmt(0);
    setTempKatala(0);
    setEditingIndex(null);

    // Set default item name if pan items are available
    if (panItems.length > 0) {
      setTempItemName(panItems[0].product_nameeg);
    }

    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await fetch(`http://localhost:3001/api/souda/nextNo${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch next Souda No');
      const data = await res.json();
      setSoudaNo(data.nextSoudaNo || '');
    } catch (error) {
      toast.error('Failed to load Souda No');
      setSoudaNo('');
    }

    setShowModal(true);
  };

  const handleEdit = async (souda: SoudaHeader) => {
    try {
      const params = `?companyid=${user?.companyid || 0}&yearid=${user?.yearid || 0}`;
      const res = await fetch(`http://localhost:3001/api/souda/${souda.SoudaID}${params}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch Souda details');
      const data = await res.json();
      const mappedItems: SoudaLineItem[] = data.items.map((item: any) => ({
        id: item.SoudaItemID,
        CustomerNo: item.CustomerNo,
        customerName: item.CustomerName || '',
        itemName: item.ItemName,
        qty: item.Quantity,
        farmerAmt: item.FarmerAmount,
        customerAmt: item.CustomerAmount,
        katala: item.Katala,
      }));
      setItems(mappedItems);
      setCurrentSouda(souda);
      setSoudaNo(souda.SoudaNo);
      setFarmerID(souda.FarmerNo);
        setSoudaDate(data.SoudaDate); // Use date from the detailed fetch
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
      text: 'This Souda entry will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/souda/${id}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
          },
        });
        if (!res.ok) throw new Error('Delete failed');
        toast.success('Deleted successfully');
        fetchSoudas();
      } catch {
        toast.error('Failed to delete Souda');
      }
    }
  };

  const handleAddItem = () => {
    if (!tempCustomerNo || !tempCustomerName || !tempItemName || tempQty <= 0 || tempFarmerAmt < 0 || tempCustomerAmt < 0 || tempKatala < 0) {
      toast.error('Please fill all required fields with valid values (Qty > 0, Amounts >= 0)');
      return;
    }
    const newItem: SoudaLineItem = {
      CustomerNo: tempCustomerNo,
      customerName: tempCustomerName,
      itemName: tempItemName,
      qty: tempQty,
      farmerAmt: tempFarmerAmt,
      customerAmt: tempCustomerAmt,
      katala: tempKatala,
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
    setTempCustomerNo(undefined);
    setTempCustomerName('');
    setTempItemName('');
    setTempQty(0);
    setTempFarmerAmt(0);
    setTempCustomerAmt(0);
    setTempKatala(0);
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
    setTempCustomerNo(item.CustomerNo);
    setTempCustomerName(item.customerName);
    setTempItemName(item.itemName);
    setTempQty(item.qty);
    setTempFarmerAmt(item.farmerAmt);
    setTempCustomerAmt(item.customerAmt);
    setTempKatala(item.katala);
    setEditingIndex(index);
  };

  const cancelEditItem = () => {
    setTempCustomerNo(undefined);
    setTempCustomerName('');
    setTempItemName('');
    setTempQty(0);
    setTempFarmerAmt(0);
    setTempCustomerAmt(0);
    setTempKatala(0);
    setEditingIndex(null);
  };

  const filteredSoudas = soudas.filter(souda => {
    const matchesSearch = searchText === '' ||
      souda.SoudaNo.toLowerCase().includes(searchText.toLowerCase()) ||
      souda.FarmerName.toLowerCase().includes(searchText.toLowerCase());
    const matchesFromDate = fromDate === '' || souda.SoudaDate >= fromDate;
    const matchesToDate = toDate === '' || souda.SoudaDate <= toDate;
    return matchesSearch && matchesFromDate && matchesToDate;
  });

  const totalItems = filteredSoudas.reduce((sum, souda) => sum + souda.TotalItems, 0);
  const totalFarmerAmt = filteredSoudas.reduce((sum, souda) => sum + souda.TotalFarmerAmt, 0);
  const totalCustomerAmt = filteredSoudas.reduce((sum, souda) => sum + souda.TotalCustomerAmt, 0);
  const totalKatala = filteredSoudas.reduce((sum, souda) => sum + souda.TotalKatala, 0);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Souda Master List', 14, 10);
    const tableColumn = ['ID', 'Date', 'Souda No', 'Farmer Name', 'Customer Name', 'Total Items', 'Total Farmer Amount', 'Total Customer Amount', 'Total Katala'];
    const tableRows: (string | number)[][] = filteredSoudas.map((souda: SoudaHeader) => [
      souda.SoudaID ?? 0,
      souda.SoudaDate,
      souda.SoudaNo,
      souda.FarmerName,
      souda.customerName,
      souda.TotalItems,
      Number(souda.TotalFarmerAmt).toFixed(2),
      Number(souda.TotalCustomerAmt).toFixed(2),
      Number(souda.TotalKatala).toFixed(2)
    ]);
    tableRows.push(['', '', '', 'Totals:', totalItems, Number(totalFarmerAmt).toFixed(2), Number(totalCustomerAmt).toFixed(2), Number(totalKatala).toFixed(2)]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save('SoudaMaster.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSoudas.map((souda: SoudaHeader) => ({
      ID: souda.SoudaID,
      Date: souda.SoudaDate,
      'Souda No': souda.SoudaNo,
      'Farmer Name': souda.FarmerName,
      'customer Name': souda.customerName,
      'Total Items': souda.TotalItems,
      'Total Farmer Amount': souda.TotalFarmerAmt,
      'Total Customer Amount': souda.TotalCustomerAmt,
      'Total Katala': souda.TotalKatala
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SoudaMaster');
    XLSX.writeFile(workbook, 'SoudaMaster.xlsx');
  };

  return (
    <>
      <Card className="m-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>{t('souda.page_title')}</h4>
          <div>
            <Button variant="outline-danger" className="me-2" onClick={handleExportPDF}>
              <FileEarmarkPdf className="me-1" /> {t('souda.pdf_button')}
            </Button>
            <Button variant="outline-success" className="me-2" onClick={handleExportExcel}>
              <FileEarmarkExcel className="me-1" /> {t('souda.excel_button')}
            </Button>
            <Button variant="success" onClick={handleAdd}>
              <Plus className="me-1" /> {t('souda.add_button')}
            </Button>
          </div>
        </div>
        <div className="row mb-3 g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder={t('souda.search_placeholder')}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder={t('souda.from_date_label')}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              placeholder={t('souda.to_date_label')}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          <div style={{ maxHeight: '900px', overflowY: 'auto', overflowX: 'auto' }}>
            <Table striped bordered hover responsive style={{ tableLayout: 'fixed' }}>
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>{t('souda.table_id')}</th>
                  <th style={{ width: '90px' }}>{t('souda.table_date')}</th>
                  <th style={{ width: '80px' }}>{t('souda.table_souda_no')}</th>
                  <th style={{ width: '170px' }}>{t('souda.table_farmer_name')}</th>
                  <th style={{ width: '190px' }}>{t('souda.table_customer_name')}</th>
                  <th style={{ width: '80px' }}>{t('souda.table_tot_items')}</th>
                  <th style={{ width: '100px' }}>{t('souda.table_farmer_amt')}</th>
                  <th style={{ width: '100px' }}>{t('souda.table_customer_amt')}</th>
                  <th style={{ width: '70px' }}>{t('souda.table_katala')}</th>
                  <th style={{ width: '120px' }}>{t('souda.table_actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSoudas.length === 0 ? (
                  <tr><td colSpan={9} className="text-center">No records found</td></tr>
                ) : (
                  <>
                    {filteredSoudas.map(souda => (
                      <tr key={souda.SoudaID}>
                        <td>{souda.SoudaID}</td>
                        <td>{souda.SoudaDate}</td>
                        <td>{souda.SoudaNo}</td>
                        <td>{souda.FarmerName}</td>
                        <td style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                          {souda.customerName ? souda.customerName.split(',').join('\n') : ''}
                        </td>
                        <td>{souda.TotalItems}</td>
                        <td>{souda.TotalFarmerAmt}</td>
                        <td>{souda.TotalCustomerAmt}</td>
                        <td>{souda.TotalKatala}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(souda)}>{t('souda.edit_button')}</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(souda.SoudaID)}>
                            <Trash size={12} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                      <td colSpan={5} style={{ textAlign: 'right' }}>Totals:</td>
                      <td>{totalItems}</td>
                      <td>{totalFarmerAmt.toFixed(2)}</td>
                      <td>{totalCustomerAmt.toFixed(2)}</td>
                      <td>{totalKatala.toFixed(2)}</td>
                      <td></td>
                      
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      <CustomModal
        showModal={showModal}
        loading={loading}
        currentSouda={currentSouda}
        soudaNo={soudaNo}
        farmerID={farmerID}
        soudaDate={soudaDate}
        items={items}
        tempCustomerNo={tempCustomerNo}
        tempCustomerName={tempCustomerName}
        tempItemName={tempItemName}
        tempQty={tempQty}
        tempFarmerAmt={tempFarmerAmt}
        tempCustomerAmt={tempCustomerAmt}
        tempKatala={tempKatala}
        farmers={farmers}
        customers={customers}
        panItems={panItems}
        setShowModal={setShowModal}
        setSoudaNo={setSoudaNo}
        setFarmerID={setFarmerID}
        setSoudaDate={setSoudaDate}
        setTempCustomerNo={setTempCustomerNo}
        setTempCustomerName={setTempCustomerName}
        setTempItemName={setTempItemName}
        setTempQty={setTempQty}
        setTempFarmerAmt={setTempFarmerAmt}
        setTempCustomerAmt={setTempCustomerAmt}
        setTempKatala={setTempKatala}
        setPanItems={setPanItems}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleSubmit={handleSoudaSubmit}
        calculateTotals={calculateTotals}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        handleEditItem={handleEditItem}
        cancelEditItem={cancelEditItem}
        item_readonly={companySettings.item_readonly}
        katala_readonly={companySettings.katala_readonly}
        user={user}
      />
    </>
  );
};

export default SoudaMaster;