'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Heart, ExternalLink, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

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

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter))
    }
  }, [activeFilter, projects])

  return (
    <div className="space-y-12">
      {/* Results Count */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
          {activeFilter !== 'All' && ` in ${activeFilter}`}
        </p>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/work/${project.slug}`}>
                <div className="relative bg-card rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.images[0] || '/images/placeholder-project.jpg'}
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
                        View Case Study
                      </Button>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      {project.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      Client: {project.client}
                    </p>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {project.views} views
                      </div>
                    </div>
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: hoveredProject === project.id 
                        ? 'linear-gradient(45deg, rgba(99, 102, 241, 0.5), rgba(236, 72, 153, 0.5))' 
                        : 'transparent',
                      padding: '2px',
                    }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full bg-card rounded-3xl" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load More Button */}
      {filteredProjects.length >= 9 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg" className="group">
            Load More Projects
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              ⟳
            </motion.div>
          </Button>
        </div>
      )}
    </div>
  )
}