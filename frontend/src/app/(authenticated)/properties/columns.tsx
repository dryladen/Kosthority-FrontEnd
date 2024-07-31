'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowAction } from './data-table-row-action'
import { RentalHouse } from '@/types/types'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<RentalHouse>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Name'} />
    ),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Address'} />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Price'} />
    ),
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Created At'} />
    ),
    cell: ({ row }) => {
      return new Date(row.getValue('created_at')).toLocaleDateString(
        undefined,
        {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          weekday: 'long',
        },
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowAction row={row} />,
  },
]
