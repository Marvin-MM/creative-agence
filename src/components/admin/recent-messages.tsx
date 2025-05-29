// src/components/admin/recent-messages.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, ArrowRight, Clock, User, Building } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface Message {
  id: string
  name: string
  email: string
  company?: string | null
  subject: string
  message: string
  createdAt: Date
}

interface RecentMessagesProps {
  messages: Message[]
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  const truncateMessage = (text: string, length: number = 80) => {
    return text.length > length ? text.substring(0, length) + '...' : text
  }

  const getPriorityColor = (message: Message) => {
    // Simple priority logic based on keywords
    const urgentKeywords = ['urgent', 'asap', 'immediate', 'emergency']
    const importantKeywords = ['important', 'priority', 'meeting', 'deadline']
    
    const content = (message.subject + ' ' + message.message).toLowerCase()
    
    if (urgentKeywords.some(keyword => content.includes(keyword))) {
      return 'bg-red-500'
    } else if (importantKeywords.some(keyword => content.includes(keyword))) {
      return 'bg-orange-500'
    }
    return 'bg-primary'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Recent Messages
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/messages">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <Link
              key={message.id}
              href={`/admin/messages/${message.id}`}
              className="block"
            >
              <div className="group p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  {/* Priority Indicator */}
                  <div className={`w-2 h-2 ${getPriorityColor(message)} rounded-full mt-2 flex-shrink-0`} />
                  
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-sm group-hover:text-primary transition-colors">
                            {message.name}
                          </span>
                        </div>
                        {message.company && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <div className="flex items-center gap-1">
                              <Building className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {message.company}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </div>
                    </div>

                    {/* Subject */}
                    <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {message.subject}
                    </h4>

                    {/* Message Preview */}
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {truncateMessage(message.message)}
                    </p>

                    {/* Email */}
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {message.email}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-sm">No recent messages</p>
            <p className="text-muted-foreground text-xs mt-1">
              New contact form submissions will appear here
            </p>
          </div>
        )}

        {/* Quick Stats */}
        {messages.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Showing {messages.length} recent messages</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span>Urgent</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span>Important</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Normal</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}