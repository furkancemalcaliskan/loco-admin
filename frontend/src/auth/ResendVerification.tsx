import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiClientError, post } from '../api/client'
import { AuthShell } from '../components/auth/AuthShell'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export function ResendVerification() {
  const [email, setEmail] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setIsPending(true)
    try {
      await post<void>('/api/auth/resend-verification-mail', { email })
      setMessage('If the account needs verification, a new email has been sent.')
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Could not resend the verification email')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AuthShell title="Resend verification email" description="Request a new verification link for your account." footer={<Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Back to login</Link>}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2"><label className="text-sm font-medium" htmlFor="verification-email">Email</label><Input id="verification-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
        {message && <p className="rounded-md bg-emerald-100 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" role="status">{message}</p>}
        {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
        <Button className="w-full" disabled={isPending}>{isPending ? 'Sending…' : 'Resend email'}</Button>
      </form>
    </AuthShell>
  )
}
