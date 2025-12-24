import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { Preloader } from '@/components/Misc/Preloader'
import { Button, Card, Stack, Pagination, Table } from 'react-bootstrap'
import {
  ContactSearchBar,
  ContactSidebar,
} from '@/components/Apps/Contact'
import TitleHelmet from '@/components/Common/TitleHelmet'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

// Define country data type
interface CountryItem {
  id: string
  code: string
  name: string
  details: {
    capital: string
  }
  alls: boolean
  starred: boolean
  label?: string | { name: string; value: string; gradient: string }
}

interface Category {
  name: string
  value: string
  icon: string
  badge?: number
  badgeClassName?: string
}

interface Label {
  name: string
  value: string
  gradient: string
}

// Sample country data (15 items)
const initialCountryItems: CountryItem[] = [
  {
    id: '1',
    code: '+1',
    name: 'United States',
    details: { capital: 'Washington, D.C.' },
    alls: true,
    starred: false,
    label: { name: 'North America', value: 'north_america', gradient: 'success' },
  },
  {
    id: '2',
    code: '+44',
    name: 'United Kingdom',
    details: { capital: 'London' },
    alls: true,
    starred: false,
    label: { name: 'Europe', value: 'europe', gradient: 'warning' },
  },
  {
    id: '3',
    code: '+91',
    name: 'India',
    details: { capital: 'New Delhi' },
    alls: true,
    starred: false,
    label: { name: 'Asia', value: 'asia', gradient: 'danger' },
  },
  {
    id: '4',
    code: '+81',
    name: 'Japan',
    details: { capital: 'Tokyo' },
    alls: true,
    starred: false,
    label: { name: 'Asia', value: 'asia', gradient: 'danger' },
  },
  {
    id: '5',
    code: '+33',
    name: 'France',
    details: { capital: 'Paris' },
    alls: true,
    starred: false,
    label: { name: 'Europe', value: 'europe', gradient: 'warning' },
  },
  {
    id: '6',
    code: '+49',
    name: 'Germany',
    details: { capital: 'Berlin' },
    alls: true,
    starred: false,
    label: { name: 'Europe', value: 'europe', gradient: 'warning' },
  },
  {
    id: '7',
    code: '+55',
    name: 'Brazil',
    details: { capital: 'Brasília' },
    alls: true,
    starred: false,
    label: { name: 'South America', value: 'south_america', gradient: 'info' },
  },
  {
    id: '8',
    code: '+61',
    name: 'Australia',
    details: { capital: 'Canberra' },
    alls: true,
    starred: false,
    label: { name: 'Oceania', value: 'oceania', gradient: 'primary' },
  },
  {
    id: '9',
    code: '+86',
    name: 'China',
    details: { capital: 'Beijing' },
    alls: true,
    starred: false,
    label: { name: 'Asia', value: 'asia', gradient: 'danger' },
  },
  {
    id: '10',
    code: '+27',
    name: 'South Africa',
    details: { capital: 'Pretoria' },
    alls: true,
    starred: false,
    label: { name: 'Africa', value: 'africa', gradient: 'dark' },
  },
  {
    id: '11',
    code: '+52',
    name: 'Mexico',
    details: { capital: 'Mexico City' },
    alls: true,
    starred: false,
    label: { name: 'North America', value: 'north_america', gradient: 'success' },
  },
  {
    id: '12',
    code: '+39',
    name: 'Italy',
    details: { capital: 'Rome' },
    alls: true,
    starred: false,
    label: { name: 'Europe', value: 'europe', gradient: 'warning' },
  },
  {
    id: '13',
    code: '+34',
    name: 'Spain',
    details: { capital: 'Madrid' },
    alls: true,
    starred: false,
    label: { name: 'Europe', value: 'europe', gradient: 'warning' },
  },
  {
    id: '14',
    code: '+7',
    name: 'Russia',
    details: { capital: 'Moscow' },
    alls: true,
    starred: false,
    label: { name: 'Europe', value: 'europe', gradient: 'warning' },
  },
  {
    id: '15',
    code: '+1',
    name: 'Canada',
    details: { capital: 'Ottawa' },
    alls: true,
    starred: false,
    label: { name: 'North America', value: 'north_america', gradient: 'success' },
  },
]

// AddCountryModal component
const AddCountryModal: React.FC<{
  show: boolean
  onHide: () => void
  onAddCountry: (countryData: Omit<CountryItem, 'id' | 'alls' | 'starred' | 'label'>) => void
}> = ({ show, onHide, onAddCountry }) => {
  const [name, setName] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [capital, setCapital] = useState<string>('')

  if (!show) return null

  const handleAdd = () => {
    onAddCountry({
      name,
      code,
      details: {
        capital,
      },
    })
    setName('')
    setCode('')
    setCapital('')
    onHide()
  }

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '500px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Add New Country</h3>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Country name (e.g., Canada)"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Country code (e.g., +1)"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          placeholder="Capital (e.g., Ottawa)"
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-2" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

// EditCountryModal component
const EditCountryModal: React.FC<{
  show: boolean
  onHide: () => void
  country: CountryItem | null
  onEditCountry: (id: string, updatedData: Omit<CountryItem, 'id' | 'alls' | 'starred' | 'label'>) => void
}> = ({ show, onHide, country, onEditCountry }) => {
  const [name, setName] = useState<string>(country?.name || '')
  const [code, setCode] = useState<string>(country?.code || '')
  const [capital, setCapital] = useState<string>(country?.details.capital || '')

  useEffect(() => {
    if (country) {
      setName(country.name)
      setCode(country.code)
      setCapital(country.details.capital)
    }
  }, [country])

  if (!show || !country) return null

  const handleEdit = () => {
    onEditCountry(country.id, {
      name,
      code,
      details: {
        capital,
      },
    })
    onHide()
  }

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '500px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Edit Country</h3>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Country name"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Country code"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          placeholder="Capital"
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-outline-secondary me-2" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// Debounce utility function
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

const Country: React.FC = () => {
  const [countryItems, setCountryItems] = useState<CountryItem[]>(initialCountryItems)
  const [selectedCategory, setSelectedCategory] = useState<string>('alls')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredCountries, setFilteredCountries] = useState<CountryItem[]>(countryItems)
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(null)
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const [showAddCountryModal, setShowAddCountryModal] = useState(false)
  const [showEditCountryModal, setShowEditCountryModal] = useState(false)
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false)
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false)
  const [containerToggle, setContainerToggle] = useState<boolean>(false)

  // Define columns for react-table with explicit widths
  const columns = React.useMemo<ColumnDef<CountryItem>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Code',
        size: 100,
        cell: (info) => (
          <div className="avatar avatar-md rounded-circle bg-light text-muted">
            {info.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Country',
        size: 200,
        cell: (info) => <h6 className="mb-1">{info.getValue<string>()}</h6>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleEditCountryClick(row.original)}
              style={{ padding: '4px 8px' }}
            >
              <i className="fi fi-rr-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteCountry(row.original)}
              style={{ padding: '4px 8px' }}
            >
              <i className="fi fi-rr-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    [],
  )

  // Initialize react-table with pagination
  const table = useReactTable({
    data: filteredCountries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleAddCountry = useCallback((countryData: Omit<CountryItem, 'id' | 'alls' | 'starred' | 'label'>) => {
    const continentToLabelMap: { [key: string]: { name: string; value: string; gradient: string } } = {
      'North America': { name: 'North America', value: 'north_america', gradient: 'success' },
      'Europe': { name: 'Europe', value: 'europe', gradient: 'warning' },
      'Asia': { name: 'Asia', value: 'asia', gradient: 'danger' },
    }

    const newCountry: CountryItem = {
      id: (countryItems.length + 1).toString(),
      name: countryData.name,
      code: countryData.code,
      details: {
        capital: countryData.details.capital,
      },
      alls: true,
      starred: false,
      label: continentToLabelMap[countryData.details.capital] || { name: 'Other', value: 'other', gradient: 'info' },
    }

    const updatedCountryItems = [...countryItems, newCountry]
    setCountryItems(updatedCountryItems)

    if (selectedCategory === 'alls' || newCountry[selectedCategory as keyof CountryItem]) {
      setFilteredCountries([...filteredCountries, newCountry])
    }

    toast.success('Country added successfully')
  }, [countryItems, filteredCountries, selectedCategory])

  const handleEditCountry = useCallback((id: string, updatedData: Omit<CountryItem, 'id' | 'alls' | 'starred' | 'label'>) => {
    const updatedCountryItems = countryItems.map((item) =>
      item.id === id
        ? {
            ...item,
            name: updatedData.name,
            code: updatedData.code,
            details: { capital: updatedData.details.capital },
          }
        : item
    )
    setCountryItems(updatedCountryItems)

    setFilteredCountries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: updatedData.name,
              code: updatedData.code,
              details: { capital: updatedData.details.capital },
            }
          : item
      )
    )

    if (selectedCountry?.id === id) {
      setSelectedCountry({
        ...selectedCountry,
        name: updatedData.name,
        code: updatedData.code,
        details: { capital: updatedData.details.capital },
      })
    }

    toast.success('Country updated successfully')
  }, [countryItems, selectedCountry])

  const handleStarChange = useCallback((countryId: string, isStarred: boolean) => {
    const updatedCountries = filteredCountries.map((item) =>
      item.id === countryId ? { ...item, starred: isStarred } : item,
    )
    setFilteredCountries(updatedCountries)

    const updatedCountryItems = countryItems.map((item) =>
      item.id === countryId ? { ...item, starred: isStarred } : item,
    )
    setCountryItems(updatedCountryItems)

    if (selectedCountry?.id === countryId) {
      setSelectedCountry({ ...selectedCountry, starred: isStarred })
    }
  }, [countryItems, filteredCountries, selectedCountry])

  const categories: Category[] = useMemo(() => [
    {
      name: 'Countrys',
      value: 'alls',
      icon: 'fi-rr-globe',
      badge: countryItems.length,
      badgeClassName: 'bg-primary-subtle text-primary',
    },
  ], [countryItems.length])

  const labels: Label[] = useMemo(() => [
    { name: 'North America', value: 'north_america', gradient: 'success' },
    { name: 'Europe', value: 'europe', gradient: 'warning' },
    { name: 'Asia', value: 'asia', gradient: 'danger' },
    { name: 'South America', value: 'south_america', gradient: 'info' },
    { name: 'Oceania', value: 'oceania', gradient: 'primary' },
    { name: 'Africa', value: 'africa', gradient: 'dark' },
  ], [])

  useEffect(() => {
    setFilteredCountries(countryItems.filter((item) => item.alls))
  }, [countryItems])

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)

      const filteredCountriesByCategory = countryItems.filter(
        (item) => item[selectedCategory as keyof CountryItem],
      )
      const filteredCountriesBySearch = filteredCountriesByCategory.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredCountries(filteredCountriesBySearch)
    }, 300),
    [countryItems, selectedCategory]
  )

  const handleCategoryChange = useCallback((categoryValue: string) => {
    setSelectedCategory(categoryValue)
    setSearchTerm('')

    if (labels.find((label) => label.value === categoryValue)) {
      setFilteredCountries(
        countryItems.filter((item) => {
          if (typeof item.label === 'object') {
            return item.label.value === categoryValue
          } else {
            return item.label && item.label.includes(categoryValue)
          }
        }),
      )
    } else {
      setFilteredCountries(countryItems.filter((item) => item[categoryValue as keyof CountryItem]))
    }
  }, [countryItems, labels])

  const handleCountryItemClick = useCallback((country: CountryItem) => {
    setSelectedCountry(country)
    setContainerToggle(true)
  }, [])

  const handleEditCountryClick = useCallback((country: CountryItem) => {
    setSelectedCountry(country)
    setShowEditCountryModal(true)
  }, [])

  const handleDeleteCountry = useCallback((country: CountryItem) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this country!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)

        setTimeout(() => {
          const updatedCountries = countryItems.filter((item) => item.id !== country.id)
          setCountryItems(updatedCountries)

          const filteredCountriesByCategory = updatedCountries.filter(
            (item) => item[selectedCategory as keyof CountryItem],
          )

          setFilteredCountries(filteredCountriesByCategory)

          if (filteredCountriesByCategory.length === 0) {
            setFilteredCountries([])
          }
          if (selectedCountry?.id === country.id) {
            setSelectedCountry(null)
            setContainerToggle(false)
            setSidebarLeftToggle(false)
          }
          setLoading(false)
          toast.success('Country deleted successfully')
        }, 1500)
      }
    })
  }, [countryItems, selectedCategory, selectedCountry])

  useEffect(() => {
    const index = filteredCountries.findIndex(
      (country) => country.id === (selectedCountry?.id || ''),
    )
    setSelectedCountryIndex(index)
  }, [filteredCountries, selectedCountry])

  const handleNext = useCallback(() => {
    if (selectedCountryIndex < filteredCountries.length - 1) {
      const nextIndex = selectedCountryIndex + 1
      setSelectedCountry(filteredCountries[nextIndex])
      setContainerToggle(true)
    }
  }, [selectedCountryIndex, filteredCountries])

  const handlePrev = useCallback(() => {
    if (selectedCountryIndex > 0) {
      const prevIndex = selectedCountryIndex - 1
      setSelectedCountry(filteredCountries[prevIndex])
      setContainerToggle(true)
    }
  }, [selectedCountryIndex, filteredCountries])

  // Compute the card classes based on state
  const cardClasses = useMemo(() => {
    let classes = 'apps-card'
    if (sidebarMiniToggle) classes += ' apps-sidebar-mini-toggle'
    if (containerToggle) classes += ' apps-container-toggle'
    if (sidebarLeftToggle) classes += ' apps-sidebar-left-toggle'
    return classes
  }, [sidebarMiniToggle, containerToggle, sidebarLeftToggle])

  // Handle resize for sidebarLeftToggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991.98 && sidebarLeftToggle) {
        setSidebarLeftToggle(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [sidebarLeftToggle])

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setSidebarLeftToggle((prev) => !prev)
  }, [])

  return (
    <>
      <TitleHelmet title="Countries" />
      <style>
        {`
          .apps-card {
            transition: all 0.3s ease-in-out;
          }
          .apps-sidebar-left,
          .apps-container {
            transition: width 0.3s ease-in-out;
          }
        `}
      </style>
      <Card className={cardClasses}>
        <div className="apps-sidebar-mini">
          <ContactSidebar
            categories={categories}
            labels={labels}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            setSidebarMiniToggle={setSidebarMiniToggle}
          />
        </div>
        <div className="apps-sidebar apps-sidebar-left apps-sidebar-md">
          <ContactSearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          <div 
            className="apps-sidebar-content" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%', 
              minWidth: '350px'
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2 px-3">
              <span className="text-muted fw-bold"></span>
              <span className="text-muted fw-bold"></span>
            </div>
            <div style={{ marginLeft: '10px' }}>
              <Table 
                responsive 
                className="mb-0" 
                style={{ minWidth: '330px' }}
              >
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th 
                          key={header.id} 
                          colSpan={header.colSpan}
                          style={{ width: header.column.columnDef.size }}
                        >
                          {header.isPlaceholder ? null : (
                            <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={selectedCountry?.id === row.original.id ? 'active' : ''}
                      onClick={() => handleCountryItemClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Stack 
              className="p-2 border-top d-flex flex-row align-items-center justify-content-between"
              style={{ gap: '6px', padding: '8px 12px' }}
            >
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
                style={{
                  border: '1px solid #0d6efd',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  fontSize: '12px',
                  backgroundColor: '#fff',
                  color: '#6c757d',
                  cursor: 'pointer',
                  width: '100px',
                  height: '24px',
                }}
              >
                {[10, 20, 30].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <Pagination 
                className="m-0"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  marginRight: '20px',
                }}
              >
                <Pagination.Prev
                  onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
                  disabled={table.getState().pagination.pageIndex === 0}
                  style={{
                    border: '1px solid #e5e7eb',
                    color: table.getState().pagination.pageIndex === 0 ? '#d3d3d3' : '#6c757d',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    backgroundColor: 'transparent',
                    fontSize: '12px',
                    lineHeight: '1',
                  }}
                >
                  <i className="fi fi-rr-angle-left" style={{ fontSize: '12px' }} />
                </Pagination.Prev>
                <Pagination.Item
                  active
                  style={{
                    backgroundColor: '#0d6efd',
                    border: '1px solid #0d6efd',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    minWidth: '24px',
                    textAlign: 'center',
                    lineHeight: '1',
                  }}
                >
                  {table.getState().pagination.pageIndex + 1}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
                  disabled={table.getState().pagination.pageIndex === table.getPageCount() - 1}
                  style={{
                    border: '1px solid #e5e7eb',
                    color: table.getState().pagination.pageIndex === table.getPageCount() - 1 ? '#d3d3d3' : '#6c757d',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    backgroundColor: 'transparent',
                    fontSize: '12px',
                    lineHeight: '1',
                  }}
                >
                  <i className="fi fi-rr-angle-right" style={{ fontSize: '12px' }} />
                </Pagination.Next>
              </Pagination>
            </Stack>
          </div>
        </div>
        <div className={`apps-container ${containerToggle ? 'w-full' : 'w-1/2'}`}>
          <div className="apps-container-inner" style={{ minHeight: 'calc(100vh - 100px)' }}>
            {loading ? (
              <Stack className="align-items-center justify-content-center flex-grow-1 h-100">
                <Preloader />
              </Stack>
            ) : !selectedCountry ? (
              <Stack
                className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center"
                style={{ maxWidth: '320px' }}
              >
                <i className="fi fi-rr-globe fs-48 mb-6"></i>
                <h4 className="fw-bold">Select a country to view</h4>
                <p className="fs-15 fw-light text-muted mb-4">
                  Select a country from the left sidebar to view its details.
                </p>
                <Button
                  variant=""
                  className="btn-neutral"
                  onClick={() => setShowAddCountryModal(true)}
                >
                  <i className="fi fi-br-plus fs-10"></i>
                  <span className="ms-2">Add New Country</span>
                </Button>
              </Stack>
            ) : (
              <div>
                <div className="apps-contact-details-header p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-icon btn-light me-3"
                        onClick={() => {
                          setSelectedCountry(null)
                          setContainerToggle(false)
                          setSidebarLeftToggle(false)
                        }}
                      >
                        <i className="fi fi-rr-arrow-left"></i>
                      </button>
                       <div className="flex-grow-1">
                         <h5 className="mb-1">Country</h5>
                       
                       </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handleMenuClick}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-menu-burger"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={() => handleStarChange(selectedCountry.id, !selectedCountry.starred)}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className={`fi ${selectedCountry.starred ? 'fi-rr-star' : 'fi-rs-star'}`}></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handlePrev}
                        disabled={selectedCountryIndex <= 0}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-angle-left"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handleNext}
                        disabled={selectedCountryIndex >= filteredCountries.length - 1}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-angle-right"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={() => handleDeleteCountry(selectedCountry)}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="apps-contact-details p-4">
                  <div className="mb-4">
                    <h5 className="mb-2">{selectedCountry.name}</h5>
                    <p className="text-muted mb-0">Country Code: {selectedCountry.code}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-2">Capital:</p>
                    <p className="mb-0">{selectedCountry.details.capital}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)}></div>
      </Card>
      <AddCountryModal
        show={showAddCountryModal}
        onHide={() => setShowAddCountryModal(false)}
        onAddCountry={handleAddCountry}
      />
      <EditCountryModal
        show={showEditCountryModal}
        onHide={() => setShowEditCountryModal(false)}
        country={selectedCountry}
        onEditCountry={handleEditCountry}
      />
    </>
  )
}

export default React.memo(Country) 