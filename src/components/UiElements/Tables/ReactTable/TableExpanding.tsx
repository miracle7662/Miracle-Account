import React, { HTMLProps } from 'react'
import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'
import { Button, Table, Stack, Pagination } from 'react-bootstrap'
import Select from 'react-select'

const TableExpanding = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{' '}
            <Button
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
              variant=""
              className="btn-icon"
            >
              {table.getIsAllRowsExpanded() ? (
                <i className="fi fi-rr-square-minus"></i>
              ) : (
                <i className="fi fi-rr-square-plus"></i>
              )}
            </Button>{' '}
            First Name
          </>
        ),
        cell: ({ row, getValue }) => (
          <div
            style={{
              paddingLeft: `${row.depth * 2}rem`,
            }}
            className="d-flex align-items-center"
          >
            <>
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{' '}
              {row.getCanExpand() ? (
                <span
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: 'pointer' },
                  }}
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
              )}{' '}
              {getValue()}
            </>
          </div>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        header: 'Last Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: 'Visits',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      },
    ],
    [],
  )

  const [data] = React.useState(() => makeData(100, 5, 3))

  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  })

  const totalPages = Math.ceil(data.length / table.getState().pagination.pageSize)

  const renderPaginationItems = () => {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = Math.ceil(data.length / table.getState().pagination.pageSize)

    const pageItems: JSX.Element[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => table.setPageIndex(i - 1)}
          >
            {i}
          </Pagination.Item>,
        )
      }
    } else {
      pageItems.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => table.setPageIndex(0)}>
          {1}
        </Pagination.Item>,
      )

      if (currentPage > 2) {
        pageItems.push(<Pagination.Ellipsis key="ellipsis-start" />)
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
          </Pagination.Item>,
        )
      }

      if (currentPage < totalPages - 1) {
        pageItems.push(<Pagination.Ellipsis key="ellipsis-end" />)
      }

      pageItems.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => table.setPageIndex(totalPages - 1)}
        >
          {totalPages}
        </Pagination.Item>,
      )
    }

    return pageItems
  }

  return (
    <>
      <Table responsive className="mb-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
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
              table.setPageSize(Number(selectedOption.value))
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
            disabled={table.getState().pagination.pageIndex === totalPages - 1}
          />
        </Pagination>
      </Stack>
    </>
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' form-check-input cursor-pointer'}
      {...rest}
    />
  )
}

export default TableExpanding
