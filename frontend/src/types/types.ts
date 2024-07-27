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
}
export type Room = {
  id: string
  name: string
  is_available : boolean
  description: string
  created_at: string
  updated_at: string
  rent_house_id: string
}
export type Tenants = {
  id: string
  name: string
  address: string
  image: string
  price: number
  description: string
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
