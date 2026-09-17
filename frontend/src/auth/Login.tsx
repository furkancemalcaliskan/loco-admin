import { useState } from "react";
import type { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { ApiClientError, post } from "../api/client";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { PasswordInput } from "../components/ui/password-input";
import { ThemeToggle } from "../components/layout/ThemeToggle";
import { currentUserQueryKey } from "../hooks/use-current-user";
import { setToken } from "./token";
import type { LoginResponse } from "./types";

export function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      const res = await post<LoginResponse>("/api/auth/login", {
        email,
        password,
      });
      setToken(res.token);
      queryClient.removeQueries({ queryKey: currentUserQueryKey });
      navigate("/");
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Failed to log in",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="absolute right-4 top-4"><ThemeToggle /></div>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">L</div>
          <span className="text-lg font-semibold">Loco Admin</span>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><label className="text-sm font-medium" htmlFor="password">Password</label><Link to="/forgot-password" className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Forgot password?</Link></div>
                <PasswordInput id="password" name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}
              <Button className="w-full" type="submit" disabled={isPending}>{isPending ? "Logging in…" : "Log in"}</Button>
              <Button className="w-full" type="button" variant="outline" asChild><Link to="/magic-link">Email me a magic link</Link></Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-foreground underline-offset-4 hover:underline">Create an account</Link>
          <span className="mx-2">·</span>
          <Link to="/resend-verification" className="font-medium text-foreground underline-offset-4 hover:underline">Resend verification</Link>
        </p>
      </div>
    </div>
  );
}
