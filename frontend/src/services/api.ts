import axios from '@/lib/axios'

export const getUsers = async () => {
  try {
    const response = await axios.get('/api/users')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const getRentalHouse = async () => {
  try {
    const response = await axios.get('/api/renthouses')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

