
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = 
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// Auto-cleanup expired messages
export async function cleanupExpiredMessages() {
  try {
    const result = await prisma.contactMessage.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
    
    console.log(`Cleaned up ${result.count} expired messages`)
    return result.count
  } catch (error) {
    console.error('Error cleaning up expired messages:', error)
    return 0
  }
}
