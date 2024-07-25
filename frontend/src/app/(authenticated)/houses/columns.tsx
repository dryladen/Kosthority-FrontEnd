'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Pencil, Receipt, ReceiptText } from 'lucide-react'
import { DeleteAlert } from '@/components/DeleteAlert'
import { EditData } from '@/components/EditData'
import AddData from '@/components/AddData'
import { DataTableRowAction } from './data-table-row-action'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Houses = {
  id: string
  name: string
  address: string
  image: string
  price: number
  description: string
  created_at: string
}

export const columns: ColumnDef<Houses>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
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
    cell: ({ row }) => <DataTableRowAction row={row} />
  },
]
