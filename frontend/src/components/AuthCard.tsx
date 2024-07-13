import React, { ReactNode } from 'react'

type Props = {
  logo: ReactNode
  children: ReactNode
}

const AuthCard = ({ logo, children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      {/* <div>{logo}</div> */}

      <div className="w-full -300 sm:max-w-md mt-6 mx-4 px-12 py-8 md:shadow-[0px_0px_50px_0px_rgba(0,0,0,0.1)] overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}

export default AuthCard
