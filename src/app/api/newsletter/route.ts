import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { newsletterSchema } from '@/lib/validations'
import { sendNewsletterConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = newsletterSchema.parse(body)

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email: validatedData.email }
    })

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create subscription
    const subscription = await prisma.newsletter.create({
      data: {
        email: validatedData.email,
        source: validatedData.source || 'website',
        confirmed: false,
      }
    })

    // Send confirmation email
    await sendNewsletterConfirmation(validatedData.email)

    return NextResponse.json(
      { message: 'Subscription successful! Check your email to confirm.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating newsletter subscription:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const subscriptions = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { newsletterSchema } from '@/lib/validations'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the data
    const validatedData = await newsletterSchema.validate(body)
    const { email, name } = validatedData

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      )
    }

    // Create newsletter subscription
    const subscription = await prisma.newsletter.create({
      data: {
        email,
        name: name || null,
        confirmed: false,
        source: 'website',
      }
    })

    // Send confirmation email
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Welcome to Lumina Creative Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed;">Welcome to our newsletter!</h1>
            <p>Hi ${name || 'there'},</p>
            <p>Thank you for subscribing to the Lumina Creative newsletter. You'll receive updates about our latest work, insights, and industry trends.</p>
            <p>Stay creative,<br>The Lumina Creative Team</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      id: subscription.id 
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        confirmed: true,
        source: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ success: true, data: subscribers })
  } catch (error) {
    console.error('Get newsletter subscribers error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
