'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import { useEffect, useState } from 'react'
import AuthSessionStatus from '@/components/AuthSessionStatus'

interface Values {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  useEffect(() => {
    const resetToken = searchParams.get('reset')
    setStatus(resetToken ? atob(resetToken) : '')
  }, [searchParams])

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      setIsLoading(true)
      await login(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
      setStatus('')
      setIsLoading(false)
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('The email field is required.'),
    password: Yup.string().required('The password field is required.'),
  })

  return (
    <AuthCard
      logo={
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      }>
      <AuthSessionStatus className="mb-4" status={status} />
      <Formik
        onSubmit={submitForm}
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '', remember: false }}>
        <Form className="space-y-4">
          <h1 className="text-3xl text-center font-bold text-gray-900">
            Welcome back!
          </h1>
          <div>
            <button
              type="button"
              className="w-full inline-flex items-center  px-4 py-2 bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 48 48">
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              <span className="ml-6 lg:ml-16">Continue with Google</span>
            </button>
            {/* or */}
            <div className="flex items-center mt-4">
              <div className="flex-1 border-t border-gray-300" />
              <div className="px-3 text-sm text-gray-500">Or</div>
              <div className="flex-1 border-t border-gray-300" />
            </div>
            <label
              htmlFor="email"
              className="undefined block font-semibold mt-4 text-sm text-gray-700">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="block p-2 mt-1 w-full text-sm rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="undefined block font-medium text-sm text-gray-700">
              Password
            </label>

            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="block p-2 text-sm mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-slate-200 outline-none focus:ring-2 focus:ring-slate-200 "
            />
            <ErrorMessage
              name="password"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="remember" className="inline-flex items-center">
              <Field
                type="checkbox"
                name="remember"
                className="rounded border-[#99A6AE] text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-[#252729] text-sm leading-[150%] tracking-[-0.4px] font-medium">
                Remember me
              </span>
            </label>
          </div>

          <div className="flex items-center space-x-4 justify-end mt-4">
            <Link
              href="/register"
              className="underline text-sm text-gray-600 hover:text-gray-900">
              Dont have any account?
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </Form>
      </Formik>
    </AuthCard>
  )
}

export default LoginPage
