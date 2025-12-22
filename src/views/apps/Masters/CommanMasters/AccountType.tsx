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

interface AccountTypeRecord {
  AccID: number;
  AccName: string;
  UnderID: number | null;
  NatureOfC: number | null;
  status: number;
  companyid: number | null;
  yearid: number | null;
}

interface AccountNatureRecord {
  nature_id: number;
  accountnature: string;
  companyid: number | null;
  yearid: number | null;
}

const AccountType: React.FC = (): JSX.Element => {
  const { user } = useAuthContext();
  const [accountTypes, setAccountTypes] = useState<AccountTypeRecord[]>([]);
  const [accountNatures, setAccountNatures] = useState<AccountNatureRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AccountTypeRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const baseUrl = '/api/accounttype';
  const baseNatureUrl = '/api/accountnature';

  useEffect(() => {
    if (user?.token && user?.companyid && user?.yearid) {
      fetchAccountTypes();
      fetchAccountNatures();
    }
  }, [user]);

  const fetchAccountTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseUrl, {
        params: {
          companyid: user?.companyid,
          yearid: user?.yearid,
        },
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      setAccountTypes(res.data);
    } catch (error) {
      toast.error('Failed to fetch Account Type data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountNatures = async () => {
    try {
      const res = await axios.get(baseNatureUrl, {
        params: {
          companyid: user?.companyid,
          yearid: user?.yearid,
        },
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      setAccountNatures(res.data);
    } catch (error) {
      toast.error('Failed to fetch Account Nature data');
      console.error(error);
    }
  };

  const columns = React.useMemo<ColumnDef<AccountTypeRecord>[]>(() => [
    {
      accessorKey: 'AccID',
      header: 'ID',
      size: 50,
    },
    {
      accessorKey: 'AccName',
      header: 'Account Name',
    },
    {
      accessorKey: 'UnderID',
      header: 'Under ID',
      cell: info => {
        const underId = info.getValue<number | null>();
        const account = accountTypes.find(a => a.AccID === underId);
        return account ? account.AccName : '-';
      },
    },
    {
      accessorKey: 'NatureOfC',
      header: 'Nature Of C',
      cell: info => {
        const natureId = info.getValue<number | null>();
        const nature = accountNatures.find(n => n.nature_id === natureId);
        return nature ? nature.accountnature : '-';
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => (info.getValue() === 1 ? 'Active' : 'Inactive'),
    },
    {
      accessorKey: 'companyid',
      header: 'Company ID',
      cell: info => (info.getValue() !== null ? info.getValue() : '-'),
    },
    {
      accessorKey: 'yearid',
      header: 'Year ID',
      cell: info => (info.getValue() !== null ? info.getValue() : '-'),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Stack direction="horizontal" gap={2}>
          <Button size="sm" variant="primary" onClick={() => openEditModal(row.original)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleDelete(row.original.AccID)}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ], [accountNatures, accountTypes]);

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return accountTypes;
    const lower = searchTerm.toLowerCase();
    return accountTypes.filter(item =>
      item.AccName.toLowerCase().includes(lower) ||
      (item.UnderID !== null && item.UnderID.toString().includes(lower)) ||
      (item.NatureOfC !== null && item.NatureOfC.toString().includes(lower)) ||
      item.status.toString().includes(lower) ||
      (item.companyid !== null && item.companyid.toString().includes(lower)) ||
      (item.yearid !== null && item.yearid.toString().includes(lower))
    );
  }, [accountTypes, searchTerm]);

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

  const openEditModal = (record: AccountTypeRecord) => {
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
          'Content-Type': 'application/json',
        },
      });
      toast.success('Deleted successfully');
      fetchAccountTypes();
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
            <h4 className="mb-0">Account Type Master</h4>
            <Button variant="success" onClick={openAddModal} disabled={loading}>
              Add Account Type
            </Button>
          </Stack>

          <Form.Control
            type="search"
            placeholder="Search account types"
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

      <AddAccountTypeModal
        show={showAddModal}
        onHide={closeAddModal}
        user={user}
        onSuccess={() => {
          closeAddModal();
          fetchAccountTypes();
        }}
        accountNatures={accountNatures}
        accountTypes={accountTypes}
      />

      <EditAccountTypeModal
        show={showEditModal}
        onHide={closeEditModal}
        record={editingRecord}
        user={user}
        onSuccess={() => {
          closeEditModal();
          fetchAccountTypes();
        }}
        accountNatures={accountNatures}
        accountTypes={accountTypes}
      />
    </>
  );
};

interface AddAccountTypeModalProps {
  show: boolean;
  onHide: () => void;
  user: any;
  onSuccess: () => void;
  accountNatures: AccountNatureRecord[];
  accountTypes: AccountTypeRecord[];
}

const AddAccountTypeModal: React.FC<AddAccountTypeModalProps> = ({ show, onHide, user, onSuccess, accountNatures, accountTypes }) => {
  const [formData, setFormData] = useState({
    AccName: '',
    UnderID: accountTypes.length > 0 ? accountTypes[0].AccID : null,
    NatureOfC: null as number | null,
    status: 1,
    created_by_id: null as number | null,
    created_date: null as string | null,
    updated_by_id: null as number | null,
    updated_date: null as string | null,
    companyid: user?.companyid || null,
    yearid: user?.yearid || null,
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

  useEffect(() => {
    if (accountTypes.length > 0 && formData.UnderID === null) {
      setFormData(prev => ({
        ...prev,
        UnderID: accountTypes[0].AccID,
      }));
    }
  }, [accountTypes]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['status', 'created_by_id', 'updated_by_id', 'companyid', 'yearid', 'UnderID', 'NatureOfC'].includes(name)
        ? value === '' ? null : Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        companyid: user?.companyid || null,
        yearid: user?.yearid || null,
        created_by_id: user?.userid || null,
        created_date: new Date().toISOString(),
      };
      await axios.post('/api/accounttype', payload, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Account Type added successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to add Account Type');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onHide();
      setFormData({
        AccName: '',
        UnderID: accountTypes.length > 0 ? accountTypes[0].AccID : null,
        NatureOfC: null,
        status: 1,
        created_by_id: null,
        created_date: null,
        updated_by_id: null,
        updated_date: null,
        companyid: user?.companyid || null,
        yearid: user?.yearid || null,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={!loading}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={!loading}>
          <Modal.Title>Add Account Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="AccName" className="mb-3">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              name="AccName"
              value={formData.AccName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="UnderID" className="mb-3">
            <Form.Label>Under ID</Form.Label>
            <Form.Select
              name="UnderID"
              value={formData.UnderID === null ? '' : formData.UnderID}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
            >
              {accountTypes.length === 0 && <option value="">No Account Types</option>}
              {accountTypes.map(acc => (
                <option key={acc.AccID} value={acc.AccID}>
                  {acc.AccName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="NatureOfC" className="mb-3">
            <Form.Label>Nature Of C</Form.Label>
            <Form.Select
              name="NatureOfC"
              value={formData.NatureOfC === null ? '' : formData.NatureOfC}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
            >
              <option value="">Select Account Nature</option>
              {accountNatures.map(nature => (
                <option key={nature.nature_id} value={nature.nature_id}>
                  {nature.accountnature}
                </option>
              ))}
            </Form.Select>
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

interface EditAccountTypeModalProps {
  show: boolean;
  onHide: () => void;
  record: AccountTypeRecord | null;
  user: any;
  onSuccess: () => void;
  accountNatures: AccountNatureRecord[];
  accountTypes: AccountTypeRecord[];
}

const EditAccountTypeModal: React.FC<EditAccountTypeModalProps> = ({ show, onHide, record, user, onSuccess, accountNatures, accountTypes }) => {
  const [formData, setFormData] = useState({
    AccName: '',
    UnderID: null as number | null,
    NatureOfC: null as number | null,
    status: 1,
    created_by_id: null as number | null,
    created_date: null as string | null,
    updated_by_id: null as number | null,
    updated_date: null as string | null,
    companyid: null as number | null,
    yearid: null as number | null,
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

  useEffect(() => {
    if (record) {
      setFormData({
        AccName: record.AccName,
        UnderID: record.UnderID,
        NatureOfC: record.NatureOfC,
        status: record.status,
        created_by_id: null,
        created_date: null,
        updated_by_id: null,
        updated_date: null,
        companyid: record.companyid,
        yearid: record.yearid,
      });
    }
  }, [record]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['status', 'created_by_id', 'updated_by_id', 'companyid', 'yearid', 'UnderID', 'NatureOfC'].includes(name)
        ? value === '' ? null : Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!record) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        companyid: user?.companyid || null,
        yearid: user?.yearid || null,
        updated_by_id: user?.userid || null,
        updated_date: new Date().toISOString(),
      };
      await axios.put(`/api/accounttype/${record.AccID}`, payload, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Account Type updated successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to update Account Type');
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
          <Modal.Title>Edit Account Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="AccName" className="mb-3">
            <Form.Label>Account Name</Form.Label>
            <Form.Control
              type="text"
              name="AccName"
              value={formData.AccName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="UnderID" className="mb-3">
            <Form.Label>Under ID</Form.Label>
            <Form.Select
              name="UnderID"
              value={formData.UnderID === null ? '' : formData.UnderID}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
            >
              {accountTypes.length === 0 && <option value="">No Account Types</option>}
              {accountTypes.map(acc => (
                <option key={acc.AccID} value={acc.AccID}>
                  {acc.AccName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="NatureOfC" className="mb-3">
            <Form.Label>Nature Of C</Form.Label>
            <Form.Select
              name="NatureOfC"
              value={formData.NatureOfC === null ? '' : formData.NatureOfC}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={loading}
            >
              <option value="">Select Account Nature</option>
              {accountNatures.map(nature => (
                <option key={nature.nature_id} value={nature.nature_id}>
                  {nature.accountnature}
                </option>
              ))}
            </Form.Select>
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

export default AccountType;