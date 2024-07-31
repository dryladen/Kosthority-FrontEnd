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
  id: string
  name: string
  email: string
  phone: string
  image: string
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
      await Axios.post('/api/tenants', values)
        .then(() => {
          mutate('/api/tenants')
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
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    image: Yup.string().required('Image is required'),
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Tenant
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tenant</DialogTitle>
          <DialogDescription>Add a new tenant to the list</DialogDescription>
        </DialogHeader>
        <Formik
          onSubmit={submitForm}
          validationSchema={LoginSchema}
          initialValues={{
            id: '',
            name: '',
            email: '',
            phone: '',
            image: '',
          }}>
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="undefined block font-semibold text-sm text-gray-700">
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Ex: Angle House"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
              <ErrorMessage
                name="name"
                component="span"
                className="text-xs text-red-500"
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="undefined block font-semibold text-sm text-gray-700">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="text"
                placeholder="Ex: johndoe@gmail.com"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="undefined block font-semibold text-sm text-gray-700">
                Phone
              </label>
              <Field
                id="phone"
                name="phone"
                type="text"
                placeholder="Ex: 08123456789"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="undefined block font-semibold text-sm text-gray-700">
                Image
              </label>
              <Field
                id="image"
                name="image"
                type="text"
                placeholder="Ex: https://example.com/image.jpg"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
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
