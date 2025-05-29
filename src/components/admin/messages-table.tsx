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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Eye, 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  ExternalLink,
  Trash2
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ContactMessage {
  id: string
  name: string
  email: string
  company?: string | null
  subject: string
  message: string
  phone?: string | null
  budget?: string | null
  timeline?: string | null
  services: string[]
  createdAt: Date
  expiresAt: Date
}

interface MessagesTableProps {
  messages: ContactMessage[]
}

export function MessagesTable({ messages }: MessagesTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (messageId: string) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete message')
      }

      toast.success('Message deleted successfully')
      // In a real app, you'd refresh the data here
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  const handleReply = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${subject}`
    window.open(mailtoLink, '_blank')
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Services</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message, index) => (
              <motion.tr
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-muted/50"
              >
                <TableCell>
                  <div>
                    <div className="font-medium">{message.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {message.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="font-medium truncate">{message.subject}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {message.message.substring(0, 50)}...
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {message.company ? (
                    <Badge variant="outline">{message.company}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {message.services.slice(0, 2).map((service) => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {message.services.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{message.services.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedMessage(message)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Message Details</DialogTitle>
                        </DialogHeader>
                        {selectedMessage && (
                          <MessageDetails 
                            message={selectedMessage} 
                            onReply={handleReply}
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReply(message.email, message.subject)}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(message.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm ? 'No messages found matching your search.' : 'No messages yet.'}
          </p>
        </div>
      )}
    </div>
  )
}

function MessageDetails({ 
  message, 
  onReply 
}: { 
  message: ContactMessage
  onReply: (email: string, subject: string) => void 
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{message.subject}</h3>
          <p className="text-muted-foreground">
            From {message.name} • {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
          </p>
        </div>
        <Button 
          onClick={() => onReply(message.email, message.subject)}
          className="btn-primary"
        >
          <Mail className="w-4 h-4 mr-2" />
          Reply
        </Button>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{message.email}</span>
          </div>
          
          {message.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{message.phone}</span>
            </div>
          )}
          
          {message.company && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{message.company}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              Expires {formatDistanceToNow(new Date(message.expiresAt), { addSuffix: true })}
            </span>
          </div>
          
          {message.budget && (
            <div>
              <span className="text-sm font-medium">Budget: </span>
              <span className="text-sm">{message.budget}</span>
            </div>
          )}
          
          {message.timeline && (
            <div>
              <span className="text-sm font-medium">Timeline: </span>
              <span className="text-sm">{message.timeline}</span>
            </div>
          )}
        </div>
      </div>

      {/* Services */}
      {message.services.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Services Interested In:</h4>
          <div className="flex flex-wrap gap-2">
            {message.services.map((service) => (
              <Badge key={service} variant="outline">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <h4 className="font-medium mb-2">Message:</h4>
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  )
}