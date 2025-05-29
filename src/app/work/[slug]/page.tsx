// src/app/work/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ProjectGallery } from '@/components/work/project-gallery'
import { RelatedProjects } from '@/components/work/related-projects'
import { CTASection } from '@/components/sections/cta-section'
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  ExternalLink,
  User,
  Briefcase,
  Target,
  TrendingUp,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Copy
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

async function getProject(slug: string) {
  const project = await prisma.project.findUnique({
    where: { slug }
  })

  if (!project || !project.published) {
    return null
  }

  // Increment view count
  await prisma.project.update({
    where: { id: project.id },
    data: { views: { increment: 1 } }
  })

  return project
}

async function getRelatedProjects(currentProjectId: string, category: string) {
  return await prisma.project.findMany({
    where: {
      id: { not: currentProjectId },
      published: true,
      category: category
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      client: true,
      category: true,
      tags: true,
      featured: true,
      images: true,
      createdAt: true,
      views: true,
    }
  })
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - ${project.client} | Lumina Creative`,
    description: project.description,
    openGraph: {
      title: `${project.title} - ${project.client}`,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.client}`,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }

  const relatedProjects = await getRelatedProjects(project.id, project.category)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/work/${project.slug}`

  const handleShare = (platform: string) => {
    const shareText = `Check out this amazing project: ${project.title} by Lumina Creative`
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      copy: shareUrl
    }
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-8 group">
            <Link href="/work">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </Link>
          </Button>

          {/* Project Header */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                {/* Category & Featured Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline" className="text-sm">
                    {project.category}
                  </Badge>
                  {project.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      Featured Project
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                  {project.title}
                </h1>

                {/* Client */}
                <p className="text-xl text-primary font-medium mb-6">
                  for {project.client}
                </p>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(project.createdAt)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {project.views.toLocaleString()} views
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-2">Share:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('copy')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={project.images[0] || '/images/placeholder-project.jpg'}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Project Gallery */}
                <ProjectGallery 
                  images={project.images} 
                  videos={project.videos}
                  title={project.title}
                />

                {/* Project Overview */}
                <div>
                  <h2 className="text-3xl font-display font-bold mb-6">Project Overview</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {project.description}
                    </p>
                    
                    {/* Services Provided */}
                    <div className="mt-8 p-6 bg-muted/30 rounded-2xl">
                      <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Services Provided
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <Badge key={service} variant="outline" className="bg-background">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    {project.results && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl border border-primary/10">
                        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Results Achieved
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.results}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Details Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-6">Project Details</h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Client</div>
                          <div className="text-muted-foreground text-sm">
                            {project.client}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">My Role</div>
                          <div className="text-muted-foreground text-sm">
                            {project.role}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Category</div>
                          <div className="text-muted-foreground text-sm">
                            {project.category}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Completed</div>
                          <div className="text-muted-foreground text-sm">
                            {formatDate(project.createdAt)}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-sm">Total Views</div>
                          <div className="text-muted-foreground text-sm">
                            {project.views.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full btn-primary" asChild>
                    <Link href="/contact">
                      <Target className="w-4 h-4 mr-2" />
                      Start Your Project
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/work">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View All Work
                    </Link>
                  </Button>
                </div>

                {/* Next Project */}
                {relatedProjects.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Next Project</h3>
                      <Link href={`/work/${relatedProjects[0].slug}`} className="group">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                          <Image
                            src={relatedProjects[0].images[0] || '/images/placeholder-project.jpg'}
                            alt={relatedProjects[0].title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {relatedProjects[0].title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          for {relatedProjects[0].client}
                        </p>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} />
      )}

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}