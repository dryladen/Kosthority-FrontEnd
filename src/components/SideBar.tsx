import Link from 'next/link'
import { Button } from './ui/button'
import {
  Bell,
  Home,
  LayoutDashboard,
  LineChart,
  Package,
  Package2,
  Users,
} from 'lucide-react'
import { ModeToggle } from './ModeToggle'

const Sidebar = () => {
  return (
    <div className="hidden border-r md:block bg-background">
      <div className="flex h-full max-h-screen flex-col gap-2 ">
        <div className="flex h-14 items-center justify-between border-b gap-2 px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="dark:text-white flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Kosthority</span>
          </Link>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 bg-muted text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-primary">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/houses"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Home className="h-4 w-4" />
              Houses
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
  )
}

export default Sidebar
