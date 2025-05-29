// src/components/sections/services-section.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Palette, 
  Zap, 
  Camera, 
  Globe, 
  Smartphone, 
  Video,
  ArrowRight,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Complete visual identity systems that tell your unique story and resonate with your audience.',
    features: ['Logo Design', 'Brand Guidelines', 'Color Palettes', 'Typography'],
    color: 'from-blue-500 to-cyan-500',
    delay: 0.1
  },
  {
    icon: Globe,
    title: 'Web Design',
    description: 'Stunning, responsive websites that convert visitors into customers and elevate your digital presence.',
    features: ['UI/UX Design', 'Responsive Design', 'E-commerce', 'CMS Integration'],
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    icon: Camera,
    title: 'Visual Content',
    description: 'Compelling visual storytelling through photography, illustrations, and graphic design.',
    features: ['Photography', 'Illustrations', 'Infographics', 'Social Media'],
    color: 'from-orange-500 to-red-500',
    delay: 0.3
  },
  {
    icon: Video,
    title: 'Motion Design',
    description: 'Engaging animations and video content that brings your brand to life across all platforms.',
    features: ['Animation', 'Video Production', 'Motion Graphics', '3D Modeling'],
    color: 'from-green-500 to-emerald-500',
    delay: 0.4
  },
  {
    icon: Smartphone,
    title: 'App Design',
    description: 'Intuitive mobile and web applications designed for exceptional user experiences.',
    features: ['Mobile Apps', 'Web Apps', 'Prototyping', 'User Testing'],
    color: 'from-indigo-500 to-blue-500',
    delay: 0.5
  },
  {
    icon: Zap,
    title: 'Strategy',
    description: 'Data-driven creative strategies that align with your business goals and market positioning.',
    features: ['Brand Strategy', 'Market Research', 'Creative Direction', 'Consulting'],
    color: 'from-yellow-500 to-orange-500',
    delay: 0.6
  }
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Expertise</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Services That</span>
            <br />
            <span className="gradient-text">Transform Brands</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to execution, we deliver comprehensive creative solutions 
            that elevate your brand and drive meaningful results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: service.delay }}
              className="group relative"
            >
              <div className="relative p-8 bg-card rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground mb-8">
            Ready to transform your brand with our expertise?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-primary">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="group"
            >
              <Link href="/work">
                View Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}