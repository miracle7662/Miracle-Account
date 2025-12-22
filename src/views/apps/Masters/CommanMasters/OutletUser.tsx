import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Table, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/common';
import outletUserService, { OutletUserData, HotelAdminData } from '@/common/api/outletUser';
import { fetchDesignation, fetchUserType, fetchOutlets, fetchShiftTypes, ShiftTypeItem, fetchWarehouses, WarehouseItem } from '@/utils/commonfunction';
import { OutletData } from '@/common/api/outlet';


const OutletUserList: React.FC = () => {
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedUser, setSelectedUser] = useState<OutletUserData | null>(null);
  const [selectedHotelAdmin, setSelectedHotelAdmin] = useState<HotelAdminData | null>(null);
  const [outletUsers, setOutletUsers] = useState<OutletUserData[]>([]);
  const [hotelAdmins, setHotelAdmins] = useState<HotelAdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [outlets, setOutlets] = useState<OutletData[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseItem[]>([]);
  const [designations, setDesignations] = useState<Array<{ designationid: number; Designation: string }>>([]);
  const [userTypes, setUserTypes] = useState<Array<{ usertypeid: number; User_type: string }>>([]);
  const [, setDesignationId] = useState<number | null>(null);
  const [shiftTypes, setShiftTypes] = useState<ShiftTypeItem[]>([]);
  const [, setUserTypeId] = useState<number | null>(null);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedOutlet, setSelectedOutlet] = useState<number | null>(null);
  const [selectedDesignation, setSelectedDesignation] = useState<number | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<number | null>(null);
  const [shiftTime, setShiftTime] = useState<string>('');
  const [macAddress, setMacAddress] = useState<string>('');
  const [assignWarehouse, setAssignWarehouse] = useState<string>('');
  const [languagePreference, setLanguagePreference] = useState<string>('English');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [subLocality, setSubLocality] = useState<string>('');
  const [webAccess, setWebAccess] = useState<boolean>(false);
  const [selfOrder, setSelfOrder] = useState<boolean>(true);
  const [captainApp, setCaptainApp] = useState<boolean>(true);
  const [kdsApp, setKdsApp] = useState<boolean>(true);
  const [captainOldKotAccess, setCaptainOldKotAccess] = useState<string>('Enabled');
  const [verifyMacIp, setVerifyMacIp] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    console.log('Current user in OutletUserList:', user);
    fetchOutletUsers();
    if (user?.role_level === 'superadmin' || user?.role_level === 'brand_admin') {
      fetchHotelAdmins();
    }
    fetchMasterData();
  }, [user]);

  const fetchMasterData = async () => {
    try {
      console.log('Fetching master data...');
      await fetchOutlets(user, setOutlets, setLoading);
      console.log('Fetched outlets:', outlets);
      fetchDesignation(setDesignations, setDesignationId);
      fetchUserType(setUserTypes, setUserTypeId);
      fetchShiftTypes(setShiftTypes, setShiftTime);
      fetchWarehouses(setWarehouses, setLoading);
    } catch (error) {
      console.error('Error fetching master data:', error);
      toast.error('Failed to fetch master data. Please check if the backend server is running.');
    }
  };

  const fetchOutletUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching outlet users...');
      const params: any = {
        currentUserId: user?.userid,
        roleLevel: user?.role_level,
        hotelid: user?.hotelid
      };
      if (user?.role_level === 'hotel_admin' && typeof user?.userid === 'number') {
        params.created_by_id = user.userid;
      }
      const response = await outletUserService.getOutletUsers(params);
      console.log('Outlet users response:', response);
      if (response && response.data) {
        const outletUsersOnly = response.data.filter((user: any) => user.role_level === 'outlet_user');
        setOutletUsers(outletUsersOnly);
      } else {
        console.error('Invalid response format:', response);
        toast.error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error fetching outlet users:', error);
      toast.error('Failed to fetch outlet users. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelAdmins = async () => {
    try {
      console.log('Fetching hotel admins...');
      const response = await outletUserService.getHotelAdmins({
        currentUserId: user?.userid,
        roleLevel: user?.role_level,
        hotelid: user?.hotelid
      });
      console.log('Hotel admins response:', response);
      if (response && response.data) {
        setHotelAdmins(response.data);
      } else {
        console.error('Invalid hotel admins response format:', response);
      }
    } catch (error) {
      console.error('Error fetching hotel admins:', error);
      toast.error('Failed to fetch hotel admins. Please check if the backend server is running.');
    }
  };

  const resetFormFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setSelectedOutlet(null);
    setSelectedDesignation(null);
    setSelectedUserType(null);
    setShiftTime('');
    setMacAddress('');
    setAssignWarehouse('');
    setLanguagePreference('English');
    setAddress('');
    setCity('');
    setSubLocality('');
    setWebAccess(false);
    setSelfOrder(true);
    setCaptainApp(true);
    setKdsApp(true);
    setCaptainOldKotAccess('Enabled');
    setVerifyMacIp(false);
    setStatus(true);
  };

  const handleShowModal = (type: string, user?: OutletUserData | HotelAdminData) => {
    setModalType(type);
    setSelectedUser(user as OutletUserData || null);
    setSelectedHotelAdmin(user as HotelAdminData || null);

    if (user && type === 'Edit Outlet User') {
      loadUserDataIntoForm(user as OutletUserData);
    } else if (user && type === 'Edit Hotel Admin') {
      loadHotelAdminDataIntoForm(user as HotelAdminData);
    } else {
      resetFormFields();
    }

    setShowModal(true);
  };

  const loadUserDataIntoForm = (user: OutletUserData) => {
    setUsername(user.username || '');
    setEmail(user.email || '');
    setFullName(user.full_name || '');
    setPhone(user.phone || '');
    setSelectedOutlet(user.outletid ? Number(user.outletid) : null);
    setSelectedDesignation(user.designationid ? Number(user.designationid) : null);  // Convert to number if string
    setSelectedUserType(user.usertypeid ? Number(user.usertypeid) : null);        // Convert to number if string
    setShiftTime(user.shift_time || '');
    setMacAddress(user.mac_address || '');
    setAssignWarehouse(user.assign_warehouse || '');
    setLanguagePreference(user.language_preference || 'English');
    setAddress(user.address || '');
    setCity(user.city || '');
    setSubLocality(user.sub_locality || '');
    setWebAccess(user.web_access || false);
    setSelfOrder(user.self_order || true);
    setCaptainApp(user.captain_app || true);
    setKdsApp(user.kds_app || true);
    setCaptainOldKotAccess(user.captain_old_kot_access || 'Enabled');
    setVerifyMacIp(user.verify_mac_ip || false);
    setStatus(user.status === 0);
  };

  const loadHotelAdminDataIntoForm = (hotelAdmin: HotelAdminData) => {
    setUsername(hotelAdmin.username || '');
    setEmail(hotelAdmin.email || '');
    setFullName(hotelAdmin.full_name || '');
    setPhone(hotelAdmin.phone || '');
    setStatus(hotelAdmin.status === 0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedUser(null);
    setSelectedHotelAdmin(null);
    resetFormFields();
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this outlet user? This action cannot be undone.')) {
      try {
        await outletUserService.deleteOutletUser(userId, { updated_by_id: user?.userid || 0 });
        toast.success('Outlet user deleted successfully!');
        fetchOutletUsers();
      } catch (error) {
        console.error('Error deleting outlet user:', error);
        toast.error('Failed to delete outlet user');
      }
    }
  };


  const handleOutletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOutlet(e.target.value ? Number(e.target.value) : null);
  };

  const handleModalSubmit = async () => {
    console.log('Starting handleModalSubmit...', { modalType, user });
    console.log('Form data:', { username, email, password, fullName, selectedOutlet });

    if (modalType === 'Edit Hotel Admin') {
      if (!fullName) {
        toast.error('Please enter full name');
        console.warn('Validation failed: Full name is missing');
        return;
      }

      const hotelAdminData: HotelAdminData = {
        full_name: fullName,
        phone,
        status: status ? 0 : 1,
      };

      try {
        console.log('Updating hotel admin:', { userid: selectedHotelAdmin?.userid, data: hotelAdminData });
        if (selectedHotelAdmin) {
          const response = await outletUserService.updateHotelAdmin(selectedHotelAdmin.userid!, hotelAdminData);
          console.log('Update hotel admin response:', response.data);
          toast.success('Hotel admin updated successfully!');
        }
        fetchHotelAdmins();
        handleCloseModal();
      } catch (error: any) {
        console.error('Error updating hotel admin:', error, error.response?.data);
        toast.error(error.response?.data?.message || 'Failed to update hotel admin');
      }
    } else {
      // Validate required fields
      if (!username || username.length < 3) {
        toast.error('Please enter a valid username (minimum 3 characters)');
        console.warn('Validation failed: Invalid username', { username });
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Please enter a valid email address');
        console.warn('Validation failed: Invalid email', { email });
        return;
      }
      if (!password && modalType === 'Add Outlet User') {
        toast.error('Please enter a password');
        console.warn('Validation failed: Password is missing');
        return;
      }
      if (!fullName || fullName.length < 2) {
        toast.error('Please enter a valid full name (minimum 2 characters)');
        console.warn('Validation failed: Invalid full name', { fullName });
        return;
      }
      if (!selectedOutlet) {
        toast.error('Please select an outlet');
        console.warn('Validation failed: Outlet is not selected', { selectedOutlet });
        return;
      }

      const parentUserId = user?.id || 1;
      const createdById = user?.id || 1;
      console.log('Using parent_user_id:', parentUserId, 'created_by_id:', createdById);
      if (!parentUserId || !createdById) {
        toast.error('Unable to determine user identity. Please ensure you are logged in.');
        console.error('Validation failed: Invalid user identity', { user, parentUserId, createdById });
        return;
      }

      const userData: OutletUserData = {
        username,
        email,
        password: modalType === 'Add Outlet User' ? password : undefined,
        full_name: fullName,
        phone,
        role_level: 'outlet_user',
        outletid: selectedOutlet,
        Designation: selectedDesignation?.toString(),
        designationid: selectedDesignation ? Number(selectedDesignation) : undefined,
        user_type: selectedUserType?.toString(),
        usertypeid: selectedUserType ? Number(selectedUserType) : undefined,
        shift_time: shiftTime,
        mac_address: macAddress,
        assign_warehouse: assignWarehouse,
        language_preference: languagePreference,
        address,
        city,
        sub_locality: subLocality,
        web_access: webAccess,
        self_order: selfOrder,
        captain_app: captainApp,
        kds_app: kdsApp,
        captain_old_kot_access: captainOldKotAccess,
        verify_mac_ip: verifyMacIp,
        hotelid: user?.hotelid || outlets.find(outlet => outlet.outletid === selectedOutlet)?.hotelid,
        parent_user_id: parentUserId,
        status: status ? 0 : 1,
        created_by_id: createdById,
      };

      console.log('Submitting userData to backend:', JSON.stringify(userData, null, 2));

      try {
        if (modalType === 'Edit Outlet User' && selectedUser) {
          const response = await outletUserService.updateOutletUser(selectedUser.userid!, userData);
          console.log('Update response:', response.data);
          toast.success('Outlet user updated successfully!');
        } else {
          const response = await outletUserService.createOutletUser(userData);
          console.log('Create response:', response.data);
          toast.success('Outlet user added successfully!');
        }
        fetchOutletUsers();
        handleCloseModal();
      } catch (error: any) {
        console.error('Full error object:', error);
        const status = error.response?.status;
        const errorData = error.response?.data || error.message;
        const errorMessage = errorData?.message || (modalType === 'Edit Outlet User' ? 'Failed to update outlet user' : 'Failed to add outlet user');
        const invalidOutletId = errorData?.invalidOutletId || [];
        console.log('Error details:', { status, message: errorMessage, invalidOutletId, sentOutletId: selectedOutlet, response: errorData });
        toast.error(`${errorMessage}${invalidOutletId.length > 0 ? ` (Invalid Outlet IDs: ${invalidOutletId.join(', ')})` : ''}`);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading outlet users...</div>;
  }

  const combinedUserList = user?.role_level === 'hotel_admin'
    ? [
      {
        ...user,
        full_name: user.full_name || user.username,
        role_level: 'hotel_admin',
        outlet_name: '-',
        designation: '-',
        user_type: '-',
        status: user.status !== undefined ? user.status : 0,
        is_admin_row: true,
      },
      ...outletUsers
    ]
    : outletUsers;

  return (
    <div className="m-1">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>
          {user?.role_level === 'hotel_admin' ? 'Outlet Users' : 'Outlet Users & Hotel Admins'}
        </h4>
        <div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="showDeactivated" style={{ borderColor: '#333' }} />
            <label className="form-check-label" htmlFor="showDeactivated">
              Show Deactivated
            </label>
          </div>
          <button
            className="btn btn-success"
            onClick={() => handleShowModal('Add Outlet User')}
          >
            + Add Outlet User
          </button>
        </div>
      </div>

      {(user?.role_level === 'superadmin' || user?.role_level === 'brand_admin') ? (
        <Tabs defaultActiveKey="hotel-admins" className="mb-3">
          <Tab eventKey="hotel-admins" title="Hotel Admins">
            <div className="mb-3">
              <small className="text-muted">
                <i className="fi fi-rr-info me-1"></i>
                Hotel Admins manage the overall hotel operations and have access to all outlets under their hotel.
              </small>
            </div>

            <div className="table-responsive">
              <Table className="table table-bordered table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Sr No</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Hotel Name</th>
                    <th>Brand Name</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelAdmins.map((hotelAdmin, index) => (
                    <tr key={hotelAdmin.userid} className="table-primary">
                      <td>{index + 1}</td>
                      <td>
                        <strong>{hotelAdmin.full_name}</strong>
                        <span className="badge bg-warning text-dark ms-2">Hotel Admin</span>
                      </td>
                      <td>{hotelAdmin.username}</td>
                      <td>{hotelAdmin.email}</td>
                      <td>{hotelAdmin.phone || 'N/A'}</td>
                      <td>{hotelAdmin.hotel_name || 'N/A'}</td>
                      <td>{hotelAdmin.brand_name || 'N/A'}</td>
                      <td>
                        <span className={`badge ${hotelAdmin.status === 0 ? 'bg-success' : 'bg-danger'}`}>
                          {hotelAdmin.status === 0 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{hotelAdmin.last_login || 'Never'}</td>
                      <td>{hotelAdmin.created_date || 'N/A'}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-primary"
                            title="Edit Hotel Admin"
                            onClick={() => handleShowModal('Edit Hotel Admin', hotelAdmin)}
                          >
                            <i className="fi fi-rr-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>

          <Tab eventKey="outlet-users" title="Outlet Users">
            <div className="mb-3">
              <small className="text-muted">
                <i className="fi fi-rr-info me-1"></i>
                Outlet Users are staff members who work at specific outlets and have limited access based on their role.
              </small>
            </div>

            <div className="table-responsive">
              <Table className="table table-bordered table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Sr No</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Outlet Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Designation</th>
                    <th>User Type</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {outletUsers.map((outletUser, index) => (
                    <tr key={outletUser.userid}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{outletUser.full_name}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">
                          Outlet User
                        </span>
                      </td>
                      <td>{outletUser.outlet_name || 'N/A'}</td>
                      <td>{outletUser.username}</td>
                      <td>{outletUser.email}</td>
                      <td>{outletUser.phone || 'N/A'}</td>
                      <td>{outletUser.Designation || 'N/A'}</td>
                      <td>{outletUser.user_type || 'N/A'}</td>
                      <td>
                        <span className={`badge ${outletUser.status === 0 ? 'bg-success' : 'bg-danger'}`}>
                          {outletUser.status === 0 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{outletUser.created_date || 'N/A'}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-primary"
                            title="Edit User"
                            onClick={() => handleShowModal('Edit Outlet User', outletUser)}
                          >
                            <i className="fi fi-rr-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            title="Delete User"
                            onClick={() => handleDeleteUser(outletUser.userid!)}
                          >
                            <i className="fi fi-rr-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      ) : (
        <div>
          <div className="mb-3">
            <small className="text-muted">
              <i className="fi fi-rr-info me-1"></i>
              Outlet Users are staff members who work at specific outlets under your hotel. Your admin account is shown at the top.
            </small>
          </div>

          <div className="table-responsive">
            <Table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Outlet Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Designation</th>
                  <th>User Type</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {combinedUserList.map((row, index) => (
                  <tr key={row.userid || row.username} className={row.is_admin_row ? 'table-primary' : ''}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{row.full_name}</strong>
                      {row.is_admin_row && (
                        <span className="badge bg-warning text-dark ms-2">Hotel Admin (You)</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${row.is_admin_row ? 'bg-warning text-dark' : 'bg-info'}`}>
                        {row.is_admin_row ? 'Hotel Admin' : 'Outlet User'}
                      </span>
                    </td>
                    <td>{row.outlet_name || '-'}</td>
                    <td>{row.username}</td>
                    <td>{row.email}</td>
                    <td>{row.phone || '-'}</td>
                    <td>{row.designation || '-'}</td>
                    <td>{row.user_type || '-'}</td>
                    <td>
                      <span className={`badge ${row.status === 0 ? 'bg-success' : 'bg-danger'}`}>
                        {row.status === 0 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{row.created_date || '-'}</td>
                    <td>
                      {row.is_admin_row ? (
                        <span className="text-muted">-</span>
                      ) : (
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-primary"
                            title="Edit User"
                            onClick={() => handleShowModal('Edit Outlet User', row)}
                          >
                            <i className="fi fi-rr-edit"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            title="Delete User"
                            onClick={() => handleDeleteUser(row.userid!)}
                          >
                            <i className="fi fi-rr-trash"></i>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === 'Edit Hotel Admin' ? (
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="fullName">
                    <Form.Label>
                      Full Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="username">
                      <Form.Label>
                        Username <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>
                        Email <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>
                        Password {modalType === 'Add Outlet User' && <span className="text-danger">*</span>}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder={modalType === 'Add Outlet User' ? "Enter Password" : "Leave blank to keep current"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="fullName">
                      <Form.Label>
                        Full Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="outlet">
                      <Form.Label>
                        Select Outlet <span className="text-danger">*</span>
                      </Form.Label>
                       <Form.Select
                         className="form-control"
                         value={selectedOutlet || ''}
                         onChange={handleOutletChange}
                         disabled={loading}
                       >
                         <option value="">Select Outlet</option>
                         {outlets.map((outlet) => (
                           <option key={outlet.outletid} value={outlet.outletid}>
                             {outlet.outlet_name} ({outlet.outlet_code})
                           </option>
                         ))}
                       </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="designation">
                      <Form.Label>Designation</Form.Label>
                      <Form.Select
                        value={selectedDesignation || ''}
                        onChange={(e) => setSelectedDesignation(e.target.value ? Number(e.target.value) : null)}
                      >
                        <option value="">Select Designation</option>
                        {designations.map((designation) => (
                          <option key={designation.designationid} value={designation.designationid}>
                            {designation.Designation}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="userType">
                      <Form.Label>User Type</Form.Label>
                      <Form.Select
                        value={selectedUserType || ''}
                        onChange={(e) => setSelectedUserType(e.target.value ? Number(e.target.value) : null)}
                      >
                        <option value="">Select User Type</option>
                        {userTypes.map((userType) => (
                          <option key={userType.usertypeid} value={userType.usertypeid}>
                            {userType.User_type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="shiftTime">
                      <Form.Label>Shift Time</Form.Label>                      
                      <Form.Select
                        value={shiftTime}
                        onChange={(e) => setShiftTime(e.target.value)}
                      >
                        <option value="">Select Shift</option>
                        {shiftTypes.map((shift) => (
                          <option
                            key={shift.id}
                            value={shift.shift_type}
                          >
                            {shift.shift_type}
                          </option>
                        ))}
                      </Form.Select>

                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="macAddress">
                      <Form.Label>MAC Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter MAC Address"
                        value={macAddress}
                        onChange={(e) => setMacAddress(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="assignWarehouse">
                      <Form.Label>Assign Warehouse</Form.Label>
                      <Form.Select
                        value={assignWarehouse}
                        onChange={(e) => setAssignWarehouse(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">Select Warehouse</option>
                        {warehouses.map((warehouse) => (
                          <option
                            key={warehouse.warehouseid}
                            value={warehouse.warehouseid}>
                            {warehouse.warehouse_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="languagePreference">
                      <Form.Label>Language Preference</Form.Label>
                      <Form.Select
                        value={languagePreference}
                        onChange={(e) => setLanguagePreference(e.target.value)}
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Arabic">Arabic</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="subLocality">
                      <Form.Label>Sub Locality</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Sub Locality"
                        value={subLocality}
                        onChange={(e) => setSubLocality(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="webAccess">
                      <Form.Label>Web Access</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={webAccess}
                        onChange={(e) => setWebAccess(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="selfOrder">
                      <Form.Label>Self Order</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={selfOrder}
                        onChange={(e) => setSelfOrder(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="captainApp">
                      <Form.Label>Captain App</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={captainApp}
                        onChange={(e) => setCaptainApp(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="kdsApp">
                      <Form.Label>KDS App</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={kdsApp}
                        onChange={(e) => setKdsApp(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="captainOldKotAccess">
                      <Form.Label>Captain Old KOT Access</Form.Label>
                      <Form.Select
                        value={captainOldKotAccess}
                        onChange={(e) => setCaptainOldKotAccess(e.target.value)}
                      >
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="verifyMacIp">
                      <Form.Label>Verify MAC/IP</Form.Label>
                      <Form.Check
                        type="switch"
                        checked={verifyMacIp}
                        onChange={(e) => setVerifyMacIp(e.target.checked)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status ? 0 : 1} // 0 for Active, 1 for Inactive
                    onChange={(e) => setStatus(e.target.value === '0')} // Sets status to true (Active) or false (Inactive)
                  >
                    <option value="0">Active</option>
                    <option value="1">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalSubmit}>
            {modalType === 'Edit Outlet User' || modalType === 'Edit Hotel Admin' ? 'Update' : 'Create'}
          </Button>
           <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OutletUserList;