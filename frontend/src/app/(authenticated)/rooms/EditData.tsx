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
import { Room } from '@/types/types'

interface Values {
  id: string
  name: string
  description: string
  rent_house_id: string
}

export function EditData({
  data,
  setIsOpen,
}: {
  data: Room
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
      await Axios.put(`/api/rooms/${data.id}`, values)
        .then(() => {
          mutate('/api/rooms')
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
    description: Yup.string().required('Description is required'),
  })
  return (
    <Formik
      onSubmit={submitForm}
      validationSchema={validated}
      initialValues={{
        id: data.id,
        name: data.name,
        description: data.description,
        rent_house_id: data.rent_house_id,
      }}>
      <Form className="space-y-4">
        <div className="flex gap-3">
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
          <Button variant={'outline'} type="submit">
            Edit Data
          </Button>
        </DialogFooter>
      </Form>
    </Formik>
  )
}
