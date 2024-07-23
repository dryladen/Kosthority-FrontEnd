import { signIn } from '@/auth'
export default function SignIn() {
  return (
    <form
      action={async formData => {
        'use server'
        try {
          await signIn('credentials', formData)
        } catch (e: unknown) {
          console.log("error nih : " , e)
        }
      }}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}
