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
import { Property } from '@/types/types'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '../../units/columns'

function getData(id: string): Property {
  const { data: properties } = useSWR(`/api/properties/${id}`, () =>
    axios
      .get(`/api/properties/${id}`)
      .then(res => res.data.data)
      .catch(error => {
        if (error.response.status !== 409) throw error
      }),
  )
  return properties
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
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Address : </span>{' '}
                {dataDetail.address}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Price : </span> {dataDetail.price}
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
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">Rooms : </span> 8/16
              </p>
            </>
          )}
          <CardDescription></CardDescription>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Rooms</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dataDetail && (
            <DataTable columns={columns} data={dataDetail.units.data} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default HousesPage
