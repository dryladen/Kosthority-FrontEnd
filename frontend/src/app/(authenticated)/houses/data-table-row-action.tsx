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
import Link from 'next/link'
import { RentalHouse, Room } from '@/types/types'
import { ResponsiveDialog } from '@/components/ResponsiveDialog'
import { EditData } from '@/components/EditData'

interface Data<T> {
  id: string
  name: string
  address: string
  description: string
  image: string
  price: string
  user_id: number
  created_at: string
  updated_at: string
  rooms: {
    data: Room[]
  }
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}
export function DataTableRowAction<TData extends Data<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const renthouse = row.original
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Person" 
        description='aloha'>
        <EditData data={renthouse} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <DeleteAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        linkApi='/api/renthouses'
        id = {renthouse.id}
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
            <Link href={`/houses/${renthouse.id}`} className="flex">
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
