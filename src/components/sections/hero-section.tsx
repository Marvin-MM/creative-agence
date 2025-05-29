// src/components/sections/hero-section.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, Sparkles, Zap, Palette } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.timeline()
        .from('.hero-badge', { 
          duration: 0.8, 
          y: 30, 
          opacity: 0, 
          ease: "back.out(1.7)" 
        })
        .from('.hero-title', { 
          duration: 1, 
          y: 50, 
          opacity: 0, 
          stagger: 0.1,
          ease: "power3.out" 
        }, "-=0.5")
        .from('.hero-description', { 
          duration: 0.8, 
          y: 30, 
          opacity: 0, 
          ease: "power2.out" 
        }, "-=0.7")
        .from('.hero-buttons', { 
          duration: 0.8, 
          y: 30, 
          opacity: 0, 
          ease: "power2.out" 
        }, "-=0.6")

      // Floating elements animation
      gsap.to('.floating-1', {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })

      gsap.to('.floating-2', {
        y: -15,
        rotation: -3,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5
      })

      gsap.to('.floating-3', {
        y: -25,
        rotation: 2,
        duration: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      })

      // Parallax background elements
      gsap.to('.bg-element-1', {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      })

      gsap.to('.bg-element-2', {
        rotation: -360,
        duration: 30,
        ease: "none",
        repeat: -1
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-element-1 absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="bg-element-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
        
        {/* Floating Design Elements */}
        <div className="floating-1 absolute top-20 left-20 opacity-20">
          <Palette className="w-12 h-12 text-primary" />
        </div>
        <div className="floating-2 absolute top-40 right-32 opacity-20">
          <Sparkles className="w-16 h-16 text-purple-500" />
        </div>
        <div className="floating-3 absolute bottom-32 left-1/3 opacity-20">
          <Zap className="w-14 h-14 text-orange-500" />
        </div>
      </div>

      <motion.div 
        ref={heroRef}
        style={{ y, opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-badge mb-8"
        >
          <Badge 
            variant="secondary" 
            className="text-sm px-4 py-2 bg-white/10 backdrop-blur-xl border-white/20 text-foreground hover:bg-white/20 transition-all duration-300"
          >
            ✨ Award-Winning Creative Agency
          </Badge>
        </motion.div>

        {/* Hero Title */}
        <div className="space-y-4 mb-8">
          <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight">
            <span className="block gradient-text">Create.</span>
            <span className="block gradient-text">Captivate.</span>
            <span className="block gradient-text">Convert.</span>
          </h1>
        </div>

        {/* Hero Description */}
        <p className="hero-description text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
          We transform brands through{' '}
          <span className="text-primary font-semibold">stunning visual storytelling</span>,{' '}
          creating memorable experiences that captivate audiences and drive measurable results.
        </p>

        {/* Hero Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            asChild
            size="lg"
            className="btn-primary group"
          >
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="group bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10"
            asChild
          >
            <Link href="/work">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              View Our Work
            </Link>
          </Button>
        </div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 z-10" />
            <Image
              src="/images/hero-showcase.jpg"
              alt="Creative design showcase"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          
          {/* Floating Cards */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-8 -left-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Project Live</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 -right-8 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">98% Client Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}