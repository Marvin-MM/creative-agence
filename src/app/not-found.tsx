'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search, Palette } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-display font-bold text-primary/20 select-none">
              404
            </h1>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 left-8"
            >
              <Palette className="w-8 h-8 text-primary/40" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-8 right-12"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-blue-500 rounded-full opacity-40" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="gradient-text">Oops! Page Not Found</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have vanished into the creative void. 
              Don't worry, even the best designs sometimes go missing!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-primary group">
              <Link href="/">
                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/work">
                <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Browse Our Work
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific? Try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/about" 
                className="text-primary hover:underline transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/work" 
                className="text-primary hover:underline transition-colors"
              >
                Our Work
              </Link>
              <Link 
                href="/blog" 
                className="text-primary hover:underline transition-colors"
              >
                Insights
              </Link>
              <Link 
                href="/contact" 
                className="text-primary hover:underline transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.1, 1, 1.1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          />
        </div>
      </div>
    </div>
  )
}