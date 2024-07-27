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
import { EditData } from '@/components/EditData'
import { DeleteAlert } from '@/components/DeleteAlert'
import { useState } from 'react'

interface Data<T> {
  id: string
  name: string
  is_available : boolean
  description: string
  created_at: string
  updated_at: string
  rent_house_id: string
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
      <EditData
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        data={renthouse}
      />
      <DeleteAlert
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        id={`${renthouse.id}`}
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
          {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(renthouse.id)}>
              Copy renthouse ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
          <DropdownMenuItem>
            <ReceiptText className="h-4 w-4 mr-2" />
            <span>Details</span>
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
