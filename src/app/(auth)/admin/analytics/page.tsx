// src/app/(auth)/admin/analytics/page.tsx
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnalyticsChart } from '@/components/admin/analytics-chart'
import { TopPagesChart } from '@/components/admin/top-pages-chart'
import { TrafficSourcesChart } from '@/components/admin/traffic-sources-chart'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  Globe,
  Smartphone,
  Monitor,
  Calendar
} from 'lucide-react'

async function getAnalyticsData() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const [
    totalPageViews,
    totalPageViewsLastMonth,
    totalPageViewsLastWeek,
    uniqueVisitors,
    topPages,
    dailyViews,
    projectViews,
    blogViews
  ] = await Promise.all([
    // Total page views
    prisma.pageView.count(),
    
    // Page views last 30 days
    prisma.pageView.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    }),
    
    // Page views last 7 days
    prisma.pageView.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    }),
// Unique visitors (approximate - based on unique IPs)
prisma.pageView.groupBy({
    by: ['ip'],
    where: { createdAt: { gte: thirtyDaysAgo } }
  }).then(result => result.length),
  
  // Top pages
  prisma.pageView.groupBy({
    by: ['page'],
    _count: { page: true },
    orderBy: { _count: { page: 'desc' } },
    take: 10
  }),
  
  // Daily views for chart
  prisma.$queryRaw`
    SELECT DATE(created_at) as date, COUNT(*) as views
    FROM "PageView"
    WHERE created_at >= ${thirtyDaysAgo}
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `,
  
  // Project views
  prisma.project.aggregate({
    _sum: { views: true }
  }),
  
  // Blog views
  prisma.blogPost.aggregate({
    _sum: { views: true }
  })
])

return {
  totalPageViews,
  totalPageViewsLastMonth,
  totalPageViewsLastWeek,
  uniqueVisitors,
  topPages,
  dailyViews,
  projectViews: projectViews._sum.views || 0,
  blogViews: blogViews._sum.views || 0
}
}

async function getEngagementMetrics() {
const [contactMessages, newsletterSignups, averageSessionTime] = await Promise.all([
  prisma.contactMessage.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }
  }),
  
  prisma.newsletter.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }
  }),
  
  // Mock average session time (in real app, would track this)
  Promise.resolve(185) // 3 minutes 5 seconds
])

return {
  contactMessages,
  newsletterSignups,
  averageSessionTime
}
}

export default async function AdminAnalyticsPage() {
const session = await getServerSession(authOptions)

if (!session?.user) {
  redirect('/admin/login')
}

const [analyticsData, engagementData] = await Promise.all([
  getAnalyticsData(),
  getEngagementMetrics()
])

// Calculate growth percentages
const weekOverWeekGrowth = analyticsData.totalPageViewsLastWeek > 0 
  ? ((analyticsData.totalPageViewsLastWeek / (analyticsData.totalPageViewsLastMonth - analyticsData.totalPageViewsLastWeek)) * 100).toFixed(1)
  : '0'

return (
  <div className="space-y-8">
    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
      <p className="text-muted-foreground">
        Track your website performance and user engagement metrics.
      </p>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analyticsData.totalPageViews.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{analyticsData.totalPageViewsLastMonth} this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Last 30 days
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.floor(engagementData.averageSessionTime / 60)}m {engagementData.averageSessionTime % 60}s
          </div>
          <p className="text-xs text-muted-foreground">
            +12% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{weekOverWeekGrowth}%</div>
          <p className="text-xs text-muted-foreground">
            Week over week
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Main Analytics Chart */}
      <div className="lg:col-span-2">
        <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
          <AnalyticsChart />
        </Suspense>
      </div>
    </div>

    {/* Secondary Metrics */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Top Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topPages.slice(0, 5).map((page: any, index: number) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium truncate">
                    {page.page === '/' ? 'Home' : page.page}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {page._count.page}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5" />
            Engagement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Contact Forms</span>
              <span className="text-2xl font-bold text-primary">
                {engagementData.contactMessages}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Newsletter Signups</span>
              <span className="text-2xl font-bold text-green-600">
                {engagementData.newsletterSignups}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Project Views</span>
              <span className="text-2xl font-bold text-blue-600">
                {analyticsData.projectViews.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Blog Views</span>
              <span className="text-2xl font-bold text-purple-600">
                {analyticsData.blogViews.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Devices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Desktop</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">65%</div>
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-3/5 h-full bg-primary rounded-full" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Mobile</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">30%</div>
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-1/3 h-full bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Tablet</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">5%</div>
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-1/12 h-full bg-orange-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Performance Insights */}
    <Card>
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {((engagementData.contactMessages / analyticsData.totalPageViewsLastMonth) * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Contact Conversion Rate
            </div>
          </div>
          
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {((engagementData.newsletterSignups / analyticsData.totalPageViewsLastMonth) * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Newsletter Signup Rate
            </div>
          </div>
          
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {(analyticsData.totalPageViewsLastMonth / analyticsData.uniqueVisitors).toFixed(1)}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              Unique Visitors
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)
}
