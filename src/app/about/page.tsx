import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { AboutHero } from '@/components/sections/about-hero'
import { TeamSection } from '@/components/sections/team-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ProcessSection } from '@/components/sections/process-section'
import { FAQ } from '@/components/sections/faq'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'About Us - Creative Visionaries & Design Experts',
  description: 'Meet the passionate team behind Lumina Creative. Learn about our mission, values, and commitment to transforming brands through exceptional design.',
  openGraph: {
    title: 'About Lumina Creative - Creative Visionaries & Design Experts',
    description: 'Meet the passionate team behind Lumina Creative and learn about our mission to transform brands.',
  },
}

async function getTeamMembers() {
  return await prisma.teamMember.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })
}

async function getCompanyInfo() {
  const info = await prisma.companyInfo.findMany()
  return info.reduce((acc, item) => {
    acc[item.key] = item.value
    return acc
  }, {} as Record<string, string>)
}

export default async function AboutPage() {
  const [teamMembers, companyInfo] = await Promise.all([
    getTeamMembers(),
    getCompanyInfo()
  ])

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <AboutHero companyInfo={companyInfo} />

      {/* Stats Section */}
      <StatsSection companyInfo={companyInfo} />

      {/* Team Section */}
      <TeamSection teamMembers={teamMembers} />

      {/* Process Section */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
