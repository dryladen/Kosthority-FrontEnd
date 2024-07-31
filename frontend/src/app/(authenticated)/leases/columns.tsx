'use client'

import { Lease } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowAction } from './data-table-row-action'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'

export const columns: ColumnDef<Lease>[] = [
  
  {
    accessorKey: 'tenant_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Tenant'} />
    ),
  },
  {
    accessorKey: 'unit_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Unit'} />
    ),
  },{
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Amount'} />
    ),
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Start Date'} />
    ),
    cell: ({ row }) => {
      return new Date(row.getValue('start_date')).toLocaleDateString(
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
    accessorKey: 'end_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'End Date'} />
    ),
    cell: ({ row }) => {
      return new Date(row.getValue('end_date')).toLocaleDateString(
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
