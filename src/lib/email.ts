// src/lib/email.ts
import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Send contact form email
export async function sendContactEmail(data: {
  name: string
  email: string
  company?: string
  subject: string
  message: string
  phone?: string
  budget?: string
  timeline?: string
  services?: string[]
}) {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: #495057; margin-bottom: 5px; display: block; }
          .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #dee2e6; }
          .services { display: flex; flex-wrap: wrap; gap: 8px; }
          .service-tag { background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; }
          .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 Thank You!</h1>
            <p>We've received your message</p>
          </div>
          
          <div class="content">
            <p>Hi ${data.name},</p>
            
            <p>Thank you for reaching out to Lumina Creative! We're excited about the possibility of working together.</p>
            
            <p>We've received your message about "<strong>${data.subject}</strong>" and our team will review it carefully. You can expect to hear back from us within 24 hours (usually much sooner!).</p>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out our latest work in our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/work" style="color: #667eea;">portfolio</a></li>
              <li>Read our insights on design and branding in our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog" style="color: #667eea;">blog</a></li>
              <li>Follow us on social media for daily inspiration</li>
            </ul>
            
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/work" class="cta">View Our Work</a>
            
            <p>Best regards,<br>
            <strong>The Lumina Creative Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Lumina Creative | Premium Design Agency</p>
            <p>This is an automated response. Please don't reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `

  const autoReplyOptions = {
    from: `"Lumina Creative" <${process.env.SMTP_FROM}>`,
    to: data.email,
    subject: 'Thank you for contacting Lumina Creative',
    html: autoReplyHtml,
  }

  await transporter.sendMail(autoReplyOptions)
}

// Send newsletter confirmation email
export async function sendNewsletterConfirmation(email: string) {
  const confirmationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Lumina Creative Newsletter</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .benefits { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .benefit { display: flex; align-items: center; margin-bottom: 15px; }
          .benefit-icon { background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-size: 16px; }
          .cta { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 Welcome to Our Newsletter!</h1>
            <p>You're now part of our creative community</p>
          </div>
          
          <div class="content">
            <p>Thank you for subscribing to the Lumina Creative newsletter!</p>
            
            <p>You've joined a community of design enthusiasts, creative professionals, and forward-thinking business leaders who value exceptional design.</p>
            
            <div class="benefits">
              <h3>What to expect:</h3>
              
              <div class="benefit">
                <div class="benefit-icon">✨</div>
                <div>
                  <strong>Design Insights</strong><br>
                  Weekly tips and trends from our creative team
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">🎯</div>
                <div>
                  <strong>Project Spotlights</strong><br>
                  Behind-the-scenes looks at our latest work
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">💡</div>
                <div>
                  <strong>Industry News</strong><br>
                  Curated updates on design and branding
                </div>
              </div>
              
              <div class="benefit">
                <div class="benefit-icon">🎁</div>
                <div>
                  <strong>Exclusive Resources</strong><br>
                  Free design templates and guides
                </div>
              </div>
            </div>
            
            <p>Your first newsletter will arrive soon. In the meantime, explore our latest work and insights:</p>
            
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/work" class="cta">Explore Our Portfolio</a>
            
            <p>Welcome aboard!</p>
            <p><strong>The Lumina Creative Team</strong></p>
          </div>
          
          <div class="footer">
            <p>Lumina Creative | Premium Design Agency</p>
            <p>You can unsubscribe at any time by clicking the link in our emails.</p>
          </div>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: `"Lumina Creative" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: '🎨 Welcome to Lumina Creative Newsletter',
    html: confirmationHtml,
  }

  await transporter.sendMail(mailOptions)
}

// Send welcome email for new team members or clients
export async function sendWelcomeEmail(to: string, name: string, type: 'client' | 'team') {
  const subject = type === 'client' 
    ? '🎨 Welcome to the Lumina Creative Family!' 
    : '👋 Welcome to the Lumina Creative Team!'

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${type === 'client' ? '🎨' : '👋'} Welcome${type === 'team' ? ' to the Team' : ''}!</h1>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            
            ${type === 'client' ? `
              <p>Welcome to the Lumina Creative family! We're thrilled to have you as our client and can't wait to bring your vision to life.</p>
              
              <p>Our team is committed to delivering exceptional creative solutions that not only look stunning but also drive real business results.</p>
              
              <p>What happens next:</p>
              <ul>
                <li>We'll schedule our kickoff meeting within the next few days</li>
                <li>Our team will conduct thorough research about your brand and industry</li>
                <li>We'll present initial concepts based on your brief</li>
                <li>We'll work together to refine and perfect your project</li>
              </ul>
            ` : `
              <p>Welcome to the Lumina Creative team! We're excited to have you join our talented group of creative professionals.</p>
              
              <p>At Lumina, we believe in pushing creative boundaries while delivering exceptional results for our clients. You're now part of a team that values innovation, collaboration, and excellence.</p>
              
              <p>Getting started:</p>
              <ul>
                <li>Check your email for your admin panel access</li>
                <li>Review our brand guidelines and project processes</li>
                <li>Introduce yourself to the team in our next meeting</li>
                <li>Start creating amazing work together!</li>
              </ul>
            `}
            
            <p>If you have any questions, don't hesitate to reach out. We're here to help!</p>
            
            <p>Best regards,<br>
            <strong>The Lumina Creative Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `

  const mailOptions = {
    from: `"Lumina Creative" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html,
  }

  await transporter.sendMail(mailOptions)
}

// Test email configuration
export async function testEmailConnection() {
  try {
    await transporter.verify()
    console.log('Email server connection verified successfully')
    return true
  } catch (error) {
    console.error('Email server connection failed:', error)
    return false
  }
}

  await transporter.sendMail(mailOptions)

  // Send auto-reply to the sender
  const autoReplyHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Lumina Creative</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .cta { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  }

  await transporter.sendMail(mailOptions)
}

// Email templates
export const contactEmailTemplate = (data: {
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  budget?: string
  timeline?: string
  services?: string[]
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
        ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
        ${data.services?.length ? `<p><strong>Services:</strong> ${data.services.join(', ')}</p>` : ''}
      </div>

      <div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #333;">Message</h3>
        <p style="line-height: 1.6;">${data.message}</p>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #666;">
          This email was sent from the contact form on your website.
        </p>
      </div>
    </div>
  `
}

export const newsletterWelcomeTemplate = (name?: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Our Newsletter!</h2>
      
      <p>Hi ${name || 'there'},</p>
      
      <p>Thank you for subscribing to our newsletter! We're excited to have you on board.</p>
      
      <p>You'll receive updates about our latest projects, design insights, and industry news.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">What to expect:</h3>
        <ul>
          <li>Latest project showcases</li>
          <li>Design tips and tutorials</li>
          <li>Industry insights and trends</li>
          <li>Exclusive behind-the-scenes content</li>
        </ul>
      </div>
      
      <p>If you have any questions or feedback, feel free to reach out to us.</p>
      
      <p>Best regards,<br>The Team</p>
      
      <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
        <p style="margin: 0;">
          You received this email because you subscribed to our newsletter.
          If you no longer wish to receive these emails, you can unsubscribe at any time.
        </p>
      </div>
    </div>
  `
}

export const autoReplyTemplate = (name: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank You for Contacting Us!</h2>
      
      <p>Hi ${name},</p>
      
      <p>Thank you for reaching out to us. We've received your message and will get back to you within 24 hours.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">What happens next?</h3>
        <ol>
          <li>Our team will review your inquiry</li>
          <li>We'll prepare a personalized response</li>
          <li>You'll hear from us within 24 hours</li>
        </ol>
      </div>
      
      <p>In the meantime, feel free to explore our portfolio and blog for more insights into our work.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
  `
}
