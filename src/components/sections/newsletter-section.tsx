'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { newsletterSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Send, CheckCircle, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(newsletterSchema)
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: 'website_footer'
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe')
      }

      setIsSubmitted(true)
      reset()
      toast.success('Subscription successful! Check your email to confirm.')
    } catch (error: any) {
      toast.error(error.message || 'Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-xl border-0 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-hero-pattern opacity-5" />
            
            <CardContent className="p-12 text-center relative">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center"
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                <span className="gradient-text">Stay Inspired</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our creative community and get weekly insights, design trends, 
                and behind-the-scenes content delivered to your inbox.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email address"
                        className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1 text-left">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="btn-primary h-12 px-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Subscribe
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <h3 className="text-2xl font-bold">Thank You!</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    We've sent a confirmation email to your inbox. 
                    Please check and confirm your subscription.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Subscribe Another Email
                  </Button>
                </motion.div>
              )}

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Weekly Design Tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Project Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>No Spam, Ever</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}