import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { verifyUser } from '@/lib/users'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const user = await verifyUser(email, password)
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' })

    const isProd = process.env.NODE_ENV === 'production'
    const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax; ${isProd ? 'Secure; ' : ''}`

    const res = NextResponse.json({ user })
    res.headers.set('Set-Cookie', cookie)
    return res
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
