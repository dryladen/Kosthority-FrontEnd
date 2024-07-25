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
import { useToast } from './ui/use-toast'
import { mutate } from 'swr'
import { useAuth } from '@/hooks/auth'
import { Houses } from '@/app/(authenticated)/houses/columns'

interface Values {
  name: string
  address: string
  description: string
  image: string
  price: number
  owner_id: number
}

export function EditData({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Houses
  isOpen: boolean
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
      await Axios.put(`/api/renthouses/${data.id}`, values)
        .then(() => {
          mutate('/api/renthouses')
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
    name: Yup.string().required('The name field is required.'),
    address: Yup.string().required('The address field is required.'),
    description: Yup.string().required('The description field is required.'),
    image: Yup.string().required('The image field is required.'),
    price: Yup.number().required('The price field is required.'),
  })
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Rental House</DialogTitle>
          <DialogDescription>
            Add a new rental house to the list
          </DialogDescription>
        </DialogHeader>
        <Formik
          onSubmit={submitForm}
          validationSchema={validated}
          initialValues={{
            name: data.name,
            price: data.price,
            address: data.address,
            description: data.description,
            image: data.image,
            owner_id: user?.id || 0,
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
              <div>
                <label
                  htmlFor="price"
                  className="undefined block font-semibold text-sm text-gray-700">
                  Price
                </label>
                <Field
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter your price rental house"
                  className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
                />
                <ErrorMessage
                  name="price"
                  component="span"
                  className="text-xs text-red-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="undefined block font-semibold text-sm text-gray-700">
                Address
              </label>
              <Field
                id="address"
                name="address"
                type="text"
                placeholder="Enter your address rental house"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
              <ErrorMessage
                name="address"
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
                placeholder="Enter your image rental house"
                className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
              />
              <ErrorMessage
                name="image"
                component="span"
                className="text-xs text-red-500"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Edit Data</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
