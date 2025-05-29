
// src/components/animations/scale-in.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScaleInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, className = '' }: ScaleInProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.8 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1 
      }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "backOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

