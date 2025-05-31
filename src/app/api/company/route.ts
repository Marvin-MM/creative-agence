
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const companyInfo = await prisma.companyInfo.findMany()
    
    // Convert to key-value object
    const info = companyInfo.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(info)
  } catch (error) {
    console.error('Error fetching company info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company info' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Update or create company info entries
    const updates = await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.companyInfo.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string }
        })
      )
    )

    return NextResponse.json(updates)
  } catch (error) {
    console.error('Error updating company info:', error)
    return NextResponse.json(
      { error: 'Failed to update company info' },
      { status: 500 }
    )
  }
}
