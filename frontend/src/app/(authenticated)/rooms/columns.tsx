'use client'

import { Room } from '@/types/types'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowAction } from './data-table-row-action'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { User, User2 } from 'lucide-react'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Data'} />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex ">
            <div>
              <p className="font-bold text-muted-foreground">
                {row.original.name}
                {/* <Badge variant="default" className="text-[10px]">
              Available
            </Badge> */}
              </p>
              {/* {row.original.tenants?.data
                ? row.original.tenants.data.map(tenant => {
                    return (
                      <span className="text-muted-foreground flex gap-2">
                        {tenant.name}
                      </span>
                    )
                  })
                : null} */}
              <p className="text-muted-foreground text-[12px]">
                <span className="font-bold">Checked In</span> : 12/12/12
              </p>
            </div>
          </div>
        </>
      )
    },
  },
  {
    accessorKey: 'is_available',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Status'} />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Description'} />
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
