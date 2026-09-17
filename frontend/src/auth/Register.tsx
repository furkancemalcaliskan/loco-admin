import { CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiClientError, post } from '../api/client'
import { ThemeToggle } from '../components/layout/ThemeToggle'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { PasswordInput } from '../components/ui/password-input'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password !== passwordConfirmation) {
      setError('Passwords do not match.')
      return
    }

    setIsPending(true)
    try {
      await post<void>('/api/auth/register', { name, email, password })
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : 'Failed to create account')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/30 p-4 py-10">
      <div className="absolute right-4 top-4"><ThemeToggle /></div>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">L</div>
          <span className="text-lg font-semibold">Loco Admin</span>
        </div>

        <Card>
          {isComplete ? (
            <>
              <CardHeader className="items-center text-center">
                <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="size-5" /></div>
                <CardTitle className="text-xl">Check your email</CardTitle>
                <CardDescription>We sent a verification link to {email}. Verify your address before logging in.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3"><Button className="w-full" asChild><Link to="/login">Back to login</Link></Button><Button className="w-full" variant="outline" asChild><Link to="/resend-verification">Resend verification email</Link></Button></CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Create an account</CardTitle>
                <CardDescription>Enter your details to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="name">Name</label>
                    <Input id="name" name="name" autoComplete="name" minLength={2} required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="register-email">Email</label>
                    <Input id="register-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="register-password">Password</label>
                    <PasswordInput id="register-password" name="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password-confirmation">Confirm password</label>
                    <PasswordInput id="password-confirmation" name="passwordConfirmation" autoComplete="new-password" minLength={8} required value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} />
                  </div>
                  {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
                  <Button className="w-full" type="submit" disabled={isPending}>{isPending ? 'Creating account…' : 'Create account'}</Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        {!isComplete && (
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Log in</Link>
          </p>
        )}
      </div>
    </div>
  )
}
