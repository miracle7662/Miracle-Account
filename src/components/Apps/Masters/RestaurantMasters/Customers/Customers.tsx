// import { Button, Form, Row, Col, Table } from 'react-bootstrap';
// import { ChangeEvent, MouseEvent } from 'react';

// // Define the Customer interface
// interface Customer {
//   srNo: number;
//   name: string;
//   countryCode: string;
//   mobile: string;
//   mail: string; // Note: Consider renaming to `email` for clarity
//   city: string;
//   address1: string;
//   address2: string;
//   state?: string;
//   pincode?: string;
//   gstNo?: string;
//   fssai?: string;
//   panNo?: string;
//   aadharNo?: string;
//   birthday?: string;
//   anniversary?: string;
//   createWallet?: boolean;
// }

// // Define props interface for the CustomerPage component
// interface CustomerPageProps {
//   customers: Customer[];
//   newCustomer: Customer;
//   setNewCustomer: (customer: Customer) => void;
//   handleAddNewCustomerClick: (event: MouseEvent<HTMLButtonElement>) => void;
//   handleAddCustomerSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
//   showNewCustomerForm: boolean;
// }

// const CustomerPage: React.FC<CustomerPageProps> = ({
//   customers,
//   newCustomer,
//   setNewCustomer,
//   handleAddNewCustomerClick,
//   handleAddCustomerSubmit,
//   showNewCustomerForm,
// }) => {
//   return (
//     <div className="container-fluid" style={{ padding: '20px', minHeight: '100vh' }}>
//       <h5 className="mb-4">Customer Form</h5>
//       <div className="bg-white p-3 p-md-4" style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
//         <div>
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <div>
//               <Button
//                 variant="success"
//                 size="sm"
//                 className="me-2"
//                 onClick={handleAddNewCustomerClick}
//               >
//                 Add new customer
//               </Button>
//               <Button variant="secondary" size="sm">
//                 Refresh
//               </Button>
//             </div>
//           </div>
//           {showNewCustomerForm && (
//             <Form className="mb-4">
//               <Row className="mb-3">
//                 <Col md={3}>
//                   <Form.Group controlId="name">
//                     <Form.Label>Name *</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter name"
//                       value={newCustomer.name}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, name: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="countryCode">
//                     <Form.Label>Country Code</Form.Label>
//                     <Form.Select
//                       value={newCustomer.countryCode}
//                       onChange={(e: ChangeEvent<HTMLSelectElement>) =>
//                         setNewCustomer({ ...newCustomer, countryCode: e.target.value })
//                       }
//                     >
//                       <option value="+91">India +91</option>
//                       <option value="+1">USA +1</option>
//                       <option value="+44">UK +44</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="mobile">
//                     <Form.Label>Mobile *</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter mobile number"
//                       value={newCustomer.mobile}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, mobile: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="email">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       value={newCustomer.mail} // Note: Consider renaming to `email`
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, mail: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mb-3">
//                 <Col md={3}>
//                   <Form.Group controlId="birthday">
//                     <Form.Label>Birthday</Form.Label>
//                     <Form.Control
//                       type="date"
//                       value={newCustomer.birthday || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, birthday: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="city">
//                     <Form.Label>City</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter city"
//                       value={newCustomer.city}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, city: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="state">
//                     <Form.Label>State</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter state"
//                       value={newCustomer.state || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, state: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="pincode">
//                     <Form.Label>Pincode</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter pincode"
//                       value={newCustomer.pincode || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, pincode: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mb-3">
//                 <Col md={3}>
//                   <Form.Group controlId="gstNo">
//                     <Form.Label>GST No.</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter GST number"
//                       value={newCustomer.gstNo || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, gstNo: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="fssai">
//                     <Form.Label>FSSAI</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter FSSAI"
//                       value={newCustomer.fssai || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, fssai: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="panNo">
//                     <Form.Label>PAN No.</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter PAN number"
//                       value={newCustomer.panNo || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, panNo: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="aadharNo">
//                     <Form.Label>Aadhar No.</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Aadhar number"
//                       value={newCustomer.aadharNo || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, aadharNo: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mb-3">
//                 <Col md={3}>
//                   <Form.Group controlId="anniversary">
//                     <Form.Label>Anniversary</Form.Label>
//                     <Form.Control
//                       type="date"
//                       value={newCustomer.anniversary || ''}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, anniversary: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                   <Form.Group controlId="createWallet">
//                     <Form.Label>Create Wallet</Form.Label>
//                     <Form.Check
//                       type="checkbox"
//                       label="Create wallet"
//                       checked={newCustomer.createWallet || false}
//                       onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                         setNewCustomer({ ...newCustomer, createWallet: e.target.checked })
//                       }
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Button variant="success" onClick={handleAddCustomerSubmit}>
//                 Add
//               </Button>
//             </Form>
//           )}
//           <div className="d-flex justify-content-end mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Search..."
//               style={{ width: '200px' }}
//             />
//           </div>
//           <Table bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Sr No</th>
//                 <th>Name</th>
//                 <th>Country Code</th>
//                 <th>Mobile</th>
//                 <th>Mail</th>
//                 <th>City</th>
//                 <th>Address 1</th>
//                 <th>Address 2</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.map((customer: Customer) => (
//                 <tr key={customer.srNo}>
//                   <td>{customer.srNo}</td>
//                   <td>{customer.name}</td>
//                   <td>{customer.countryCode}</td>
//                   <td>{customer.mobile}</td>
//                   <td>{customer.mail}</td>
//                   <td>{customer.city}</td>
//                   <td>{customer.address1}</td>
//                   <td>{customer.address2}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <div className="d-flex justify-content-between align-items-center">
//             <Button variant="outline-secondary" size="sm">
//               Previous
//             </Button>
//             <div>
//               {[1, 2, 3, 4, 5].map((page) => (
//                 <Button
//                   key={page}
//                   variant={page === 1 ? 'primary' : 'outline-secondary'}
//                   size="sm"
//                   className="mx-1"
//                 >
//                   {page}
//                 </Button>
//               ))}
//               <span>...</span>
//               <Button variant="outline-secondary" size="sm" className="mx-1">
//                 65
//               </Button>
//             </div>
//             <Button variant="outline-secondary" size="sm">
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Preloader } from '@/components/Misc/Preloader';
import { Button, Card, Stack, Table } from 'react-bootstrap';
import TitleHelmet from '@/components/Common/TitleHelmet';
import { useAuthContext } from '@/common';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

// Define the Customer interface
interface Customer {
  srNo: number;
  name: string;
  countryCode: string;
  mobile: string;
  mail: string;
  city: string;
  address1: string;
  address2?: string;
  state?: string;
  pincode?: string;
  gstNo?: string;
  fssai?: string;
  panNo?: string;
  aadharNo?: string;
  birthday?: string;
  anniversary?: string;
  createWallet?: boolean;
  created_by_id?: number;
  created_date?: string;
  updated_by_id?: number;
  updated_date?: string;
}

// Debounce utility function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// AddCustomerModal Props
interface AddCustomerModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

// EditCustomerModal Props
interface EditCustomerModalProps {
  show: boolean;
  onHide: () => void;
  mstcustomer: Customer | null;
  onSuccess: () => void;
  onUpdateSelectedCustomer: (mstcustomer: Customer) => void;
}

// Main CustomerPage Component
const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { user } = useAuthContext();

  // Fetch customer data
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/customers', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
        setFilteredCustomers(data);
      } else {
        toast.error('Failed to fetch customer data');
      }
    } catch (err) {
      toast.error('Failed to fetch customer data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [user]);

  // Define table columns
  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        id: 'checkbox',
        header: '',
        size: 50,
        cell: () => (
          <input
            type="checkbox"
            style={{
              width: '20px',
              height: '20px',
              border: '2px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />
        ),
      },
      {
        accessorKey: 'srNo',
        header: 'Sr No',
        size: 50,
        cell: (info) => <span>{info.getValue<number>()}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'mobile',
        header: 'Mobile',
        size: 150,
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'mail',
        header: 'Email',
        size: 200,
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        accessorKey: 'address1',
        header: 'Address 1',
        size: 200,
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        id: 'actions',
        header: 'Action',
        size: 100,
        cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="btn btn-sm btn-success"
              style={{ padding: '4px 8px' }}
              onClick={() => handleEditClick(row.original)}
            >
              <i className="fi fi-rr-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteCustomer(row.original)}
              style={{ padding: '4px 8px' }}
            >
              <i className="fi fi-rr-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Initialize react-table
  const table = useReactTable({
    data: filteredCustomers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Handle search
  const handleSearch = useCallback(
    debounce((value: string) => {
      const filtered = customers.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }, 300),
    [customers]
  );

  // Handle edit button click
  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowEditCustomerModal(true);
  };

  // Handle delete operation
  const handleDeleteCustomer = async (customer: Customer) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    });
    if (res.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/customer/${customer.srNo}`,
          {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.ok) {
          toast.success('Customer deleted successfully');
          fetchCustomers();
          setSelectedCustomer(null);
        } else {
          toast.error('Failed to delete customer');
        }
      } catch {
        toast.error('Failed to delete customer');
      }
    }
  };

  return (
    <>
      <TitleHelmet title="Customer Management" />
      <Card className="m-1">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h4 className="mb-0">Customer Management</h4>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button variant="success" className="me-1" onClick={() => setShowAddCustomerModal(true)}>
              <i className="bi bi-plus"></i> Add New
            </Button>
            <Button variant="primary" className="me-1">
              <i className="bi bi-upload"></i> Upload Customers
            </Button>
            <Button variant="primary">
              <i className="bi bi-download"></i> Download Customer Format
            </Button>
          </div>
        </div>
        <div className="p-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <Stack className="align-items-center justify-content-center flex-grow-1 h-100">
              <Preloader />
            </Stack>
          ) : (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <Table responsive className="mb-0" style={{ tableLayout: 'auto', width: '100%' }}>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{
                            width: header.column.columnDef.size,
                            whiteSpace: 'normal',
                            padding: '8px',
                            textAlign: header.id === 'actions' ? 'right' : 'center',
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{
                            whiteSpace: 'normal',
                            padding: '8px',
                            textAlign: cell.column.id === 'actions' ? 'right' : 'center',
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Card>
      <AddCustomerModal
        show={showAddCustomerModal}
        onHide={() => setShowAddCustomerModal(false)}
        onSuccess={fetchCustomers}
      />
      <EditCustomerModal
        show={showEditCustomerModal}
        onHide={() => {
          setShowEditCustomerModal(false);
          setSelectedCustomer(null);
        }}
        mstcustomer={selectedCustomer}
        onSuccess={fetchCustomers}
        onUpdateSelectedCustomer={setSelectedCustomer}
      />
    </>
  );
};

// AddCustomerModal Component
const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ show, onHide, onSuccess }) => {
  const [name, setName] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [mobile, setMobile] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [gstNo, setGstNo] = useState<string>('');
  const [fssai, setFssai] = useState<string>('');
  const [panNo, setPanNo] = useState<string>('');
  const [aadharNo, setAadharNo] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [anniversary, setAnniversary] = useState<string>('');
  const [createWallet, setCreateWallet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const [customers, setCustomers] = useState<Customer[]>([]); // To get unique cities and states

  // Fetch customer data to populate city and state options
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/customers', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        } else {
          toast.error('Failed to fetch customer data');
        }
      } catch (err) {
        toast.error('Failed to fetch customer data');
      }
    };
    fetchCustomers();
  }, []);

  // Extract unique cities and states from customers
  const uniqueCities = useMemo(() => [...new Set(customers.map((c) => c.city))], [customers]);
  const uniqueStates = useMemo(() => [...new Set(customers.map((c) => c.state).filter((s): s is string => s !== undefined))], [customers]);

  // Handle form submission
  const handleAdd = async () => {
    if (!name || !mobile || !mail || !city || !address1) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const currentDate = new Date().toISOString();
      const payload = {
        name,
        countryCode,
        mobile,
        mail,
        city,
        address1,
        address2,
        state,
        pincode,
        gstNo,
        fssai,
        panNo,
        aadharNo,
        birthday,
        anniversary,
        createWallet,
        created_by_id: user?.id || '1',
        created_date: currentDate,
        updated_by_id: user?.id || '1',
        updated_date: currentDate,
      };

      const res = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Customer added successfully');
        setName('');
        setCountryCode('+91');
        setMobile('');
        setMail('');
        setCity('');
        setAddress1('');
        setAddress2('');
        setState('');
        setPincode('');
        setGstNo('');
        setFssai('');
        setPanNo('');
        setAadharNo('');
        setBirthday('');
        setAnniversary('');
        setCreateWallet(false);
        onSuccess();
        onHide();
      } else {
        toast.error('Failed to add customer');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal"
      style={{
        display: 'block',
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
          padding: '20px',
          maxWidth: '500px',
          margin: '100px auto',
          borderRadius: '8px',
        }}
      >
        <h3>Add New Customer</h3>
        <div className="mb-3">
          <label className="form-label">Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country Code</label>
          <select
            className="form-control"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            disabled={loading}
          >
            <option value="+91">India +91</option>
            <option value="+1">USA +1</option>
            <option value="+44">UK +44</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email <span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            className="form-control"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter email"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City <span style={{ color: 'red' }}>*</span></label>
          <select
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          >
            <option value="">Select City</option>
            {uniqueCities.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Address 1 <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Enter address 1"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address 2</label>
          <input
            type="text"
            className="form-control"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Enter address 2"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <select
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={loading}
          >
            <option value="">Select State</option>
            {uniqueStates.map((stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GST No.</label>
          <input
            type="text"
            className="form-control"
            value={gstNo}
            onChange={(e) => setGstNo(e.target.value)}
            placeholder="Enter GST number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">FSSAI</label>
          <input
            type="text"
            className="form-control"
            value={fssai}
            onChange={(e) => setFssai(e.target.value)}
            placeholder="Enter FSSAI"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">PAN No.</label>
          <input
            type="text"
            className="form-control"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
            placeholder="Enter PAN number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Aadhar No.</label>
          <input
            type="text"
            className="form-control"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            placeholder="Enter Aadhar number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Birthday</label>
          <input
            type="date"
            className="form-control"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Anniversary</label>
          <input
            type="date"
            className="form-control"
            value={anniversary}
            onChange={(e) => setAnniversary(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={createWallet}
            onChange={(e) => setCreateWallet(e.target.checked)}
            disabled={loading}
          />
          <label className="form-check-label">Create Wallet</label>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={onHide}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

// EditCustomerModal Component
const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  show,
  onHide,
  mstcustomer,
  onSuccess,
  onUpdateSelectedCustomer,
}) => {
  const [name, setName] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [mobile, setMobile] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [gstNo, setGstNo] = useState<string>('');
  const [fssai, setFssai] = useState<string>('');
  const [panNo, setPanNo] = useState<string>('');
  const [aadharNo, setAadharNo] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [anniversary, setAnniversary] = useState<string>('');
  const [createWallet, setCreateWallet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const [customers, setCustomers] = useState<Customer[]>([]); // To get unique cities and states

  // Fetch customer data to populate city and state options
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/customers', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        } else {
          toast.error('Failed to fetch customer data');
        }
      } catch (err) {
        toast.error('Failed to fetch customer data');
      }
    };
    fetchCustomers();
  }, []);

  // Extract unique cities and states from customers
  const uniqueCities = useMemo(() => [...new Set(customers.map((c) => c.city))], [customers]);
  const uniqueStates = useMemo(() => [...new Set(customers.map((c) => c.state).filter((s): s is string => s !== undefined))], [customers]);

  // Initialize form fields when mstcustomer changes
  useEffect(() => {
    if (mstcustomer) {
      setName(mstcustomer.name);
      setCountryCode(mstcustomer.countryCode);
      setMobile(mstcustomer.mobile);
      setMail(mstcustomer.mail);
      setCity(mstcustomer.city);
      setAddress1(mstcustomer.address1);
      setAddress2(mstcustomer.address2 || '');
      setState(mstcustomer.state || '');
      setPincode(mstcustomer.pincode || '');
      setGstNo(mstcustomer.gstNo || '');
      setFssai(mstcustomer.fssai || '');
      setPanNo(mstcustomer.panNo || '');
      setAadharNo(mstcustomer.aadharNo || '');
      setBirthday(mstcustomer.birthday || '');
      setAnniversary(mstcustomer.anniversary || '');
      setCreateWallet(mstcustomer.createWallet || false);
    }
  }, [mstcustomer]);

  // Handle form submission
  const handleEdit = async () => {
    if (!mstcustomer || !name || !mobile || !mail || !city || !address1) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const currentDate = new Date().toISOString();
      const payload = {
        name,
        countryCode,
        mobile,
        mail,
        city,
        address1,
        address2,
        state,
        pincode,
        gstNo,
        fssai,
        panNo,
        aadharNo,
        birthday,
        anniversary,
        createWallet,
        updated_by_id: user?.id || '2',
        updated_date: currentDate,
      };

      const res = await fetch(
        `http://localhost:3001/api/customers/${mstcustomer.srNo}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success('Customer updated successfully');
        const updatedCustomer: Customer = {
          ...mstcustomer,
          name,
          countryCode,
          mobile,
          mail,
          city,
          address1,
          address2,
          state,
          pincode,
          gstNo,
          fssai,
          panNo,
          aadharNo,
          birthday,
          anniversary,
          createWallet,
          updated_by_id: user?.id || '2',
          updated_date: currentDate,
        };
        onUpdateSelectedCustomer(updatedCustomer);
        onSuccess();
        onHide();
      } else {
        toast.error('Failed to update customer');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!show || !mstcustomer) return null;

  return (
    <div
      className="modal"
      style={{
        display: 'block',
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
          padding: '20px',
          maxWidth: '500px',
          margin: '100px auto',
          borderRadius: '8px',
        }}
      >
        <h3>Edit Customer</h3>
        <div className="mb-3">
          <label className="form-label">Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country Code</label>
          <select
            className="form-control"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            disabled={loading}
          >
            <option value="+91">India +91</option>
            <option value="+1">USA +1</option>
            <option value="+44">UK +44</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email <span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            className="form-control"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter email"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">City <span style={{ color: 'red' }}>*</span></label>
          <select
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          >
            <option value="">Select City</option>
            {uniqueCities.map((cityOption) => (
              <option key={cityOption} value={cityOption}>
                {cityOption}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Address 1 <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            className="form-control"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Enter address 1"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address 2</label>
          <input
            type="text"
            className="form-control"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Enter address 2"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          <select
            className="form-control"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={loading}
          >
            <option value="">Select State</option>
            {uniqueStates.map((stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">GST No.</label>
          <input
            type="text"
            className="form-control"
            value={gstNo}
            onChange={(e) => setGstNo(e.target.value)}
            placeholder="Enter GST number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">FSSAI</label>
          <input
            type="text"
            className="form-control"
            value={fssai}
            onChange={(e) => setFssai(e.target.value)}
            placeholder="Enter FSSAI"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">PAN No.</label>
          <input
            type="text"
            className="form-control"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
            placeholder="Enter PAN number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Aadhar No.</label>
          <input
            type="text"
            className="form-control"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            placeholder="Enter Aadhar number"
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Birthday</label>
          <input
            type="date"
            className="form-control"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Anniversary</label>
          <input
            type="date"
            className="form-control"
            value={anniversary}
            onChange={(e) => setAnniversary(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={createWallet}
            onChange={(e) => setCreateWallet(e.target.checked)}
            disabled={loading}
          />
          <label className="form-check-label">Create Wallet</label>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={onHide}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleEdit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;