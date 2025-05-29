import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Page views
    const pageViews = await prisma.pageView.groupBy({
      by: ['page'],
      where: {
        createdAt: {
          gte: startDate
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })

    // Contact form submissions
    const contactSubmissions = await prisma.contactMessage.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Newsletter subscriptions
    const newsletterSubscriptions = await prisma.newsletter.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Top projects by views
    const topProjects = await prisma.project.findMany({
      where: {
        published: true
      },
      orderBy: {
        views: 'desc'
      },
      take: 10,
      select: {
        id: true,
        title: true,
        views: true,
        category: true
      }
    })

    // Daily stats for charts
    const dailyStats = await prisma.pageView.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate
        }
      },
      _count: {
        id: true
      }
    })

    return NextResponse.json({
      pageViews,
      contactSubmissions,
      newsletterSubscriptions,
      topProjects,
      dailyStats
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, userAgent, country } = body

    await prisma.pageView.create({
      data: {
        page,
        userAgent,
        country,
        ip: request.ip || 'unknown'
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    )
  }
} 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = projectSchema.parse(body)

    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug,
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}