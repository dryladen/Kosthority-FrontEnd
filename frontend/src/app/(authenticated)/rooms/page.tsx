'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Room } from '@/types/types'
import Axios from '@/lib/axios'
import useSWR from 'swr'
import { columns } from './columns'
import { DataTable } from '@/components/data-table/data-table'
import AddData from './AddData'
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
      status: item.status,
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
        <CardTitle>Rooms</CardTitle>
        <CardDescription>A list of all rooms in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={dataTable} children={<AddData />} />
      </CardContent>
    </Card>
  )
}

export default TenantsPage
