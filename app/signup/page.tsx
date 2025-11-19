"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Signup failed')
      } else {
        router.push('/signin')
      }
    } catch (err) {
      setError('Signup request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6 rounded-lg bg-card border">
        <h2 className="text-lg font-semibold">Create an account</h2>

        <div>
          <label className="text-sm block mb-1">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
        </div>

        <div>
          <label className="text-sm block mb-1">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>

        <div>
          <label className="text-sm block mb-1">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>

        {error && <div className="text-sm text-destructive">{error}</div>}

        <div className="flex justify-between items-center">
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</Button>
        </div>
      </form>
    </div>
  )
}
