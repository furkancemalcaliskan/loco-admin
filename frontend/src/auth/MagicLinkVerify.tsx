import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LoaderCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { get } from '../api/client'
import { setToken } from './token'
import type { LoginResponse } from './types'
import { currentUserQueryKey } from '../hooks/use-current-user'
import { AuthShell } from '../components/auth/AuthShell'
import { Button } from '../components/ui/button'

export function MagicLinkVerify() {
  const { token = '' } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const verification = useQuery({
    queryKey: ['magic-link', token],
    queryFn: () => get<LoginResponse>(`/api/auth/magic-link/${encodeURIComponent(token)}`),
    enabled: Boolean(token),
    retry: false,
  })

  useEffect(() => {
    if (!verification.data) return
    setToken(verification.data.token)
    queryClient.removeQueries({ queryKey: currentUserQueryKey })
    navigate('/', { replace: true })
  }, [navigate, queryClient, verification.data])

  return (
    <AuthShell title="Signing you in" description="Your secure link is being verified.">
      {verification.isPending && <div className="flex flex-col items-center gap-3 py-2 text-sm text-muted-foreground"><LoaderCircle className="size-8 animate-spin" />Signing in…</div>}
      {verification.isError && <div className="space-y-4 text-center"><XCircle className="mx-auto size-10 text-destructive" /><p className="text-sm text-muted-foreground">This magic link is invalid or expired.</p><Button className="w-full" variant="outline" asChild><Link to="/magic-link">Request a new link</Link></Button></div>}
    </AuthShell>
  )
}
