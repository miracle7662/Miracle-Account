import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Preloader } from '@/components/Misc/Preloader';
import { Button, Card, Stack, Pagination, Table, Modal, Form } from 'react-bootstrap';
import { ContactSearchBar } from '@/components/Apps/Contact';
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
interface CityItem {
  cityid: string;
  city_name: string;
  city_code: string;
  stateId: string;
  state_name?: string;
  countryid: string;
  country_name?: string;
  iscoastal?: number;
  status: number;
  created_by_id: string;
  created_date: string;
  updated_by_id: string;
  updated_date: string;
}

interface StateItem {
  stateid: string;
  state_name: string;
  status: number;
}

interface CityModalProps {
  show: boolean;
  onHide: () => void;
  city?: CityItem | null;
  onSuccess: () => void;
  onUpdateSelectedCity?: (city: CityItem) => void;
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
const City: React.FC = () => {
  const [cityItems, setCityItems] = useState<CityItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<CityItem[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityItem | null>(null);
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false);
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false);
  const [containerToggle, setContainerToggle] = useState<boolean>(false);

  const { user } = useAuthContext();

  // Fetch cities from API
  const fetchCities = async () => {
    if (!user?.token) {
      toast.error('Authentication required');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/cities', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      // Map city_Code to city_code for frontend consistency
      const mappedData = data.map((item: any) => ({
        ...item,
        city_code: item.city_Code,
      }));
      setCityItems(mappedData);
      setFilteredCities(mappedData);
    } catch (err) {
      console.error('Fetch cities error:', err);
      setCityItems([]);
      setFilteredCities([]);
      toast.error('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [user?.token]);  // Refetch if token changes

  // Table columns
  const columns = useMemo<ColumnDef<CityItem>[]>(() => [
    {
      id: 'srNo',
      header: 'Sr No',
      size: 20,
      cell: (cell) => <span>{cell.row.index + 1}</span>,
    },
    {
      accessorKey: 'city_code',
      header: 'Code',
      size: 10,
      cell: (cell) => (
        <div className="avatar avatar-md rounded-circle bg-light text-muted">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: 'city_name',
      header: 'City',
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
              setSelectedCity(cell.row.original);
              setShowEditModal(true);
            }}
            style={{ padding: '4px 8px' }}
          >
            <i className="fi fi-rr-edit" />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteCity(cell.row.original)}
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
    data: filteredCities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterCities(value);
  };

  const filterCities = useCallback(
    debounce((value: string) => {
      const searchValue = value.toLowerCase();
      const filtered = cityItems.filter((item) => {
        return (
          item.city_name.toLowerCase().includes(searchValue) ||
          item.city_code.toLowerCase().includes(searchValue) ||
          (item.state_name && item.state_name.toLowerCase().includes(searchValue)) ||
          (item.country_name && item.country_name.toLowerCase().includes(searchValue))
        );
      });
      setFilteredCities(filtered);
    }, 500),
    [cityItems]
  );

  // City selection handler
  const handleCityItemClick = useCallback((city: CityItem) => {
    setSelectedCity(city);
    setContainerToggle(true);
  }, []);

  // Delete city handler
  const handleDeleteCity = async (city: CityItem) => {
    if (!user?.token) {
      toast.error('Authentication required');
      return;
    }
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this city!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/cities/${city.cityid}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to delete city');
        }
        toast.success('City deleted successfully');
        fetchCities();
        setSelectedCity(null);
        setContainerToggle(false);
      } catch (error) {
        console.error('Error deleting city:', error);
        toast.error('Failed to delete city');
      }
    }
  };

  // Update selected city index
  useEffect(() => {
    const index = filteredCities.findIndex((city) => city.cityid === selectedCity?.cityid);
    setSelectedCityIndex(index);
  }, [filteredCities, selectedCity]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (selectedCityIndex < filteredCities.length - 1) {
      setSelectedCity(filteredCities[selectedCityIndex + 1]);
      setContainerToggle(true);
    }
  }, [selectedCityIndex, filteredCities]);

  const handlePrev = useCallback(() => {
    if (selectedCityIndex > 0) {
      setSelectedCity(filteredCities[selectedCityIndex - 1]);
      setContainerToggle(true);
    }
  }, [selectedCityIndex, filteredCities]);

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
      <TitleHelmet title="Cities" />
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
          {/* Optional: Add ContactSidebar if needed */}
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
                      className={selectedCity?.cityid === row.original.cityid ? 'active' : ''}
                      style={{ color: isActive ? 'black' : 'gray', fontWeight: isActive ? 'bold' : 'normal' }}
                      onClick={() => handleCityItemClick(row.original)}
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
            ) : !selectedCity ? (
              <Stack className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center" style={{ maxWidth: '420px' }}>
                <i className="fi fi-rr-building fs-48 mb-6" />
                <h4 className="fw-bold">Select a city to view</h4>
                <p className="fs-15 fw-light text-muted mb-4">Select a city from the left sidebar to view its details.</p>
                <Button variant="neutral" onClick={() => setShowAddModal(true)}>
                  <i className="fi fi-br-plus fs-10" />
                  <span className="ms-2">Add New City</span>
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
                          setSelectedCity(null);
                          setContainerToggle(false);
                          setSidebarLeftToggle(false);
                        }}
                      >
                        <i className="fi fi-rr-arrow-left" />
                      </Button>
                      <h5 className="mb-1">Cities</h5>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="light" className="btn-icon" onClick={handleMenuClick} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-menu-burger" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={handlePrev} disabled={selectedCityIndex <= 0} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-angle-left" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={handleNext} disabled={selectedCityIndex >= filteredCities.length - 1} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-angle-right" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={() => handleDeleteCity(selectedCity)} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-trash" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="apps-contact-details p-4">
                  <div className="mb-4">
                    <h5 className="mb-2">{selectedCity.city_name}</h5>
                    <p className="text-muted mb-0">City Code: {selectedCity.city_code}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">State: {selectedCity.state_name}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">Country: {selectedCity.country_name}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">Status: {selectedCity.status === 0 ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)} />
      </Card>
      <CityModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSuccess={fetchCities}
      />
      <CityModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        city={selectedCity}
        onSuccess={fetchCities}
        onUpdateSelectedCity={setSelectedCity}
      />
    </>
  );
};

// Add City Modal
const CityModal: React.FC<CityModalProps> = ({ show, onHide, onSuccess, city, onUpdateSelectedCity }) => {
  const [city_name, setName] = useState('');
  const [city_code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Active');
  const [stateItems, setStateItems] = useState<StateItem[]>([]);
  const [stateId, setStateId] = useState<number | null>(null);

  const { user } = useAuthContext();

  // Inline fetchStates with auth
  const fetchStates = async () => {
    if (!user?.token) return;
    try {
      const res = await fetch('http://localhost:3001/api/states', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch states');
      const data = await res.json();
      setStateItems(data.filter((s: StateItem) => Number(s.status) === 0));
      // Auto-select if editing
      if (city && data.length > 0) {
        const matchingState = data.find((s: StateItem) => s.stateid === city.stateId);
        if (matchingState) setStateId(Number(matchingState.stateid));
      }
    } catch (err) {
      console.error('Error fetching states:', err);
      toast.error('Failed to fetch states');
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

  const isEditMode = !!city;

  useEffect(() => {
    fetchStates();
  }, [user?.token]);

  useEffect(() => {
    if (city && isEditMode) {
      setName(city.city_name);
      setCode(city.city_code);
      setStateId(Number(city.stateId));
      setStatus(String(city.status) === '0' ? 'Active' : 'Inactive');
    } else {
      setName('');
      setCode('');
      setStateId(null);
      setStatus('Active');
    }
  }, [city, show]);

  const handleSubmit = async () => {
    if (!user?.token) {
      toast.error('Authentication required');
      return;
    }
    if (!city_name || !city_code || !stateId || !status) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const statusValue = status === 'Active' ? 0 : 1;
      const currentDate = new Date().toISOString();
      
      // Map frontend fields to backend expected fields
      const payload = {
        companyid: user.companyid,
        yearid: user.yearid,
        city_name,
        city_Code: city_code, // Backend expects city_Code (capital C)
        stateId,     // Backend expects stateId (capital I)
        iscoastal: 0,         // Hardcoded as not in UI
        status: statusValue,
        ...(isEditMode 
          ? { 
              updated_by_id: user.userid, 
              updated_date: currentDate 
            } 
          : { 
              created_by_id: user.userid, 
              created_date: currentDate 
            }
        ),
      };

      const url = isEditMode
        ? `http://localhost:3001/api/cities/${city!.cityid}`
        : 'http://localhost:3001/api/cities';
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
        await res.json();
        toast.success(isEditMode ? 'City updated successfully' : 'City added successfully');
        
        if (isEditMode && city && onUpdateSelectedCity) {
          onUpdateSelectedCity({ 
            ...city, 
            city_name, 
            city_code, 
            stateId: String(stateId), 
            status: statusValue 
          });
        }
        
        onSuccess();
        onHide();
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || (isEditMode ? 'Failed to update city' : 'Failed to add city'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit City' : 'Add New City'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>City Name <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city name"
                  value={city_name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                  disabled={loading}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>City Code <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city code"
                  value={city_code}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    if (value.length <= 4 && /^[A-Z0-9]*$/.test(value)) {
                      setCode(value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  maxLength={4}
                  style={{ borderColor: '#ccc' }}
                  disabled={loading}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>State <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  value={stateId ?? ''}
                  onChange={(e) => setStateId(e.target.value === '' ? null : Number(e.target.value))}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                  disabled={loading}
                >
                  <option value="">Select a state</option>
                  {stateItems.map((state) => (
                    <option key={state.stateid} value={state.stateid}>
                      {state.state_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
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

export default City;