// src/components/admin/top-projects.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Star, TrendingUp, ArrowRight, Calendar, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  slug?: string
  client?: string
  category: string
  featured: boolean
  views: number
  images?: string[]
  createdAt?: Date
}

interface TopProjectsProps {
  projects: Project[]
}

export function TopProjects({ projects }: TopProjectsProps) {
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const getProjectImage = (project: Project) => {
    if (project.images && project.images.length > 0) {
      return project.images[0]
    }
    return '/images/placeholder-project.jpg'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top Projects
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/projects">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={project.id} className="group">
              <Link
                href={project.slug ? `/admin/projects/${project.id}` : '#'}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm flex-shrink-0">
                  {index + 1}
                </div>

                {/* Project Image */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getProjectImage(project)}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
                      <Eye className="w-3 h-3" />
                      {formatViews(project.views)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {project.client && (
                      <span className="text-xs text-muted-foreground">
                        {project.client}
                      </span>
                    )}
                    {project.client && <span className="text-muted-foreground">•</span>}
                    <Badge variant="outline" className="text-xs px-2 py-0">
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <Badge className="text-xs px-2 py-0 bg-yellow-500 hover:bg-yellow-600">
                        <Star className="w-2 h-2 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>

                  {project.createdAt && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
                    </div>
                  )}
                </div>

                {/* External Link Icon */}
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-sm">No projects found</p>
            <p className="text-muted-foreground text-xs mt-1">
              Create your first project to see analytics here
            </p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link href="/admin/projects/new">
                Create Project
              </Link>
            </Button>
          </div>
        )}

        {/* Performance Summary */}
        {projects.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-primary">
                  {projects.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Total Views</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {projects.filter(p => p.featured).length}
                </div>
                <div className="text-xs text-muted-foreground">Featured</div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link href="/admin/projects/new">
              <Star className="w-4 h-4 mr-2" />
              Create New Project
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link href="/work" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Public Portfolio
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}