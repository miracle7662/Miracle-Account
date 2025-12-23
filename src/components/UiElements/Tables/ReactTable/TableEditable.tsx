import React from 'react'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'
import { Table, Stack, Pagination } from 'react-bootstrap'
import Select from 'react-select'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

interface CellInputProps {
  getValue: () => any
  row: any
  column: any
  table: any
}

const CellInput: React.FC<CellInputProps> = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <input
      value={value as string}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="form-control"
    />
  )
}

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: (props) => <CellInput {...props} />,
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

const TableEditable = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
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

  const [data, setData] = React.useState(() => makeData(100))

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex()
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          }),
        )
      },
    },
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

export default TableEditable
