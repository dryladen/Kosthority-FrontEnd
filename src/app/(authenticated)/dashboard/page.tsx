'use client'
import CardDashboard from '@/components/CardDashboard'
import NavHead from '@/components/NavHead'
import { useData } from '@/hooks/dataKost'
import { RentalHouse } from '@/types/RentalHouse'
import { UserType } from '@/types/User'
import React from 'react'
import Link from 'next/link'
import {
  Bell,
  CircleUser,
  DollarSign,
  Home,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  User,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/hooks/auth'
import { DropdownButton } from '@/components/DropdownLink'
import Transactions from '@/components/Transaction'

const DashboardPage = () => {
  const { user } = useAuth({ middleware: 'auth' })
  const { logout } = useAuth({})
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* sidebar */}
      <div className="hidden border-r bg-muted/40 md:block ">
        <div className="flex h-full max-h-screen flex-col gap-2 ">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Kosthority</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="#"
                className="flex items-center gap-3 bg-muted text-primary rounded-lg px-3 py-2 transition-all hover:text-primary">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-4 w-4" />
                Houses
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Users className="h-4 w-4" />
                Tenants
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Package className="h-4 w-4" />
                Payments
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <LineChart className="h-4 w-4" />
                Reports
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="flex flex-col">
        {/* header */}
        <NavHead />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 ">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <CardDashboard
              title="Income"
              logo={<DollarSign className="w-4 h-4 text-muted-foreground"/>}
              content="Rp.15.000"
              desc=""
            />
            <CardDashboard
              title="Tenants"
              logo={<Users className="h-4 w-4 text-muted-foreground" />}
              content="24"
              desc=""
            />
            <CardDashboard
              title="Income"
              logo={<DollarSign className="w-5 h-5"></DollarSign>}
              content="Rp.15.000"
              desc=""
            />
          </div>
          <Transactions />
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
