
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, Eye, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  tags: string[]
  featured: boolean
  readingTime: number
  createdAt: Date
  views: number
}

interface BlogGridProps {
  posts: BlogPost[]
  totalPages: number
  currentPage: number
  searchParams: {
    search?: string
    tag?: string
    category?: string
    page?: string
  }
}

export function BlogGrid({ posts, totalPages, currentPage, searchParams }: BlogGridProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(urlSearchParams)
    if (pageNumber === 1) {
      params.delete('page')
    } else {
      params.set('page', pageNumber.toString())
    }
    return `/blog?${params.toString()}`
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl font-bold mb-4">No articles found</h3>
          <p className="text-muted-foreground mb-6">
            We couldn't find any articles matching your criteria. Try adjusting your search or browse all articles.
          </p>
          <Button asChild>
            <Link href="/blog">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-xl h-full">
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage || '/images/blog/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 text-white text-xs backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readingTime} min
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6 flex flex-col h-full">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Badge 
                          variant="outline" 
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight flex-shrink-0">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </div>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center items-center gap-2 mt-12"
        >
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            asChild={currentPage > 1}
            disabled={currentPage <= 1}
            className="gap-2"
          >
            {currentPage > 1 ? (
              <Link href={createPageUrl(currentPage - 1)}>
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                Previous
              </>
            )}
          </Button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              // Show first page, last page, current page, and pages around current
              const showPage = 
                pageNum === 1 || 
                pageNum === totalPages || 
                Math.abs(pageNum - currentPage) <= 1

              if (!showPage) {
                // Show ellipsis
                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <span key={pageNum} className="px-3 py-1 text-muted-foreground">...</span>
                }
                return null
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  asChild={currentPage !== pageNum}
                  className="w-10 h-10 p-0"
                >
                  {currentPage === pageNum ? (
                    pageNum
                  ) : (
                    <Link href={createPageUrl(pageNum)}>
                      {pageNum}
                    </Link>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            asChild={currentPage < totalPages}
            disabled={currentPage >= totalPages}
            className="gap-2"
          >
            {currentPage < totalPages ? (
              <Link href={createPageUrl(currentPage + 1)}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </motion.div>
      )}

      {/* Page Info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing page {currentPage} of {totalPages}
      </div>
    </div>
  )
}
