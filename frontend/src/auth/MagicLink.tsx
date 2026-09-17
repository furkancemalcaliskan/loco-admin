import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiClientError, post } from '../api/client'
import { AuthShell } from '../components/auth/AuthShell'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export function MagicLink() {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsPending(true)
    try {
      await post<void>('/api/auth/magic-link', { email })
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Could not send a magic link')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AuthShell title="Log in with a magic link" description="We’ll email you a secure, one-time login link." footer={<Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Use your password instead</Link>}>
      {isComplete ? (
        <div className="space-y-4 text-center"><p className="text-sm text-muted-foreground">A magic link has been sent to <span className="font-medium text-foreground">{email}</span>.</p><Button variant="outline" className="w-full" onClick={() => setIsComplete(false)}>Use another email</Button></div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2"><label className="text-sm font-medium" htmlFor="magic-email">Email</label><Input id="magic-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
          <Button className="w-full" disabled={isPending}>{isPending ? 'Sending…' : 'Send magic link'}</Button>
        </form>
      )}
    </AuthShell>
  )
}
