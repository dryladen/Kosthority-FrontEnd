import { Copy, PlusCircle } from 'lucide-react'

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
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Axios from '@/lib/axios'
import { mutate } from 'swr'
import { useAuth } from '@/hooks/auth'
import { useToast } from '@/components/ui/use-toast'
import { ComboboxDemo } from '@/components/data-table/data-table-faceted-filter'

interface Values {
  start_date: string
  end_date: string
  amount: number
  tenant_id: string
  unit_id: string
}

const AddData = () => {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const { user } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
  })
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
      await Axios.post('/api/leases', values)
        .then(() => {
          mutate('/api/leases')
          toast({ title: 'Success', description: 'Data has been added' })
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
      setOpen(false)
      setIsLoading(false)
    }
  }

  const LoginSchema = Yup.object().shape({
    start_date: Yup.string().required('Start Date is required'),
    end_date: Yup.string().required('End Date is required'),
    amount: Yup.number().required('price is required'),
    tenant_id: Yup.string().required('Tenant ID is required'),
    unit_id: Yup.string().required('Unit ID is required'),
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Lease
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Lease</DialogTitle>
          <DialogDescription>Add a new lease to the list</DialogDescription>
        </DialogHeader>
        <Formik
          onSubmit={submitForm}
          validationSchema={LoginSchema}
          initialValues={{
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
            amount: 0,
            tenant_id: '',
            unit_id: '',
          }}>
          <Form className="space-y-4">
            <div className="flex gap-3">
            <ComboboxDemo name='unit_id' apiUrl='units' title='Unit'/>
            <ComboboxDemo name='tenant_id' apiUrl='tenants' title='Tenant'/>
            </div>
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
                /><ErrorMessage
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
                /><ErrorMessage
                name="end_date"
                component="span"
                className="text-xs text-red-500"
              />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Data</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default AddData
