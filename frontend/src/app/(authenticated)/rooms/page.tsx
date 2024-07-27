'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DataTable } from '../houses/data-table'
import { Room } from '@/types/types'
import Axios from '@/lib/axios'
import useSWR from 'swr'
import { columns } from './columns'
function getData(): Room[] {
  const { data: renthouses } = useSWR('/api/rooms', () =>
    Axios.get('/api/rooms')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const roomsData: Room[] =
    renthouses?.map((item: Room) => ({
      id: item.id,
      name: item.name,
      is_available: item.is_available ? 'Available' : 'Not Available',
      description: item.description,
      created_at: item.created_at,
      rent_house_id: item.rent_house_id
    })) || []
  return roomsData
}
const TenantsPage = () => {
  const dataTable = getData()
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Tenants</CardTitle>
        <CardDescription>A list of all tenants in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={dataTable} />
      </CardContent>
    </Card>
  )
}

export default TenantsPage
