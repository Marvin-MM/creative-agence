// src/components/sections/process-section.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  Lightbulb, 
  Palette, 
  Rocket, 
  Users,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react'

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Research',
    description: 'We dive deep into your brand, audience, and market to understand what makes you unique.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    details: [
      'Brand audit and competitor analysis',
      'Target audience research',
      'Market positioning strategy',
      'Stakeholder interviews'
    ]
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We develop a comprehensive creative strategy aligned with your business objectives.',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    details: [
      'Creative brief development',
      'Project timeline and milestones',
      'Resource allocation',
      'Success metrics definition'
    ]
  },
  {
    number: '03',
    title: 'Concept Development',
    description: 'Our team generates innovative concepts that bring your vision to life.',
    icon: Lightbulb,
    color: 'from-orange-500 to-red-500',
    details: [
      'Ideation workshops',
      'Mood boards and style guides',
      'Initial concept presentations',
      'Feedback incorporation'
    ]
  },
  {
    number: '04',
    title: 'Design & Creation',
    description: 'We craft beautiful, functional designs that captivate your audience.',
    icon: Palette,
    color: 'from-green-500 to-emerald-500',
    details: [
      'High-fidelity design creation',
      'Interactive prototyping',
      'Asset development',
      'Quality assurance testing'
    ]
  },
  {
    number: '05',
    title: 'Collaboration & Refinement',
    description: 'We work closely with you to perfect every detail until it\'s just right.',
    icon: Users,
    color: 'from-indigo-500 to-blue-500',
    details: [
      'Client review sessions',
      'Iterative improvements',
      'Stakeholder approvals',
      'Final optimizations'
    ]
  },
  {
    number: '06',
    title: 'Launch & Optimization',
    description: 'We ensure a successful launch and continue optimizing for maximum impact.',
    icon: Rocket,
    color: 'from-yellow-500 to-orange-500',
    details: [
      'Launch preparation',
      'Performance monitoring',
      'Post-launch optimization',
      'Ongoing support'
    ]
  }
]

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Process</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">How We Create</span>
            <br />
            <span className="gradient-text">Amazing Results</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our proven 6-step process ensures every project is delivered on time, 
            on budget, and exceeds expectations.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-xl">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardContent className="p-8 relative">
                    {/* Step Number */}
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-full h-full text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-6xl font-display font-bold text-muted-foreground/20 mb-2">
                          {step.number}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: (index * 0.1) + (detailIndex * 0.1) }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Connection Line for Desktop */}
                    {index < processSteps.length - 1 && index % 2 === 0 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-3xl border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss your project and how our proven process can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge className="bg-primary/10 text-primary text-sm px-4 py-2">
                ✓ Free Initial Consultation
              </Badge>
              <Badge className="bg-primary/10 text-primary text-sm px-4 py-2">
                ✓ Detailed Project Proposal
              </Badge>
              <Badge className="bg-primary/10 text-primary text-sm px-4 py-2">
                ✓ No Long-term Commitments
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl"
        />
      </div>
    </section>
  )
}