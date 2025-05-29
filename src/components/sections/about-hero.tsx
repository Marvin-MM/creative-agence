'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Heart, Target, Lightbulb, Users } from 'lucide-react'

interface AboutHeroProps {
  companyInfo: Record<string, string>
}

export function AboutHero({ companyInfo }: AboutHeroProps) {
  const values = [
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'We pour our hearts into every project, treating your brand as if it were our own.'
    },
    {
      icon: Target,
      title: 'Results-Focused',
      description: 'Beautiful design is just the beginning. We create solutions that drive real business impact.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We stay ahead of trends and push creative boundaries to keep your brand cutting-edge.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Your success is our success. We work as partners, not just service providers.'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6" variant="outline">
              Est. {companyInfo.founded_year || '2019'}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">We Are</span>
              <br />
              <span className="gradient-text">Lumina Creative</span>
            </h1>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                {companyInfo.company_mission || 
                'We transform brands through stunning visual storytelling that captivates audiences and drives measurable results.'}
              </p>
              
              <p>
                Founded by a team of passionate creatives and strategic thinkers, we bridge the gap 
                between beautiful design and business success. Every project is an opportunity to 
                push boundaries and exceed expectations.
              </p>
              
              <p>
                From startups finding their voice to established brands reinventing themselves, 
                we craft authentic experiences that resonate with audiences and stand the test of time.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/about/team-photo.jpg"
                alt="Lumina Creative Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -left-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">{companyInfo.team_size || '12'}+ Team Members</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">{companyInfo.client_satisfaction || '98'}% Client Love</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 mx-auto bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {value.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}