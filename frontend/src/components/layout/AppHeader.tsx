import { ChevronDown, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Settings, User } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { clearToken } from '../../auth/token'
import { currentUserQueryKey, useCurrentUser } from '../../hooks/use-current-user'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { ThemeToggle } from './ThemeToggle'

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/account': 'Account',
  '/settings': 'Appearance',
}

interface AppHeaderProps {
  collapsed: boolean
  onToggleSidebar: () => void
  onOpenMobile: () => void
}

export function AppHeader({ collapsed, onToggleSidebar, onOpenMobile }: AppHeaderProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: user } = useCurrentUser()
  const pageName = pageNames[pathname] ?? 'Dashboard'

  function handleLogout() {
    clearToken()
    queryClient.removeQueries({ queryKey: currentUserQueryKey })
    navigate('/login')
  }

  const initials = user?.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <Button className="md:hidden" variant="ghost" size="icon" onClick={onOpenMobile} aria-label="Open navigation">
          <Menu />
        </Button>
        <Button className="hidden md:inline-flex" variant="ghost" size="icon" onClick={onToggleSidebar} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </Button>
        <div className="ml-1 min-w-0">
          <p className="text-xs text-muted-foreground">Loco Admin</p>
          <h1 className="truncate text-sm font-semibold">{pageName}</h1>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 px-2" aria-label="Open user menu">
              <Avatar><AvatarFallback>{initials}</AvatarFallback></Avatar>
              <span className="hidden text-left sm:block">
                <span className="block max-w-36 truncate text-sm leading-none">{user?.name}</span>
                <span className="mt-1 block max-w-36 truncate text-xs font-normal text-muted-foreground">{user?.email}</span>
              </span>
              <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate('/account')}><User />Account</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate('/settings')}><Settings />Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="text-destructive focus:text-destructive"><LogOut />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
