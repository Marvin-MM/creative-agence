// src/components/admin/quick-actions.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  FileText, 
  FolderPlus, 
  Settings, 
  BarChart3,
  Users,
  Mail,
  Upload,
  Eye,
  Download
} from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: 'New Project',
      description: 'Add a new project to your portfolio',
      icon: FolderPlus,
      href: '/admin/projects/new',
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: 'Ctrl+N'
    },
    {
      title: 'New Blog Post',
      description: 'Write and publish a new article',
      icon: FileText,
      href: '/admin/blog/new',
      color: 'bg-green-500 hover:bg-green-600',
      shortcut: 'Ctrl+B'
    },
    {
      title: 'View Analytics',
      description: 'Check your website performance',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-purple-500 hover:bg-purple-600',
      shortcut: 'Ctrl+A'
    },
    {
      title: 'Manage Team',
      description: 'Add or edit team members',
      icon: Users,
      href: '/admin/team',
      color: 'bg-orange-500 hover:bg-orange-600',
      shortcut: 'Ctrl+T'
    },
    {
      title: 'Messages',
      description: 'View and respond to inquiries',
      icon: Mail,
      href: '/admin/messages',
      color: 'bg-pink-500 hover:bg-pink-600',
      shortcut: 'Ctrl+M'
    },
    {
      title: 'Media Library',
      description: 'Upload and manage files',
      icon: Upload,
      href: '/admin/media',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      shortcut: 'Ctrl+U'
    },
    {
      title: 'Site Settings',
      description: 'Configure your website',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500 hover:bg-gray-600',
      shortcut: 'Ctrl+S'
    },
    {
      title: 'View Site',
      description: 'Preview your public website',
      icon: Eye,
      href: '/',
      color: 'bg-teal-500 hover:bg-teal-600',
      external: true,
      shortcut: 'Ctrl+V'
    },
    {
      title: 'Export Data',
      description: 'Download your content backup',
      icon: Download,
      href: '/admin/export',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      shortcut: 'Ctrl+E'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.title}
            asChild
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:shadow-md transition-all duration-300 group"
          >
            <Link 
              href={action.href}
              {...(action.external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <div className={`p-2 rounded-lg ${action.color} mr-3 group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium group-hover:text-primary transition-colors">
                  {action.title}
                </div>
                <div className="text-sm text-muted-foreground">
                  {action.description}
                </div>
              </div>
              {action.shortcut && (
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded hidden sm:block">
                  {action.shortcut}
                </div>
              )}
            </Link>
          </Button>
        ))}
        
        {/* Quick Stats */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Quick Actions</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
          </div>
        </div>

        {/* Shortcuts Info */}
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            💡 <strong>Tip:</strong> Use keyboard shortcuts for faster navigation
          </div>
        </div>
      </CardContent>
    </Card>
  )
}