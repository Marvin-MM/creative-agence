// src/components/sections/stats-section.tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Counter } from '@/components/animations/counter'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Trophy, 
  Clock, 
  Heart,
  TrendingUp,
  Award,
  Briefcase,
  Globe
} from 'lucide-react'

interface StatsData {
  [key: string]: string
}

interface StatsSectionProps {
  companyInfo?: StatsData
}

export function StatsSection({ companyInfo = {} }: StatsSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      icon: Briefcase,
      value: parseInt(companyInfo.projects_completed?.replace('+', '') || '150'),
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successful projects delivered',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: Heart,
      value: parseInt(companyInfo.client_satisfaction?.replace('%', '') || '98'),
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Happy clients who love our work',
      color: 'from-red-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: Users,
      value: parseInt(companyInfo.team_size || '12'),
      suffix: '+',
      label: 'Team Members',
      description: 'Creative professionals',
      color: 'from-green-500 to-emerald-500',
      delay: 0.3
    },
    {
      icon: Clock,
      value: parseInt(companyInfo.founded_year || '2019'),
      suffix: '',
      label: 'Established',
      description: 'Years of creative excellence',
      color: 'from-purple-500 to-indigo-500',
      delay: 0.4
    },
    {
      icon: Award,
      value: 25,
      suffix: '+',
      label: 'Awards Won',
      description: 'Industry recognition',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.5
    },
    {
      icon: Globe,
      value: 15,
      suffix: '+',
      label: 'Countries Served',
      description: 'Global reach',
      color: 'from-teal-500 to-blue-500',
      delay: 0.6
    }
  ]

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
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Impact</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Numbers That</span>
            <br />
            <span className="gradient-text">Tell Our Story</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Behind every great creative agency are the metrics that matter. 
            Here's how we measure our success and commitment to excellence.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: stat.delay }}
              className="group"
            >
              <div className="relative p-8 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${stat.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-full h-full text-white" />
                  <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${stat.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                </div>

                {/* Counter */}
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-display font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {isInView && (
                      <Counter
                        from={0}
                        to={stat.value}
                        duration={2}
                        suffix={stat.suffix}
                        className="tabular-nums"
                      />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {stat.label}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-2 h-2 bg-gradient-to-br ${stat.color} rounded-full`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-3xl border border-primary/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {isInView && <Counter from={0} to={500} suffix="K+" duration={2} />}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Impressions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {isInView && <Counter from={0} to={89} suffix="%" duration={2} />}
              </div>
              <div className="text-sm text-muted-foreground">Project Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {isInView && <Counter from={0} to={24} suffix="h" duration={2} />}
              </div>
              <div className="text-sm text-muted-foreground">Average Response Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">
                {isInView && <Counter from={0} to={95} suffix="%" duration={2} />}
              </div>
              <div className="text-sm text-muted-foreground">Client Retention Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              ⭐ Awwwards Winner
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              🏆 CSS Design Awards
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              🎖️ Webby Nominee
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              🌟 FWA Featured
            </Badge>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 -right-32 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl"
        />
      </div>
    </section>
  )
}