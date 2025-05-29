// src/components/blog/blog-content.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const [processedContent, setProcessedContent] = useState('')

  useEffect(() => {
    // Process markdown-like content to HTML
    const processContent = (text: string) => {
      return text
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6 text-foreground">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8 text-foreground">$1</h1>')
        
        // Bold and italic
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em class="text-primary">$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')
        
        // Lists
        .replace(/^\- (.*$)/gim, '<li class="mb-2 text-muted-foreground leading-relaxed">$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="mb-2 text-muted-foreground leading-relaxed">$1</li>')
        
        // Paragraphs
        .replace(/^\s*$/gm, '</p><p class="mb-6 text-muted-foreground leading-relaxed text-lg">')
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
        
        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto mb-6"><code class="text-sm">$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
        
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground my-6">$1</blockquote>')
        
        // Line breaks
        .replace(/\n/g, '<br>')
    }

    // Wrap content in paragraph tags and process
    const wrapped = `<p class="mb-6 text-muted-foreground leading-relaxed text-lg">${content}</p>`
    const processed = processContent(wrapped)
    
    // Clean up empty paragraphs and fix list formatting
    const cleaned = processed
      .replace(/<p class="mb-6 text-muted-foreground leading-relaxed text-lg"><\/p>/g, '')
      .replace(/(<li[^>]*>.*?<\/li>\s*)+/g, '<ul class="mb-6 space-y-2 ml-6 list-disc">$&</ul>')
      .replace(/<ul[^>]*>(<li[^>]*>\d+\..*?<\/li>\s*)+<\/ul>/g, '<ol class="mb-6 space-y-2 ml-6 list-decimal">$1</ol>')
      .replace(/(\d+\.)\s*/g, '') // Remove numbers from ordered list items since CSS handles it
    
    setProcessedContent(cleaned)
  }, [content])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: processedContent }}
      style={{
        // Custom styles for blog content
        lineHeight: '1.8',
      }}
    />
  )
}