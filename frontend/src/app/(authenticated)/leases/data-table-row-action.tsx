import { Row } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Pencil, ReceiptText, Trash2 } from 'lucide-react'
import { DeleteAlert } from '@/components/DeleteAlert'
import { useState } from 'react'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { EditData } from './EditData'
import Link from 'next/link'

interface Data<T> {
  id: string
  start_date: string
  end_date: string
  amount: number
  tenant_id: string
  unit_id: string
  created_at: string
  updated_at: string
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}
export function DataTableRowAction<TData extends Data<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const leases = row.original
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Lease" description='Edit your data here'>
        <EditData data={leases} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <DeleteAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        linkApi="/api/leases"
        id={leases.id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/leases/${leases.id}`} className="flex">
              <ReceiptText className="h-4 w-4 mr-2" />
              <span>Details</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsEditOpen(true)
              }}
              className="flex items-center w-full">
              <Pencil className="h-4 w-4 mr-2" /> <span>Edit</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsDeleteOpen(true)
              }}
              className="flex w-full items-center">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
