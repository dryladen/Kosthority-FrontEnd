'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import axios from '@/lib/axios'
import useSWR from 'swr'
import { Room } from '@/types/types'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '../../units/columns'

function getData(id: string): Room {
  const { data: rooms } = useSWR(`/api/rooms/${id}`, () =>
    axios
      .get(`/api/rooms/${id}`)
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  return rooms
}

const HousesPage = ({ params }: { params: { id: string } }) => {
  const dataDetail = getData(params.id)
  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{dataDetail?.name}</CardTitle>
          {dataDetail && (
            <>
              <p className="text-sm text-muted-foreground">
                {dataDetail.description}
              </p>
              {/* <p className="text-sm text-muted-foreground">
                <span className="font-bold">Address : </span>{' '}
                {dataDetail.address}
              </p> */}
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Renthouse : </span>{' '}
                {dataDetail.rent_house_id}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Created At : </span>{' '}
                {new Date(dataDetail.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                  weekday: 'long',
                })}
              </p>
            </>
          )}
          <CardDescription></CardDescription>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-06-chunk-0">
        {dataDetail?.tenants?.name ? (
          <>
            <CardHeader>
              <CardTitle>{dataDetail.tenants.name}</CardTitle>
              <CardDescription>
              <div className="rounded-sm text-muted-foreground">
                <p className="text-sm">{dataDetail.tenants.email}</p>
                <p className="text-sm">{dataDetail.tenants.phone}</p>
                <p className="text-sm">{dataDetail.tenants.start_date}</p>
                <p className="text-sm">{dataDetail.tenants.end_date}</p>
                <p className="text-sm">{dataDetail.tenants.price}</p>
              </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span>Payments</span>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>No Tenant</CardTitle>
              <CardDescription>
                Click check in to add a tenant to this room
              </CardDescription>
            </CardHeader>
          </>
        )}
      </Card>
    </>
  )
}

export default HousesPage
