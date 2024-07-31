'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { columns } from './columns'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { Property } from '@/types/types'
import { DataTable } from '@/components/data-table/data-table'
import AddData from '@/components/AddData'

function getData(): Property[] {
  const { data: properties } = useSWR('/api/properties', () =>
    axios
      .get('/api/properties')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const housesData: Property[] =
    properties?.map((item: Property) => ({
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
          <DataTable
            columns={columns}
            data={dataTable}
            children={<AddData />}
          />
        </CardContent>
      </Card>
    </>
  )
}

export default HousesPage
