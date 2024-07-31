'use client'

import { Unit } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowAction } from './data-table-row-action'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { User, User2 } from 'lucide-react'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: 'property.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Property'} />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Name'} />
    ),
    cell: ({ row }) => {
      return (
        <p className="font-bold text-muted-foreground">{row.original.name}</p>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Status'} />
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.original.status === 'Occupied' ? (
            <Badge variant="default" className="text-[10px]">
              Occupide
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-[10px]">
              Vacate
            </Badge>
          )}
        </>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Description'} />
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Price'} />
    ),
  },

  // {
  //   accessorKey: 'created_at',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title={'Created At'} />
  //   ),
  //   cell: ({ row }) => {
  //     return new Date(row.getValue('created_at')).toLocaleDateString(
  //       undefined,
  //       {
  //         year: 'numeric',
  //         month: 'long',
  //         day: '2-digit',
  //         weekday: 'long',
  //       },
  //     )
  //   },
  // },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowAction row={row} />,
  },
]
