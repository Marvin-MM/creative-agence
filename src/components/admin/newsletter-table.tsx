// src/components/admin/newsletter-table.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  MoreHorizontal,
  Mail,
  Trash2,
  Copy,
  UserCheck,
  UserX,
  Filter
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Newsletter {
  id: string
  email: string
  confirmed: boolean
  source?: string | null
  createdAt: Date
}

interface NewsletterTableProps {
  subscribers: Newsletter[]
}

export function NewsletterTable({ subscribers }: NewsletterTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending'>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')

  // Get unique sources
  const sources = Array.from(new Set(subscribers.map(s => s.source).filter(Boolean)))

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'confirmed' && subscriber.confirmed) ||
                         (statusFilter === 'pending' && !subscriber.confirmed)
    
    const matchesSource = sourceFilter === 'all' || subscriber.source === sourceFilter
    
    return matchesSearch && matchesStatus && matchesSource
  })

  const handleDelete = async (subscriberId: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the newsletter?`)) return

    try {
      const response = await fetch(`/api/newsletter/${subscriberId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete subscriber')
      }

      toast.success('Subscriber removed successfully')
      // In a real app, you'd refresh the data here
    } catch (error) {
      toast.error('Failed to remove subscriber')
    }
  }

  const handleToggleConfirmation = async (subscriberId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/newsletter/${subscriberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmed: !currentStatus
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update subscriber')
      }

      toast.success(`Subscriber ${!currentStatus ? 'confirmed' : 'unconfirmed'} successfully`)
      // In a real app, you'd refresh the data here
    } catch (error) {
      toast.error('Failed to update subscriber')
    }
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    toast.success('Email copied to clipboard')
  }

  const sendTestEmail = async (email: string) => {
    try {
      const response = await fetch('/api/newsletter/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to send test email')
      }

      toast.success('Test email sent successfully')
    } catch (error) {
      toast.error('Failed to send test email')
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Status Filter */}
          <div className="flex gap-1">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
            >
              All ({subscribers.length})
            </Button>
            <Button
              variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('confirmed')}
            >
              Confirmed ({subscribers.filter(s => s.confirmed).length})
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('pending')}
            >
              Pending ({subscribers.filter(s => !s.confirmed).length})
            </Button>
          </div>

          {/* Source Filter */}
          {sources.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Source: {sourceFilter === 'all' ? 'All' : sourceFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSourceFilter('all')}>
                  All Sources
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {sources.map((source) => (
                  <DropdownMenuItem 
                    key={source} 
                    onClick={() => setSourceFilter(source!)}
                  >
                    {source}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.map((subscriber, index) => (
              <motion.tr
                key={subscriber.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{subscriber.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={subscriber.confirmed ? 'default' : 'secondary'}
                    className={subscriber.confirmed ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}
                  >
                    <div className="flex items-center gap-1">
                      {subscriber.confirmed ? (
                        <UserCheck className="w-3 h-3" />
                      ) : (
                        <UserX className="w-3 h-3" />
                      )}
                      {subscriber.confirmed ? 'Confirmed' : 'Pending'}
                    </div>
                  </Badge>
                </TableCell>
                <TableCell>
                  {subscriber.source ? (
                    <Badge variant="outline" className="capitalize">
                      {subscriber.source}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">Unknown</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(subscriber.createdAt), { addSuffix: true })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => copyEmail(subscriber.email)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Email
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem
                        onClick={() => sendTestEmail(subscriber.email)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Test Email
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem
                        onClick={() => handleToggleConfirmation(subscriber.id, subscriber.confirmed)}
                      >
                        {subscriber.confirmed ? (
                          <>
                            <UserX className="w-4 h-4 mr-2" />
                            Mark as Pending
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Confirm Subscription
                          </>
                        )}
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem
                        onClick={() => handleDelete(subscriber.id, subscriber.email)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Subscriber
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredSubscribers.length === 0 && (
        <div className="text-center py-8">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' || sourceFilter !== 'all'
              ? 'No subscribers found matching your criteria.' 
              : 'No newsletter subscribers yet.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && sourceFilter === 'all' && (
            <p className="text-sm text-muted-foreground mt-2">
              Subscribers will appear here when people sign up for your newsletter.
            </p>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/50 px-4 py-3 rounded-lg">
        <span>
          Showing {filteredSubscribers.length} of {subscribers.length} subscribers
        </span>
        <span>
          {subscribers.filter(s => s.confirmed).length} confirmed, {subscribers.filter(s => !s.confirmed).length} pending
        </span>
      </div>
    </div>
  )
}