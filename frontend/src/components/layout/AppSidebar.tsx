import { Gauge, Settings, UserRound } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Gauge, end: true },
  { name: 'Account', href: '/account', icon: UserRound, end: false },
  { name: 'Appearance', href: '/settings', icon: Settings, end: false },
]

interface AppSidebarProps {
  collapsed?: boolean
  onNavigate?: () => void
}

export function AppSidebar({ collapsed = false, onNavigate }: AppSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className={cn('flex h-16 items-center border-b px-5', collapsed && 'justify-center px-2')}>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">L</div>
        {!collapsed && <span className="ml-3 truncate text-base font-semibold tracking-tight">Loco Admin</span>}
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            onClick={onNavigate}
            title={collapsed ? item.name : undefined}
            className={({ isActive }) => cn(
              'flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground',
              collapsed && 'justify-center px-0',
            )}
          >
            <item.icon className="size-4.5 shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={cn('border-t p-4 text-xs text-muted-foreground', collapsed && 'px-2 text-center')}>
        {collapsed ? 'v0.1' : 'Loco Admin · v0.1.0'}
      </div>
    </div>
  )
}
