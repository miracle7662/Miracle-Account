import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { Button, Card, Stack, Pagination, Table } from 'react-bootstrap'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

// Define types inline
interface cityItem {
  id: string
  name: string
  all: boolean
  cityCode: string
  stateId: string
  coastal: boolean
  starred: boolean
  label: Label | string
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

// Sample states data for dropdown (matching States.tsx)
const states = [
  { id: '1', name: 'California', code: 'CA' },
  { id: '2', name: 'New York', code: 'NY' },
  { id: 'IL', name: 'Illinois', code: 'IL' },
  { id: '4', name: 'Florida', code: 'FL' },
  { id: '5', name: 'Arizona', code: 'AZ' },
  { id: 'MH', name: 'Maharashtra', code: 'MH' },
]

// Define cityItems inline (updated cityCode to match state code + number format)
const cityItems: cityItem[] = [
  {
    id: '1',
    name: 'Los Angeles',
    all: true,
    cityCode: 'CA01', // California
    stateId: '1',
    coastal: true,
    starred: false,
    label: { name: 'Coastal', value: 'coastal', gradient: 'success' }
  },
  {
    id: '2',
    name: 'New York City',
    all: true,
    cityCode: 'NY02', // New York
    stateId: '2',
    coastal: true,
    starred: false,
    label: { name: 'Coastal', value: 'coastal', gradient: 'success' }
  },
  {
    id: '3',
    name: 'Chicago',
    all: true,
    cityCode: 'IL03', // Illinois
    stateId: 'IL',
    coastal: false,
    starred: false,
    label: { name: 'Other', value: 'other', gradient: 'warning' }
  },
  {
    id: '4',
    name: 'Miami',
    all: true,
    cityCode: 'FL04', // Florida
    stateId: '4',
    coastal: true,
    starred: false,
    label: { name: 'Coastal', value: 'coastal', gradient: 'success' }
  },
  {
    id: '5',
    name: 'Phoenix',
    all: true,
    cityCode: 'AZ05', // Arizona
    stateId: '5',
    coastal: false,
    starred: false,
    label: { name: 'Other', value: 'other', gradient: 'warning' }
  },
  {
    id: '6',
    name: 'Sangli',
    all: true,
    cityCode: 'MH10', // Maharashtra
    stateId: 'MH',
    coastal: false,
    starred: false,
    label: { name: 'Other', value: 'other', gradient: 'warning' }
  }
]

// Placeholder components
const CitySidebar: React.FC<{
  categories: Category[]
  labels: Label[]
  selectedCategory: string
  handleCategoryChange: (categoryValue: string) => void
  setSidebarMiniToggle: (toggle: boolean) => void
}> = ({ categories, labels, selectedCategory, handleCategoryChange, setSidebarMiniToggle }) => (
  <div className="apps-sidebar-mini">
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
      <i className="fi fi-rr-menu-burger me-2"></i>
      <span>{categories.find(cat => cat.value === selectedCategory)?.name.toUpperCase() || 'ALL'}</span>
    </div>
  </div>
)

const CitySearchBar: React.FC<{
  searchTerm: string
  handleSearch: (value: string) => void
}> = ({ searchTerm, handleSearch }) => (
  <div className="city-search-bar p-3">
    <input
      type="text"
      className="form-control"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search..."
    />
  </div>
)

const AddCityModal: React.FC<{
  show: boolean
  onHide: () => void
  onAddCity: (cityData: any) => void
}> = ({ show, onHide, onAddCity }) => {
  const [name, setName] = useState<string>('')
  const [stateId, setStateId] = useState<string>(states[0]?.id || '')

  if (!show) return null

  const handleAdd = () => {
    onAddCity({ name, stateId })
    setName('')
    setStateId(states[0]?.id || '')
    onHide()
  }

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '400px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Add New City</h3>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="City name"
        />
        <select
          className="form-control mb-3"
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
        >
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
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

const EditCityModal: React.FC<{
  show: boolean
  onHide: () => void
  city: cityItem | null
  onEditCity: (id: string, updatedData: { name: string; cityCode: string; stateId: string; type: string; label: string }) => void
}> = ({ show, onHide, city, onEditCity }) => {
  const [name, setName] = useState<string>(city?.name || '')
  const [stateId, setStateId] = useState<string>(city?.stateId || states[0]?.id || '')
  const [type, setType] = useState<string>(city?.coastal ? 'Coastal' : 'Other')
  const [label, setLabel] = useState<string>(typeof city?.label === 'string' ? city.label : city?.label?.name || 'Coastal')

  useEffect(() => {
    if (city) {
      setName(city.name)
      setStateId(city.stateId)
      setType(city.coastal ? 'Coastal' : 'Other')
      setLabel(typeof city.label === 'string' ? city.label : city.label.name)
    }
  }, [city])

  if (!show || !city) return null

  const handleEdit = () => {
    const state = states.find(s => s.id === stateId)
    const stateCode = state ? state.code : 'UN'
    const cityNumber = city.id.padStart(2, '0')
    const generatedCityCode = `${stateCode}${cityNumber}`

    onEditCity(city.id, { name, cityCode: generatedCityCode, stateId, type, label })
    onHide()
  }

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '400px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Edit City</h3>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="City name"
        />
        <select
          className="form-control mb-3"
          value={stateId}
          onChange={(e) => setStateId(e.target.value)}
        >
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
        <select
          className="form-control mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Coastal">Coastal</option>
          <option value="Other">Other</option>
        </select>
        <select
          className="form-control mb-3"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        >
          <option value="Coastal">Coastal</option>
          <option value="Major">Major</option>
        </select>
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

const City: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredCities, setFilteredCities] = useState<cityItem[]>(cityItems)
  const [selectedCity, setSelectedCity] = useState<cityItem | null>(null)
  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const [showAddCityModal, setShowAddCityModal] = useState(false)
  const [showEditCityModal, setShowEditCityModal] = useState(false)
  const [containerToggle, setContainerToggle] = useState<boolean>(false)
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false)
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false)

  // Define columns for react-table with explicit widths
  const columns = React.useMemo<ColumnDef<cityItem>[]>(
    () => [
      {
        accessorKey: 'cityCode',
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
        header: 'City',
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
              onClick={() => handleEditCity(row.original)}
              style={{ padding: '4px 8px' }}
            >
              <i className="fi fi-rr-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteCity(row.original)}
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
    data: filteredCities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Default page size
      },
    },
  })

  const handleAddCity = useCallback((cityData: { name: string, id: string, cityCode: string, stateId: string, type: string, label: string }) => {
    const newCity: cityItem = {
      id: cityData.id,
      name: cityData.name,
      all: true,
      cityCode: cityData.cityCode,
      stateId: cityData.stateId || '0',
      coastal: cityData.type === 'Coastal',
      starred: false,
      label: {
        name: cityData.label,
        value: cityData.label.toLowerCase(),
        gradient: cityData.label === 'Coastal' ? 'success' : 'danger'
      }
    }

    cityItems.push(newCity)

    if (selectedCategory === 'all' || newCity[selectedCategory as keyof cityItem]) {
      setFilteredCities([...filteredCities, newCity])
    }

    toast.success('City added successfully')
  }, [filteredCities, selectedCategory])

  const handleEditCity = useCallback((city: cityItem) => {
    setSelectedCity(city)
    setShowEditCityModal(true)
  }, [])

  const handleEditCitySubmit = useCallback((id: string, updatedData: { name: string; cityCode: string; stateId: string; type: string; label: string }) => {
    const updatedCityItems = cityItems.map((item) =>
      item.id === id
        ? {
          ...item,
          name: updatedData.name,
          cityCode: updatedData.cityCode,
          stateId: updatedData.stateId,
          coastal: updatedData.type === 'Coastal',
          label: {
            name: updatedData.label,
            value: updatedData.label.toLowerCase(),
            gradient: updatedData.label === 'Coastal' ? 'success' : 'danger'
          }
        }
        : item
    )

    setCityItems(updatedCityItems)

    setFilteredCities((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            name: updatedData.name,
            cityCode: updatedData.cityCode,
            stateId: updatedData.stateId,
            coastal: updatedData.type === 'Coastal',
            label: {
              name: updatedData.label,
              value: updatedData.label.toLowerCase(),
              gradient: updatedData.label === 'Coastal' ? 'success' : 'danger'
            }
          }
          : item
      )
    )

    if (selectedCity?.id === id) {
      setSelectedCity({
        ...selectedCity,
        name: updatedData.name,
        cityCode: updatedData.cityCode,
        stateId: updatedData.stateId,
        coastal: updatedData.type === 'Coastal',
        label: {
          name: updatedData.label,
          value: updatedData.label.toLowerCase(),
          gradient: updatedData.label === 'Coastal' ? 'success' : 'danger'
        }
      })
    }

    toast.success('City updated successfully')
  }, [selectedCity])

  const handleStarChange = useCallback((cityId: string, isStarred: boolean) => {
    const updatedCityItems = cityItems.map((item) =>
      item.id === cityId ? { ...item, starred: isStarred } : item
    )

    setCityItems(updatedCityItems)

    setFilteredCities((prev) =>
      prev.map((item) =>
        item.id === cityId ? { ...item, starred: isStarred } : item
      )
    )

    if (selectedCity?.id === cityId) {
      setSelectedCity({ ...selectedCity, starred: isStarred })
    }
  }, [selectedCity])

  const setCityItems = (updatedItems: cityItem[]) => {
    cityItems.splice(0, cityItems.length, ...updatedItems)
  }

  const categories: Category[] = useMemo(() => [
    {
      name: 'All',
      value: 'all',
      icon: 'fi-rr-building',
      badge: cityItems.length,
      badgeClassName: 'bg-primary-subtle text-primary'
    },
    {
      name: 'Coastal',
      value: 'coastal',
      icon: 'fi-rr-beach',
      badge: cityItems.filter((item: cityItem) => item.coastal).length,
      badgeClassName: 'bg-success-subtle text-success'
    }
  ], [])

  const labels: Label[] = useMemo(() => [
    { name: 'Coastal', value: 'coastal', gradient: 'success' },
    { name: 'Major', value: 'major', gradient: 'danger' }
  ], [])

  useEffect(() => {
    setFilteredCities(cityItems.filter((item: cityItem) => item.all))
  }, [])

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)

      const filteredCitiesByCategory = cityItems.filter(
        (item: cityItem) => item[selectedCategory as keyof cityItem]
      )
      const filteredCitiesBySearch = filteredCitiesByCategory.filter((item: cityItem) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCities(filteredCitiesBySearch)
    }, 300),
    [selectedCategory]
  )

  const handleCategoryChange = useCallback((categoryValue: string) => {
    setSelectedCategory(categoryValue)
    setSearchTerm('')

    if (labels.find((label) => label.value === categoryValue)) {
      setFilteredCities(
        cityItems.filter((item: cityItem) => {
          if (typeof item.label === 'object') {
            return item.label.value === categoryValue
          } else {
            return item.label && item.label.includes(categoryValue)
          }
        })
      )
    } else {
      setFilteredCities(cityItems.filter((item: cityItem) => item[categoryValue as keyof cityItem]))
    }
  }, [])

  const handleCityItemClick = useCallback((city: cityItem) => {
    setSelectedCity(city)
    setContainerToggle(true)
  }, [])

  const handleDeleteCity = useCallback((city: cityItem | null = selectedCity) => {
    if (city) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this city!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3E97FF',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setLoading(true)

          setTimeout(() => {
            const updatedCities = cityItems.filter((item: cityItem) => item.id !== city.id)

            setCityItems(updatedCities)

            const filteredCitiesByCategory = updatedCities.filter(
              (item: cityItem) => item[selectedCategory as keyof cityItem]
            )

            setFilteredCities(filteredCitiesByCategory)

            if (filteredCitiesByCategory.length === 0) {
              setFilteredCities([])
            }
            if (selectedCity?.id === city.id) {
              setSelectedCity(null)
              setContainerToggle(false)
              setSidebarLeftToggle(false)
            }
            setLoading(false)
            toast.success('City deleted successfully')
          }, 1500)
        }
      })
    }
  }, [selectedCity, selectedCategory])

  useEffect(() => {
    const index = filteredCities.findIndex(
      (city) => city.id === (selectedCity?.id || '')
    )
    setSelectedCityIndex(index)
  }, [filteredCities, selectedCity])

  const handleNext = useCallback(() => {
    if (selectedCityIndex < filteredCities.length - 1) {
      const nextIndex = selectedCityIndex + 1
      setSelectedCity(filteredCities[nextIndex])
      setContainerToggle(true)
    }
  }, [selectedCityIndex, filteredCities])

  const handlePrev = useCallback(() => {
    if (selectedCityIndex > 0) {
      const prevIndex = selectedCityIndex - 1
      setSelectedCity(filteredCities[prevIndex])
      setContainerToggle(true)
    }
  }, [selectedCityIndex, filteredCities])

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
      <title>City</title>
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
          <CitySidebar
            categories={categories}
            labels={labels}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            setSidebarMiniToggle={setSidebarMiniToggle}
          />
        </div>
        <div className="apps-sidebar apps-sidebar-left apps-sidebar-md">
          <CitySearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
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
                      className={selectedCity?.id === row.original.id ? 'active' : ''}
                      onClick={() => handleCityItemClick(row.original)}
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
                {[5, 10, 20].map((pageSize) => (
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
                <div>Loading...</div>
              </Stack>
            ) : !selectedCity ? (
              <Stack
                className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center"
                style={{ maxWidth: '320px' }}
              >
                <i className="fi fi-rr-building fs-48 mb-6"></i>
                <h4 className="fw-bold">Select a city to view</h4>
                <p className="fs-15 fw-light text-muted mb-4">
                  Select a city from the left sidebar city list to view its details.
                </p>
                <Button
                  variant=""
                  className="btn-neutral"
                  onClick={() => setShowAddCityModal(true)}
                >
                  <i className="fi fi-br-plus fs-10"></i>
                  <span className="ms-2">Add New City</span>
                </Button>
              </Stack>
            ) : (
              <>
                <div className="apps-contact-details-header p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-icon btn-light me-3"
                        onClick={() => {
                          setSelectedCity(null)
                          setContainerToggle(false)
                          setSidebarLeftToggle(false)
                        }}
                      >
                        <i className="fi fi-rr-arrow-left"></i>
                      </button>
                      <div className="flex-grow-1">
                        <h5 className="mb-1">City</h5>
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
                        onClick={() => handleStarChange(selectedCity.id, !selectedCity.starred)}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className={`fi ${selectedCity.starred ? 'fi-rr-star' : 'fi-rs-star'}`}></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handlePrev}
                        disabled={selectedCityIndex <= 0}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-angle-left"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handleNext}
                        disabled={selectedCityIndex >= filteredCities.length - 1}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-angle-right"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={() => handleDeleteCity(selectedCity)}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="city-details p-3">
                  <p><strong>ID:</strong> {selectedCity.id}</p>
                  <p><strong>Name:</strong> {selectedCity.name}</p>
                  <p><strong>City Code:</strong> {selectedCity.cityCode}</p>
                  <p><strong>State:</strong> {states.find(state => state.id === selectedCity.stateId)?.name || 'Unknown'}</p>
                  <p><strong>Type:</strong> {selectedCity.coastal ? 'Coastal' : 'Other'}</p>
                  <p><strong>Label:</strong> {typeof selectedCity.label === 'string' ? selectedCity.label : selectedCity.label.name}</p>
                  <button className="btn btn-outline-danger" onClick={() => handleDeleteCity()}>
                    Delete City
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)}></div>
      </Card>
      <AddCityModal
        show={showAddCityModal}
        onHide={() => setShowAddCityModal(false)}
        onAddCity={handleAddCity}
      />
      <EditCityModal
        show={showEditCityModal}
        onHide={() => setShowEditCityModal(false)}
        city={selectedCity}
        onEditCity={handleEditCitySubmit}
      />
    </>
  )
}

export default City