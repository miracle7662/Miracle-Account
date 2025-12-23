import React from 'react'
import {
  Column,
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'
import { Stack, Form, Pagination } from 'react-bootstrap'
import Select from 'react-select'

const TablePagination = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
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

  const [data] = React.useState(() => makeData(100))

  return (
    <>
      <Table
        {...{
          data,
          columns,
        }}
      />
    </>
  )
}

function Table({ data, columns }: { data: Person[]; columns: ColumnDef<Person>[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
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
        </table>
      </div>
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

function Filter({ column, table }: { column: Column<any, any>; table: ReactTable<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <Stack direction="horizontal" gap={2}>
      <Form.Control
        size="sm"
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
      />
      <Form.Control
        size="sm"
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
      />
    </Stack>
  ) : (
    <Form.Control
      size="sm"
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
    />
  )
}

export default TablePagination
