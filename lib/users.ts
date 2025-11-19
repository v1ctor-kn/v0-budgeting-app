import bcrypt from 'bcryptjs'

export type User = {
  id: string
  name: string
  email: string
  passwordHash: string
}

const users = new Map<string, User>()

function makeId() {
  return `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
  const existing = Array.from(users.values()).find((u) => u.email === email.toLowerCase())
  if (existing) return null
  const passwordHash = await bcrypt.hash(password, 10)
  const user: User = { id: makeId(), name, email: email.toLowerCase(), passwordHash }
  users.set(user.id, user)
  return { id: user.id, name: user.name, email: user.email }
}

export async function findUserByEmail(email: string) {
  return Array.from(users.values()).find((u) => u.email === email.toLowerCase()) ?? null
}

export async function verifyUser(email: string, password: string) {
  const user = await findUserByEmail(email)
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return null
  return { id: user.id, name: user.name, email: user.email }
}

export function clearUsers() {
  users.clear()
}

export function listUsers() {
  return Array.from(users.values()).map((u) => ({ id: u.id, name: u.name, email: u.email }))
}
