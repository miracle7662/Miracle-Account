
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Preloader } from '@/components/Misc/Preloader';
import { Button, Card, Stack, Pagination, Table, Modal, Form } from 'react-bootstrap';
import { ContactSearchBar, ContactSidebar } from '@/components/Apps/Contact';
import TitleHelmet from '@/components/Common/TitleHelmet';
import { useAuthContext } from '@/common';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';

// Interfaces
interface StateItem {
  stateid: string;
  state_name: string;
  state_code: string;
  state_capital: string;
  countryid: string;
  country_name?: string;
  status: number;
  created_by_id: string;
  created_date: string;
  updated_by_id: string;
  updated_date: string;
}

interface CountryItem {
  countryid: string;
  country_name: string;
  status: number;
}

interface Category {
  name: string;
  value: string;
  icon: string;
  badge?: number;
  badgeClassName?: string;
}

interface Label {
  name: string;
  value: string;
  gradient: string;
}

interface StateModalProps {
  show: boolean;
  onHide: () => void;
  state?: StateItem | null;
  onSuccess: () => void;
  onUpdateSelectedState?: (state: StateItem) => void;
}

// Utility Functions
const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Status badge for table
const getStatusBadge = (status: number) => {
  return status === 0 ? (
    <span className="badge bg-success">Active</span>
  ) : (
    <span className="badge bg-danger">Inactive</span>
  );
};

// Main Component
const States: React.FC = () => {
  const [stateItems, setStateItems] = useState<StateItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('alls');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredStates, setFilteredStates] = useState<StateItem[]>([]);
  const [selectedState, setSelectedState] = useState<StateItem | null>(null);
  const [selectedStateIndex, setSelectedStateIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false);
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false);
  const [containerToggle, setContainerToggle] = useState<boolean>(false);

  const { user } = useAuthContext();

  // Fetch states from API
  const fetchStates = async () => {
    if (!user?.token) {
      toast.error('Authentication required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/states', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setStateItems(data);
        setFilteredStates(data);
      } else {
        setStateItems([]);
        setFilteredStates([]);
        toast.error('Invalid data format received for states');
      }
    } catch (err) {
      setStateItems([]);
      setFilteredStates([]);
      toast.error('Failed to fetch states');
      console.error('Fetch states error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, [user?.token]);  // Refetch if token changes

  // Table columns
  const columns = useMemo<ColumnDef<StateItem>[]>(() => [
    {
      id: 'srNo',
      header: 'Sr No',
      size: 20,
      cell: (cell) => <span>{cell.row.index + 1}</span>,
    },
    {
      accessorKey: 'state_code',
      header: 'Code',
      size: 10,
      cell: (cell) => (
        <div className="avatar avatar-md rounded-circle bg-light text-muted">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: 'state_name',
      header: 'State',
      size: 10,
      cell: (cell) => <h6 className="mb-1">{cell.getValue<string>()}</h6>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 150,
      cell: (cell) => {
        const statusValue = cell.getValue<string | number>();
        console.log('Status value:', statusValue, typeof statusValue); // Debug log
        return getStatusBadge(Number(statusValue));
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 30,
      cell: (cell) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            variant="success"
            onClick={() => {
              setSelectedState(cell.row.original);
              setShowEditModal(true);
            }}
            style={{ padding: '4px 8px' }}
          >
            <i className="fi fi-rr-edit" />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteState(cell.row.original)}
            style={{ padding: '4px 8px' }}
          >
            <i className="fi fi-rr-trash" />
          </Button>
        </div>
      ),
    },
  ], []);

  // Initialize table
  const table = useReactTable({
    data: filteredStates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  // Sidebar categories and labels
  const categories: Category[] = useMemo(
    () => [
      {
        name: 'States',
        value: 'alls',
        icon: 'fi-rr-map',
        badge: stateItems.length,
        badgeClassName: 'bg-primary-subtle text-primary',
      },
    ],
    [stateItems.length]
  );

  const labels: Label[] = useMemo(
    () => [
      { name: 'North Region', value: 'north', gradient: 'success' },
      { name: 'South Region', value: 'south', gradient: 'warning' },
      { name: 'East Region', value: 'east', gradient: 'danger' },
      { name: 'West Region', value: 'west', gradient: 'info' },
    ],
    []
  );

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterStates(value);
  };

  const filterStates = useCallback(
    debounce((value: string) => {
      const searchValue = value.toLowerCase();
      const filtered = stateItems.filter((item) => {
        return (
          item.state_name.toLowerCase().includes(searchValue) ||
          item.state_code.toLowerCase().includes(searchValue) ||
          item.state_capital.toLowerCase().includes(searchValue) ||
          (item.country_name && item.country_name.toLowerCase().includes(searchValue))
        );
      });
      setFilteredStates(filtered);
    }, 500),
    [stateItems]
  );

  // Category change handler
  const handleCategoryChange = useCallback(
    (categoryValue: string) => {
      setSelectedCategory(categoryValue);
      setSearchTerm('');
      setFilteredStates(stateItems);
    },
    [stateItems]
  );

  // State selection handler
  const handleStateItemClick = useCallback((state: StateItem) => {
    setSelectedState(state);
    setContainerToggle(true);
  }, []);

  // Delete state handler
  const handleDeleteState = async (state: StateItem) => {
    if (!user?.token) {
      toast.error('Authentication required');
      return;
    }
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this state!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/states/${state.stateid}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to delete state');
        }
        toast.success('State deleted successfully');
        fetchStates();
        setSelectedState(null);
        setContainerToggle(false);
      } catch (error) {
        console.error('Error deleting state:', error);
        toast.error('Failed to delete state');
      }
    }
  };

  // Update selected state index
  useEffect(() => {
    const index = filteredStates.findIndex((state) => state.stateid === selectedState?.stateid);
    setSelectedStateIndex(index);
  }, [filteredStates, selectedState]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (selectedStateIndex < filteredStates.length - 1) {
      setSelectedState(filteredStates[selectedStateIndex + 1]);
      setContainerToggle(true);
    }
  }, [selectedStateIndex, filteredStates]);

  const handlePrev = useCallback(() => {
    if (selectedStateIndex > 0) {
      setSelectedState(filteredStates[selectedStateIndex - 1]);
      setContainerToggle(true);
    }
  }, [selectedStateIndex, filteredStates]);

  // Card classes
  const cardClasses = useMemo(() => {
    const classes = ['apps-card'];
    if (sidebarMiniToggle) classes.push('apps-sidebar-mini-toggle');
    if (containerToggle) classes.push('apps-container-toggle');
    if (sidebarLeftToggle) classes.push('apps-sidebar-left-toggle');
    return classes.join(' ');
  }, [sidebarMiniToggle, containerToggle, sidebarLeftToggle]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991.98 && sidebarLeftToggle) {
        setSidebarLeftToggle(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarLeftToggle]);

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSidebarLeftToggle((prev) => !prev);
  }, []);

  return (
    <>
      <TitleHelmet title="States" />
      <style>
        {`
          .apps-card,
          .apps-sidebar-left,
          .apps-container {
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
      <Card className={cardClasses}>
        <div className="apps-sidebar-mini w-70">
          <ContactSidebar
            categories={categories}
            labels={labels}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            setSidebarMiniToggle={setSidebarMiniToggle}
          />
        </div>
        <div className="apps-sidebar apps-sidebar-left apps-sidebar-md" style={{ minWidth: '530px' }}>
          <ContactSearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <div className="apps-sidebar-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: '250px' }}>
            <Table responsive size="sm" className="mb-0" style={{ minWidth: '300px' }}>
              <thead>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header: any) => (
                      <th key={header.id} style={{ width: header.column.columnDef.size }}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row: any) => {
                  const isActive = row.original.status === 0 || row.original.status === '0';
                  return (
                    <tr
                      key={row.id}
                      className={selectedState?.stateid === row.original.stateid ? 'active' : ''}
                      style={{ color: isActive ? 'black' : 'gray', fontWeight: isActive ? 'bold' : 'normal' }}
                      onClick={() => handleStateItemClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell: any) => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Stack className="p-2 border-top d-flex flex-row align-items-center justify-content-between" style={{ gap: '6px', padding: '8px 12px' }}>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                style={{ border: '1px solid #0d6efd', borderRadius: '4px', padding: '2px 4px', fontSize: '12px', backgroundColor: '#fff', color: '#6c757d', cursor: 'pointer', width: '100px', height: '30px' }}
              >
                {[10, 20, 30].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <Pagination className="m-0" style={{ display: 'flex', alignItems: 'center', gap: '3px', marginRight: '20px' }}>
                <Pagination.Prev
                  onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
                  disabled={table.getState().pagination.pageIndex === 0}
                  style={{ border: '1px solid #e5e7eb', color: table.getState().pagination.pageIndex === 0 ? '#d3d3d3' : '#6c757d', padding: '2px 4px', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '12px', lineHeight: '1' }}
                >
                  <i className="fi fi-rr-angle-left" style={{ fontSize: '12px' }} />
                </Pagination.Prev>
                <Pagination.Item
                  active
                  style={{ backgroundColor: '#0d6efd', border: '1px solid #0d6efd', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', lineHeight: '1', minWidth: '24px', textAlign: 'center' }}
                >
                  {table.getState().pagination.pageIndex + 1}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
                  disabled={table.getState().pagination.pageIndex === table.getPageCount() - 1}
                  style={{ border: '1px solid #e5e7eb', color: table.getState().pagination.pageIndex === table.getPageCount() - 1 ? '#d3d3d3' : '#6c757d', padding: '2px 4px', borderRadius: '4px', backgroundColor: 'transparent', fontSize: '12px', lineHeight: '1' }}
                >
                  <i className="fi fi-rr-angle-right" style={{ fontSize: '12px' }} />
                </Pagination.Next>
              </Pagination>
            </Stack>
          </div>
        </div>
        <div className={`apps-container ${containerToggle ? 'w-full' : ''}`}>
          <div className="apps-container-inner" style={{ minHeight: '100vh' }}>
            {loading ? (
              <Stack className="align-items-center justify-content-center h-100">
                <Preloader />
              </Stack>
            ) : !selectedState ? (
              <Stack className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center" style={{ maxWidth: '420px' }}>
                <i className="fi fi-rr-map fs-48 mb-6" />
                <h4 className="fw-bold">Select a state to view</h4>
                <p className="fs-15 fw-light text-muted mb-4">Select a state from the left sidebar to view its details.</p>
                <Button variant="neutral" onClick={() => setShowAddModal(true)}>
                  <i className="fi fi-br-plus fs-10" />
                  <span className="ms-2">Add New State</span>
                </Button>
              </Stack>
            ) : (
              <div>
                <div className="apps-contact-details-header p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="light"
                        size="sm"
                        className="btn-icon me-3"
                        onClick={() => {
                          setSelectedState(null);
                          setContainerToggle(false);
                          setSidebarLeftToggle(false);
                        }}
                      >
                        <i className="fi fi-rr-arrow-left" />
                      </Button>
                      <h5 className="mb-1">States</h5>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="light" className="btn-icon" onClick={handleMenuClick} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-menu-burger" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={handlePrev} disabled={selectedStateIndex <= 0} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-angle-left" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={handleNext} disabled={selectedStateIndex >= filteredStates.length - 1} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-angle-right" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={() => handleDeleteState(selectedState)} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-trash" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="apps-contact-details p-4">
                  <div className="mb-4">
                    <h5 className="mb-2">{selectedState.state_name}</h5>
                    <p className="text-muted mb-0">State Code: {selectedState.state_code}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">Country: {selectedState.country_name || 'N/A'}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">Capital: {selectedState.state_capital}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">Status: {selectedState.status === 0 ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)} />
      </Card>
      <StateModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={fetchStates}
      />
      <StateModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        state={selectedState}
        onSuccess={fetchStates}
        onUpdateSelectedState={setSelectedState}
      />
    </>
  );
};

// Add State Modal
const StateModal: React.FC<StateModalProps> = ({ show, onHide, onSuccess, state, onUpdateSelectedState }) => {
  const [state_name, setName] = useState('');
  const [state_code, setCode] = useState('');
  const [state_capital, setCapital] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Active');
  const [countryItems, setCountryItems] = useState<CountryItem[]>([]);
  const [countryId, setCountryId] = useState<number | null>(null);

  const { user } = useAuthContext();

  // Fetch countries with auth
  const fetchCountries = async () => {
    if (!user?.token) return;
    try {
      const res = await fetch('http://localhost:3001/api/countries', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch countries');
      const data = await res.json();
      setCountryItems(data.filter((c: CountryItem) => Number(c.status) === 0));
      // Auto-select if editing
      if (state && data.length > 0) {
        const matchingCountry = data.find((c: CountryItem) => c.countryid === state.countryid);
        if (matchingCountry) setCountryId(Number(matchingCountry.countryid));
      }
    } catch (err) {
      console.error('Error fetching countries:', err);
      toast.error('Failed to fetch countries for state modal');
    }
  };

  // Enter key handler to focus next field, skipping disabled
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

  const isEditMode = !!state;

  useEffect(() => {
    fetchCountries();
  }, [user?.token]);

  useEffect(() => {
    if (state && isEditMode) {
      setName(state.state_name);
      setCode(state.state_code);
      setCapital(state.state_capital);
      setCountryId(Number(state.countryid));
      setStatus(String(state.status) === '0' ? 'Active' : 'Inactive');
    } else {
      setName('');
      setCode('');
      setCapital('');
      setCountryId(null);
      setStatus('Active');
    }
  }, [state, show]);

  const handleSubmit = async () => {
    if (!user?.token) {
      toast.error('Authentication required');
      return;
    }
    if (!state_name || !state_code || !state_capital || !countryId || !status) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const statusValue = status === 'Active' ? 0 : 1;
      const currentDate = new Date().toISOString();
      const payload = {
        companyid: user.companyid,
        yearid: user.yearid,
        state_name,
        state_code,
        state_capital,
        countryid: countryId,
        status: statusValue,
        ...(isEditMode ? { stateid: state!.stateid, updated_by_id: user.userid, updated_date: currentDate } : { created_by_id: user.userid, created_date: currentDate }),
      };

      const url = isEditMode
        ? `http://localhost:3001/api/states/${state!.stateid}`
        : 'http://localhost:3001/api/states';
      const method = isEditMode ? 'PUT' : 'POST';

      console.log('Sending to backend:', payload);
      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`State ${isEditMode ? 'updated' : 'added'} successfully`);
        if (isEditMode && state && onUpdateSelectedState) {
          onUpdateSelectedState({ ...state, state_name, state_code, state_capital, countryid: String(countryId), status: statusValue });
        }
        onSuccess();
        onHide();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || `Failed to ${isEditMode ? 'update' : 'add'} state`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit State' : 'Add New State'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>State Name <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state name"
                  value={state_name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>State Code <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state code"
                  value={state_code}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    if (value.length <= 4 && /^[A-Z0-9]*$/.test(value)) {
                      setCode(value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  maxLength={4}
                  style={{ borderColor: '#ccc' }}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Capital City <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter capital city"
                  value={state_capital}
                  onChange={(e) => setCapital(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Country <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  value={countryId ?? ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCountryId(value === '' ? null : Number(value));
                  }}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                  disabled={loading}
                >
                  <option value="">Select a country</option>
                  {countryItems.map((country) => (
                    <option key={country.countryid} value={country.countryid}>
                      {country.country_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                  disabled={loading}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancel
        </Button>
        <Button id="submit-btn" variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (isEditMode ? 'Updating...' : 'Adding...') : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
  
export default States;