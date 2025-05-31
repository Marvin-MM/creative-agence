
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import nodemailer from 'nodemailer'
import { contactFormSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the data
    const validatedData = await contactFormSchema.validate(body)

    const { 
      name, 
      email, 
      company, 
      phone, 
      subject, 
      message, 
      budget, 
      timeline, 
      services 
    } = validatedData

    // Calculate expiry date (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Save to database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        company: company || null,
        phone: phone || null,
        subject: subject || null,
        message,
        budget: budget || null,
        timeline: timeline || null,
        services: services ? JSON.stringify(services) : null,
        expiresAt
      }
    })

    // Send notification email to admin
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.ADMIN_EMAIL) {
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
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
            ${services && services.length > 0 ? `<p><strong>Services:</strong> ${services.join(', ')}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
        `,
      })

      // Send confirmation email to user
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Thank you for contacting Lumina Creative',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #7c3aed;">Thank you for reaching out!</h1>
            <p>Hi ${name},</p>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to explore our work and insights on our website.</p>
            <p>Best regards,<br>The Lumina Creative Team</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      id: contactMessage.id 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
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
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
