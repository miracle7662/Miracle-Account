import React, { useState, useEffect } from 'react';
import {
  ExpandedState,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { makeData, Person } from './makeData';
import { Button, Table, Stack, Pagination, Modal, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Trash2, Edit2, Plus, ArrowUp, ArrowDown } from 'lucide-react'; // Add ArrowUp and ArrowDown

const Menu = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'ItemName',
        header: ({ table }) => (
          <div className="d-flex align-items-center">
            <IndeterminateCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
            <Button
              onClick={table.getToggleAllRowsExpandedHandler()}
              variant=""
              className="btn-icon mx-2"
            >
              {table.getIsAllRowsExpanded() ? (
                <i className="fi fi-rr-square-minus"></i>
              ) : (
                <i className="fi fi-rr-square-plus"></i>
              )}
            </Button>
            <span
              onClick={() => table.getColumn('ItemName')?.toggleSorting()}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              First Name
              {table.getColumn('ItemName')?.getIsSorted() === 'asc' ? (
                <ArrowUp size={16} className="ml-1" />
              ) : table.getColumn('ItemName')?.getIsSorted() === 'desc' ? (
                <ArrowDown size={16} className="ml-1" />
              ) : null}
            </span>
          </div>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{ paddingLeft: `${row.depth * 2}rem` }}
            className="d-flex align-items-center"
          >
            <IndeterminateCheckbox
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
            {row.getCanExpand() ? (
              <span
                onClick={row.getToggleExpandedHandler()}
                style={{ cursor: 'pointer' }}
                className="d-inline-flex mx-3"
              >
                {row.getIsExpanded() ? (
                  <i className="fi fi-rr-square-minus"></i>
                ) : (
                  <i className="fi fi-rr-square-plus"></i>
                )}
              </span>
            ) : (
              <span
                className="bg-primary d-inline-block rounded-circle mx-2"
                style={{ width: '0.5rem', height: '0.5rem' }}
              ></span>
            )}
            {getValue<string>()}
          </div>
        ),
        footer: (props) => props.column.id,
        enableSorting: true,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: ({ column }) => (
          <span
            onClick={() => column.toggleSorting()}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            Last Name
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp size={16} className="ml-1" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown size={16} className="ml-1" />
            ) : null}
          </span>
        ),
        footer: (props) => props.column.id,
        enableSorting: true,
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <span
            onClick={() => column.toggleSorting()}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            Price
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp size={16} className="ml-1" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown size={16} className="ml-1" />
            ) : null}
          </span>
        ),
        footer: (props) => props.column.id,
        enableSorting: true,
      },
      {
        accessorKey: 'visits',
        header: ({ column }) => (
          <span
            onClick={() => column.toggleSorting()}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            Visits
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp size={16} className="ml-1" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown size={16} className="ml-1" />
            ) : null}
          </span>
        ),
        footer: (props) => props.column.id,
        enableSorting: true,
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <span
            onClick={() => column.toggleSorting()}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            Status
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp size={16} className="ml-1" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown size={16} className="ml-1" />
            ) : null}
          </span>
        ),
        footer: (props) => props.column.id,
        enableSorting: true,
      },
      {
        accessorKey: 'progress',
        header: ({ column }) => (
          <span
            onClick={() => column.toggleSorting()}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            Profile Progress
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp size={16} className="ml-1" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown size={16} className="ml-1" />
            ) : null}
          </span>
        ),
        footer: (props) => props.column.id,
        enableSorting: true,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Button
              variant="success" // Changed from "warning" to "success" for green color
              size="sm"
              onClick={() => handleEditItem(row.original)}
              title="Edit Item"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteItem(row.original)}
              title="Delete"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ),
        footer: (props) => props.column.id,
        enableSorting: false,
      },
    ],
    []
  );

  const [data, setData] = useState(() => makeData(100, 5, 3));
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<Person | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<Person>>({
    ItemName: '',
    lastName: '',
    price: 0,
    visits: 0,
    status: '✅ Acative',
    progress: 0,
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data,
    columns,
    state: { expanded, globalFilter, sorting },
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleDeleteItem = (item: Person) => {
    setData((prevData) => prevData.filter((row) => row.userId !== item.userId));
  };

  const handleEditItem = (item: Person) => {
    setEditItem(item);
    setShowEditModal(true);
  };

  const handleUpdateItem = () => {
    if (editItem) {
      setData((prevData) =>
        prevData.map((row) =>
          row.userId === editItem.userId ? { ...row, ...editItem } : row
        )
      );
    }
    setShowEditModal(false);
    setEditItem(null);
  };

  const handleAddItem = () => {
    const newPerson: Person = {
      userId: `new-${Date.now()}`,
      ItemName: newItem.ItemName ?? '',
      lastName: newItem.lastName ?? '',
      price: newItem.price ?? 0,
      visits: newItem.visits ?? 0,
      status: newItem.status ?? '✅ Available',
      progress: newItem.progress ?? 0,
      subRows: [],
    };
    setData((prevData) => [newPerson, ...prevData]);
    setNewItem({
      ItemName: '',
      lastName: '',
      price: 0,
      visits: 0,
      status: '✅ Acative',
      progress: 0,
    });
    setShowAddModal(false);
  };

  const renderPaginationItems = () => {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = Math.ceil(data.length / table.getState().pagination.pageSize);
    const pageItems: JSX.Element[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => table.setPageIndex(i - 1)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pageItems.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => table.setPageIndex(0)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 2) {
        pageItems.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => table.setPageIndex(i - 1)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 1) {
        pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }

      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => table.setPageIndex(totalPages - 1)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <div>
      <Stack direction="horizontal" gap={2} className="p-4 justify-content-between align-items-center">
        <Form.Control
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          style={{ width: '200px' }}
        />
        <div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            title="Add Item"
            className="ml-auto"
          >
            <Plus size={16} />
          </Button>
        </div>
      </Stack>

      <div
        style={{
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Table responsive className="mb-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Stack direction="horizontal" gap={2} className="p-4 justify-content-between">
          <Select
            value={{
              label: table.getState().pagination.pageSize,
              value: table.getState().pagination.pageSize,
            }}
            onChange={(selectedOption) => {
              if (selectedOption && selectedOption.value) {
                table.setPageSize(Number(selectedOption.value));
              }
            }}
            options={[10, 20, 30, 40, 50].map((pageSize) => ({
              label: pageSize,
              value: pageSize,
            }))}
            classNamePrefix="select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: '120px',
              }),
            }}
          />
          <Pagination>
            <Pagination.Prev
              onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
              disabled={table.getState().pagination.pageIndex === 0}
            />
            {renderPaginationItems()}
            <Pagination.Next
              onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
              disabled={
                table.getState().pagination.pageIndex ===
                Math.ceil(data.length / table.getState().pagination.pageSize) - 1
              }
            />
          </Pagination>
        </Stack>
      </div>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editItem && (
            <Form>
              <Form.Group className="mb-3" controlId="editItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editItem.ItemName}
                  onChange={(e) =>
                    setEditItem({ ...editItem, ItemName: e.target.value })
                  }
                  placeholder="Enter item name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editItem.lastName}
                  onChange={(e) =>
                    setEditItem({ ...editItem, lastName: e.target.value })
                  }
                  placeholder="Enter last name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      price: e.target.value ? parseInt(e.target.value) : 0,
                    })
                  }
                  placeholder="Enter price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editVisits">
                <Form.Label>Visits</Form.Label>
                <Form.Control
                  type="number"
                  value={editItem.visits}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      visits: e.target.value ? parseInt(e.target.value) : 0,
                    })
                  }
                  placeholder="Enter visits"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="editStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editItem.status}
                  onChange={(e) =>
                    setEditItem({ ...editItem, status: e.target.value })
                  }
                >
                  <option value="✅ Available">✅ Available</option>
                  <option value="❌ Unavailable">❌ Unavailable</option>
                  <option value="⏳ Pending">⏳ Pending</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="editProgress">
                <Form.Label>Progress</Form.Label>
                <Form.Control
                  type="number"
                  value={editItem.progress}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      progress: e.target.value ? parseInt(e.target.value) : 0,
                    })
                  }
                  placeholder="Enter progress"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            Update Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="addItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.ItemName}
                onChange={(e) =>
                  setNewItem({ ...newItem, ItemName: e.target.value })
                }
                placeholder="Enter item name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newItem.lastName}
                onChange={(e) =>
                  setNewItem({ ...newItem, lastName: e.target.value })
                }
                placeholder="Enter last name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price: e.target.value ? parseInt(e.target.value) : 0,
                  })
                }
                placeholder="Enter price"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addVisits">
              <Form.Label>Visits</Form.Label>
              <Form.Control
                type="number"
                value={newItem.visits}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    visits: e.target.value ? parseInt(e.target.value) : 0,
                  })
                }
                placeholder="Enter visits"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newItem.status}
                onChange={(e) =>
                  setNewItem({ ...newItem, status: e.target.value })
                }
              >
                <option value="✅ Acative"> Available</option>
                <option value="❌ Unavailable">❌ Unavailable</option>
                <option value="⏳ Pending">⏳ Pending</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addProgress">
              <Form.Label>Progress</Form.Label>
              <Form.Control
                type="number"
                value={newItem.progress}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    progress: e.target.value ? parseInt(e.target.value) : 0,
                  })
                }
                placeholder="Enter progress"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${className} form-check-input cursor-pointer`}
      {...rest}
    />
  );
}

export default Menu;