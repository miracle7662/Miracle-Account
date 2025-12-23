import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Button, Card, Stack, Pagination, Table, Modal, Form } from 'react-bootstrap';
import { Preloader } from '@/components/Misc/Preloader';
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
interface CountryItem {
  countryid: string;
  country_name: string;
  country_code: string;
  country_capital: string;
  status: number;
  created_by_id: string;
  created_date: string;
  updated_by_id: string;
  updated_date: string;
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

interface CountryModalProps {
  show: boolean;
  onHide: () => void;
  country?: CountryItem | null;
  onSuccess: () => void;
  onUpdateSelectedCountry?: (country: CountryItem) => void;
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
const Country: React.FC = () => {
  const [countryItems, setCountryItems] = useState<CountryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('alls');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<CountryItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(null);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false);
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false);
  const [containerToggle, setContainerToggle] = useState<boolean>(false);

  const { user } = useAuthContext();

  // Fetch countries from API
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/countries', {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch countries');
      }
      
      const data = await res.json();
      setCountryItems(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      toast.error('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Table columns
  const columns = useMemo<ColumnDef<CountryItem>[]>(() => [
    {
      id: 'srNo',
      header: 'Sr No',
      size: 20,
      cell: (cell) => <span>{cell.row.index + 1}</span>,
    },
    {
      accessorKey: 'country_code',
      header: 'Code',
      size: 10,
      cell: (cell) => (
        <div className="avatar avatar-md rounded-circle bg-light text-muted">
          {cell.getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: 'country_name',
      header: 'Country',
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
              setSelectedCountry(cell.row.original);
              setShowEditModal(true);
            }}
            style={{ padding: '4px 8px' }}
          >
            <i className="fi fi-rr-edit" />
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDeleteCountry(cell.row.original)}
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
    data: filteredCountries,
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
        name: 'Countries',
        value: 'alls',
        icon: 'fi-rr-globe',
        badge: countryItems.length,
        badgeClassName: 'bg-primary-subtle text-primary',
      },
    ],
    [countryItems.length]
  );

  const labels: Label[] = useMemo(
    () => [
      { name: 'North America', value: 'north_america', gradient: 'success' },
      { name: 'Europe', value: 'europe', gradient: 'warning' },
      { name: 'Asia', value: 'asia', gradient: 'danger' },
      { name: 'Africa', value: 'africa', gradient: 'info' },
    ],
    []
  );

  // Search handler
  const handleSearch = (value: string) => {
    setSearchTerm(value); // Update input immediately
    filterCountries(value); // Debounced filtering
  };

  const filterCountries = useCallback(
    debounce((value: string) => {
      const searchValue = value.toLowerCase();
      const filtered = countryItems.filter((item) => {
        return (
          item.country_name.toLowerCase().includes(searchValue) ||
          item.country_code.toLowerCase().includes(searchValue) ||
          item.country_capital.toLowerCase().includes(searchValue)
        );
      });
      setFilteredCountries(filtered);
    }, 500),
    [countryItems]
  );

  // Category change handler
  const handleCategoryChange = useCallback(
    (categoryValue: string) => {
      setSelectedCategory(categoryValue);
      setSearchTerm('');
      setFilteredCountries(countryItems);
    },
    [countryItems]
  );

  // Country selection handler
  const handleCountryItemClick = useCallback((country: CountryItem) => {
    setSelectedCountry(country);
    setContainerToggle(true);
  }, []);

  // Delete country handler
  const handleDeleteCountry = async (country: CountryItem) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this country!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3001/api/countries/${country.countryid}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error('Failed to delete country');
        }
        
        toast.success('Deleted successfully');
        fetchCountries();
        setSelectedCountry(null);
      } catch (error) {
        console.error('Error deleting country:', error);
        toast.error('Failed to delete');
      }
    }
  };

  // Update selected country index
  useEffect(() => {
    const index = filteredCountries.findIndex((country) => country.countryid === selectedCountry?.countryid);
    setSelectedCountryIndex(index);
  }, [filteredCountries, selectedCountry]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (selectedCountryIndex < filteredCountries.length - 1) {
      setSelectedCountry(filteredCountries[selectedCountryIndex + 1]);
      setContainerToggle(true);
    }
  }, [selectedCountryIndex, filteredCountries]);

  const handlePrev = useCallback(() => {
    if (selectedCountryIndex > 0) {
      setSelectedCountry(filteredCountries[selectedCountryIndex - 1]);
      setContainerToggle(true);
    }
  }, [selectedCountryIndex, filteredCountries]);

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
      <TitleHelmet title="Countries" />
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
                      className={selectedCountry?.countryid === row.original.countryid ? 'active' : ''}
                      style={{ color: isActive ? 'black' : 'gray', fontWeight: isActive ? 'bold' : 'normal' }}
                      onClick={() => handleCountryItemClick(row.original)}
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
            ) : !selectedCountry ? (
              <Stack className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center" style={{ maxWidth: '420px' }}>
                <i className="fi fi-rr-globe fs-48 mb-6" />
                <h4 className="fw-bold">Select a country to view</h4>
                <p className="fs-15 fw-light text-muted mb-4">Select a country from the left sidebar to view its details.</p>
                <Button variant="neutral" onClick={() => setShowAddModal(true)}>
                  <i className="fi fi-br-plus fs-10" />
                  <span className="ms-2">Add New Country</span>
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
                          setSelectedCountry(null);
                          setContainerToggle(false);
                          setSidebarLeftToggle(false);
                        }}
                      >
                        <i className="fi fi-rr-arrow-left" />
                      </Button>
                      <h5 className="mb-1">Countries</h5>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="light" className="btn-icon" onClick={handleMenuClick} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-menu-burger" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={handlePrev} disabled={selectedCountryIndex <= 0} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-angle-left" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={handleNext} disabled={selectedCountryIndex >= filteredCountries.length - 1} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-angle-right" />
                      </Button>
                      <Button variant="light" className="btn-icon" onClick={() => handleDeleteCountry(selectedCountry)} style={{ padding: '8px', fontSize: '1.2rem' }}>
                        <i className="fi fi-rr-trash" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="apps-contact-details p-4">
                  <div className="mb-4">
                    <h5 className="mb-2">{selectedCountry.country_name}</h5>
                    <p className="text-muted mb-0">Country Code: {selectedCountry.country_code}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-0">Capital: {selectedCountry.country_capital}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)} />
      </Card>
      <CountryModal show={showAddModal} onHide={() => setShowAddModal(false)} onSuccess={fetchCountries} />
      <CountryModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        country={selectedCountry}
        onSuccess={fetchCountries}
        onUpdateSelectedCountry={setSelectedCountry}
      />
    </>
  );
};

// CountryModal Component
const CountryModal: React.FC<CountryModalProps> = ({ show, onHide, onSuccess, country, onUpdateSelectedCountry }) => {
  const [country_name, setName] = useState('');
  const [country_code, setCode] = useState('');
  const [country_capital, setCapital] = useState('');
  const [status, setStatus] = useState('Active');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuthContext();

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

  const isEditMode = !!country;

  useEffect(() => {
    if (country && isEditMode) {
      setName(country.country_name);
      setCode(country.country_code);
      setCapital(country.country_capital);
      setStatus(String(country.status) === '0' ? 'Active' : 'Inactive');
    } else {
      setName('');
      setCode('');
      setCapital('');
      setStatus('Active');
    }
  }, [country, show]);

  const handleSubmit = async () => {
    if (!country_name || !country_code || !country_capital || !status) {
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
        country_name,
        country_code,
        country_capital,
        status: statusValue,
        ...(isEditMode
          ? { countryid: country!.countryid, updated_by_id: user.userid, updated_date: currentDate }
          : { created_by_id: user.userid, created_date: currentDate }),
      };

      const url = isEditMode
        ? `http://localhost:3001/api/countries/${country!.countryid}`
        : 'http://localhost:3001/api/countries';
      const method = isEditMode ? 'PUT' : 'POST';

      console.log('Sending to backend:', payload);
      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`Country ${isEditMode ? 'updated' : 'added'} successfully`);
        if (isEditMode && country && onUpdateSelectedCountry) {
          const updatedCountry = {
            ...country,
            country_name,
            country_code,
            country_capital,
            status: statusValue,
            updated_by_id: user.userid,
            updated_date: currentDate,
          };
          onUpdateSelectedCountry(updatedCountry);
        }
        onSuccess();
        onHide();
      } else {
        toast.error(`Failed to ${isEditMode ? 'update' : 'add'} country`);
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Edit Country' : 'Add New Country'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Country Name <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter country name"
                  value={country_name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Country Code <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter country code"
                  value={country_code}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 3 && /^[0-9]*$/.test(value)) {
                      setCode(value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  maxLength={3}
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
                  value={country_capital}
                  onChange={(e) => setCapital(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Status <span style={{ color: 'red' }}>*</span></Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{ borderColor: '#ccc' }}
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

export default Country;