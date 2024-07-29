export type RentalHouse = {
  id: string
  name: string
  address: string
  description: string
  image: string
  price: string
  user_id: number
  created_at: string
  updated_at: string
  rooms: {
    data: Room[]
  }
}
export type Room = {
  id: string
  name: string
  description: string
  status: string
  created_at: string
  updated_at: string
  rent_house_id: string
  tenants: {
    data: Tenants
  }
}
export type Tenants = {
  id: string
  name: string
  email: string
  phone: string
  price: number
  start_date: string
  end_date: string
  image: string
  room_id: string
  created_at: string
}
export type UserType = {
  id: number
  email: string
  name: string
  email_verified_at?: Date
  created_at: Date
  updated_at: Date
}
