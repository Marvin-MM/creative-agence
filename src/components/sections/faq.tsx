'use client'

import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'

const faqs = [
  {
    id: 'item-1',
    question: 'What is your typical project timeline?',
    answer: 'Project timelines vary depending on scope and complexity. A brand identity project typically takes 4-6 weeks, while a complete website redesign can take 8-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.'
  },
  {
    id: 'item-2',
    question: 'Do you work with startups or only established companies?',
    answer: 'We work with businesses of all sizes, from innovative startups to Fortune 500 companies. Our scalable approach allows us to tailor our services to your specific needs and budget, ensuring every client receives the same level of creative excellence.'
  },
  {
    id: 'item-3',
    question: 'What is included in your brand identity packages?',
    answer: 'Our brand identity packages typically include logo design, color palette, typography selection, brand guidelines, business card design, and letterhead. We can customize packages based on your specific needs and may include additional items like social media templates or packaging design.'
  },
  {
    id: 'item-4',
    question: 'How do you measure the success of a design project?',
    answer: 'We measure success through various metrics depending on the project goals: brand recognition improvements, website conversion rates, user engagement metrics, and client satisfaction scores. We provide detailed reports showing the impact of our work on your business objectives.'
  },
  {
    id: 'item-5',
    question: 'Do you provide ongoing support after project completion?',
    answer: 'Yes! We offer various support packages including website maintenance, brand guideline updates, additional design materials, and strategic consulting. Our goal is to build long-term partnerships with our clients and support their continued growth.'
  }
]

export function FAQ() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">FAQ</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Frequently Asked</span>
            <br />
            <span className="gradient-text">Questions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers. Here are some of the most common 
            questions we receive from our clients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <AccordionItem 
                  value={faq.id} 
                  className="bg-card/50 backdrop-blur-xl border rounded-2xl px-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors py-6">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}