import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Table, Modal } from 'react-bootstrap';

const CustomerForm: React.FC = () => {
  // Initial customer data
  const initialCustomers = [
    { srNo: 1, name: 'CC', countryCode: '91', mobile: '123', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 2, name: 'sder', countryCode: '91', mobile: '123', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 3, name: 'ASAD', countryCode: '91', mobile: '123312', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 4, name: 'vijay khsrgar', countryCode: '91', mobile: '1234', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 5, name: 'vishal', countryCode: '91', mobile: '2,3', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 6, name: '211', countryCode: '91', mobile: '213', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 7, name: 'sonule', countryCode: '91', mobile: '252', mail: '-', city: 'kop', address1: '-', address2: '-' },
    { srNo: 8, name: 'DD', countryCode: '91', mobile: '3236', mail: '-', city: '-', address1: '-', address2: '-' },
    { srNo: 9, name: 'sarth vatsat', countryCode: '91', mobile: '-', mail: '-', city: '-', address1: '-', address2: '41' },
    { srNo: 10, name: 'sarth vatsat', countryCode: '91', mobile: '-', mail: '-', city: '-', address1: '-', address2: '41' },
    { srNo: 11, name: 'sarth vatsat', countryCode: '91', mobile: '-', mail: '-', city: '-', address1: '-', address2: '41' },
    { srNo: 12, name: 'sarth vatsat', countryCode: '91', mobile: '-', mail: '-', city: '-', address1: '-', address2: '41' },
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [filteredCustomers, setFilteredCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    countryCode: '+91',
    mobile: '',
    mail: '',
    birthday: '',
    city: '',
    state: '',
    pincode: '',
    gstNo: '',
    fssai: '',
    panNo: '',
    aadharNo: '',
    anniversary: '',
    createWallet: false,
  });

  const customersPerPage = 10;

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(term)
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1);
  };

  // Handle refresh
  const handleRefresh = () => {
    setCustomers(initialCustomers);
    setFilteredCustomers(initialCustomers);
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Handle form submission
  const handleAddCustomerSubmit = () => {
    const newCustomerData = {
      srNo: customers.length + 1,
      name: newCustomer.name,
      countryCode: newCustomer.countryCode,
      mobile: newCustomer.mobile,
      mail: newCustomer.mail || '-',
      city: newCustomer.city || '-',
      address1: '-',
      address2: '-',
    };

    const updatedCustomers = [...customers, newCustomerData];
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);

    setNewCustomer({
      name: '',
      countryCode: '+91',
      mobile: '',
      mail: '',
      birthday: '',
      city: '',
      state: '',
      pincode: '',
      gstNo: '',
      fssai: '',
      panNo: '',
      aadharNo: '',
      anniversary: '',
      createWallet: false,
    });
    setShowNewCustomerForm(false);
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container d-flex justify-content-start align-items-start min-vh-100">
      <div className="card border-0 w-100" style={{ maxWidth: '900px' }}>
        <style>
          {`
            .main-container {
              height: 100vh;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            .table-container {
              min-height: 400px;
              display: flex;
              flex-direction: column;
              overflow-x: auto;
            }
            .table-responsive {
              flex: 1;
            }
            .table tbody tr {
              height: 48px;
            }
            .pagination-container {
              display: flex;
              justify-content: center;
              margin-top: 16px;
              width: 100%;
            }
            .pagination {
              display: inline-flex;
              min-width: 200px;
              justify-content: center;
              flex-wrap: wrap;
            }
            .form-row {
              flex-wrap: wrap;
            }
            .form-row .col-md-3 {
              flex: 1 1 100%;
              max-width: 100%;
              padding-right: 15px;
              padding-left: 15px;
            }
            @media (min-width: 768px) {
              .form-row .col-md-3 {
                flex: 0 0 25%;
                max-width: 25%;
              }
            }
            .header-container {
              flex-direction: column;
              align-items: flex-start;
            }
            .header-buttons {
              flex-wrap: wrap;
              width: 100%;
              margin-top: 10px;
            }
            .header-buttons .btn,
            .header-buttons .input-group {
              margin-bottom: 10px;
              width: 100%;
            }
            @media (min-width: 768px) {
              .header-container {
                flex-direction: row;
                align-items: center;
              }
              .header-buttons {
                flex-wrap: nowrap;
                width: auto;
                margin-top: 0;
              }
              .header-buttons .btn,
              .header-buttons .input-group {
                margin-bottom: 0;
                width: auto;
              }
            }
            .table th, .table td {
              font-size: 14px;
              white-space: nowrap;
            }
            @media (min-width: 768px) {
              .table th, .table td {
                font-size: 16px;
              }
            }
            .modal-table-container {
              max-height: 200px;
              overflow-y: auto;
              margin-top: 20px;
            }
          `}
        </style>

        <div className="main-container">
          <div className="header-container d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Customer Form</h2>
            <div className="header-buttons d-flex align-items-center">
              <button
                className="btn btn-outline-primary text-black me-2"
                onClick={() => setShowNewCustomerForm(true)}
              >
                Add new customer
              </button>
              <button className="btn btn-success me-2" onClick={handleRefresh}>
                Refresh
              </button>
              <div className="input-group" style={{ width: '150px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <button className="btn btn-outline-secondary" onClick={() => setSearchTerm('')}>
                  X
                </button>
              </div>
            </div>
          </div>

          <Modal
            show={showNewCustomerForm}
            onHide={() => setShowNewCustomerForm(false)}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className="mb-3 form-row">
                  <Col md={3}>
                    <Form.Group controlId="name">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="countryCode">
                      <Form.Label>Country Code</Form.Label>
                      <Form.Select
                        value={newCustomer.countryCode}
                        onChange={(e) => setNewCustomer({ ...newCustomer, countryCode: e.target.value })}
                      >
                        <option value="+91">India +91</option>
                        <option value="+1">USA +1</option>
                        <option value="+44">UK +44</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="mobile">
                      <Form.Label>Mobile *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        value={newCustomer.mobile}
                        onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={newCustomer.mail}
                        onChange={(e) => setNewCustomer({ ...newCustomer, mail: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3 form-row">
                  <Col md={3}>
                    <Form.Group controlId="birthday">
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        value={newCustomer.birthday}
                        onChange={(e) => setNewCustomer({ ...newCustomer, birthday: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={newCustomer.city}
                        onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter state"
                        value={newCustomer.state}
                        onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="pincode">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        value={newCustomer.pincode}
                        onChange={(e) => setNewCustomer({ ...newCustomer, pincode: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3 form-row">
                  <Col md={3}>
                    <Form.Group controlId="gstNo">
                      <Form.Label>GST No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter GST number"
                        value={newCustomer.gstNo}
                        onChange={(e) => setNewCustomer({ ...newCustomer, gstNo: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="fssai">
                      <Form.Label>FSSAI</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter FSSAI"
                        value={newCustomer.fssai}
                        onChange={(e) => setNewCustomer({ ...newCustomer, fssai: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="panNo">
                      <Form.Label>PAN No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter PAN number"
                        value={newCustomer.panNo}
                        onChange={(e) => setNewCustomer({ ...newCustomer, panNo: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="aadharNo">
                      <Form.Label>Aadhar No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Aadhar number"
                        value={newCustomer.aadharNo}
                        onChange={(e) => setNewCustomer({ ...newCustomer, aadharNo: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3 form-row">
                  <Col md={3}>
                    <Form.Group controlId="anniversary">
                      <Form.Label>Anniversary</Form.Label>
                      <Form.Control
                        type="date"
                        value={newCustomer.anniversary}
                        onChange={(e) => setNewCustomer({ ...newCustomer, anniversary: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="createWallet">
                      <Form.Label>Create Wallet</Form.Label>
                      <Form.Check
                        type="checkbox"
                        label="Create wallet"
                        checked={newCustomer.createWallet}
                        onChange={(e) => setNewCustomer({ ...newCustomer, createWallet: e.target.checked })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="success" onClick={handleAddCustomerSubmit}>
                  Add
                </Button>
              </Form>

              {/* Customer Table in Modal */}
              <div className="modal-table-container">
                <div className="table-responsive">
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>C NAME</th>
                        <th>COUNTRY CODE</th>
                        <th>MOBILE</th>
                        <th>MAIL</th>
                        <th>CITY</th>
                        <th>ADDRESS 1</th>
                        <th>ADDRESS 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCustomers.map((customer) => (
                        <tr key={customer.srNo}>
                          <td>{customer.srNo}</td>
                          <td>{customer.name}</td>
                          <td>{customer.countryCode}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.mail}</td>
                          <td>{customer.city}</td>
                          <td>{customer.address1}</td>
                          <td>{customer.address2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowNewCustomerForm(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="table-container">
            <div className="table-responsive">
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Sr No</th>
                    <th>C NAME</th>
                    <th>COUNTRY CODE</th>
                    <th>MOBILE</th>
                    <th>MAIL</th>
                    <th>CITY</th>
                    <th>ADDRESS 1</th>
                    <th>ADDRESS 2</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map(customer => (
                    <tr key={customer.srNo}>
                      <td>{customer.srNo}</td>
                      <td>{customer.name}</td>
                      <td>{customer.countryCode}</td>
                      <td>{customer.mobile}</td>
                      <td>{customer.mail}</td>
                      <td>{customer.city}</td>
                      <td>{customer.address1}</td>
                      <td>{customer.address2}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <nav aria-label="Page navigation" className="pagination-container">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a
                  className="page-link border rounded-0"
                  href="#"
                  aria-label="Previous"
                  onClick={() => paginate(currentPage - 1)}
                >
                  <span aria-hidden="true">Previous</span>
                </a>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a
                    className={`page-link border-0 ${currentPage === index + 1 ? 'bg-dark text-white' : ''}`}
                    href="#"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <a
                  className="page-link border rounded-0"
                  href="#"
                  aria-label="Next"
                  onClick={() => paginate(currentPage + 1)}
                >
                  <span aria-hidden="true">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;