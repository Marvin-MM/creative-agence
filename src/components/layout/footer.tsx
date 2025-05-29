'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Dribbble,
  Bell
} from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Brand Identity', href: '/services/branding' },
    { label: 'Web Design', href: '/services/web-design' },
    { label: 'App Design', href: '/services/app-design' },
    { label: 'Visual Content', href: '/services/visual-content' },
    { label: 'Motion Design', href: '/services/motion-design' },
    { label: 'Strategy', href: '/services/strategy' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Insights', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  resources: [
    { label: 'Design Process', href: '/process' },
    { label: 'Case Studies', href: '/work' },
    { label: 'Brand Guidelines', href: '/resources/brand-guidelines' },
    { label: 'Design Templates', href: '/resources/templates' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Support', href: '/support' },
  ]
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/luminacreative', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/luminacreative', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/luminacreative', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/luminacreative', label: 'LinkedIn' },
  { icon: Dribbble, href: 'https://dribbble.com/luminacreative', label: 'Dribbble' },
  { icon: Bell, href: 'https://behance.net/luminacreative', label: 'Behance' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 mb-6 group">
                <div className="relative">
                  <Palette className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                </div>
                <span className="text-2xl font-display font-bold gradient-text">
                  Lumina
                </span>
              </Link>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Transforming brands through stunning visual storytelling that captivates 
                audiences and drives measurable results.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <Link 
                    href="mailto:hello@lumina-creative.com" 
                    className="hover:text-primary transition-colors"
                  >
                    hello@lumina-creative.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <Link 
                    href="tel:+1-555-0123" 
                    className="hover:text-primary transition-colors"
                  >
                    +1 (555) 012-3456
                  </Link>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    123 Creative Street<br />
                    Design District, NY 10001
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="font-semibold mb-4 text-foreground">Services</h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Stay Inspired</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Get weekly design insights, project updates, and creative inspiration.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="flex-1"
                type="email"
              />
              <Button size="sm" className="btn-primary">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sm text-muted-foreground"
            >
              © {new Date().getFullYear()} Lumina Creative. All rights reserved. 
              Made with ❤️ in New York.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="w-9 h-9 p-0 hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <Link 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}