import Link from 'next/link'
import { Button } from './ui/button'
import {
  Bell,
  Package2,
} from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/navlinks'

const Sidebar = () => {
  const pathname = usePathname()
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
            {navLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === link.path
                    ? 'text-primary bg-muted'
                    : 'text-muted-foreground'
                }`}>
                {<link.logo className="h-4 w-4" />}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
