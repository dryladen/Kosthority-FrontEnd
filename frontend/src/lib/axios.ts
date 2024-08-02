import type { AxiosError, RawAxiosRequestHeaders } from 'axios'
import axios from 'axios'

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})

type UserSession = {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
  token: string
}

export async function headerAuth(
  session: Promise<{ user: UserSession } | null>,
): Promise<RawAxiosRequestHeaders> {
  const sesh = await session
  return {
    Authorization: `Bearer ${sesh?.user.token}`,
  }
}

Axios.interceptors.response.use(
  response => response,
  error => {
    const message: unknown = error.response.data.message
    if (error.response.data.errors) {
      const errs = error.response.data.errors

      error.message = Object.keys(errs)
        .slice(0, 1)
        .map(e => {
          return errs[e].map((ee: any) => ee).join('\n')
        })
        .join('\n')
    } else if (typeof message === 'string') {
      error.message = message
    } else if (typeof message === 'object') {
      error.message = Object.keys(message as any)
        // @ts-expect-error gapapa gan error
        .map((m: any) => message[m])
        .join('\n')
    }

    throw error
  },
)

export const axiosError = (error: AxiosError) => {
  const { message, errors } = error.response?.data as {
    message: string
    errors: any
  }
  if (errors) {
    const errs = errors
    error.message = Object.keys(errs)
      .slice(0, 1)
      .map(e => {
        return errs[e].map((ee: any) => ee).join('\n')
      })
      .join('\n')
  } else if (typeof message === 'string') {
    error.message = message
  } else if (typeof message === 'object') {
    error.message = Object.keys(message as any)
      .map((m: any) => message[m])
      .join('\n')
  }
}

export { Axios, axios }

export default Axios
