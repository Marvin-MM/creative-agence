import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/contact-form'
import { ContactInfoSection } from '@/components/sections/contact-info-section'
import { FAQ } from '@/components/sections/faq'

export const metadata: Metadata = {
  title: 'Contact Us - Let\'s Create Something Amazing Together',
  description: 'Ready to transform your brand? Get in touch with our creative team to discuss your project and receive a personalized quote.',
  openGraph: {
    title: 'Contact Lumina Creative - Let\'s Work Together',
    description: 'Ready to transform your brand? Get in touch with our creative team to discuss your project.',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="gradient-text">Let's Create</span>
            <br />
            <span className="gradient-text">Something Amazing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your brand? We'd love to hear about your project 
            and explore how we can bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfoSection />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  )
}