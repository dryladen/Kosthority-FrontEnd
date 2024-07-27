import { DoorClosed, Home, LayoutDashboard, LineChart, Package, Users } from "lucide-react";

export const navLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    logo: LayoutDashboard,
  },
  {
    name: 'Rental Houses',
    path: '/houses',
    logo: Home,
  },
  {
    name: 'Rooms',
    path: '/rooms',
    logo: DoorClosed,
  },
  {
    name: 'Tenants',
    path: '/tenants',
    logo: Users,
  },
  {
    name: 'Payments',
    path: '/payments',
    logo: Package,
  },
  {
    name: 'Reports',
    path: '/reports',
    logo: LineChart,
  },
]
