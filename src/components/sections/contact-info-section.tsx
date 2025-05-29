'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

export function ContactInfoSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
      <div className="max-w-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-purple-100 leading-relaxed">
              We're always excited to hear about new projects and creative challenges. 
              Let's start a conversation about how we can help bring your vision to life.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                info: 'hello@luxecreative.com',
                description: 'Drop us a line anytime'
              },
              {
                icon: Phone,
                title: 'Call Us',
                info: '+1 (555) 123-4567',
                description: 'Mon-Fri 9AM-6PM EST'
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                info: '123 Creative Street, New York, NY 10001',
                description: 'Our studio in the heart of NYC'
              },
              {
                icon: Clock,
                title: 'Response Time',
                info: 'Within 24 hours',
                description: 'We respond to all inquiries quickly'
              }
            ].map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    <p className="font-medium mb-1">{contact.info}</p>
                    <p className="text-sm text-purple-100">{contact.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="w-6 h-6" />
              <h3 className="font-semibold">Prefer to chat?</h3>
            </div>
            <p className="text-purple-100 mb-4">
              We're active on social media and love connecting with our community.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}