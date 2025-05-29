// src/components/sections/featured-work.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ArrowRight, Eye, Heart } from 'lucide-react'

// Mock data for featured projects
const featuredProjects = [
  {
    id: 1,
    title: 'Zenith Financial',
    category: 'Brand Identity',
    image: '/images/work/zenith-preview.jpg',
    description: 'Complete rebrand for a leading fintech company, including logo, website, and marketing materials.',
    tags: ['Branding', 'Web Design'],
    height: 'h-80',
    featured: true,
    views: 1200,
    likes: 89
  },
  {
    id: 2,
    title: 'Aurora E-commerce',
    category: 'Web Design',
    image: '/images/work/aurora-preview.jpg',
    description: 'Modern e-commerce platform with seamless user experience and conversion optimization.',
    tags: ['E-commerce', 'UX/UI'],
    height: 'h-96',
    featured: true,
    views: 2100,
    likes: 156
  },
  {
    id: 3,
    title: 'Mindful Wellness',
    category: 'App Design',
    image: '/images/work/mindful-preview.jpg',
    description: 'Mobile wellness app focusing on mental health and meditation practices.',
    tags: ['Mobile App', 'Wellness'],
    height: 'h-72',
    featured: false,
    views: 890,
    likes: 67
  },
  {
    id: 4,
    title: 'Cosmic Studios',
    category: 'Visual Identity',
    image: '/images/work/cosmic-preview.jpg',
    description: 'Creative studio rebrand with bold typography and space-inspired visuals.',
    tags: ['Branding', 'Typography'],
    height: 'h-88',
    featured: true,
    views: 1560,
    likes: 234
  },
  {
    id: 5,
    title: 'EcoGreen Initiative',
    category: 'Campaign',
    image: '/images/work/eco-preview.jpg',
    description: 'Environmental awareness campaign with impactful visuals and messaging.',
    tags: ['Campaign', 'Social Impact'],
    height: 'h-64',
    featured: false,
    views: 1890,
    likes: 145
  },
  {
    id: 6,
    title: 'TechFlow Platform',
    category: 'SaaS Design',
    image: '/images/work/techflow-preview.jpg',
    description: 'B2B SaaS platform redesign focusing on user experience and data visualization.',
    tags: ['SaaS', 'Dashboard'],
    height: 'h-92',
    featured: true,
    views: 2340,
    likes: 189
  }
]

const categories = ['All', 'Brand Identity', 'Web Design', 'App Design', 'Visual Identity', 'Campaign', 'SaaS Design']

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const filteredProjects = activeCategory === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === activeCategory)

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Work</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Projects That</span>
            <br />
            <span className="gradient-text">Make Impact</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our portfolio of successful projects that showcase our creative excellence 
            and strategic thinking across various industries.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'hover:bg-primary/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Masonry Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="masonry"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="masonry-item group cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={`/work/${project.id}`}>
                  <div className={`relative ${project.height} rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2`}>
                    {/* Project Image */}
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                          Featured
                        </Badge>
                      )}

                      {/* Stats */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full text-xs text-white">
                          <Eye className="w-3 h-3" />
                          {project.views}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full text-xs text-white">
                          <Heart className="w-3 h-3" />
                          {project.likes}
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="bg-white/20 text-white text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-white/80 mb-4">{project.description}</p>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">View Project</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={hoveredProject === project.id ? { opacity: [0, 0.3, 0] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-8">
            See more of our creative work and case studies
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="btn-primary group"
          >
            <Link href="/work">
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl"
        />
      </div>
    </section>
  )
}