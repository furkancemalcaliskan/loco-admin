import { CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiClientError, post } from '../api/client'
import { AuthShell } from '../components/auth/AuthShell'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsPending(true)
    try {
      await post<void>('/api/auth/forgot', { email })
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Could not request a reset link')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AuthShell title="Reset your password" description="Enter your email and we’ll send you a password reset link." footer={<Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Back to login</Link>}>
      {isComplete ? (
        <div className="space-y-4 text-center">
          <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
          <p className="text-sm text-muted-foreground">If an account exists for <span className="font-medium text-foreground">{email}</span>, a reset link has been sent.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2"><label className="text-sm font-medium" htmlFor="forgot-email">Email</label><Input id="forgot-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
          <Button className="w-full" disabled={isPending}>{isPending ? 'Sending…' : 'Send reset link'}</Button>
        </form>
      )}
    </AuthShell>
  )
}
