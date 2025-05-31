
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { contactAPI } from '@/lib/api'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'

const budgetOptions = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: 'over-100k', label: 'Over $100,000' },
]

const timelineOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: 'flexible', label: 'Flexible' },
]

const serviceOptions = [
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'print-design', label: 'Print Design' },
  { value: 'packaging', label: 'Packaging Design' },
  { value: 'consultation', label: 'Strategy Consultation' },
]

export function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      budget: '',
      timeline: '',
      services: [],
    }
  })

  const submitContactForm = useMutation({
    mutationFn: contactAPI.submit,
    onSuccess: () => {
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
      reset()
      setSelectedServices([])
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message. Please try again.')
    },
  })

  const onSubmit = (data: ContactFormData) => {
    const formData = {
      ...data,
      services: selectedServices,
    }
    submitContactForm.mutate(formData)
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    const updatedServices = checked
      ? [...selectedServices, service]
      : selectedServices.filter(s => s !== service)
    
    setSelectedServices(updatedServices)
    setValue('services', updatedServices)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            {...register('name')}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Your company name"
            {...register('company')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register('phone')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Brief subject line"
          {...register('subject')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project..."
          className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
          {...register('message')}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range</Label>
          <Select onValueChange={(value) => setValue('budget', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline</Label>
          <Select onValueChange={(value) => setValue('timeline', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelineOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Services Needed</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceOptions.map((service) => (
            <div key={service.value} className="flex items-center space-x-2">
              <Checkbox
                id={service.value}
                checked={selectedServices.includes(service.value)}
                onCheckedChange={(checked) => 
                  handleServiceChange(service.value, checked as boolean)
                }
              />
              <Label 
                htmlFor={service.value} 
                className="text-sm font-normal cursor-pointer"
              >
                {service.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!isValid || submitContactForm.isPending}
        className="w-full"
      >
        {submitContactForm.isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
