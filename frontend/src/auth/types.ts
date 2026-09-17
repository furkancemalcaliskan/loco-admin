export interface LoginResponse {
  token: string
  pid: string
  name: string
  is_verified: boolean
}

export interface CurrentUser {
  pid: string
  name: string
  email: string
}
