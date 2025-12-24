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

// Define item group data type
interface ItemGroup {
  id: string
  name: string
  description: string
  category: string
  active: boolean
  starred: boolean
  label?: { name: string; value: string; gradient: string }
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

// Sample item group data (15 items)
const initialItemGroups: ItemGroup[] = [
  {
    id: '1',
    name: 'Appetizers',
    description: 'Starters and small bites',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '2',
    name: 'Main Course',
    description: 'Main dishes and entrees',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '3',
    name: 'Desserts',
    description: 'Sweet treats and desserts',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '4',
    name: 'Beverages',
    description: 'Soft drinks and juices',
    category: 'Drinks',
    active: true,
    starred: false,
    label: { name: 'Drinks', value: 'drinks', gradient: 'primary' },
  },
  {
    id: '5',
    name: 'Cocktails',
    description: 'Alcoholic beverages',
    category: 'Drinks',
    active: true,
    starred: false,
    label: { name: 'Drinks', value: 'drinks', gradient: 'primary' },
  },
  {
    id: '6',
    name: 'Salads',
    description: 'Fresh and healthy salads',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '7',
    name: 'Soups',
    description: 'Hot and cold soups',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '8',
    name: 'Kids Menu',
    description: 'Child-friendly meals',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '9',
    name: 'Breakfast',
    description: 'Morning meals',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '10',
    name: 'Vegan Options',
    description: 'Plant-based dishes',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '11',
    name: 'Smoothies',
    description: 'Fruit and veggie smoothies',
    category: 'Drinks',
    active: true,
    starred: false,
    label: { name: 'Drinks', value: 'drinks', gradient: 'primary' },
  },
  {
    id: '12',
    name: 'Pasta',
    description: 'Italian pasta dishes',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '13',
    name: 'Seafood',
    description: 'Fresh seafood dishes',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
  {
    id: '14',
    name: 'Wine List',
    description: 'Curated wine selection',
    category: 'Drinks',
    active: true,
    starred: false,
    label: { name: 'Drinks', value: 'drinks', gradient: 'primary' },
  },
  {
    id: '15',
    name: 'Sides',
    description: 'Side dishes and extras',
    category: 'Food',
    active: true,
    starred: false,
    label: { name: 'Food', value: 'food', gradient: 'success' },
  },
]

// AddItemGroupModal component
const AddItemGroupModal: React.FC<{
  show: boolean
  onHide: () => void
  onAddItemGroup: (itemGroupData: Omit<ItemGroup, 'id' | 'active' | 'starred' | 'label'>) => void
}> = ({ show, onHide, onAddItemGroup }) => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const handleAdd = () => {
    onAddItemGroup({
      name,
      description,
      category,
    })
    setName('')
    setDescription('')
    setCategory('')
    onHide()
  }

  if (!show) {
    return null
  }

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '500px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Add New Item Group</h3>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item group name (e.g., Appetizers)"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (e.g., Starters and small bites)"
        />
        <select
          className="form-control mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Drinks">Drinks</option>
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

// EditItemGroupModal component
const EditItemGroupModal: React.FC<{
  show: boolean
  onHide: () => void
  itemGroup: ItemGroup | null
  onEditItemGroup: (id: string, updatedData: Omit<ItemGroup, 'id' | 'active' | 'starred' | 'label'>) => void
}> = ({ show, onHide, itemGroup, onEditItemGroup }) => {
  const [name, setName] = useState<string>(itemGroup?.name || '')
  const [description, setDescription] = useState<string>(itemGroup?.description || '')
  const [category, setCategory] = useState<string>(itemGroup?.category || '')

  useEffect(() => {
    if (itemGroup) {
      setName(itemGroup.name)
      setDescription(itemGroup.description)
      setCategory(itemGroup.category)
    }
  }, [itemGroup])

  if (!show || !itemGroup) {
    return null
  }

  const handleEdit = () => {
    onEditItemGroup(itemGroup.id, {
      name,
      description,
      category,
    })
    onHide()
  }

  return (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="modal-content" style={{ background: 'white', padding: '20px', maxWidth: '500px', margin: '100px auto', borderRadius: '8px' }}>
        <h3>Edit Item Group</h3>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item group name"
        />
        <input
          type="text"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <select
          className="form-control mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Drinks">Drinks</option>
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

const ItemGroup: React.FC = () => {
  const [itemGroups, setItemGroups] = useState<ItemGroup[]>(initialItemGroups)
  const [selectedCategory, setSelectedCategory] = useState<string>('active')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredItemGroups, setFilteredItemGroups] = useState<ItemGroup[]>(itemGroups)
  const [selectedItemGroup, setSelectedItemGroup] = useState<ItemGroup | null>(null)
  const [selectedItemGroupIndex, setSelectedItemGroupIndex] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(false)
  const [showAddItemGroupModal, setShowAddItemGroupModal] = useState(false)
  const [showEditItemGroupModal, setShowEditItemGroupModal] = useState(false)
  const [sidebarLeftToggle, setSidebarLeftToggle] = useState<boolean>(false)
  const [sidebarMiniToggle, setSidebarMiniToggle] = useState<boolean>(false)
  const [containerToggle, setContainerToggle] = useState<boolean>(false)

  // Define columns for react-table with explicit widths
  const columns = useMemo<ColumnDef<ItemGroup>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Item Group',
        size: 200,
        cell: (info) => <h6 className="mb-1">{info.getValue<string>()}</h6>,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 100,
        cell: (info) => <span>{info.getValue<string>()}</span>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleEditItemGroupClick(row.original)}
              style={{ padding: '4px 8px' }}
            >
              <i className="fi fi-rr-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteItemGroup(row.original)}
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
    data: filteredItemGroups,
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

  const handleAddItemGroup = useCallback((itemGroupData: Omit<ItemGroup, 'id' | 'active' | 'starred' | 'label'>) => {
    const categoryToLabelMap: { [key: string]: { name: string; value: string; gradient: string } } = {
      Food: { name: 'Food', value: 'food', gradient: 'success' },
      Drinks: { name: 'Drinks', value: 'drinks', gradient: 'primary' },
    }

    const newItemGroup: ItemGroup = {
      id: (itemGroups.length + 1).toString(),
      name: itemGroupData.name,
      description: itemGroupData.description,
      category: itemGroupData.category,
      active: true,
      starred: false,
      label: categoryToLabelMap[itemGroupData.category] || { name: 'Other', value: 'other', gradient: 'info' },
    }

    const updatedItemGroups = [...itemGroups, newItemGroup]
    setItemGroups(updatedItemGroups)

    if (selectedCategory === 'active' || newItemGroup[selectedCategory as keyof ItemGroup]) {
      setFilteredItemGroups([...filteredItemGroups, newItemGroup])
    }

    toast.success('Item group added successfully')
  }, [itemGroups, filteredItemGroups, selectedCategory])

  const handleEditItemGroup = useCallback((id: string, updatedData: Omit<ItemGroup, 'id' | 'active' | 'starred' | 'label'>) => {
    const updatedItemGroups = itemGroups.map((item) =>
      item.id === id
        ? {
            ...item,
            name: updatedData.name,
            description: updatedData.description,
            category: updatedData.category,
          }
        : item
    )
    setItemGroups(updatedItemGroups)

    setFilteredItemGroups((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: updatedData.name,
              description: updatedData.description,
              category: updatedData.category,
            }
          : item
      )
    )

    if (selectedItemGroup?.id === id) {
      setSelectedItemGroup({
        ...selectedItemGroup,
        name: updatedData.name,
        description: updatedData.description,
        category: updatedData.category,
      })
    }

    toast.success('Item group updated successfully')
  }, [itemGroups, selectedItemGroup])

  const handleStarChange = useCallback((itemGroupId: string, isStarred: boolean) => {
    const updatedItemGroups = filteredItemGroups.map((item) =>
      item.id === itemGroupId ? { ...item, starred: isStarred } : item,
    )
    setFilteredItemGroups(updatedItemGroups)

    const updatedItemGroupItems = itemGroups.map((item) =>
      item.id === itemGroupId ? { ...item, starred: isStarred } : item,
    )
    setItemGroups(updatedItemGroupItems)

    if (selectedItemGroup?.id === itemGroupId) {
      setSelectedItemGroup({ ...selectedItemGroup, starred: isStarred })
    }
  }, [itemGroups, filteredItemGroups, selectedItemGroup])

  const categories: Category[] = useMemo(() => [
    {
      name: 'Item Groups',
      value: 'active',
      icon: 'fi-rr-utensils',
      badge: itemGroups.length,
      badgeClassName: 'bg-primary-subtle text-primary',
    },
  ], [itemGroups.length])

  const labels: Label[] = useMemo(() => [
    { name: 'Food', value: 'food', gradient: 'success' },
    { name: 'Drinks', value: 'drinks', gradient: 'primary' },
  ], [])

  useEffect(() => {
    setFilteredItemGroups(itemGroups.filter((item) => item.active))
  }, [itemGroups])

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value)

      const filteredItemGroupsByCategory = itemGroups.filter(
        (item) => item[selectedCategory as keyof ItemGroup],
      )
      const filteredItemGroupsBySearch = filteredItemGroupsByCategory.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredItemGroups(filteredItemGroupsBySearch)
    }, 300),
    [itemGroups, selectedCategory]
  )

  const handleCategoryChange = useCallback((categoryValue: string) => {
    setSelectedCategory(categoryValue)
    setSearchTerm('')

    if (labels.find((label) => label.value === categoryValue)) {
      setFilteredItemGroups(
        itemGroups.filter((item) => {
          return typeof item.label === 'object' && item.label?.value === categoryValue
        }),
      )
    } else {
      setFilteredItemGroups(itemGroups.filter((item) => item[categoryValue as keyof ItemGroup]))
    }
  }, [itemGroups, labels])

  const handleItemGroupClick = useCallback((itemGroup: ItemGroup) => {
    setSelectedItemGroup(itemGroup)
    setContainerToggle(true)
  }, [])

  const handleEditItemGroupClick = useCallback((itemGroup: ItemGroup) => {
    setSelectedItemGroup(itemGroup)
    setShowEditItemGroupModal(true)
  }, [])

  const handleDeleteItemGroup = useCallback((itemGroup: ItemGroup) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item group!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3E97FF',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)

        setTimeout(() => {
          const updatedItemGroups = itemGroups.filter((item) => item.id !== itemGroup.id)
          setItemGroups(updatedItemGroups)

          const filteredItemGroupsByCategory = updatedItemGroups.filter(
            (item) => item[selectedCategory as keyof ItemGroup],
          )

          setFilteredItemGroups(filteredItemGroupsByCategory)

          if (filteredItemGroupsByCategory.length === 0) {
            setFilteredItemGroups([])
          }
          if (selectedItemGroup?.id === itemGroup.id) {
            setSelectedItemGroup(null)
            setContainerToggle(false)
            setSidebarLeftToggle(false)
          }
          setLoading(false)
          toast.success('Item group deleted successfully')
        }, 1500)
      }
    })
  }, [itemGroups, selectedCategory, selectedItemGroup])

  useEffect(() => {
    const index = filteredItemGroups.findIndex(
      (itemGroup) => itemGroup.id === (selectedItemGroup?.id || ''),
    )
    setSelectedItemGroupIndex(index)
  }, [filteredItemGroups, selectedItemGroup])

  const handleNext = useCallback(() => {
    if (selectedItemGroupIndex < filteredItemGroups.length - 1) {
      const nextIndex = selectedItemGroupIndex + 1
      setSelectedItemGroup(filteredItemGroups[nextIndex])
      setContainerToggle(true)
    }
  }, [selectedItemGroupIndex, filteredItemGroups])

  const handlePrev = useCallback(() => {
    if (selectedItemGroupIndex > 0) {
      const prevIndex = selectedItemGroupIndex - 1
      setSelectedItemGroup(filteredItemGroups[prevIndex])
      setContainerToggle(true)
    }
  }, [selectedItemGroupIndex, filteredItemGroups])

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
      <TitleHelmet title="Item Groups" />
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
                      className={selectedItemGroup?.id === row.original.id ? 'active' : ''}
                      onClick={() => handleItemGroupClick(row.original)}
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
            ) : !selectedItemGroup ? (
              <Stack
                className="d-none d-lg-flex align-items-center justify-content-center flex-grow-1 h-100 mx-auto text-center"
                style={{ maxWidth: '320px' }}
              >
                <i className="fi fi-rr-utensils fs-48 mb-6"></i>
                <h4 className="fw-bold">Select an item group to view</h4>
                <p className="fs-15 fw-light text-muted mb-4">
                  Select an item group from the left sidebar to view its details.
                </p>
                <Button
                  variant=""
                  className="btn-neutral"
                  onClick={() => setShowAddItemGroupModal(true)}
                >
                  <i className="fi fi-br-plus fs-10"></i>
                  <span className="ms-2">Add New Item Group</span>
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
                          setSelectedItemGroup(null)
                          setContainerToggle(false)
                          setSidebarLeftToggle(false)
                        }}
                      >
                        <i className="fi fi-rr-arrow-left"></i>
                      </button>
                      <div className="flex-grow-1">
                        <h5 className="mb-1">Item Group</h5>
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
                        onClick={() => handleStarChange(selectedItemGroup.id, !selectedItemGroup.starred)}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className={`fi ${selectedItemGroup.starred ? 'fi-rr-star' : 'fi-rs-star'}`}></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handlePrev}
                        disabled={selectedItemGroupIndex <= 0}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-angle-left"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={handleNext}
                        disabled={selectedItemGroupIndex >= filteredItemGroups.length - 1}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-angle-right"></i>
                      </button>
                      <button
                        className="btn btn-icon btn-light"
                        onClick={() => handleDeleteItemGroup(selectedItemGroup)}
                        style={{ padding: '8px', fontSize: '1.2rem' }}
                      >
                        <i className="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="apps-contact-details p-4">
                  <div className="mb-4">
                    <h5 className="mb-2">{selectedItemGroup.name}</h5>
                    <p className="text-muted mb-0">Category: {selectedItemGroup.category}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-muted mb-2">Description:</p>
                    <p className="mb-0">{selectedItemGroup.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="custom-backdrop" onClick={() => setSidebarMiniToggle(false)}></div>
      </Card>
      <AddItemGroupModal
        show={showAddItemGroupModal}
        onHide={() => setShowAddItemGroupModal(false)}
        onAddItemGroup={handleAddItemGroup}
      />
      <EditItemGroupModal
        show={showEditItemGroupModal}
        onHide={() => setShowEditItemGroupModal(false)}
        itemGroup={selectedItemGroup}
        onEditItemGroup={handleEditItemGroup}
      />
    </>
  )
}

export default ItemGroup