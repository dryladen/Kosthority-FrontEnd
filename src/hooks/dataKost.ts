import useSWR from 'swr'
import * as api from '@/services/api'

export const useData = () => {
  const GetUsers = () => {
    const { data, error, isLoading } = useSWR("/users", api.getUsers)
    return { data, error, isLoading }
  },
  GetRentalHouse = () => {
    const { data, error, isLoading } = useSWR("/rentalhouses", api.getRentalHouse)
    return { data, error, isLoading }
  }

  return { GetUsers, GetRentalHouse }
}
