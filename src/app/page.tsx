'use client'

import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <>
      <Head>
        <title>Kosthority</title>
      </Head>

      <div className="sm:block bg-slate-200">
        {/* navbar */}
        <nav className="">
          <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="font-extrabold text-4xl">Kosthority</h1>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex space-x-8">
                  {user ? (
                    <Button>
                      <Link
                        href="/dashboard"
                        className="flex justify-center items-center font-bold">
                        Dashboard
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex justify-center items-center font-bold">
                        Login
                      </Link>
                      <Button>
                        <Link href="/register" className="font-bold">
                          Get Started !
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Jumbotron */}
        <div className="">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-8 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold  sm:text-4xl">
                  <span className="block ">
                    The best place to manage your business rental house
                  </span>
                </h2>
                <p className="mt-4 text-lg leading-6 ">
                  Kosthority is a platform that helps you to manage your rental house
                  easily and efficiently. Get started now!
                </p>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-md text-slate-100 bg-sky-500 hover:bg-sky-400">
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:-mx-4 relative lg:mt-0">
                <img
                  className="relative mx-auto"
                  src="https://tailwindui.com/img/component-images/full-width-with-sidebar.jpg"
                  alt="App screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
