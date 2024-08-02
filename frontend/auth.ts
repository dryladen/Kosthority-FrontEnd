import axios from 'axios'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import { getKuki } from '@/lib/cookies'
const credentialsConfig = Credentials({
  name: 'credentials',
  credentials: {
    email: {
      label: 'Email',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },
  async authorize(credentials: Partial<Record<'email' | 'password', unknown>>) {
    const res = await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    })
    const dataCookies = res.headers['set-cookie']
    console.log(dataCookies)
    let sessionKey = null
    let xsrfToken = null

    for (const cookie of dataCookies!) {
      if (cookie.startsWith('kosthority_session=')) {
        sessionKey = getKuki(cookie, 'kosthority_session')
      } else if (cookie.startsWith('XSRF-TOKEN=')) {
        xsrfToken = getKuki(cookie, 'XSRF-TOKEN')
      }

      if (sessionKey && xsrfToken) {
        break
      }
    }
    cookies().set('kosthority_session', `${sessionKey}`)
    cookies().set('XSRF-TOKEN', `${xsrfToken}`)
    const headers = new Headers({
      Cookie: `XSRF-TOKEN=${xsrfToken};kosthority_session=${sessionKey}`,
      'Content-Type': 'application/json',
    })

    if (xsrfToken) {
      headers.append('X-XSRF-TOKEN', xsrfToken)
    }
    console.log('data : ', headers)
    axios
      .post(
        'http://localhost:8000/login',
        { email: credentials?.email, password: credentials?.password },
        {
          withCredentials: true,
          headers: {
            Cookie: `XSRF-TOKEN=${xsrfToken};kosthority_session=${sessionKey}`,
            Accept: 'application/json',
            'X-XSRF-TOKEN': xsrfToken,
          },
        },
      )
      .then(res => {
        console.log('response', res)
        return res
      })
    return {
      email: 'wahid',
      password: 'udin',
    }
  },
})
// const setCookieHeader = res.headers.get('set-cookie')
// // you'll find your_site_session key in this console log

// const dataCookie = setCookieHeader?.split(', ')
// // console.log(dataCookie)
// let sessionKey = ''
// let xsrfToken = ''

// for (const cookie of dataCookie!) {
//   if (cookie.startsWith('kosthority_session=')) {
//     sessionKey = cookie.split('=')[1]
//   } else if (cookie.startsWith('XSRF-TOKEN=')) {
//     xsrfToken = cookie.split('=')[1]
//   }

//   if (sessionKey && xsrfToken) {
//     break
//   }
// }
// // cookies().set('kosthority_session', sessionKey)
// // cookies().set('XSRF-TOKEN', xsrfToken)
// const data = {
//   email: credentials?.email,
//   password: credentials?.password,
// }
// const headers = new Headers({
//   Cookie: `kosthority_session=${sessionKey}`,
//   'Content-Type': 'application/json',
// })

// if (xsrfToken) {
//   headers.append('X-XSRF-TOKEN', xsrfToken)
// }
// console.log('data : ', headers)
// const options = {
//   method: 'POST',
//   headers,
//   body: JSON.stringify(data),
// }
// try {
//   // console.log(options)
//   const response = await fetch('http://localhost:8000/login', options)
//   if (response.ok) {
//     const res = await response.json()
//     console.log('response', res)
//     return res
//   } else {
//     console.log('HTTP error! : ', response)
//     console.log('HTTP error! Status:', response.status)
//     // Handle non-successful response here, return an appropriate JSON response.
//     return { error: 'Authentication failed' }
//   }
// } catch (error) {
//   console.log('Error', error)
// }

//     return null
//   },
// })

const config = {
  providers: [credentialsConfig],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
