import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ApiClientError, post } from '../api/client'
import { AuthShell } from '../components/auth/AuthShell'
import { Button } from '../components/ui/button'
import { PasswordInput } from '../components/ui/password-input'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = window.location.hash.slice(1) || searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(token ? null : 'This reset link is missing its token.')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }
    setIsPending(true)
    try {
      await post<void>('/api/auth/reset', { token, password })
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Could not reset your password')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AuthShell title={isComplete ? 'Password updated' : 'Choose a new password'} description={isComplete ? 'You can now use your new password to log in.' : 'Enter a new password for your account.'} footer={<Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Back to login</Link>}>
      {isComplete ? <Button className="w-full" asChild><Link to="/login">Continue to login</Link></Button> : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2"><label className="text-sm font-medium" htmlFor="new-password">New password</label><PasswordInput id="new-password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} /></div>
          <div className="space-y-2"><label className="text-sm font-medium" htmlFor="new-password-confirmation">Confirm new password</label><PasswordInput id="new-password-confirmation" autoComplete="new-password" minLength={8} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></div>
          {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
          <Button className="w-full" disabled={isPending || !token}>{isPending ? 'Updating…' : 'Update password'}</Button>
        </form>
      )}
    </AuthShell>
  )
}
