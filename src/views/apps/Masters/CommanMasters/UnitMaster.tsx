import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Preloader } from '@/components/Misc/Preloader';
import { Button, Card, Stack, Pagination, Table, Form } from 'react-bootstrap';
import TitleHelmet from '@/components/Common/TitleHelmet';
import { useAuthContext } from '../../../../common/context/useAuthContext';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

interface unitmasterItem {
  unit_name: string;
  unitid: string;
  status: string;
  created_by_id: string;
  created_date: string;
  updated_by_id: string;
  updated_date: string;
  hotelid: string;
  client_code: string;
  marketid: string;
}

interface UnitmasterModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  unitmaster: unitmasterItem | null;
  onUpdateSelectedunitmaster?: (unitmaster: unitmasterItem) => void;
}

// Debounce utility function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const getStatusBadge = (status: number) => {
  return status === 0 ? (
    <span className="badge bg-success">Active</span>
  ) : (
    <span className="badge bg-danger">Inactive</span>
  );
};

// Main Unitmaster Component
const Unitmaster: React.FC = () => {
  const [unitmasterItem, setunitmasterItem] = useState<unitmasterItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedunitmaster, setSelectedunitmaster] = useState<unitmasterItem | null>(null);

  const fetchunitmaster = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/unitmaster');
      const data = await res.json();
      console.log('Fetched unitmaster:', data);
      setunitmasterItem(data);
    } catch (err) {
      toast.error('Failed to fetch Unitmaster');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchunitmaster();
  }, []);

  // Define columns for react-table with explicit widths
  const columns = useMemo<ColumnDef<unitmasterItem>[]>(
    () => [
      {
        id: 'srNo',
        header: 'Sr No',
        size: 50,
        cell: ({ row }) => <div style={{ textAlign: 'center' }}>{row.index + 1}</div>,
      },
      {
        accessorKey: 'unit_name',
        header: 'Unit Name',
        size: 200,
        cell: (info) => <div style={{ textAlign: 'center' }}>{info.getValue<string>()}</div>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        cell: (info) => {
          const statusValue = info.getValue<string | number>();
          return (
            <div style={{ textAlign: 'center' }}>
              {getStatusBadge(Number(statusValue))}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: () => <div style={{ textAlign: 'center' }}>Action</div>,
        size: 150,
        cell: ({ row }) => (
          <div className="d-flex gap-2 justify-content-center">
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleEditClick(row.original)}
              title="Edit Unitmaster"
            >
              <i className="fi fi-rr-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteunitmaster(row.original)}
              title="Delete Unitmaster"
            >
              <i className="fi fi-rr-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Initialize react-table with pagination and filtering
  const table = useReactTable({
    data: unitmasterItem,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      globalFilter: searchTerm,
    },
  });

  const handleSearch = useCallback(
    debounce((value: string) => {
      table.setGlobalFilter(value);
    }, 300),
    [table]
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleEditClick = (unitmaster: unitmasterItem) => {
    setSelectedunitmaster(unitmaster);
    setShowModal(true);
  };

  const handleDeleteunitmaster = async (unitmaster: unitmasterItem) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Unitmaster!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    });
    if (res.isConfirmed) {
      try {
        await fetch(`http://localhost:3001/api/unitmaster/${unitmaster.unitid}`, { method: 'DELETE' });
        toast.success('Deleted successfully');
        fetchunitmaster();
        setSelectedunitmaster(null);
      } catch {
        toast.error('Failed to delete');
      }
    }
  };

  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    const pageIndex = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();
    let startPage = Math.max(0, pageIndex - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pageIndex}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  // Combined UnitmasterModal Component
  const UnitmasterModal: React.FC<UnitmasterModalProps> = ({ show, onHide, onSuccess, unitmaster, onUpdateSelectedunitmaster }) => {
    const [unit_name, setunit_name] = useState('');
    const [status, setStatus] = useState('Active');
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext(); // Assuming useAuthContext provides user info

    const isEditMode = !!unitmaster;

    useEffect(() => {
      if (unitmaster && isEditMode) {
        setunit_name(unitmaster.unit_name);
        setStatus(String(unitmaster.status) === '0' ? 'Active' : 'Inactive');
        console.log('Edit unitmaster status:', unitmaster.status, typeof unitmaster.status);
      } else {
        setunit_name('');
        setStatus('Active');
      }
    }, [unitmaster]);

    const handleSubmit = async () => {
      if (!unit_name || !status) {
        toast.error('Unitmaster Name and Status are required');
        return;
      }

         // Use authenticated user ID and context
      const userId = user.id;
      const hotelId = user.hotelid || '1';
      const marketId = user.marketid || '1';


      setLoading(true);
      try {
        const statusValue = status === 'Active' ? 0 : 1;
        const currentDate = new Date().toISOString();
        
        const payload = {
          unit_name,
          status: statusValue,
          ...(isEditMode
            ? {
                unitid: unitmaster!.unitid,
                updated_by_id: userId,
                updated_date: currentDate,
                hotelid: unitmaster!.hotelid || hotelId,
                marketid: unitmaster!.marketid || marketId

              }
            : {
                created_by_id: userId,
                created_date: currentDate,
                hotelid: hotelId,
                marketid: marketId,
              }),
        };
        console.log('Sending to backend:', payload);

        const url = isEditMode
          ? `http://localhost:3001/api/unitmaster/${unitmaster!.unitid}`
          : 'http://localhost:3001/api/unitmaster';
        const method = isEditMode ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success(`Unitmaster ${isEditMode ? 'updated' : 'added'} successfully`);
          if (isEditMode && unitmaster && onUpdateSelectedunitmaster) {
            const updatedUnitmaster = {
              ...unitmaster,
              unit_name,
              status: statusValue.toString(),
              updated_by_id: userId,
              updated_date: currentDate,
              unitid: unitmaster.unitid,
            };
            onUpdateSelectedunitmaster(updatedUnitmaster);
          }
          setunit_name('');
          setStatus('Active');
          onSuccess();
          onHide();
        } else {
          const errorData = await res.json();
          console.log('Backend error:', errorData);
          toast.error(`Failed to ${isEditMode ? 'update' : 'add'} Unitmaster`);
        }
      } catch (err) {
        console.error(`${isEditMode ? 'Edit' : 'Add'} Unitmaster error:`, err);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (!show) return null;

    return (
      <div className="modal" style={{ display: show ? 'block' : 'none', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '600px', margin: '100px auto', borderRadius: '8px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{isEditMode ? 'Edit Unitmaster' : 'Add Unitmaster'}</h5>
            <button className="btn-close" onClick={onHide}></button>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Unitmaster Name <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                className="form-control"
                value={unit_name}
                onChange={(e) => setunit_name(e.target.value)}
                placeholder="Enter Unitmaster Name"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Status <span style={{ color: 'red' }}>*</span></label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-success me-2" onClick={handleSubmit} disabled={loading}>
              {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Save' : 'Create')}
            </button>
            <button className="btn btn-danger" onClick={onHide} disabled={loading}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <TitleHelmet title="Unitmaster List" />
      <Card className="m-1">
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h4 className="mb-0">Unitmaster List</h4>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button variant="success" onClick={() => setShowModal(true)}>
              <i className="bi bi-plus"></i> Add Unitmaster
            </Button>
          </div>
        </div>
        <div className="p-3">
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search..."
              value={searchTerm}
              onChange={onSearchChange}
              style={{ width: '350px', borderColor: '#ccc', borderWidth: '2px' }}
            />
          </div>
          <div className="flex-grow-1" style={{ overflowY: 'auto' }}>
            {loading ? (
              <Stack className="align-items-center justify-content-center flex-grow-1 h-100">
                <Preloader />
              </Stack>
            ) : (
              <>
                <Table responsive hover className="mb-4">
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id} style={{ width: header.column.columnDef.size, textAlign: header.id === 'actions' ? 'left' : 'center' }}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} style={{ textAlign: cell.column.id === 'actions' ? 'left' : 'center' }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Stack direction="horizontal" className="justify-content-between align-items-center">
                  <div>
                    <Form.Select
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => table.setPageSize(Number(e.target.value))}
                      style={{ width: '100px', display: 'inline-block', marginRight: '10px' }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </Form.Select>
                    <span className="text-muted">
                      Showing {table.getRowModel().rows.length} of {unitmasterItem.length} entries
                    </span>
                  </div>
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    />
                    {getPaginationItems()}
                    <Pagination.Next
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    />
                  </Pagination>
                </Stack>
              </>
            )}
          </div>
        </div>
      </Card>
      <UnitmasterModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedunitmaster(null);
        }}
        unitmaster={selectedunitmaster}
        onSuccess={fetchunitmaster}
        onUpdateSelectedunitmaster={setSelectedunitmaster}
      />
    </>
  );
};

export default Unitmaster;