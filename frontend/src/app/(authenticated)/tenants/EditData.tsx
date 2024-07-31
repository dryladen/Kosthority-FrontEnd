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
import { Tenants } from '@/types/types'

interface Values {
  id: string
  name: string
  email: string
  phone: string
  image: string
}

export function EditData({
  data,
  setIsOpen,
}: {
  data: Tenants
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
      await Axios.put(`/api/tenants/${data.id}`, values)
        .then(() => {
          mutate('/api/tenants')
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
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    image: Yup.string().required('Image is required'),
  })
  return (
    <Formik
      onSubmit={submitForm}
      validationSchema={validated}
      initialValues={{
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: data.image,
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
          <Button variant={'outline'} type="submit">
            Edit Data
          </Button>
        </DialogFooter>
      </Form>
    </Formik>
  )
}
