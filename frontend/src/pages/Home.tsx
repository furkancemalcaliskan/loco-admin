import { ArrowRight, CheckCircle2, KeyRound, Mail, UserRound } from 'lucide-react'
import { Link } from 'react-router'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useCurrentUser } from '../hooks/use-current-user'

export function Home() {
  const { data: user } = useCurrentUser()
  if (!user) return null

  const initials = user.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-semibold tracking-tight">Welcome, {user.name}</h2><p className="mt-1 text-sm text-muted-foreground">Your Loco account and authentication services are ready.</p></div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <Card>
          <CardHeader><CardTitle>Your account</CardTitle><CardDescription>Data loaded from the authenticated current-user endpoint.</CardDescription></CardHeader>
          <CardContent><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><Avatar className="size-14"><AvatarFallback className="text-base">{initials}</AvatarFallback></Avatar><div className="min-w-0 flex-1"><p className="font-semibold">{user.name}</p><p className="truncate text-sm text-muted-foreground">{user.email}</p></div><Button variant="outline" asChild><Link to="/account">View account<ArrowRight /></Link></Button></div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>API connection</CardTitle><CardDescription>Authentication status for this session.</CardDescription></CardHeader>
          <CardContent className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="size-5" /></div><div><p className="text-sm font-medium">Connected</p><p className="text-xs text-muted-foreground">Current user loaded</p></div></div><Badge variant="success">Online</Badge></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Account actions</CardTitle><CardDescription>Operations supported by the default Loco authentication backend.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Button variant="outline" className="h-auto justify-start p-4" asChild><Link to="/account"><UserRound className="size-5" /><span className="text-left"><span className="block">Account details</span><span className="block text-xs font-normal text-muted-foreground">View current user data</span></span></Link></Button>
          <Button variant="outline" className="h-auto justify-start p-4" asChild><Link to="/resend-verification"><Mail className="size-5" /><span className="text-left"><span className="block">Email verification</span><span className="block text-xs font-normal text-muted-foreground">Request another verification link</span></span></Link></Button>
          <Button variant="outline" className="h-auto justify-start p-4" asChild><Link to="/forgot-password"><KeyRound className="size-5" /><span className="text-left"><span className="block">Reset password</span><span className="block text-xs font-normal text-muted-foreground">Request a secure reset link</span></span></Link></Button>
        </CardContent>
      </Card>
    </div>
  )
}
