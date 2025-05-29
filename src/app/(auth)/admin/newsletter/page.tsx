// src/app/(auth)/admin/newsletter/page.tsx
import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NewsletterTable } from '@/components/admin/newsletter-table'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  Mail, 
  Users, 
  TrendingUp, 
  Download,
  UserCheck,
  UserX,
  Calendar
} from 'lucide-react'

async function getNewsletterData() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const [
    totalSubscribers,
    confirmedSubscribers,
    pendingSubscribers,
    thisMonthSignups,
    thisWeekSignups,
    subscribers,
    subscriptionsBySource
  ] = await Promise.all([
    prisma.newsletter.count(),
    prisma.newsletter.count({ where: { confirmed: true } }),
    prisma.newsletter.count({ where: { confirmed: false } }),
    prisma.newsletter.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    }),
    prisma.newsletter.count({
      where: { createdAt: { gte: sevenDaysAgo } }
    }),
    prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' }
    }),
    prisma.newsletter.groupBy({
      by: ['source'],
      _count: { source: true },
      orderBy: { _count: { source: 'desc' } }
    })
  ])

  return {
    totalSubscribers,
    confirmedSubscribers,
    pendingSubscribers,
    thisMonthSignups,
    thisWeekSignups,
    subscribers,
    subscriptionsBySource
  }
}

export default async function AdminNewsletterPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/admin/login')
  }

  const newsletterData = await getNewsletterData()

  const growthRate = newsletterData.thisMonthSignups > 0 
    ? ((newsletterData.thisWeekSignups / (newsletterData.thisMonthSignups - newsletterData.thisWeekSignups)) * 100).toFixed(1)
    : '0'

  const confirmationRate = newsletterData.totalSubscribers > 0
    ? ((newsletterData.confirmedSubscribers / newsletterData.totalSubscribers) * 100).toFixed(1)
    : '0'

  const handleExportSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter/export')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export subscribers:', error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Newsletter Management</h1>
          <p className="text-muted-foreground">
            Manage your newsletter subscribers and track engagement metrics.
          </p>
        </div>
        
        <Button onClick={handleExportSubscribers} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Subscribers
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsletterData.totalSubscribers}</div>
            <p className="text-xs text-muted-foreground">All signups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{newsletterData.confirmedSubscribers}</div>
            <p className="text-xs text-muted-foreground">{confirmationRate}% confirmation rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{newsletterData.pendingSubscribers}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsletterData.thisMonthSignups}</div>
            <p className="text-xs text-muted-foreground">New signups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{growthRate}%</div>
            <p className="text-xs text-muted-foreground">Week over week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsletterData.subscriptionsBySource.map((source: any, index: number) => {
                const percentage = ((source._count.source / newsletterData.totalSubscribers) * 100).toFixed(1)
                return (
                  <div key={source.source || 'unknown'} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {source.source || 'Unknown'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{source._count.source}</div>
                      <div className="text-xs text-muted-foreground">{percentage}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsletterData.subscribers.slice(0, 5).map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium truncate max-w-[200px]">
                      {subscriber.email}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {subscriber.confirmed ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    ) : (
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {subscriber.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {confirmationRate}%
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  Confirmation Rate
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {(newsletterData.thisMonthSignups / 30).toFixed(1)}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  Avg. Daily Signups
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  +{growthRate}%
                </div>
                <div className="text-sm text-purple-700 dark:text-purple-300">
                  Weekly Growth
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoadingSpinner className="mx-auto" />}>
            <NewsletterTable subscribers={newsletterData.subscribers} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}