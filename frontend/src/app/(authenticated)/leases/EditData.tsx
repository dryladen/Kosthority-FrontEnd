import { Copy, Pencil, PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import * as Yup from 'yup'

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Axios from '@/lib/axios'
import { mutate } from 'swr'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/components/ui/use-toast'
import { Lease } from '@/types/types'

interface Values {
  id: string
  start_date: string
  end_date: string
  amount: number
  tenant_id: string
  unit_id: string
}

export function EditData({
  data,
  setIsOpen,
}: {
  data: Lease
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { user } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
  })
  const triggerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const resetToken = searchParams.get('reset')
    setStatus(resetToken ? atob(resetToken) : '')
  }, [searchParams])

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await Axios.put(`/api/leases/${data.id}`, values)
        .then(() => {
          mutate('/api/leases')
          toast({ title: 'Success', description: 'Data has been updated' })
        })
        .catch(error => {
          console.error(error)
        })
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
      setStatus('')
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const validated = Yup.object().shape({
    start_date: Yup.string().required('Start Date is required'),
    end_date: Yup.string().required('End Date is required'),
    amount: Yup.number().required('Rent is required'),
    tenant_id: Yup.string().required('Tenant ID is required'),
    unit_id: Yup.string().required('Unit ID is required'),
  })
  return (
    <Formik
      onSubmit={submitForm}
      validationSchema={validated}
      initialValues={{
        id: data.id,
        start_date: data.start_date,
        end_date: data.end_date,
        amount: data.amount,
        tenant_id: data.tenant_id,
        unit_id: data.unit_id,
      }}>
      <Form className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="undefined block font-semibold text-sm text-gray-700">
            Amount
          </label>
          <Field
            id="amount"
            name="amount"
            type="text"
            placeholder="Ex: Angle House"
            className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
          />
          <ErrorMessage
            name="amount"
            component="span"
            className="text-xs text-red-500"
          />
        </div>
        <div className="flex gap-3">
          <div className="">
            <label
              htmlFor="start_date"
              className="undefined block font-semibold text-sm text-gray-700">
              Start Date
            </label>
            <Field
              id="start_date"
              name="start_date"
              type="date"
              placeholder="Ex: johndoe@gmail.com"
              className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
            />
            <ErrorMessage
              name="end_date"
              component="span"
              className="text-xs text-red-500"
            />
          </div>
          <div className="">
            <label
              htmlFor="end_date"
              className="undefined block font-semibold text-sm text-gray-700">
              Start Date
            </label>
            <Field
              id="end_date"
              name="end_date"
              type="date"
              placeholder="Ex: johndoe@gmail.com"
              className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
            />
            <ErrorMessage
              name="end_date"
              component="span"
              className="text-xs text-red-500"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant={'outline'} type="submit">
            Edit Data
          </Button>
        </DialogFooter>
      </Form>
    </Formik>
  )
}
