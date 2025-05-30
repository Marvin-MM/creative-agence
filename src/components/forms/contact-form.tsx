'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactFormSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Send, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const services = [
  'Brand Identity',
  'Web Design',
  'App Design',
  'Visual Content',
  'Motion Design',
  'Strategy Consulting'
]

const budgetRanges = [
  'Under $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  'Over $100,000'
]

const timelineOptions = [
  'ASAP',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Flexible'
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(contactFormSchema)
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          services: selectedServices
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setIsSubmitted(true)
      reset()
      setSelectedServices([])
      toast.success('Message sent successfully! We\'ll get back to you soon.')
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service]
    
    setSelectedServices(updated)
    setValue('services', updated)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          We've received your message and will get back to you within 24 hours.
        </p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline">
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <Card className="shadow-2xl border-0 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Send us a message</CardTitle>
        <p className="text-muted-foreground">
          Tell us about your project and we'll provide a personalized quote.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-floating">
              <Input
                {...register('name')}
                placeholder=" "
                className={errors.name ? 'border-red-500' : ''}
              />
              <Label htmlFor="name">Full Name *</Label>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="form-floating">
              <Input
                {...register('email')}
                type="email"
                placeholder=" "
                className={errors.email ? 'border-red-500' : ''}
              />
              <Label htmlFor="email">Email Address *</Label>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-floating">
              <Input
                {...register('company')}
                placeholder=" "
              />
              <Label htmlFor="company">Company Name</Label>
            </div>

            <div className="form-floating">
              <Input
                {...register('phone')}
                placeholder=" "
              />
              <Label htmlFor="phone">Phone Number</Label>
            </div>
          </div>

          <div className="form-floating">
            <Input
              {...register('subject')}
              placeholder=" "
              className={errors.subject ? 'border-red-500' : ''}
            />
            <Label htmlFor="subject">Project Subject *</Label>
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div className="form-floating">
            <Textarea
              {...register('message')}
              placeholder=" "
              rows={4}
              className={errors.message ? 'border-red-500' : ''}
            />
            <Label htmlFor="message">Project Details *</Label>
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Services Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Services you're interested in:
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label
                    htmlFor={service}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium mb-2 block">Budget Range</Label>
              <Select onValueChange={(value) => setValue('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">Timeline</Label>
              <Select onValueChange={(value) => setValue('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Project timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full btn-primary group"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}