import { Suspense } from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { ProjectsFilter } from '@/components/sections/projects-filter'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata: Metadata = {
  title: 'Our Work - Creative Portfolio & Case Studies',
  description: 'Explore our portfolio of successful branding, web design, and digital marketing projects. See how we transform businesses through strategic creative solutions.',
  openGraph: {
    title: 'Our Work - Creative Portfolio & Case Studies',
    description: 'Explore our portfolio of successful creative projects and case studies.',
  },
}

async function getProjects() {
  return await prisma.project.findMany({
    where: { published: true },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ],
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

async function getCategories() {
  const categories = await prisma.project.groupBy({
    by: ['category'],
    where: { published: true },
    _count: {
      category: true
    }
  })
  
  return categories.map(cat => ({
    name: cat.category,
    count: cat._count.category
  }))
}

export default async function WorkPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories()
  ])

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="gradient-text">Our Creative</span>
            <br />
            <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how we transform brands through strategic creative solutions. 
            Each project tells a unique story of innovation, collaboration, and measurable success.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{projects.length}+ Projects Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>15+ Industries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Filter & Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LoadingSpinner className="mx-auto" />}>
            <ProjectsFilter categories={categories} />
            <ProjectsGrid projects={projects} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}