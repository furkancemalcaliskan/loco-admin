import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, LoaderCircle, XCircle } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { get } from '../api/client'
import { AuthShell } from '../components/auth/AuthShell'
import { Button } from '../components/ui/button'

export function VerifyEmail() {
  const { token = '' } = useParams()
  const verification = useQuery({
    queryKey: ['verify-email', token],
    queryFn: () => get<void>(`/api/auth/verify/${encodeURIComponent(token)}`),
    enabled: Boolean(token),
    retry: false,
  })

  return (
    <AuthShell title="Email verification" description="Confirming your email address.">
      {verification.isPending && <div className="flex flex-col items-center gap-3 py-2 text-sm text-muted-foreground"><LoaderCircle className="size-8 animate-spin" />Verifying your email…</div>}
      {verification.isSuccess && <div className="space-y-4 text-center"><CheckCircle2 className="mx-auto size-10 text-emerald-600" /><p className="text-sm text-muted-foreground">Your email address has been verified.</p><Button className="w-full" asChild><Link to="/login">Continue to login</Link></Button></div>}
      {verification.isError && <div className="space-y-4 text-center"><XCircle className="mx-auto size-10 text-destructive" /><p className="text-sm text-muted-foreground">This verification link is invalid or expired.</p><Button className="w-full" variant="outline" asChild><Link to="/resend-verification">Request a new link</Link></Button></div>}
    </AuthShell>
  )
}
