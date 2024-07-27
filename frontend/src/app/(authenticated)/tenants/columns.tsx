'use client'

import { Tenants } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '../houses/data-table-column-header'
import { DataTableRowAction } from './data-table-row-action'
import Image from 'next/image'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Tenants>[] = [
  {
    accessorKey: 'room_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Room ID'} />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Name'} />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Email'} />
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Phone'} />
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
