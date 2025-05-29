'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-hero-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 opacity-20">
        <motion.div
          animate={{ rotate: 360, y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Sparkles className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
      <div className="absolute bottom-20 right-20 opacity-20">
        <motion.div
          animate={{ rotate: -360, y: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Zap className="w-12 h-12 text-purple-500" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Ready to Transform</span>
            <br />
            <span className="gradient-text">Your Brand?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's create something extraordinary together. Whether you're a startup 
            finding your voice or an established brand ready to evolve, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg"
              className="btn-primary group text-lg px-8 py-6"
            >
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group text-lg px-8 py-6 bg-background/50 backdrop-blur-xl"
              asChild
            >
              <Link href="/work">
                View Our Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free Initial Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
