import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
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
const handleUpdate = () => {
  // Your update logic here
  console.log("Update clicked");
};



// UpdateStoreAccess component
const UpdateStoreAccess: React.FC<{onBack: () => void}> = ({onBack}) => {
  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Update Store Login Access Level</h5>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <p><strong>Name:</strong> Hotelshubharambh</p>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <p><strong>Outlet Name:</strong> !!Hotel Shubharambh!!</p>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Dashboard</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Live Order Tracking Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Live Order Tracking</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Table Reservation Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Table Reservation</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Menu Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Menu Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Outlet Menus Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Outlet Menus</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Edit Menu" />
          <ToggleSwitch label="Download Menu" />
        </div>
        <div className="row">
          <ToggleSwitch label="Edit Settings" />
          <ToggleSwitch label="Delete Menu" />
          <ToggleSwitch label="Add Menu" />
        </div>
        <div className="row">
          <ToggleSwitch label="Is POS Default Menu" defaultChecked={false} />
        </div>
      </div>

      {/* Option Group Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Option Group</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Modifier Groups Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Modifier Groups</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Categories Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Categories</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Nutrition Configuration Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Nutrition Configuration</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Master Catalogue Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Master Catalogue</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Multiple Price Settings Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Multiple Price Settings</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Upload Bulk Menu Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Upload Bulk Menu</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Atlantic POS Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Atlantic POS</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Outlet Configuration Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Outlet Configuration</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Brand Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Brand</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Outlet Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Outlet</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Outlet Designation Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Outlet Designation</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Outlet Users Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Outlet Users</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Payment Modes Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Payment Modes</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Master Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Master Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Product Group Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Product Group</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Kitchen Department Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Kitchen Department</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Tax Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Tax</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Outlet Departments Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Outlet Departments</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Table Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Table Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Discounts Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Discounts</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Customized Discount Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Customized Discount</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Additional Charges Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Additional Charges</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Platform Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Platform</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Reports Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Reports</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Sales Order Is Visible" />
          <ToggleSwitch label="Can Edit Order Status" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Can Edit Payment Mode" defaultChecked={false} />
          <ToggleSwitch label="Allow Access Orders can be Delete?" defaultChecked={false} />
          <ToggleSwitch label="Allow Access Send SMS to Customer?" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Is Enabled Deleted / Free Options In Status" defaultChecked={false} />
          <ToggleSwitch label="Print Bill" />
          <ToggleSwitch label="Allow Access for IRN Generation" defaultChecked={false} />
        </div>
      </div>

      {/* DSR Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">DSR Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <div className="col-12 col-sm-4 mb-3 d-flex align-items-center">
            <span>DSR Month Wise Report</span>
          </div>
          <div className="col-12 col-sm-4 mb-3 d-flex align-items-center">
            <span>Bill Wise Liquor Sales Report</span>
          </div>
        </div>
      </div>

      {/* Todays Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Todays Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Item Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Item Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Payment Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Payment Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Expense Tracking Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Expense Tracking</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Order Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Order Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Category Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Category Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Kitchen Dept Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Kitchen Dept Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Coupon Code History Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Coupon Code History Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Due Payment Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Due Payment Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Start Close Day Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Start Close Day Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Shift Wise Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Shift Wise Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Discount Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Discount Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Biller Wise Summary Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Biller Wise Summary</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Delivery Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Delivery Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Day Wise Summary Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Day Wise Summary Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Bill Print Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Bill Print Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Applied Charges Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Applied Charges Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Customer Queries Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Customer Queries</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Order Sync History Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Order Sync History</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Waiter Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Waiter Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Hourly Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Hourly Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Zatka Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Zatka Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Passcode User Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Passcode User Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Logistic Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Logistic Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Order State Transition Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Order State Transition Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* UPI Transaction Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">UPI Transaction Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* BharatPe Transaction Report Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">BharatPe Transaction Report</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Digital Order Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Digital Order</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Orders Is Visible" />
          <ToggleSwitch label="Digital Order Settings Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="IRD Report Is Visible" />
          <ToggleSwitch label="Sale Materialized Report Is Visible" />
        </div>
      </div>

      {/* CRM Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">CRM</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Customers Is Visible" />
          <ToggleSwitch label="Export" defaultChecked={false} />
        </div>
        <div className="row">
          <ToggleSwitch label="Customer History Is Visible" />
          <ToggleSwitch label="Export" defaultChecked={false} />
        </div>
      </div>

      {/* Coupon Code Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Coupon Code Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Coupon Code Generate Is Visible" />
          <ToggleSwitch label="Coupon Code Used History Is Visible" />
        </div>
      </div>

      {/* Wallet Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Wallet Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Customer Wallet Is Visible" />
        </div>
      </div>

      {/* Send SMS Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Send SMS</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Run Campaign Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Run Campaign</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Call Center Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Call Center</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* TMBill Application Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">TMBill Application</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Inventory Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Inventory Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Warehouse Is Visible" />
          <ToggleSwitch label="Raw Material Management Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Raw Material Category Is Visible" />
          <ToggleSwitch label="Raw Material Unit Is Visible" />
          <ToggleSwitch label="Raw Material Group Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Raw Material Tax Is Visible" />
          <ToggleSwitch label="Raw Material Is Visible" />
          <ToggleSwitch label="Manual Stock Entry Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Manual Stock Out Is Visible" />
        </div>
      </div>

      {/* Vendor Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Vendor Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Vendor Details Is Visible" />
          <ToggleSwitch label="Vendor Payments Is Visible" />
        </div>
      </div>

      {/* Purchase Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Purchase Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Bill Type Is Visible" />
          <ToggleSwitch label="Purchase Order Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Allow Access PO can be Delete?" defaultChecked={false} />
          <ToggleSwitch label="Allow Access PO can be Edit?" defaultChecked={false} />
          <ToggleSwitch label="PO Transaction Is Visible" />
        </div>
      </div>

      {/* Recipe Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Recipe Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Add Recipe" />
          <ToggleSwitch label="Copy Recipe" />
        </div>
        <div className="row">
          <ToggleSwitch label="Edit Recipe" />
          <ToggleSwitch label="Edit Quantity" />
          <ToggleSwitch label="Delete Recipe" />
        </div>
        <div className="row">
          <div className="col-12 col-sm-4 mb-3 d-flex align-items-center">
            <span>Nested Recipe</span>
          </div>
        </div>
      </div>

      {/* Furnished Item Configuration Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Furnished Item Configuration</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Add New Furnished Item" />
          <ToggleSwitch label="Update Furnished Item" />
        </div>
        <div className="row">
          <ToggleSwitch label="Delete Furnished Item" />
        </div>
      </div>

      {/* Inventory Reports Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Reports</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Inventory On Hand Is Visible" />
          <ToggleSwitch label="Consumption Stock Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Recipe Wastage Report Is Visible" />
        </div>
      </div>

      {/* Cost Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Cost Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="P & L Report Is Visible" />
          <ToggleSwitch label="Category Wise Report Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Opening Closing Stock Is Visible" />
          <ToggleSwitch label="Stock Transfer Item Report Is Visible" />
        </div>
      </div>

      {/* Stock Transfer Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Stock Transfer Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Requisition Stock Is Visible" />
          <ToggleSwitch label="Edit" />
        </div>
        <div className="row">
          <ToggleSwitch label="Approved" />
          <ToggleSwitch label="Reject" />
          <div className="col-12 col-sm-4 mb-3 d-flex align-items-center">
            <span>Payment Type Summary</span>
          </div>
        </div>
        <div className="row">
          <ToggleSwitch label="Stock Transfer Is Visible" />
          <ToggleSwitch label="Received Stock Is Visible" />
          <ToggleSwitch label="Return Stock Is Visible" />
        </div>
      </div>

      {/* Feedback Management Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Feedback Management</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* ONDC Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">ONDC</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Third Party Integration Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className= "mb-3">Third Party Integration</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* About TMBill Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">About TMBill</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
        </div>
      </div>

      {/* Settings Section */}
      <div className="border rounded p-3 mb-4">
        <h5 className="mb-3">Settings</h5>
        <div className="row">
          <ToggleSwitch label="Is Visible" icon />
          <ToggleSwitch label="Payment Gateway Configuration Is Visible" />
          <ToggleSwitch label="Webhook Configuration Is Visible" />
        </div>
        <div className="row">
          <ToggleSwitch label="Logs Is Visible" />
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

export default UpdateStoreAccess;