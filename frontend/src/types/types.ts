export type Property = {
  id: string
  name: string
  address: string
  description: string
  image: string
  price: string
  user_id: number
  created_at: string
  updated_at: string
  units: {
    data: Unit[]
  }
}
export type Unit = {
  id: string
  name: string
  description: string
  price: number
  created_at: string
  updated_at: string
  property: {
    id: string
    name: string
  }
  status: string
}
export type Tenants = {
  id: string
  name: string
  email: string
  phone: string
  image: string
  created_at: string
}

export type Lease = {
  id: string
  start_date: string
  end_date: string
  amount: number
  tenant_id: string
  unit_id: string
  created_at: string
  updated_at: string
}
export type Payment = {
  id: string
  lease_id: string
  amount: number
  paid: number
  balance: number
  method: string
  status: string
  created_at: string
  updated_at: string
}
export type UserType = {
  id: number
  email: string
  name: string
  email_verified_at?: Date
  created_at: Date
  updated_at: Date
}
