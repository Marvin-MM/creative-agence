'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, ArrowRight, Eye, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const projects = [
  {
    id: 1,
    title: 'Stellar Brand Identity',
    client: 'TechFlow Solutions',
    category: 'Branding',
    description: 'Complete brand transformation including logo design, visual identity system, and comprehensive brand guidelines for a cutting-edge tech startup.',
    image: '/api/placeholder/800/600',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    tags: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Guidelines'],
    results: '300% increase in brand recognition and 150% boost in lead generation within 6 months.',
    year: '2024',
    duration: '6 weeks',
    services: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Marketing Materials'],
    testimonial: {
      quote: "Luxe Creative transformed our brand completely. The results exceeded all our expectations.",
      author: "Sarah Johnson, CEO TechFlow"
    }
  },
  {
    id: 2,
    title: 'E-commerce Revolution',
    client: 'StyleHouse Fashion',
    category: 'Web Design',
    description: 'Modern e-commerce platform with seamless user experience, mobile optimization, and conversion-focused design.',
    image: '/api/placeholder/800/600',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    tags: ['UI/UX Design', 'E-commerce', 'Mobile Design', 'Conversion Optimization'],
    results: '250% increase in online sales and 40% improvement in conversion rate.',
    year: '2024',
    duration: '12 weeks',
    services: ['Web Design', 'UX Strategy', 'Mobile Optimization', 'Analytics Setup'],
    testimonial: {
      quote: "Our online sales skyrocketed after the redesign. Incredible work!",
      author: "Michael Chen, Founder StyleHouse"
    }
  },
  {
    id: 3,
    title: 'Creative Campaign Launch',
    client: 'Luxe Lifestyle',
    category: 'Marketing',
    description: 'Multi-channel creative campaign featuring stunning visuals, compelling storytelling, and strategic brand positioning.',
    image: '/api/placeholder/800/600',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    tags: ['Creative Direction', 'Campaign Strategy', 'Visual Design', 'Content Creation'],
    results: '500% increase in social media engagement and 200% boost in brand awareness.',
    year: '2023',
    duration: '8 weeks',
    services: ['Creative Strategy', 'Visual Design', 'Content Creation', 'Social Media'],
    testimonial: {
      quote: "The campaign was a massive success. Our brand has never looked better.",
      author: "Emma Rodriguez, Marketing Director"
    }
  },
  {
    id: 4,
    title: 'Digital Transformation',
    client: 'InnovateCorp',
    category: 'Web Design',
    description: 'Complete digital transformation with modern website, user portal, and integrated business systems.',
    image: '/api/placeholder/800/600',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    tags: ['Web Development', 'System Integration', 'User Portal', 'Digital Strategy'],
    results: '180% improvement in user engagement and streamlined business operations.',
    year: '2023',
    duration: '16 weeks',
    services: ['Web Development', 'System Integration', 'UX Design', 'Digital Strategy'],
    testimonial: {
      quote: "They completely transformed how we do business online. Outstanding results.",
      author: "David Kim, CTO InnovateCorp"
    }
  },
  {
    id: 5,
    title: 'Brand Renaissance',
    client: 'Heritage Co.',
    category: 'Branding',
    description: 'Modernizing a classic brand while respecting its heritage and legacy values.',
    image: '/api/placeholder/800/600',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    tags: ['Brand Refresh', 'Heritage Design', 'Modern Identity', 'Legacy Branding'],
    results: 'Successfully bridged tradition with modernity, increasing market appeal by 220%.',
    year: '2023',
    duration: '10 weeks',
    services: ['Brand Strategy', 'Visual Identity', 'Heritage Design', 'Market Research'],
    testimonial: {
      quote: "They honored our heritage while making us relevant for today's market.",
      author: "Jennifer Walsh, Brand Manager"
    }
  },
  {
    id: 6,
    title: 'Startup Launch Package',
    client: 'GreenTech Innovations',
    category: 'Branding',
    description: 'Complete startup branding package including naming, identity, website, and launch materials.',
    image: '/api/placeholder/800/600',
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    tags: ['Startup Branding', 'Naming', 'Launch Strategy', 'Complete Package'],
    results: 'Successful launch with immediate market traction and investor interest.',
    year: '2024',
    duration: '14 weeks',
    services: ['Brand Naming', 'Identity Design', 'Website Development', 'Launch Materials'],
    testimonial: {
      quote: "From concept to launch, they guided us every step of the way.",
      author: "Alex Thompson, Founder GreenTech"
    }
  }
]

export function ProjectGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const categories = ['All', 'Branding', 'Web Design', 'Marketing']
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 bg-gray-100 dark:bg-slate-800 p-2 rounded-xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          {/* Project Images */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.map((img, imgIndex) => (
                              <div key={imgIndex} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                <Image src={img} alt={`${project.title} ${imgIndex + 1}`} fill className="object-cover" />
                              </div>
                            ))}
                          </div>
                          
                          {/* Project Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{project.results}</p>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Client</h4>
                                <p className="text-gray-600 dark:text-gray-300">{project.client}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Year</h4>
                                <p className="text-gray-600 dark:text-gray-300">{project.year}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Duration</h4>
                                <p className="text-gray-600 dark:text-gray-300">{project.duration}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Services</h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.services.map((service, serviceIndex) => (
                                    <span key={serviceIndex} className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Testimonial */}
                          <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl">
                            <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-3">
                              "{project.testimonial.quote}"
                            </blockquote>
                            <cite className="text-sm text-gray-600 dark:text-gray-400">
                              — {project.testimonial.author}
                            </cite>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm" variant="outline" className="bg-white/90 text-gray-900 hover:bg-white border-white/50">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Like Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {project.client}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 px-8 py-4 text-lg font-semibold group hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent"
          >
            Load More Projects
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
