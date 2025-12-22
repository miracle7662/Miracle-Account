import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'
import { Table } from 'react-bootstrap'
import Sorter from './components/Sorter'

type Person = {
  firstName: string
  lastName: string
  age: number
  email: string
  location: string
  phone: string
}

const columns: ColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Location',
    accessorKey: 'location',
  },
  {
    header: 'Phone',
    accessorKey: 'phone',
  },
]

const data = [
  {
    firstName: 'Maria',
    lastName: 'Anders',
    age: 24,
    email: 'maria.anders@example.com',
    location: 'New York, USA',
    phone: '+1 123-456-7890',
  },
  {
    firstName: 'Francisco',
    lastName: 'Chang',
    age: 29,
    email: 'francisco.chang@example.com',
    location: 'San Francisco, USA',
    phone: '+1 987-654-3210',
  },
  {
    firstName: 'Roland',
    lastName: 'Mendel',
    age: 31,
    email: 'roland.mendel@example.com',
    location: 'Berlin, Germany',
    phone: '+49 1234 567890',
  },
  {
    firstName: 'Helen',
    lastName: 'Bennett',
    age: 43,
    email: 'helen.bennett@example.com',
    location: 'London, UK',
    phone: '+44 20 1234 5678',
  },
  {
    firstName: 'Yoshi ',
    lastName: 'Tannamuri',
    age: 37,
    email: 'yoshi.tannamuri@example.com',
    location: 'Tokyo, Japan',
    phone: '+81 90-1234-5678',
  },
]

const TableSorting = () => {
  const [sorting, setSorting] = useState<ColumnSort[]>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

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
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {<Sorter sort={header.column.getIsSorted()} />}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
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
    </>
  )
}

export default TableSorting
