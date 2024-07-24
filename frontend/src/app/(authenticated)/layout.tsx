'use client'
import { ReactNode } from 'react'
import Sidebar from '@/components/SideBar'
import NavHead from '@/components/NavHead'

const AppLayout = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <NavHead />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
