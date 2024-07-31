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
import { Unit } from '@/types/types'

function getData(id: string): Unit {
  const { data: rooms } = useSWR(`/api/units/${id}`, () =>
    axios
      .get(`/api/units/${id}`)
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
      <Card>
        <CardHeader>
          <CardTitle>{dataDetail?.name}</CardTitle>
          {dataDetail && (
            <>
              <p className="text-sm text-muted-foreground">
                {dataDetail.description}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Price : </span> {dataDetail.price}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Property : </span>{' '}
                {dataDetail.property.name}
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
        <>
          <CardHeader>
            <CardTitle>No Tenant</CardTitle>
            <CardDescription>
              Click check in to add a tenant to this room
            </CardDescription>
          </CardHeader>
        </>
      </Card>
    </>
  )
}

export default HousesPage
