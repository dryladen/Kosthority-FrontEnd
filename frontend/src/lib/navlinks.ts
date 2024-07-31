import { CircleDollarSign, DoorClosed, Handshake, Home, LayoutDashboard, ReceiptText, Users } from "lucide-react";

export const navLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    logo: LayoutDashboard,
  },
  {
    name: 'Property',
    path: '/properties',
    logo: Home,
  },
  {
    name: 'Units',
    path: '/units',
    logo: DoorClosed,
  },
  {
    name: 'Tenants',
    path: '/tenants',
    logo: Users,
  },
  {
    name: 'Leases',
    path: '/leases',
    logo: Handshake,
  },
  {
    name: 'Payments',
    path: '/payments',
    logo: CircleDollarSign,
  },
  {
    name: 'Invoices',
    path: '/invoices',
    logo: ReceiptText,
  },
]
