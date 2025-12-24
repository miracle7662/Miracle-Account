import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Preloader } from '@/components/Misc/Preloader';
import { Button, Card, Table, Form, Modal, Row, Col } from 'react-bootstrap';
import TitleHelmet from '@/components/Common/TitleHelmet';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useAuthContext } from '@/common';
import Swal from 'sweetalert2';
import { ChangeEvent } from 'react';
import axios from 'axios'; // Critical: Axios with JWT interceptor
// User interface matching mst_users table
interface MstUserItem {
  userid: string;
  username: string;
  email: string;
  full_name: string;
  phone: string;
  role_level: string;
  parent_user_id?: string;
  companyid: string;
  Designation?: string;
  designationid?: string;
  user_type?: string;
  mac_address?: string;
  language_preference?: string;
  address?: string;
  city?: string;
  web_access?: string;
  usertypeid?: string;
  status: string;
  created_by_id?: string;
  created_date?: string;
  updated_by_id?: string;
  updated_date?: string;
  yearid?: string;
}

// Add/Edit User Modal
interface AddEditUserModalProps {
  show: boolean;
  onHide: () => void;
  user: MstUserItem | null;
  onSuccess: () => void;
  isEdit: boolean;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({ show, onHide, user, onSuccess, isEdit }) => {
  const { user: currentUser } = useAuthContext();
  const [formData, setFormData] = useState<Partial<MstUserItem>>({
    username: '',
    email: '',
    full_name: '',
    phone: '',
    role_level: '',
    companyid: currentUser?.companyid || '',
    yearid: currentUser?.yearid || '',
    status: '1',
    Designation: '',
    address: '',
  });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && user) {
      setFormData(user);
      setPassword('');
    } else if (show && !user) {
      setFormData({
        username: '',
        email: '',
        full_name: '',
        phone: '',
        role_level: '',
        companyid: currentUser?.companyid || '',
        yearid: currentUser?.yearid || '',
        status: '1',
        Designation: '',
        address: '',
      });
      setPassword('');
    }
  }, [show, user, currentUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.full_name || (!isEdit && !password)) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = isEdit
        ? {
            ...formData,
            updated_by_id: currentUser?.userid || '1',
          }
        : {
            ...formData,
            password,
            created_by_id: currentUser?.userid || '1',
          };

      const url = isEdit
        ? `http://localhost:3001/api/mstuser/${user?.userid}`
        : 'http://localhost:3001/api/mstuser';

      const method = isEdit ? 'put' : 'post';

      await axios.request({
        method,
        url,
        data: payload,
      });

      toast.success(isEdit ? 'User updated successfully!' : 'User created successfully!');
      onSuccess();
      onHide();
    } catch (err: any) {
      console.error('Error saving user:', err);
      toast.error(err.response?.data?.error || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit User' : 'Add New User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                  disabled={loading || isEdit}
                />
              </Form.Group>

              {!isEdit && (
                <Form.Group className="mb-3">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    placeholder="Enter strong password"
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status || '1'}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role Level</Form.Label>
                <Form.Select
                  name="role_level"
                  value={formData.role_level || ''}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Role</option>
                  <option value="admin"> Admin</option>
                  <option value="user">User</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  name="Designation"
                  value={formData.Designation || ''}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Main User Management Component
const UserList: React.FC = () => {
  const { user: currentUser } = useAuthContext();
  const [users, setUsers] = useState<MstUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MstUserItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/mstuser', {
        params: {
          companyid: currentUser?.companyid,
          yearid: currentUser?.yearid,
        },
      });
      setUsers(response.data);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm)
    );
  }, [users, searchTerm]);

  const handleDeleteUser = async (userToDelete: MstUserItem) => {
    const result = await Swal.fire({
      title: 'Delete User?',
      text: `This will permanently delete "${userToDelete.username}". Continue?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/mstuser/${userToDelete.userid}`);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  const columns = useMemo<ColumnDef<MstUserItem>[]>(() => [
    { id: 'srNo', header: 'Sr No', size: 70, cell: ({ row }) => row.index + 1 },
    { accessorKey: 'username', header: 'Username', size: 160 },
    { accessorKey: 'email', header: 'Email', size: 220 },
    { accessorKey: 'full_name', header: 'Full Name', size: 200 },
    { accessorKey: 'phone', header: 'Phone', size: 140, cell: info => info.getValue() || '-' },
    { accessorKey: 'role_level', header: 'Role', size: 130, cell: info => info.getValue() || '-' },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 100,
      cell: info => (
        <span className={`badge ${info.getValue() === '1' ? 'bg-success' : 'bg-secondary'}`}>
          {info.getValue() === '1' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 120,
      cell: ({ row }) => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setSelectedUser(row.original);
              setShowEditModal(true);
            }}
            title="Edit"
          >
            <i className="fi fi-rr-edit"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteUser(row.original)}
            title="Delete"
          >
            <i className="fi fi-rr-trash"></i>
          </button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: filteredUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleSuccess = () => {
    fetchUsers();
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  if (loading && users.length === 0) return <Preloader />;

  return (
    <>
      <TitleHelmet title="User Management" />

      <div className="page-wrapper">
        <div className="page-content">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">User Management</h4>
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <i className="fi fi-rr-plus me-1"></i> Add User
              </Button>
            </Card.Header>

            <Card.Body>
              <div className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  style={{ maxWidth: '300px' }}
                />
              </div>

              <div className="table-responsive">
                <Table hover>
                  <thead className="table-light">
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id} style={{ width: header.getSize() }}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {filteredUsers.length === 0 && !loading && (
                <div className="text-center py-5 text-muted">
                  <h5>No users found</h5>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <AddEditUserModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        user={null}
        onSuccess={handleSuccess}
        isEdit={false}
      />
      <AddEditUserModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        user={selectedUser}
        onSuccess={handleSuccess}
        isEdit={true}
      />
    </>
  );
};

export default UserList;