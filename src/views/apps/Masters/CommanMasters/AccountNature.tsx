import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button, Card, Form, Modal, Stack, Table, Spinner, Pagination } from 'react-bootstrap';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { useAuthContext } from '@/common';

interface AccountNatureRecord {
  nature_id: number;
  accountnature: string;
  status: number;
  companyid: number;
  yearid: number;
}

const AccountNature: React.FC = (): JSX.Element => {
  const { user } = useAuthContext();
  const [accountNatures, setAccountNatures] = useState<AccountNatureRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AccountNatureRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const baseUrl = '/api/accountnature';

  useEffect(() => {
    fetchAccountNatures();
  }, []);

  const fetchAccountNatures = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseUrl, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      setAccountNatures(res.data);
    } catch (error) {
      toast.error('Failed to fetch Account Nature data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = React.useMemo<ColumnDef<AccountNatureRecord>[]>(
    () => [
      {
        accessorKey: 'nature_id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'accountnature',
        header: 'Account Nature',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: info => (info.getValue() === 1 ? 'Active' : 'Inactive'),
      },
      {
        accessorKey: 'companyid',
        header: 'Company ID',
        size: 100,
      },
      {
        accessorKey: 'yearid',
        header: 'Year ID',
        size: 80,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Stack direction="horizontal" gap={2}>
            <Button size="sm" variant="primary" onClick={() => openEditModal(row.original)}>
              Edit
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleDelete(row.original.nature_id)}>
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return accountNatures;
    const lower = searchTerm.toLowerCase();
    return accountNatures.filter((item) =>
      item.accountnature.toLowerCase().includes(lower) ||
      item.companyid.toString().includes(lower) ||
      item.yearid.toString().includes(lower)
    );
  }, [accountNatures, searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchTerm,
    },
    initialState: { pagination: { pageSize: 10 } },
  });

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (record: AccountNatureRecord) => {
    setEditingRecord(record);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setEditingRecord(null);
    setShowEditModal(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      toast.success('Deleted successfully');
      fetchAccountNatures();
    } catch (error) {
      toast.error('Failed to delete record');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="m-3">
        <Card.Body>
          <Stack direction="horizontal" className="mb-3 justify-content-between align-items-center">
            <h4 className="mb-0">Account Nature Master</h4>
            <Button variant="success" onClick={openAddModal} disabled={loading}>
              Add Account Nature
            </Button>
          </Stack>

          <Form.Control
            type="search"
            placeholder="Search account natures"
            className="mb-3"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            disabled={loading}
          />

          {loading ? (
            <Stack className="align-items-center justify-content-center">
              <Spinner animation="border" role="status" />
            </Stack>
          ) : (
            <>
              <Table responsive bordered hover>
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} style={{ width: header.column.columnDef.size }}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 && (
                    <tr>
                      <td colSpan={columns.length} className="text-center">
                        No records found.
                      </td>
                    </tr>
                  )}
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Stack direction="horizontal" className="justify-content-between align-items-center mt-3">
                <div>
                  <span className="text-muted">
                    Showing {table.getRowModel().rows.length} of {filteredData.length} entries
                  </span>
                </div>
                <Pagination>
                  <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
                  {[...Array(table.getPageCount()).keys()].map(i => (
                    <Pagination.Item
                      key={i}
                      active={i === table.getState().pagination?.pageIndex}
                      onClick={() => table.setPageIndex(i)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
                </Pagination>
              </Stack>
            </>
          )}
        </Card.Body>
      </Card>

      <AddAccountNatureModal
        show={showAddModal}
        onHide={closeAddModal}
        user={user}
        onSuccess={() => {
          closeAddModal();
          fetchAccountNatures();
        }}
      />

      <EditAccountNatureModal
        show={showEditModal}
        onHide={closeEditModal}
        record={editingRecord}
        user={user}
        onSuccess={() => {
          closeEditModal();
          fetchAccountNatures();
        }}
      />
    </>
  );
};

interface AddAccountNatureModalProps {
  show: boolean;
  onHide: () => void;
  user: any;
  onSuccess: () => void;
}

const AddAccountNatureModal: React.FC<AddAccountNatureModalProps> = ({ show, onHide, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    accountnature: '',
    status: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.currentTarget instanceof HTMLTextAreaElement) {
        if (e.shiftKey) {
          return; // Allow Shift+Enter for new line in textarea
        }
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      const form = e.currentTarget.closest('form');
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const currentIndex = elements.indexOf(e.currentTarget as HTMLElement);
        let targetIndex = currentIndex + 1;
        let focused = false;
        while (targetIndex < elements.length) {
          const element = elements[targetIndex];
          if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
            if ((element as HTMLInputElement).disabled || (element as HTMLSelectElement).disabled) {
              targetIndex++;
              continue;
            }
            // Found a valid focusable element
            (element as HTMLElement).focus();
            focused = true;
            break;
          } else {
            targetIndex++;
          }
        }
        if (!focused && targetIndex >= elements.length) {
          document.getElementById('submit-btn')?.click();
        }
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['status'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        companyid: user?.companyid,
        yearid: user?.yearid,
        created_by_id: user?.userid,
        created_date: new Date().toISOString(),
      };
      await axios.post('/api/accountnature', payload, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      toast.success('Account Nature added successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to add Account Nature');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onHide();
      setFormData({
        accountnature: '',
        status: 1,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={!loading}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!loading}>
          <Modal.Title>Add Account Nature</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="accountnature" className="mb-3">
            <Form.Label>Account Nature</Form.Label>
            <Form.Control
              type="text"
              name="accountnature"
              value={formData.accountnature}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group controlId="status" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange} onKeyDown={handleKeyDown} disabled={loading}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button id="submit-btn" variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

interface EditAccountNatureModalProps {
  show: boolean;
  onHide: () => void;
  record: AccountNatureRecord | null;
  user: any;
  onSuccess: () => void;
}

const EditAccountNatureModal: React.FC<EditAccountNatureModalProps> = ({ show, onHide, record, user, onSuccess }): JSX.Element => {
  const [formData, setFormData] = useState({
    accountnature: '',
    status: 1,
    companyid: 0,
    yearid: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.currentTarget instanceof HTMLTextAreaElement) {
        if (e.shiftKey) {
          return; // Allow Shift+Enter for new line in textarea
        }
        e.preventDefault();
      } else {
        e.preventDefault();
      }
      const form = e.currentTarget.closest('form');
      if (form) {
        const elements = Array.from(form.elements) as HTMLElement[];
        const currentIndex = elements.indexOf(e.currentTarget as HTMLElement);
        let targetIndex = currentIndex + 1;
        let focused = false;
        while (targetIndex < elements.length) {
          const element = elements[targetIndex];
          if (element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA') {
            if ((element as HTMLInputElement).disabled || (element as HTMLSelectElement).disabled) {
              targetIndex++;
              continue;
            }
            // Found a valid focusable element
            (element as HTMLElement).focus();
            focused = true;
            break;
          } else {
            targetIndex++;
          }
        }
        if (!focused && targetIndex >= elements.length) {
          document.getElementById('submit-btn')?.click();
        }
      }
    }
  }, []);

  React.useEffect(() => {
    if (record) {
      setFormData({
        accountnature: record.accountnature,
        status: record.status,
        companyid: record.companyid,
        yearid: record.yearid,
      });
    }
  }, [record]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['status'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        companyid: user?.companyid,
        yearid: user?.yearid,
        updated_by_id: user?.userid,
        updated_date: new Date().toISOString(),
      };
      await axios.put(`/api/accountnature/${record.nature_id}`, payload, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      toast.success('Account Nature updated successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to update Account Nature');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={!loading}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!loading}>
          <Modal.Title>Edit Account Nature</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="accountnature" className="mb-3">
            <Form.Label>Account Nature</Form.Label>
            <Form.Control
              type="text"
              name="accountnature"
              value={formData.accountnature}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              disabled={loading}
            />
          </Form.Group>
          <Form.Group controlId="status" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange} onKeyDown={handleKeyDown} disabled={loading}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button id="submit-btn" variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountNature;