import { LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { clearToken } from '../../auth/token'
import { useCurrentUser } from '../../hooks/use-current-user'
import { cn } from '../../lib/utils'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '../ui/sheet'
import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'

export function AdminLayout() {
  const navigate = useNavigate()
  const { isLoading, isError } = useCurrentUser()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (isError) {
      clearToken()
      navigate('/login', { replace: true })
    }
  }, [isError, navigate])

  if (isLoading || isError) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><LoaderCircle className="size-6 animate-spin text-muted-foreground" /><span className="sr-only">Loading account</span></div>
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className={cn('fixed inset-y-0 left-0 z-40 hidden border-r bg-card transition-[width] duration-200 md:block', collapsed ? 'w-18' : 'w-64')}>
        <AppSidebar collapsed={collapsed} />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent className="p-0" side="left">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Loco Admin navigation menu</SheetDescription>
          <AppSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className={cn('transition-[padding] duration-200', collapsed ? 'md:pl-18' : 'md:pl-64')}>
        <AppHeader
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
