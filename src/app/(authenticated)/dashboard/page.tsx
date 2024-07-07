'use client'
import { useData } from '@/hooks/dataKost'
import { RentalHouse } from '@/types/RentalHouse'
import { UserType } from '@/types/User'
import React from 'react'

const DashboardPage = () => {
  const { data: dataUsers } = useData().GetUsers()
  const { data: dataRentalHouse } = useData().GetRentalHouse()
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200 ">
            <h1 className="text-3xl font-semibold mb-4">Data Users</h1>
            {dataUsers?.map((user: UserType) => (
              <div
                key={user.id}
                className="flex items-center justify-between shadow rounded-sm p-2 mb-4">
                <div>
                  <div className="text-lg font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            ))}
          </div>
          {/* data rental */}
          <div className="p-6 bg-white border-b border-gray-200 ">
            <h1 className="text-3xl font-semibold mb-4">Data Rental House</h1>
            {dataRentalHouse?.map((rentalHouse: RentalHouse) => (
              <div
                key={rentalHouse.id}
                className="flex items-center justify-between shadow rounded-sm p-2 mb-4">
                <div>
                  <div className="text-lg font-semibold">
                    {rentalHouse.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {rentalHouse.address}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
