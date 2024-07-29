import { Row } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  BookCheck,
  BookX,
  MoreHorizontal,
  Pencil,
  ReceiptText,
  Trash2,
} from 'lucide-react'
import { DeleteAlert } from '@/components/DeleteAlert'
import { useState } from 'react'
import { EditData } from './EditData'
import { Tenants } from '@/types/types'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import Link from 'next/link'

interface Data<T> {
  id: string
  name: string
  description: string
  status: string
  created_at: string
  updated_at: string
  rent_house_id: string
  tenants: {
    data: Tenants
  }
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}
export function DataTableRowAction<TData extends Data<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const room = row.original
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Data"
        description="Editing data...">
        <EditData data={room} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <DeleteAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        linkApi="/api/rooms"
        id={room.id}
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
            <Link href={`/rooms/${room.id}`} className="flex">
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
          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsDeleteOpen(true)
              }}
              className="flex w-full items-center">
              <BookCheck className="mr-2 h-4 w-4" />
              <span>Check In</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={() => {
                setIsDeleteOpen(true)
              }}
              className="flex w-full items-center">
              <BookX className="mr-2 h-4 w-4" />
              <span>Check Out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
