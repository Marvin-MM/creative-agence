
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  console.log('✅ Created admin user:', admin.email)

  // Create sample projects
  const projects = [
    {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A modern e-commerce platform built with Next.js and Stripe',
      content: 'Detailed project content here...',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'
      ],
      category: 'Web Development',
      tags: ['Next.js', 'React', 'Stripe', 'E-commerce'],
      client: 'Tech Corp',
      year: 2024,
      url: 'https://example.com',
      featured: true,
      published: true
    },
    {
      title: 'Mobile Banking App',
      slug: 'mobile-banking-app',
      description: 'A secure mobile banking application with biometric authentication',
      content: 'Detailed project content here...',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
      ],
      category: 'Mobile Development',
      tags: ['React Native', 'Security', 'Banking', 'Biometrics'],
      client: 'Finance Bank',
      year: 2024,
      featured: false,
      published: true
    },
    {
      title: 'Brand Identity Design',
      slug: 'brand-identity-design',
      description: 'Complete brand identity redesign for a tech startup',
      content: 'Detailed project content here...',
      image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800',
      gallery: [
        'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800'
      ],
      category: 'Branding',
      tags: ['Logo Design', 'Brand Identity', 'Visual Design'],
      client: 'StartupCo',
      year: 2023,
      featured: true,
      published: true
    }
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project
    })
  }

  console.log('✅ Created sample projects')

  // Create sample blog posts
  const blogPosts = [
    {
      title: 'The Future of Web Development',
      slug: 'future-of-web-development',
      content: `
        # The Future of Web Development

        Web development is constantly evolving, and 2024 brings exciting new trends and technologies that are shaping the industry.

        ## Key Trends

        1. **AI Integration**: AI is becoming increasingly integrated into web development workflows
        2. **Edge Computing**: Moving computation closer to users for better performance
        3. **Web Assembly**: Enabling high-performance applications in the browser

        ## Conclusion

        The future of web development is bright, with new technologies making it easier to build fast, secure, and engaging web applications.
      `,
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development in 2024 and beyond.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      author: 'Admin',
      tags: ['Web Development', 'Technology', 'Future', 'AI'],
      category: 'Technology',
      published: true,
      featured: true,
      readTime: 5
    },
    {
      title: 'Building Scalable React Applications',
      slug: 'building-scalable-react-applications',
      content: `
        # Building Scalable React Applications

        Creating scalable React applications requires careful planning and the right architectural decisions.

        ## Best Practices

        1. **Component Architecture**: Design reusable and maintainable components
        2. **State Management**: Choose the right state management solution
        3. **Performance Optimization**: Implement lazy loading and code splitting

        ## Tools and Libraries

        - **Next.js**: For server-side rendering and routing
        - **TypeScript**: For type safety
        - **Testing Library**: For comprehensive testing

        Building scalable applications is an iterative process that requires continuous refinement.
      `,
      excerpt: 'Learn best practices and strategies for building scalable React applications that can grow with your business.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      author: 'Admin',
      tags: ['React', 'JavaScript', 'Architecture', 'Scalability'],
      category: 'Development',
      published: true,
      featured: false,
      readTime: 8
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    })
  }

  console.log('✅ Created sample blog posts')

  // Create sample FAQs
  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a full range of digital services including web development, mobile app development, UI/UX design, branding, and digital marketing.',
      category: 'Services',
      order: 1
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months.',
      category: 'Timeline',
      order: 2
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer various support packages including maintenance, updates, security monitoring, and technical support.',
      category: 'Support',
      order: 3
    },
    {
      question: 'What is your development process?',
      answer: 'We follow an agile development process with regular client communication, iterative development, and continuous testing to ensure quality results.',
      category: 'Process',
      order: 4
    }
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq
    })
  }

  console.log('✅ Created sample FAQs')

  // Create sample team members
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Creative Director',
      bio: 'John leads our creative team with over 10 years of experience in digital design and branding.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      email: 'john@example.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      order: 1
    },
    {
      name: 'Jane Smith',
      role: 'Lead Developer',
      bio: 'Jane is our technical lead, specializing in full-stack development and system architecture.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      email: 'jane@example.com',
      linkedin: 'https://linkedin.com/in/janesmith',
      order: 2
    },
    {
      name: 'Mike Johnson',
      role: 'UX Designer',
      bio: 'Mike focuses on creating intuitive user experiences and conducting user research.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      email: 'mike@example.com',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      order: 3
    }
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: member
    })
  }

  console.log('✅ Created sample team members')

  // Create sample analytics data
  const analyticsData = [
    { page: '/', views: 150, visitors: 120 },
    { page: '/about', views: 80, visitors: 65 },
    { page: '/work', views: 120, visitors: 95 },
    { page: '/blog', views: 60, visitors: 50 },
    { page: '/contact', views: 40, visitors: 35 }
  ]

  for (const data of analyticsData) {
    await prisma.analytics.create({
      data: {
        ...data,
        date: new Date()
      }
    })
  }

  console.log('✅ Created sample analytics data')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
