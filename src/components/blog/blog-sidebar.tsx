// src/components/blog/blog-sidebar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  TrendingUp, 
  Tag, 
  ArrowRight,
  Calendar,
  Eye
} from 'lucide-react'

// Mock data - in real app, this would come from API
const popularPosts = [
  {
    id: '1',
    title: 'The Future of Brand Identity in Digital Spaces',
    slug: 'future-brand-identity-digital-spaces',
    views: 892,
    publishedAt: '2024-02-15'
  },
  {
    id: '2',
    title: 'Creating Memorable User Experiences',
    slug: 'creating-memorable-user-experiences',
    views: 1234,
    publishedAt: '2024-02-10'
  },
  {
    id: '3',
    title: 'Color Psychology in Modern Web Design',
    slug: 'color-psychology-web-design',
    views: 756,
    publishedAt: '2024-02-05'
  }
]

const popularTags = [
  { name: 'Branding', count: 12 },
  { name: 'Web Design', count: 8 },
  { name: 'UX Design', count: 6 },
  { name: 'Digital Design', count: 5 },
  { name: 'Strategy', count: 4 },
  { name: 'Mobile Design', count: 3 },
  { name: 'Typography', count: 3 },
  { name: 'Color Theory', count: 2 }
]

const recentPosts = [
  {
    id: '1',
    title: 'Design Systems That Scale',
    slug: 'design-systems-that-scale',
    publishedAt: '2024-02-20'
  },
  {
    id: '2',
    title: 'The Art of Visual Storytelling',
    slug: 'art-of-visual-storytelling',
    publishedAt: '2024-02-18'
  },
  {
    id: '3',
    title: 'Mobile-First Design Principles',
    slug: 'mobile-first-design-principles',
    publishedAt: '2024-02-16'
  }
]

export function BlogSidebar() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // In a real app, you'd navigate to search results
      window.location.href = `/blog?search=${encodeURIComponent(searchTerm)}`
    }
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 group" asChild>
            <Link href="/blog">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag.name}
                href={`/blog?tag=${encodeURIComponent(tag.name)}`}
              >
                <Badge 
                  variant="outline" 
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h4>
                  <div className="text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter CTA */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest design insights and trends delivered to your inbox.
          </p>
          <Button className="w-full btn-primary" asChild>
            <Link href="/#newsletter">
              Subscribe to Newsletter
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Archive */}
      <Card>
        <CardHeader>
          <CardTitle>Archive</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link 
              href="/blog?month=2024-02" 
              className="flex items-center justify-between text-sm hover:text-primary transition-colors"
            >
              <span>February 2024</span>
              <span className="text-muted-foreground">(8)</span>
            </Link>
            <Link 
              href="/blog?month=2024-01" 
              className="flex items-center justify-between text-sm hover:text-primary transition-colors"
            >
              <span>January 2024</span>
              <span className="text-muted-foreground">(12)</span>
            </Link>
            <Link 
              href="/blog?month=2023-12" 
              className="flex items-center justify-between text-sm hover:text-primary transition-colors"
            >
              <span>December 2023</span>
              <span className="text-muted-foreground">(6)</span>
            </Link>
            <Link 
              href="/blog?month=2023-11" 
              className="flex items-center justify-between text-sm hover:text-primary transition-colors"
            >
              <span>November 2023</span>
              <span className="text-muted-foreground">(9)</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}