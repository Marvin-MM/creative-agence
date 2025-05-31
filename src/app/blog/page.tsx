
import { Suspense } from 'react'
import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { BlogHero } from '@/components/sections/blog-hero'
import { BlogGrid } from '@/components/sections/blog-grid'
import { BlogSidebar } from '@/components/blog/blog-sidebar'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export const metadata: Metadata = {
  title: 'Blog - Creative Insights & Design Trends | Lumina Creative',
  description: 'Stay ahead with our latest insights on design trends, creative processes, and industry innovations. Expert tips and strategies for modern branding.',
  openGraph: {
    title: 'Blog - Creative Insights & Design Trends',
    description: 'Expert insights on design, branding, and creative innovation.',
    images: ['/images/blog-og.jpg'],
  },
}

interface BlogPageProps {
  searchParams: {
    search?: string
    tag?: string
    category?: string
    page?: string
  }
}

async function getBlogPosts(searchParams: BlogPageProps['searchParams']) {
  const page = parseInt(searchParams.page || '1')
  const limit = 9
  const offset = (page - 1) * limit

  const where: any = {
    published: true,
  }

  // Search functionality
  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search, mode: 'insensitive' } },
      { excerpt: { contains: searchParams.search, mode: 'insensitive' } },
      { content: { contains: searchParams.search, mode: 'insensitive' } },
    ]
  }

  // Tag filtering
  if (searchParams.tag) {
    where.tags = {
      has: searchParams.tag
    }
  }

  // Category filtering (if you have categories)
  if (searchParams.category) {
    where.category = searchParams.category
  }

  const [posts, totalPosts] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        featured: true,
        readingTime: true,
        createdAt: true,
        views: true,
      }
    }),
    prisma.blogPost.count({ where })
  ])

  return {
    posts,
    totalPosts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
    hasMore: totalPosts > page * limit
  }
}

async function getFeaturedPost() {
  return await prisma.blogPost.findFirst({
    where: { 
      published: true,
      featured: true 
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      readingTime: true,
      createdAt: true,
      views: true,
    }
  })
}

async function getBlogCategories() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { tags: true }
  })

  // Extract all unique tags
  const allTags = posts.flatMap(post => post.tags)
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ name: tag, count }))
    .sort((a, b) => b.count - a.count)
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Show featured post only on first page with no filters
  const showFeaturedPost = !searchParams.search && !searchParams.tag && 
    !searchParams.category && (!searchParams.page || searchParams.page === '1')

  const [blogData, featuredPost, categories] = await Promise.all([
    getBlogPosts(searchParams),
    showFeaturedPost ? getFeaturedPost() : null,
    getBlogCategories()
  ])

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section with Featured Post */}
      {showFeaturedPost && (
        <BlogHero featuredPost={featuredPost} />
      )}

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search Results Header */}
              {(searchParams.search || searchParams.tag || searchParams.category) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    {searchParams.search && `Search results for "${searchParams.search}"`}
                    {searchParams.tag && `Posts tagged "${searchParams.tag}"`}
                    {searchParams.category && `Category: ${searchParams.category}`}
                  </h2>
                  <p className="text-muted-foreground">
                    Found {blogData.totalPosts} {blogData.totalPosts === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              )}

              {/* Blog Grid */}
              <Suspense fallback={<LoadingSpinner className="mx-auto my-12" />}>
                <BlogGrid 
                  posts={blogData.posts}
                  totalPages={blogData.totalPages}
                  currentPage={blogData.currentPage}
                  searchParams={searchParams}
                />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<LoadingSpinner className="mx-auto" />}>
                <BlogSidebar categories={categories} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  )
}
