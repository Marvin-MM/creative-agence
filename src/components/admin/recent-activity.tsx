// src/components/admin/recent-activity.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Clock, 
  FolderPlus,
  FileText,
  Mail,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  Settings,
  Upload,
  ArrowRight
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

// Mock activity data - in real app, this would come from an activity log
const mockActivities = [
  {
    id: '1',
    type: 'project',
    action: 'created',
    title: 'New project "Brand Redesign for TechCorp"',
    description: 'Created a new branding project',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: 'Sarah Chen',
    icon: FolderPlus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    id: '2',
    type: 'blog',
    action: 'published',
    title: 'Blog post "The Future of Design Systems"',
    description: 'Published new blog article',
    time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    user: 'Marcus Rodriguez',
    icon: FileText,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950'
  },
  {
    id: '3',
    type: 'message',
    action: 'received',
    title: 'New contact message from "Innovate Co"',
    description: 'Received project inquiry',
    time: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    user: 'System',
    icon: Mail,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950'
  },
  {
    id: '4',
    type: 'project',
    action: 'updated',
    title: 'Updated project "E-commerce Platform"',
    description: 'Modified project details and images',
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    user: 'Sarah Chen',
    icon: Edit,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950'
  },
  {
    id: '5',
    type: 'newsletter',
    action: 'subscribed',
    title: '5 new newsletter subscribers',
    description: 'New email subscriptions',
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    user: 'System',
    icon: UserPlus,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50 dark:bg-teal-950'
  },
  {
    id: '6',
    type: 'media',
    action: 'uploaded',
    title: 'Uploaded 12 new images',
    description: 'Added media to project gallery',
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    user: 'Emily Watson',
    icon: Upload,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950'
  },
  {
    id: '7',
    type: 'settings',
    action: 'updated',
    title: 'Updated site settings',
    description: 'Modified company information',
    time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    user: 'Admin User',
    icon: Settings,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 dark:bg-gray-950'
  },
  {
    id: '8',
    type: 'project',
    action: 'deleted',
    title: 'Deleted project "Old Campaign"',
    description: 'Removed outdated project',
    time: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    user: 'Sarah Chen',
    icon: Trash2,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950'
  }
]

export function RecentActivity() {
  const getActivityBadge = (type: string, action: string) => {
    const variants: Record<string, string> = {
      project: 'default',
      blog: 'secondary',
      message: 'outline',
      newsletter: 'default',
      media: 'secondary',
      settings: 'outline'
    }
    
    const labels: Record<string, string> = {
      project: 'Project',
      blog: 'Blog',
      message: 'Message',
      newsletter: 'Newsletter',
      media: 'Media',
      settings: 'Settings'
    }

    return {
      variant: variants[type] || 'outline',
      label: labels[type] || type
    }
  }

  const getActionText = (action: string) => {
    const actions: Record<string, string> = {
      created: 'Created',
      updated: 'Updated',
      deleted: 'Deleted',
      published: 'Published',
      received: 'Received',
      subscribed: 'Subscribed',
      uploaded: 'Uploaded'
    }
    
    return actions[action] || action
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-4 group">
              {/* Timeline */}
              <div className="relative flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                {index < mockActivities.length - 1 && (
                  <div className="w-px h-8 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge 
                      variant={getActivityBadge(activity.type, activity.action).variant as any}
                      className="text-xs"
                    >
                      {getActivityBadge(activity.type, activity.action).label}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getActionText(activity.action)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </div>
                </div>

                <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                  {activity.title}
                </h4>

                <p className="text-xs text-muted-foreground mb-2">
                  {activity.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>by</span>
                  <span className="font-medium">{activity.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            Load More Activity
          </Button>
        </div>

        {/* Activity Summary */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {mockActivities.length}
              </div>
              <div className="text-xs text-muted-foreground">Recent Actions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">
                {new Set(mockActivities.map(a => a.user)).size}
              </div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              All
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Projects
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Blog
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Messages
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}