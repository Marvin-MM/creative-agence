// src/components/work/related-projects.tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Eye, ArrowRight, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  client: string
  category: string
  tags: string[]
  featured: boolean
  images: string[]
  createdAt: Date
  views: number
}

interface RelatedProjectsProps {
  projects: Project[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">More Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore more of our creative work and see how we help brands 
            achieve their goals through strategic design solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/work/${project.slug}`}>
                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-xl">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.images[0] || '/images/placeholder-project.jpg'}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                        Featured
                      </Badge>
                    )}

                    {/* Stats Overlay */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/50 rounded-full text-xs text-white">
                        <Eye className="w-3 h-3" />
                        {project.views}
                      </div>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button 
                        size="sm" 
                        className="w-full bg-white/20 backdrop-blur-xl text-white border-white/20 hover:bg-white/30"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Category & Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      {project.tags.slice(0, 1).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tags.length - 1}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    
                    {/* Client */}
                    <p className="text-sm text-primary font-medium mb-3">
                      for {project.client}
                    </p>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(project.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {project.views} views
                      </div>
                    </div>
                  </CardContent>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 blur-sm" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Interested in seeing more of our creative work?
          </p>
          <Button 
            asChild 
            size="lg" 
            className="btn-primary group"
          >
            <Link href="/work">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}