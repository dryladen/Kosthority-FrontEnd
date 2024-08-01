'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Lease } from '@/types/types'
import Axios from '@/lib/axios'
import useSWR from 'swr'
import { DataTable } from '@/components/data-table/data-table'
import AddData from './AddData'
import { columns } from './columns'
function getData(): Lease[] {
  const { data: renthouses } = useSWR('/api/leases', () =>
    Axios.get('/api/leases')
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  const housesData: Lease[] =
    renthouses?.map((item: Lease) => ({
      id: item.id,
      start_date: item.start_date,
      end_date: item.end_date,
      amount: item.amount,
      tenant_id: item.tenant_id,
      unit_id: item.unit_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })) || []
  return housesData
}
const LeasesPage = () => {
  const dataTable = getData()
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Leases</CardTitle>
        <CardDescription>A list of all Leases in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={dataTable} children={<AddData />} search='tenant_id' />
      </CardContent>
    </Card>
  )
}

export default LeasesPage
