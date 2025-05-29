'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string
  email?: string
  linkedin?: string
  twitter?: string
}

interface TeamSectionProps {
  teamMembers: TeamMember[]
}

export function TeamSection({ teamMembers }: TeamSectionProps) {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-6" variant="outline">
            Our Team
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Meet The</span>
            <br />
            <span className="gradient-text">Creative Minds</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Behind every great project is a team of passionate individuals who bring 
            diverse skills, fresh perspectives, and unwavering dedication to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-xl border-0">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden rounded-t-3xl">
                    <Image
                      src={member.image || '/images/team/placeholder.jpg'}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Social Links Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      {member.linkedin && (
                        <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-xl text-white border-white/20 hover:bg-white/30" asChild>
                          <Link href={member.linkedin} target="_blank">
                            <Linkedin className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      {member.twitter && (
                        <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-xl text-white border-white/20 hover:bg-white/30" asChild>
                          <Link href={member.twitter} target="_blank">
                            <Twitter className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      {member.email && (
                        <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-xl text-white border-white/20 hover:bg-white/30" asChild>
                          <Link href={`mailto:${member.email}`}>
                            <Mail className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who share our passion 
                for exceptional design and client success.
              </p>
              <Button className="btn-primary">
                View Open Positions
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}