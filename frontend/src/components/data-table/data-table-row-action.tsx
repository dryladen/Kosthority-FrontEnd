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
  LucideIcon,
  MoreHorizontal,
  Pencil,
  ReceiptText,
  Trash2,
} from 'lucide-react'
import { EditData } from '@/components/EditData'
import { DeleteAlert } from '@/components/DeleteAlert'
import { useState } from 'react'
import { RentalHouse, Room, Tenants } from '@/types/types'
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router'
import { ResponsiveDialog } from '../ResponsiveDialog'
import AddData from '../AddData'

interface DataAction {
  type: 'link' | 'dialog'
  title: string
  logo: LucideIcon
  data: RentalHouse | Room | Tenants
  link?: Url
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface DataTableRowActionsProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  row: Row<TData>
  dialogs: React.ReactNode
  action: DataAction[]
}
export function DataTableRowAction<TData extends RentalHouse | Room | Tenants>({
  row,
  dialogs,
  action,
}: DataTableRowActionsProps<TData>) {
  const dataRow = row.original
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Person">
        {/* <EditForm cardId={dataRow.id} setIsOpen={setIsEditOpen} /> */}
        <AddData />
      </ResponsiveDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {action.map((item, index) => {
            return (
              <DropdownMenuItem key={index}>
                {item.type === 'link' ? (
                  <Link href={item.link ? item.link : '#'}>
                    <a className="flex items-center w-full">
                      {<item.logo className="h-4 w-4 mr-2" />}
                      <span>{item.title}</span>
                    </a>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      item.setIsOpen?.(true);
                    }}
                    className="flex items-center w-full">
                    <Pencil className="h-4 w-4 mr-2" />{' '}
                    <span>{item.title}</span>
                  </button>
                )}
              </DropdownMenuItem>
            )
          })}

          <DropdownMenuItem>
            <Link href={`/houses/${dataRow.id}`} className="flex">
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
