// src/components/animations/parallax-element.tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ParallaxElementProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxElement({ 
  children, 
  speed = 0.5,
  className = ''
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [-50 * speed, 50 * speed])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
