import { useState } from 'react'
import { ApiClientError, post } from '../api/client'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Separator } from '../components/ui/separator'
import { useCurrentUser } from '../hooks/use-current-user'

export function Account() {
  const { data: user } = useCurrentUser()
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  if (!user) return null

  const initials = user.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  async function resendVerification() {
    setError(null)
    setMessage(null)
    setIsPending(true)
    try {
      await post<void>('/api/auth/resend-verification-mail', { email: user?.email })
      setMessage('If this account needs verification, a new email has been sent.')
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Could not resend the verification email')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div><h2 className="text-2xl font-semibold tracking-tight">Account</h2><p className="mt-1 text-sm text-muted-foreground">Your account information from the Loco API.</p></div>
      <Card>
        <CardHeader><CardTitle>Profile information</CardTitle><CardDescription>The default backend exposes these fields as read-only.</CardDescription></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4"><Avatar className="size-14"><AvatarFallback className="text-base">{initials}</AvatarFallback></Avatar><div><p className="font-semibold">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div></div>
          <Separator />
          <dl className="grid gap-5 sm:grid-cols-2"><div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Name</dt><dd className="mt-1 text-sm">{user.name}</dd></div><div><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</dt><dd className="mt-1 break-all text-sm">{user.email}</dd></div><div className="sm:col-span-2"><dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Public ID</dt><dd className="mt-1 break-all font-mono text-sm">{user.pid}</dd></div></dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Email verification</CardTitle><CardDescription>The server sends a new link only when the account still requires verification.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {message && <p className="rounded-md bg-emerald-100 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" role="status">{message}</p>}
          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
          <Button variant="outline" onClick={resendVerification} disabled={isPending}>{isPending ? 'Sending…' : 'Resend verification email'}</Button>
        </CardContent>
      </Card>
    </div>
  )
}
