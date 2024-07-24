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
import { MoreHorizontal } from 'lucide-react'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Houses = {
  id: string
  name: string
  address: string
  image: string
  price: number
  created_at: string
}

export const columns: ColumnDef<Houses>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
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
    cell: ({ row }) => {
      const renthouse = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(renthouse.id)}>
              Copy renthouse ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View tenants</DropdownMenuItem>
            <DropdownMenuItem>View renthouse details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
