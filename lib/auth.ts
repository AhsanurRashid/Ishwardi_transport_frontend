import { cookies } from 'next/headers'

export async function setToken(token: string) {
  (await cookies()).set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function getToken() {
  return (await cookies()).get('auth_token')?.value
}

export async function removeToken() {
  (await cookies()).delete('auth_token')
}