'use client'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { File, ListFilter, PlusCircle } from 'lucide-react'
import { columns, Houses } from './columns'
import { DataTable } from './data-table'
import axios from '@/lib/axios'
import useSWR from 'swr'
import AddData from '@/components/AddData'

function getData(): Houses[] {
  const { data: renthouses } = useSWR('/api/renthouses', () =>
    axios
      .get('/api/renthouses')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const housesData: Houses[] =
    renthouses?.map((item: Houses) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      image: item.image,
      price: item.price,
      description: item.description,
      created_at: item.created_at,
    })) || []
  return housesData
}

const HousesPage = () => {
  const dataTable = getData()
  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Rental Houses</CardTitle>
          <CardDescription>
            Manage your rental properties and keep track of their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={dataTable} />
        </CardContent>
      </Card>
    </>
  )
}

export default HousesPage
