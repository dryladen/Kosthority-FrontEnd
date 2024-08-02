import { signIn } from 'auth'
import axios from 'axios'

const Test = async () => {
  return (
    <form
      action={async credentials => {
        'use server'
        await signIn('credentials', credentials)
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
  )
}

export default Test
