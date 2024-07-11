'use client'
import CardList from '@/components/CardList'
import NavHead from '@/components/NavHead'
import React from 'react'
import {
  Bed,
  DollarSign,
  HomeIcon,
  Users,
} from 'lucide-react'
import { useAuth } from '@/hooks/auth'
import Transactions from '@/components/Transaction'
import Sidebar from '@/components/SideBar'

const DashboardPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <NavHead />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <CardList
              summary={[
                {
                  title: 'Income',
                  logo: DollarSign,
                  sum: 'Rp.15.000',
                  desc: '',
                },
                {
                  title: 'Tenants',
                  logo: Users,
                  sum: '13',
                  desc: '',
                },
                {
                  title: 'Houses',
                  logo: HomeIcon,
                  sum: '2',
                  desc: '',
                },
                {
                  title: 'Rooms',
                  logo: Bed,
                  sum: '14',
                  desc: '',
                },
              ]}
            />
          </div>
          <Transactions />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
