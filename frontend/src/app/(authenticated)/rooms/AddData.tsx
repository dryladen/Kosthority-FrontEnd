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
  name: string
  description: string
  rent_house_id: string
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
      await Axios.post('/api/rooms', values)
        .then(() => {
          mutate('/api/rooms')
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
    name: Yup.string().required('The name field is required.'),
    description: Yup.string().required('The description field is required.'),
    rent_house_id: Yup.string().required('The rent house field is required.'),
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Room
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
          <DialogDescription>Add a new room to the list</DialogDescription>
        </DialogHeader>
        <Formik
          onSubmit={submitForm}
          validationSchema={LoginSchema}
          initialValues={{
            name: '',
            description: '',
            rent_house_id: '',
          }}>
          <Form className="space-y-4">
            <ComboboxDemo />
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
            <div>
              <label
                htmlFor="description"
                className="undefined block font-semibold text-sm text-gray-700">
                Description
              </label>
              <Field
                id="description"
                name="description"
                type="text"
                placeholder="Enter your description rental house"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
              <ErrorMessage
                name="description"
                component="span"
                className="text-xs text-red-500"
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
