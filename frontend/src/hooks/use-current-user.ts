import { useQuery } from '@tanstack/react-query'
import { get } from '../api/client'
import type { CurrentUser } from '../auth/types'

export const currentUserQueryKey = ['current-user'] as const

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: () => get<CurrentUser>('/api/auth/current'),
    staleTime: 60_000,
  })
}
