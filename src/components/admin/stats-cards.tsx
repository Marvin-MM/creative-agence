'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FolderOpen, 
  FileText, 
  MessageSquare, 
  Mail, 
  Eye,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface StatsCardsProps {
  stats: {
    totalProjects: number
    publishedProjects: number
    totalBlogPosts: number
    publishedBlogPosts: number
    totalMessages: number
    totalSubscribers: number
    pageViews: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      description: `${stats.publishedProjects} published`,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts,
      description: `${stats.publishedBlogPosts} published`,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'New Messages',
      value: stats.totalMessages,
      description: 'Last 30 days',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      change: '+23%',
      trend: 'up'
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      description: 'Newsletter confirmed',
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      change: '+15%',
      trend: 'up'
    },
    {
      title: 'Page Views',
      value: stats.pageViews,
      description: 'Last 30 days',
      icon: Eye,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-950',
      change: '-5%',
      trend: 'down'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${card.bgColor}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
                <div className={`flex items-center text-xs ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {card.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {card.change}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}