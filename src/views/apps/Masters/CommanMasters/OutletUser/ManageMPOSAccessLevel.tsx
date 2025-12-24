import React, { useState } from 'react';

interface SettingsFormProps {
  onBack: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onBack }) => {
  const [loadMenu, setLoadMenu] = useState(true);
  const [paytmPOS, setPaytmPOS] = useState(false);
  const [addCustomer, setAddCustomer] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [preview, setPreview] = useState(true);
  const [paymentMode, setPaymentMode] = useState(true);
  const [additionalCharges, setAdditionalCharges] = useState(true);
  const [discount, setDiscount] = useState(true);
  const [print, setPrint] = useState(true);
  const [couponCode, setCouponCode] = useState(true);
  const [splitBill, setSplitBill] = useState(true);
  const [duePayment, setDuePayment] = useState(true);
  const [allowDraftBill, setAllowDraftBill] = useState(true);
  const [printKOT, setPrintKOT] = useState(true);
  const [cancelKOT, setCancelKOT] = useState(true);
  const [reportsVisible, setReportsVisible] = useState(true);
  const [expenseTracking, setExpenseTracking] = useState(true);
  const [walletManagement, setWalletManagement] = useState(true);
  const [digitalOrder, setDigitalOrder] = useState(true);
  const [onlineOrdersVisible, setOnlineOrdersVisible] = useState(true);
  const [onlinePrintKOT, setOnlinePrintKOT] = useState(true);
  const [onlinePrintBill, setOnlinePrintBill] = useState(true);
  const [support, setSupport] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const itemCategories = [
    "Beverages",
    "Cold Beverages",
    "Snacks",
    "Main Course",
    "Desserts",
    "Combo"
  ];

  const tableDepartments = [
    "Rooms",
    "Restaurant",
    "FamilyDine In"
  ];

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const selected = Array.from(event.target.selectedOptions, option => option.value);
    setter(selected);
  };

  const handleUpdate = () => {
    // Add update logic here if needed
    console.log('Update settings');
  };

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="container mt-4 m-0">
        {/* Settings Section */}
        <div className="border rounded p-3 mb-0 bg-white shadow-sm">
          <h5 className="mb-3">Update App Access Levels</h5>
          <h5 className="mb-3">Settings</h5>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center gap-2 mb-2">
              <label className="form-label mb-0">Load Menu</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={loadMenu}
                  onChange={() => setLoadMenu(!loadMenu)}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center gap-2 mb-2">
              <label className="form-label mb-0">Paytm EDC POS</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={paytmPOS}
                  onChange={() => setPaytmPOS(!paytmPOS)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Bill Section */}
        <div className="border rounded p-3 bg-white shadow-sm">
          <h5 className="mb-3">Quick Bill</h5>
          <div className="row">
            <div className="col-md-6 d-flex align-items-center gap-2 mb-2">
              <label className="form-label mb-0">Add Customer</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={addCustomer}
                  onChange={() => setAddCustomer(!addCustomer)}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center gap-2 mb-2">
              <label className="form-label mb-0">Is Visible</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => setIsVisible(!isVisible)}
                />
              </div>
            </div>
          </div>

          {/* Items Input Box */}
          <div className="mt-3 mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Items"
            />
          </div>
          {/* Toggle Options */}
          <div className="row text-center">
            <div className="col-6 col-md-2 mb-3">
              <label className="form-label">Preview</label>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={preview}
                  onChange={() => setPreview(!preview)}
                />
              </div>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <label className="form-label">Payment Mode</label>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={paymentMode}
                  onChange={() => setPaymentMode(!paymentMode)}
                />
              </div>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <label className="form-label">Additional Charges</label>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={additionalCharges}
                  onChange={() => setAdditionalCharges(!additionalCharges)}
                />
              </div>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <label className="form-label">Discount</label>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={discount}
                  onChange={() => setDiscount(!discount)}
                />
              </div>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <label className="form-label">Print</label>
              <div className="form-check form-switch d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={print}
                  onChange={() => setPrint(!print)}
                />
              </div>
            </div>
          </div>

          {/* Dine In Section */}
          <div className="container mt-4">
            <div className="border rounded p-3 bg-white shadow-sm">
              <h5 className="mb-3">Dine In</h5>

              {/* Top row: toggle + selects */}
              <div className="row mb-4 align-items-start">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Is Visible</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isVisible}
                      onChange={() => setIsVisible(!isVisible)}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Item Categories</label>
                  <select
                    className="form-select"
                    multiple
                    value={selectedCategories}
                    onChange={(e) => handleSelectChange(e, setSelectedCategories)}
                    style={{ height: '120px' }}
                  >
                    <option disabled>Select Item Categories</option>
                    {itemCategories.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label">Table Departments</label>
                  <select
                    className="form-select"
                    multiple
                    value={selectedDepartments}
                    onChange={(e) => handleSelectChange(e, setSelectedDepartments)}
                    style={{ height: '120px' }}
                  >
                    <option disabled>Select Table Department</option>
                    {tableDepartments.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tables Section */}
              <div className="border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Tables</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Preview</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preview}
                        onChange={() => setPreview(!preview)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Payment Mode</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={paymentMode}
                        onChange={() => setPaymentMode(!paymentMode)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* KOT Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">KOT</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Add Customer</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={addCustomer}
                        onChange={() => setAddCustomer(!addCustomer)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Add Note</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={paymentMode}
                        onChange={() => setPaymentMode(!paymentMode)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Save</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={paymentMode}
                        onChange={() => setPaymentMode(!paymentMode)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Save & Print</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={paymentMode}
                        onChange={() => setPaymentMode(!paymentMode)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Billing</strong>
                <div className="row text-center">
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Coupon Code</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={couponCode}
                        onChange={() => setCouponCode(!couponCode)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Allow Draft Bill</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={allowDraftBill}
                        onChange={() => setAllowDraftBill(!allowDraftBill)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Bill Status</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Old KOT</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Print KOT</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={printKOT}
                        onChange={() => setPrintKOT(!printKOT)}
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="form-label">Cancel KOT</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={cancelKOT}
                        onChange={() => setCancelKOT(!cancelKOT)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Modes Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Payment Modes</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Split Bill</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={splitBill}
                        onChange={() => setSplitBill(!splitBill)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Add Due Payment</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={duePayment}
                        onChange={() => setDuePayment(!duePayment)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Default Payment</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={paymentMode}
                        onChange={() => setPaymentMode(!paymentMode)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reports Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Reports</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Visible</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Sold Items Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Payment Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Category Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Todays Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Item Wise Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Start Close Day Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Due Payment Report</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={reportsVisible}
                        onChange={() => setReportsVisible(!reportsVisible)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Receipt Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Receipt</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Visible</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Modify Bill Status</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Reduce Inventory</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Sync Bill</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expense Tracking Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Expense Tracking</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Visible</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={expenseTracking}
                        onChange={() => setExpenseTracking(!expenseTracking)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Add Expense</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={expenseTracking}
                        onChange={() => setExpenseTracking(!expenseTracking)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">All Expense</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={expenseTracking}
                        onChange={() => setExpenseTracking(!expenseTracking)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallet Management Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Wallet Management</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Visible</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={walletManagement}
                        onChange={() => setWalletManagement(!walletManagement)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Transactions</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={walletManagement}
                        onChange={() => setWalletManagement(!walletManagement)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Add Credit</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={walletManagement}
                        onChange={() => setWalletManagement(!walletManagement)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Create Wallet</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={walletManagement}
                        onChange={() => setWalletManagement(!walletManagement)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Order Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Digital Order</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Visible</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={digitalOrder}
                        onChange={() => setDigitalOrder(!digitalOrder)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Order Status Change</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={digitalOrder}
                        onChange={() => setDigitalOrder(!digitalOrder)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Reject Order</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={digitalOrder}
                        onChange={() => setDigitalOrder(!digitalOrder)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Pull Orders</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={digitalOrder}
                        onChange={() => setDigitalOrder(!digitalOrder)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Orders Settings Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Online Orders Settings</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Visible</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={onlineOrdersVisible}
                        onChange={() => setOnlineOrdersVisible(!onlineOrdersVisible)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Print KOT</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={onlinePrintKOT}
                        onChange={() => setOnlinePrintKOT(!onlinePrintKOT)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Print Bill</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={onlinePrintBill}
                        onChange={() => setOnlinePrintBill(!onlinePrintBill)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Section */}
              <div className="mt-3 border rounded p-3 bg-white">
                <strong className="mb-2 d-block">Support</strong>
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Is Support</label>
                    <div className="form-check form-switch d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={support}
                        onChange={() => setSupport(!support)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="d-flex justify-content-end mt-3 gap-2">
          <button
            className="btn btn-secondary"
            onClick={onBack}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;