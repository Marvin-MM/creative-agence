'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WorkHeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Creative <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover the stories behind our most impactful projects and see how 
            we've helped brands transform their digital presence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-4"
        >
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>All Categories</span>
            </Button>
            <Button variant="ghost" size="sm">Branding</Button>
            <Button variant="ghost" size="sm">Web Design</Button>
            <Button variant="ghost" size="sm">Marketing</Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}