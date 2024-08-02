// 'use client'
import axios from 'axios'
import Test from '@/components/Test'
import { getCookie } from '@/lib/cookies'
import { auth, signIn, signOut } from 'auth'

const Page = async () => {
  const session = await auth()
  return (
    <>
      {session && (
        <div className="border">
          <span>Email : </span>
          {`${session.user?.email}`}
          <br />
          <form
            action={async () => {
              'use server'
              await signOut()
            }}>
            <button type="submit">Sign Out</button>
          </form>
        </div>
      )}
      <form
        action={async credentials => {
          'use server'
          await signIn('credentials', credentials)
          // const res = await axios
          //   .get('http://localhost:8000/sanctum/csrf-cookie', {
          //     withCredentials: true,
          //   })
          //   .then(() => {
          //     axios
          //       .post(
          //         'http://localhost:8000/login',
          //         { email: 'laden@gmail.com', password: 'password' },
          //         {
          //           withCredentials: true,
          //           headers: {
          //             Accept: 'application/json',
          //             'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          //           },
          //         },
          //       )
          //       .then(res => {
          //         console.log('response', res)
          //         return res
          //       })
          //   })
        }}>
        <div>
          <input
            name="email"
            type="email"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm"
            placeholder="email"
          />
          <br />
          <input
            type="text"
            name="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 m-3 max-w-sm"
            placeholder="password"
          />
          <div>
            <button
              type="submit"
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded m-3">
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Page
