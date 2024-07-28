'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tenants } from '@/types/types'
import Axios from '@/lib/axios'
import useSWR from 'swr'
import { columns } from './columns'
import { create } from 'domain'
import { DataTable } from '@/components/data-table/data-table'
function getData(): Tenants[] {
  const { data: renthouses } = useSWR('/api/tenants', () =>
    Axios.get('/api/tenants')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const housesData: Tenants[] =
    renthouses?.map((item: Tenants) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      start_date: item.start_date,
      end_date: item.end_date,
      image: item.image,
      price: item.price,
      room_id: item.room_id,
      created_at: item.created_at,
    })) || []
  return housesData
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
