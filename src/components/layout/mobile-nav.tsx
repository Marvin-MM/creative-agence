// src/components/layout/mobile-nav.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Users, Mail, BookOpen } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/work', label: 'Work', icon: Briefcase },
  { href: '/about', label: 'About', icon: Users },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function MobileNav() {
  const pathname = usePathname()
  
  // Hide on admin pages
  if (pathname.startsWith('/admin')) return null

  return (
    <nav className="mobile-nav lg:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`relative p-2 rounded-xl transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-xl"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
              
              <span className={`text-xs mt-1 transition-colors duration-200 ${
                isActive ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
              
              {/* Active dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}