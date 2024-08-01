'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Unit } from '@/types/types'
import Axios from '@/lib/axios'
import useSWR from 'swr'
import { columns } from './columns'
import { DataTable } from '@/components/data-table/data-table'
import AddData from './AddData'
function getData(): Unit[] {
  const { data: properties }: { data: Unit[] } = useSWR('/api/units', () =>
    Axios.get('/api/units')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const unitDate: Unit[] =
    properties?.map((item: Unit) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      description: item.description,
      created_at: item.created_at,
      updated_at: item.updated_at,
      property: item.property,
      price: item.price,
    })) || []
  return unitDate
}
const TenantsPage = () => {
  const dataTable = getData()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
        <CardDescription>A list of all units in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={dataTable} children={<AddData />} />
      </CardContent>
    </Card>
  )
}

export default TenantsPage
