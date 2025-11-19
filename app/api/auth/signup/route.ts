import { NextResponse } from 'next/server'
import { createUser, findUserByEmail } from '@/lib/users'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const existing = await findUserByEmail(email)
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const user = await createUser({ name, email, password })
    if (!user) return NextResponse.json({ error: 'Could not create user' }, { status: 500 })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
