// src/app/page.tsx
import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { ServicesSection } from '@/components/sections/services-section'
import { FeaturedWork } from '@/components/sections/featured-work'
import { ClientsSection } from '@/components/sections/clients-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ProcessSection } from '@/components/sections/process-section'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Lumina Creative - Award-Winning Design Agency',
  description: 'Transform your brand with stunning visual storytelling. We create memorable experiences that captivate audiences and drive results.',
  openGraph: {
    title: 'Lumina Creative - Award-Winning Design Agency',
    description: 'Transform your brand with stunning visual storytelling. We create memorable experiences that captivate audiences and drive results.',
    images: ['/images/home-og.jpg'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Immersive Animation */}
      <HeroSection />
      
      {/* Services Overview */}
      <ServicesSection />
      
      {/* Featured Work Gallery */}
      <FeaturedWork />
      
      {/* Client Logos */}
      <ClientsSection />
      
      {/* Stats & Achievements */}
      <StatsSection />
      
      {/* Our Process */}
      <ProcessSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Newsletter Signup */}
      <NewsletterSection />
      
      {/* Final CTA */}
      <CTASection />
    </div>
  )
}