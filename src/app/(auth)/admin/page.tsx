import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { StatsCards } from '@/components/admin/stats-cards'
import { RecentActivity } from '@/components/admin/recent-activity'
import { QuickActions } from '@/components/admin/quick-actions'
import { AnalyticsChart } from '@/components/admin/analytics-chart'
import { TopProjects } from '@/components/admin/top-projects'
import { RecentMessages } from '@/components/admin/recent-messages'

async function getDashboardData() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    totalProjects,
    publishedProjects,
    totalBlogPosts,
    publishedBlogPosts,
    totalMessages,
    totalSubscribers,
    recentMessages,
    topProjects,
    pageViews
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.contactMessage.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    }),
    prisma.newsletter.count({ where: { confirmed: true } }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        createdAt: true
      }
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { views: 'desc' },
      where: { published: true },
      select: {
        id: true,
        title: true,
        views: true,
        category: true,
        featured: true
      }
    }),
    prisma.pageView.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    })
  ])

  return {
    stats: {
      totalProjects,
      publishedProjects,
      totalBlogPosts,
      publishedBlogPosts,
      totalMessages,
      totalSubscribers,
      pageViews
    },
    recentMessages,
    topProjects
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const data = await getDashboardData()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your creative agency today.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={data.stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Chart */}
          <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
            <AnalyticsChart />
          </Suspense>

          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <QuickActions />

          {/* Top Projects */}
          <TopProjects projects={data.topProjects} />

          {/* Recent Messages */}
          <RecentMessages messages={data.recentMessages} />
        </div>
      </div>
    </div>
  )
}