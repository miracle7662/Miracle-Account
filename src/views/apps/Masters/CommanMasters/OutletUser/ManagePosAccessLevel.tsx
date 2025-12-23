import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUsers, FaLock } from 'react-icons/fa';

// ToggleSwitch component with consistent column classes (3 toggles per row)
const ToggleSwitch = ({ label, icon = false, defaultChecked = true }: { label: string; icon?: boolean; defaultChecked?: boolean }) => (
  <div className="col-12 col-sm-4 mb-3 d-flex align-items-center">
    <label className="form-check form-switch m-0">
      <input className="form-check-input" type="checkbox" defaultChecked={defaultChecked} />
      <span className="ms-2 d-flex align-items-center">
        {label}
        {icon && <span className="ms-1 text-success"><FaUsers size={14} /><FaLock size={12} /></span>}
      </span>
    </label>
  </div>
);

interface DashboardVisibilityProps {
  onBack: () => void;
}
const handleUpdate = () => {
  // Your update logic here
  console.log("Update clicked");
};

// DashboardVisibility component
const DashboardVisibility: React.FC<DashboardVisibilityProps> = ({ onBack }) => {
  // Data for Item Categories dropdown
  const itemCategories = [
    'beverages',
    'beverages.Cold Beverages',
    'Cold Beverages.Non A/c Room',
    'Room Details',
  
  ];

  // Data for Table Departments dropdown
  const tableDepartments = ['Rooms', 'Restaurant', 'Family', 'Dine In'];

  return (
    <div className="container mt-4">
      {/* Dashboard Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Dashboard</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Todays Sale" />
          <ToggleSwitch label="Total Sale" icon />
        </div>
        <div className="row">
          <ToggleSwitch label="Item Pie Chart" />
          <ToggleSwitch label="Bar Sales Chart" />
          <ToggleSwitch label="This Month Sale" />
        </div>
        <div className="row">
          <ToggleSwitch label="Line Sales Chart" />
          <ToggleSwitch label="All Sales Analysis " />
          <ToggleSwitch label="Payment Modes Chart" />
        </div>
        <div className="row">
          <ToggleSwitch label="Sales Analysis By Days" />
          <ToggleSwitch label="IP Address" />
        </div>
      </div>

      {/* Operation Management */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Operation Management</h5>
        <div className="d-flex align-items-center mb-4">
          <label className="form-check form-switch m-0">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <span className="ms-2">Is Visible</span>
          </label>
        </div>

        {/* Items Management */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Items Management</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" />
            <ToggleSwitch label="Category Enabled / Disabled" icon />
            <ToggleSwitch label="Item Enabled / Disabled" icon />
          </div>
          <div className="row">
            <ToggleSwitch label="Add Item" icon />
            <ToggleSwitch label="Edit Item" icon />
            <ToggleSwitch label="Load Menu From Backoffice" icon />
          </div>
        </div>

        {/* Account */}
        <div className="border rounded p-3">
          <h6 className="mb-3">Account</h6>
          <div className="row mb-4">
            <ToggleSwitch label="Is Visible" />
            <ToggleSwitch label="Close Day" />
            <ToggleSwitch label="Close Shift" />
          </div>

          {/* Close Day Window */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Close Day Window</h6>
            <div className="row">
              <ToggleSwitch label="Show Payment Transaction Summary in the Close Day Window" defaultChecked={false} />
              <ToggleSwitch label="Hide Transaction Count in the Payment Transaction Summary" defaultChecked={false} />
              <ToggleSwitch label="Hide Settled Amount in the Payment Transaction Summary" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Hide Variance Amount in the Payment Transaction Summary" defaultChecked={false} />
            </div>
          </div>

          {/* Close Shift Window */}
          <div className="border rounded p-3">
            <h6 className="mb-3">Close Shift Window</h6>
            <div className="row">
              <ToggleSwitch label="Hide Transaction Count in the Payment Transaction Summary" defaultChecked={false} />
              <ToggleSwitch label="Hide Settled Amount in the Payment Transaction Summary" defaultChecked={false} />
              <ToggleSwitch label="Hide Variance Amount in the Payment Transaction Summary" defaultChecked={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Master Management */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Master Management</h5>
        <div className="row mb-4">
          <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
          <ToggleSwitch label="User Management" defaultChecked={true} />
          <ToggleSwitch label="IP Address" defaultChecked={false} />
        </div>

        <div className="row">
          {/* Account Old */}
          <div className="col-12 col-md-4 border rounded p-3 mb-4">
            <h6 className="mb-3">Account Old</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" defaultChecked={true} />
              <ToggleSwitch label="Close Day" defaultChecked={false} />
              <ToggleSwitch label="Close Shift" defaultChecked={false} />
            </div>
          </div>

          {/* Add Expense */}
          <div className="col-12 col-md-4 border rounded p-3 mb-4">
            <h6 className="mb-3">Add Expense</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Add Category" defaultChecked={false} />
              <ToggleSwitch label="Sub Category" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Add Expense" defaultChecked={true} />
            </div>
          </div>

          {/* Customer Management */}
          <div className="col-12 col-md-4 border rounded p-3 mb-4">
            <h6 className="mb-3">Customer Management</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Add" defaultChecked={false} />
              <ToggleSwitch label="Edit" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Export" defaultChecked={false} />
              <ToggleSwitch label="Import" defaultChecked={false} />
            </div>
          </div>
        </div>

        {/* Wallet Management - Full Width */}
        <div className="col-12 border rounded p-3">
          <h6 className="mb-3">Wallet Management</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Add Credit" defaultChecked={false} />
            <ToggleSwitch label="Create Wallet" defaultChecked={true} />
          </div>
          <div className="row">
            <ToggleSwitch label="View Transactions" defaultChecked={false} />
          </div>
        </div>
      </div>

      {/* Order Window */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Order Window</h5>

        {/* Dropdown Menus */}
        <div className="row mb-4">
          {/* Item Categories Dropdown */}
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="itemCategories" className="form-label">Item Categories</label>
            <select id="itemCategories" className="form-select">
              <option>Select Item Categories</option>
              {itemCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Table Departments Dropdown */}
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="tableDepartments" className="form-label">Table Departments</label>
            <select id="tableDepartments" className="form-select">
              <option>Select Table Department</option>
              {tableDepartments.map((department, index) => (
                <option key={index} value={department}>{department}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Existing Toggle Switches */}
        <div className="row">
          <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
          <ToggleSwitch label="Add Customer" defaultChecked={false} />
          <ToggleSwitch label="Change Table" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Waiter Notification" defaultChecked={false} />
          <ToggleSwitch label="Filter Table" defaultChecked={false} />
          <ToggleSwitch label="Load Menu" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Modify Bill After Save" defaultChecked={false} />
          <ToggleSwitch label="Table Reservation" defaultChecked={false} />
          <ToggleSwitch label="Refresh Button" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Payment List" defaultChecked={false} />
          <ToggleSwitch label="Live Order Tracking" defaultChecked={false} />
          <ToggleSwitch label="Live Support" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Search Table" defaultChecked={false} />
          <ToggleSwitch label="Search By Code" defaultChecked={false} />
          <ToggleSwitch label="Search By Name" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Delete Search" defaultChecked={false} />
          <ToggleSwitch label="Sync Button" defaultChecked={false} />
          <ToggleSwitch label="Enable Print & Settle Bills" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Enable Save & Settle Bills" defaultChecked={false} />
          <ToggleSwitch label="Cash Drawer" defaultChecked={false} />
          <ToggleSwitch label="Payment Notification" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Change Order Type" defaultChecked={false} />
          <ToggleSwitch label="Update Stock" defaultChecked={false} />
        </div>

        {/* Dine In */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Dine In</h6>
          {/* Billing */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Billing</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Add Charges" defaultChecked={false} />
              <ToggleSwitch label="Add Coupon" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Add Discount" defaultChecked={false} />
              <ToggleSwitch label="Add Payment" defaultChecked={false} />
              <ToggleSwitch label="Allow Draft Bill Printing" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Modify Bill Status" defaultChecked={false} />
              <ToggleSwitch label="Settle Bill" defaultChecked={false} />
              <ToggleSwitch label="Preview" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Save & Print Bill" defaultChecked={false} />
              <ToggleSwitch label="Save Bill" defaultChecked={false} />
              <ToggleSwitch label="Send Bill" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Allowed Due Payment" defaultChecked={false} />
              <ToggleSwitch label="Restrict Reprint Bill" defaultChecked={false} />
            </div>
          </div>

          {/* Old KOT */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Old KOT</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Cancel KOT" defaultChecked={false} />
              <ToggleSwitch label="Delete KOT" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Print Cancel KOT" defaultChecked={false} />
              <ToggleSwitch label="Print KOT" defaultChecked={false} />
              <ToggleSwitch label="Transfer Item" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
              <ToggleSwitch label="Check KOT Print" defaultChecked={false} />
            </div>
          </div>

          {/* Split Bill */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Split Bill</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Item Wise" defaultChecked={false} />
              <ToggleSwitch label="Percentage Wise" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Portion Wise" defaultChecked={false} />
            </div>
          </div>

          {/* KOT */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">KOT</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
              <ToggleSwitch label="Save" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Save And Print" defaultChecked={false} />
              <ToggleSwitch label="Show On Bill" defaultChecked={false} />
              <ToggleSwitch label="View Customer History" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Print KOT and Bill" defaultChecked={false} />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Delivery</h6>
          <div className="row">
            <ToggleSwitch label="New Order" defaultChecked={false} />
            <ToggleSwitch label="Select Delivery Boy" defaultChecked={false} />
          </div>

          {/* Billing */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Billing</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Add Charges" defaultChecked={false} />
              <ToggleSwitch label="Add Coupon" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Add Discount" defaultChecked={false} />
              <ToggleSwitch label="Add Payment" defaultChecked={false} />
              <ToggleSwitch label="Allow Draft Bill Printing" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Modify Bill Status" defaultChecked={false} />
              <ToggleSwitch label="Settle Bill" defaultChecked={false} />
              <ToggleSwitch label="Preview" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Save And Print Bill" defaultChecked={false} />
              <ToggleSwitch label="Save Bill" defaultChecked={false} />
              <ToggleSwitch label="Send Bill" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Allowed Due Payment" defaultChecked={false} />
              <ToggleSwitch label="Order Note" defaultChecked={false} />
            </div>
          </div>

          {/* Old KOT */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Old KOT</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Cancel KOT" defaultChecked={false} />
              <ToggleSwitch label="Delete KOT" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Print Cancel KOT" defaultChecked={false} />
              <ToggleSwitch label="Print KOT" defaultChecked={false} />
              <ToggleSwitch label="Transfer Item" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
              <ToggleSwitch label="Check KOT Print" defaultChecked={false} />
            </div>
          </div>

          {/* Split Bill */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Split Bill</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Item Wise" defaultChecked={false} />
              <ToggleSwitch label="Percentage Wise" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Portion Wise" defaultChecked={false} />
            </div>
          </div>

          {/* KOT */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">KOT</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
              <ToggleSwitch label="Save" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Save And Print" defaultChecked={false} />
              <ToggleSwitch label="Show On Bill" defaultChecked={false} />
              <ToggleSwitch label="View Customer History" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Print KOT and Bill" defaultChecked={false} />
            </div>
          </div>
        </div>

        {/* Pickup */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Pickup</h6>
          <div className="row">
            <ToggleSwitch label="New Order" defaultChecked={false} />
          </div>

          {/* Billing */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Billing</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Add Charges" defaultChecked={false} />
              <ToggleSwitch label="Add Coupon" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Add Discount" defaultChecked={false} />
              <ToggleSwitch label="Add Payment" defaultChecked={false} />
              <ToggleSwitch label="Allow Draft Bill Printing" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Modify Bill Status" defaultChecked={false} />
              <ToggleSwitch label="Settle Bill" defaultChecked={false} />
              <ToggleSwitch label="Preview" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Save And Print Bill" defaultChecked={false} />
              <ToggleSwitch label="Save Bill" defaultChecked={false} />
              <ToggleSwitch label="Send Bill" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Allowed Due Payment" defaultChecked={false} />
              <ToggleSwitch label="Order Note" defaultChecked={false} />
            </div>
          </div>

          {/* Old KOT */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Old KOT</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Cancel KOT" defaultChecked={false} />
              <ToggleSwitch label="Delete KOT" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Print Cancel KOT" defaultChecked={false} />
              <ToggleSwitch label="Print KOT" defaultChecked={false} />
              <ToggleSwitch label="Transfer Item" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
              <ToggleSwitch label="Check KOT Print" defaultChecked={false} />
            </div>
          </div>

          {/* Split Bill */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">Split Bill</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Item Wise" defaultChecked={false} />
              <ToggleSwitch label="Percentage Wise" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Portion Wise" defaultChecked={false} />
            </div>
          </div>

          {/* KOT */}
          <div className="border rounded p-3 mb-4">
            <h6 className="mb-3">KOT</h6>
            <div className="row">
              <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
              <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
              <ToggleSwitch label="Save" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Save And Print" defaultChecked={false} />
              <ToggleSwitch label="Show On Bill" defaultChecked={false} />
              <ToggleSwitch label="View Customer History" defaultChecked={false} />
            </div>
            <div className="row">
              <ToggleSwitch label="Print KOT and Bill" defaultChecked={false} />
            </div>
          </div>
        </div>

        {/* Quick Bill */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Quick Bill</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="KOT" defaultChecked={false} />
            <ToggleSwitch label="Add Charge" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Add Coupon" defaultChecked={false} />
            <ToggleSwitch label="Add Discount" defaultChecked={false} />
            <ToggleSwitch label="Add Payment" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Bill No" defaultChecked={false} />
            <ToggleSwitch label="Customer History" defaultChecked={false} />
            <ToggleSwitch label="Settle Bill" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Show On Bill" defaultChecked={false} />
            <ToggleSwitch label="Show Preview" defaultChecked={false} />
            <ToggleSwitch label="Allowed Due Payment" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Item As Complementary" defaultChecked={false} />
            <ToggleSwitch label="Send Bill" defaultChecked={false} />
          </div>
        </div>

        {/* Order Settlement Window */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Order Settlement Window</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Update" defaultChecked={false} />
            <ToggleSwitch label="Settle" defaultChecked={false} />
          </div>
        </div>

        {/* Action */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Action</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Update" defaultChecked={false} />
            <ToggleSwitch label="Settle" defaultChecked={false} />
          </div>
        </div>

        {/* Settings */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Settings</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Formatting" defaultChecked={false} />
            <ToggleSwitch label="General" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Printers" defaultChecked={false} />
            <ToggleSwitch label="Profile" defaultChecked={false} />
            <ToggleSwitch label="Shortcuts" defaultChecked={false} />
          </div>
        </div>

        {/* Receipts */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Receipts</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Preview" defaultChecked={false} />
            <ToggleSwitch label="Todays Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Re-Sync Bills" defaultChecked={false} />
            <ToggleSwitch label="Reprint Bill" defaultChecked={false} />
            <ToggleSwitch label="All Bills" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Todays Bills" defaultChecked={false} />
            <ToggleSwitch label="Date Filter" defaultChecked={false} />
            <ToggleSwitch label="Deleted Status" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Free Status" defaultChecked={false} />
            <ToggleSwitch label="Edit Bill After Save" defaultChecked={false} />
            <ToggleSwitch label="Tip Amount" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Show Bill Amount" defaultChecked={false} />
            <ToggleSwitch label="Net Sale Amount" defaultChecked={false} />
            <ToggleSwitch label="Total Fulfilled Amount" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="All Bills Amount" defaultChecked={false} />
            <ToggleSwitch label="Selected Bills" defaultChecked={false} />
          </div>
        </div>

        {/* Edit Bill */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Edit Bill</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Bill Status" defaultChecked={false} />
            <ToggleSwitch label="Payment Mode" defaultChecked={false} />
          </div>
        </div>

        {/* Reports */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Reports</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Category Wise Report" defaultChecked={false} />
            <ToggleSwitch label="Coupon History" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Kitchen Dept Wise Report" defaultChecked={false} />
            <ToggleSwitch label="Order Type Report" defaultChecked={false} />
            <ToggleSwitch label="Payment Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Sales Report" defaultChecked={false} />
            <ToggleSwitch label="Todays Report" defaultChecked={false} />
            <ToggleSwitch label="User Shift Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Misc Report" defaultChecked={false} />
            <ToggleSwitch label="Pre Order Report" defaultChecked={false} />
            <ToggleSwitch label="Tax Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Mall Report" defaultChecked={false} />
            <ToggleSwitch label="Start Close Day Report" defaultChecked={false} />
            <ToggleSwitch label="KOT Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Reservation Report" defaultChecked={false} />
            <ToggleSwitch label="Delivery Boy Report" defaultChecked={false} />
            <ToggleSwitch label="User Report" defaultChecked={false} />
          </div>
        </div>

        {/* Item Report */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Item Report</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Addon Items Report" defaultChecked={false} />
            <ToggleSwitch label="Cancelled Items Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Dead Items Report" defaultChecked={false} />
            <ToggleSwitch label="Deleted Items Report" defaultChecked={false} />
            <ToggleSwitch label="Sold Items Report" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Top Item Report" defaultChecked={false} />
            <ToggleSwitch label="Complementary Items Report" defaultChecked={false} />
          </div>
        </div>

        {/* Due Payment Report */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Due Payment Report</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Due Orders" defaultChecked={false} />
            <ToggleSwitch label="Order History Report" defaultChecked={false} />
          </div>
        </div>

        {/* Switch Outlet */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Switch Outlet</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
          </div>
        </div>

        {/* Custom Links */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Custom Links</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
          </div>
        </div>

        {/* Digital Order */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Digital Order</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Print Bill" defaultChecked={false} />
            <ToggleSwitch label="KOT Print" defaultChecked={false} />
          </div>
        </div>

        {/* Store Settings */}
        <div className="border rounded p-3 mb-4">
          <h6 className="mb-3">Store Settings</h6>
          <div className="row">
            <ToggleSwitch label="Is Visible" icon defaultChecked={true} />
            <ToggleSwitch label="Store" defaultChecked={false} />
            <ToggleSwitch label="Category" defaultChecked={false} />
          </div>
          <div className="row">
            <ToggleSwitch label="Items" defaultChecked={false} />
            <ToggleSwitch label="Options" defaultChecked={false} />
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
  );
};

export default DashboardVisibility;