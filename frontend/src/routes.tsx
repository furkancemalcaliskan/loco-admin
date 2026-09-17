import { createBrowserRouter } from 'react-router'
import { App } from './App'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { ForgotPassword } from './auth/ForgotPassword'
import { MagicLink } from './auth/MagicLink'
import { MagicLinkVerify } from './auth/MagicLinkVerify'
import { RequireAuth } from './auth/RequireAuth'
import { ResendVerification } from './auth/ResendVerification'
import { ResetPassword } from './auth/ResetPassword'
import { VerifyEmail } from './auth/VerifyEmail'
import { AdminLayout } from './components/layout/AdminLayout'
import { Account } from './pages/Account'
import { Home } from './pages/Home'
import { Settings } from './pages/Settings'
// scaffold:imports

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset', element: <ResetPassword /> },
      { path: 'verify/:token', element: <VerifyEmail /> },
      { path: 'resend-verification', element: <ResendVerification /> },
      { path: 'magic-link', element: <MagicLink /> },
      { path: 'magic-link/:token', element: <MagicLinkVerify /> },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <Home /> },
              { path: 'account', element: <Account /> },
              { path: 'settings', element: <Settings /> },
            ],
          },
          // scaffold:routes
        ],
      },
    ],
  },
])
