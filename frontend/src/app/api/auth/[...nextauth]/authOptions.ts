import axios from '@/lib/axios'
import { AuthOptions, ISODateString, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
//This is for getting the laravel-session cookie and the CSRF cookie
//from any response of Sanctum or API Breeze
//In my case, the cookies returned are always two and I only need this,
//so you can edit for get independent of position and cookies.
const getCookiesFromResponse = (res: any) => {
  let cookies = res.headers['set-cookie'][0].split(';')[0] + '; '
  cookies += res.headers['set-cookie'][1].split(';')[0] + '; '
  return cookies
}

//This is to get the X-XSRF-TOKEN from any response of Sanctum or API Breeze,
//In my case, the token is always returned first,
//so you can edit for get independent of position
const getXXsrfToken = (res: any) => {
  return decodeURIComponent(
    res.headers['set-cookie'][0].split(';')[0].replace('XSRF-TOKEN=', ''),
  )
}

//This method works to make any request to your Laravel API
//res_cookies are the cookies of the response of last request you do
//obviously res_cookies is null in your first request that is "/sanctum/csrf-cookie"
const makeRequest = async (
  method = 'get',
  url: any,
  dataForm = null,
  res_cookies: any,
) => {
  const cookies =
    res_cookies != null ? getCookiesFromResponse(res_cookies) : null
  const res = await axios.request({
    method: method,
    url: url,
    data: dataForm,
    headers: {
      origin: 'http://localhost:3000', // this is your front-end URL, for example in local -> http://localhost:3000
      Cookie: cookies, // set cookie manually on server
      'X-XSRF-TOKEN': res_cookies ? getXXsrfToken(res_cookies) : null,
    },
    withCredentials: true,
  })
  return res
}
export interface CustomSession {
  user?: CustomUser
  expires: ISODateString
}
export interface CustomUser {
  id?: string | null
  name?: string | null
  email?: string | null
  created_at?: string | null
  updated_at?: string | null
  token?: string | null
}
export const authOptions: AuthOptions = {
  // pages: {
  //   signIn: '/login',
  // },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const data = await axios.get('/sanctum/csrf-cookie')
        const cookieStore = cookies()
        const cookie = cookieStore.get('XSRF-TOKEN')
        return cookie;
        const response = await axios.post(
          '/login',
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: {
              'X-XSRF-TOKEN': cookie?.value,
            },
          },
        )
        console.log('respone : ', response)
        if (response.status === 200) {
          return response.data
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // * When we update the session
      if (trigger === 'update' && session?.profile_image) {
        const user: CustomUser = token.user as CustomUser
        console.log('The token is', token)
      }
      if (user) {
        token.user = user
      }
      return token
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession
      token: JWT
      user: User
    }) {
      session.user = token.user as CustomUser
      return session
    },
  },
}
