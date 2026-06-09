import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Admin unique défini par variables d'environnement (ADMIN_EMAIL / ADMIN_PASSWORD).
    // Permet de se connecter sans créer de compte en base. À définir dans .env.
    const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()
    const adminPassword = process.env.ADMIN_PASSWORD
    if (
      adminEmail &&
      adminPassword &&
      email.toLowerCase() === adminEmail &&
      password === adminPassword
    ) {
      const token = generateToken({ userId: 'env-admin', email: adminEmail, role: 'admin' })
      return NextResponse.json({
        token,
        user: { id: 'env-admin', email: adminEmail, name: 'Le Permayou', role: 'admin' },
      })
    }

    await connectDB()

    // Find user and get password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
