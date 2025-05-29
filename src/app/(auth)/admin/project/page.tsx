'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  Star,
  Image as ImageIcon,
  Tag,
  Calendar,
  User,
  ExternalLink,
  Heart,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  client: string;
  services: string[];
  tags: string[];
  images: string[];
  videoUrl?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planning';
  results?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  year?: string;
}

// Mock data - replace with actual API call
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Stellar Brand Identity',
    description: 'Complete brand transformation for a cutting-edge tech startup including logo design, visual identity system, and comprehensive brand guidelines.',
    client: 'TechFlow Solutions',
    services: ['Brand Identity', 'Logo Design', 'Brand Guidelines', 'Marketing Materials'],
    tags: ['Branding', 'Logo', 'Identity', 'Tech'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    featured: true,
    status: 'completed',
    results: '300% increase in brand recognition and 150% boost in lead generation within 6 months.',
    slug: 'stellar-brand-identity',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    category: 'Branding',
    year: '2024'
  },
  {
    id: '2',
    title: 'E-commerce Revolution',
    description: 'Modern e-commerce platform with seamless user experience, mobile optimization, and conversion-focused design.',
    client: 'StyleHouse Fashion',
    services: ['Web Design', 'UX Strategy', 'E-commerce', 'Mobile Optimization'],
    tags: ['Web Design', 'E-commerce', 'UX', 'Mobile'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    featured: true,
    status: 'completed',
    results: '250% increase in online sales and 40% improvement in conversion rate.',
    slug: 'ecommerce-revolution',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    category: 'Web Design',
    year: '2024'
  },
  {
    id: '3',
    title: 'Creative Campaign Launch',
    description: 'Multi-channel creative campaign featuring stunning visuals, compelling storytelling, and strategic brand positioning.',
    client: 'Luxe Lifestyle',
    services: ['Creative Strategy', 'Visual Design', 'Content Creation', 'Social Media'],
    tags: ['Campaign', 'Creative', 'Social Media', 'Strategy'],
    images: ['/api/placeholder/800/600'],
    featured: false,
    status: 'in-progress',
    results: '500% increase in social media engagement and 200% boost in brand awareness.',
    slug: 'creative-campaign-launch',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
    category: 'Campaign',
    year: '2024'
  },
  {
    id: '4',
    title: 'Digital Transformation',
    description: 'Complete digital transformation with modern website, user portal, and integrated business systems.',
    client: 'InnovateCorp',
    services: ['Web Development', 'System Integration', 'UX Design', 'Digital Strategy'],
    tags: ['Web Development', 'Integration', 'Digital', 'Strategy'],
    images: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    featured: false,
    status: 'planning',
    slug: 'digital-transformation',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12'),
    category: 'Web Development',
    year: '2023'
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  // Filter projects based on search query and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success('Project deleted successfully');
  };

  const handleToggleFeatured = (id: string) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, featured: !project.featured } : project
    ));
    toast.success('Project updated successfully');
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'planning': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your creative projects</p>
        </div>
        
        <Button onClick={() => setIsNewProjectOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant={view === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setView('grid')}
            className="rounded-none border-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setView('list')}
            className="rounded-none border-0"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Projects Grid/List */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>All Projects ({filteredProjects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="relative overflow-hidden group rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={project.images[0]} 
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-sm font-medium rounded-full">
                          {project.category || project.services[0]}
                        </span>
                      </div>

                      {/* Like Button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {project.year || project.createdAt.getFullYear().toString()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                        {project.client}
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="mb-4 border rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      {/* Project Image */}
                      <div className="relative w-full md:w-64 h-48">
                        <Image
                          src={project.images[0] || '/placeholder-image.jpg'}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                        {project.featured && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              <Star className="mr-1 h-3 w-3" /> Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      {/* Project Details */}
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleFeatured(project.id)}>
                                <Star className="mr-2 h-4 w-4" /> {project.featured ? 'Unfeature' : 'Feature'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteProject(project.id)} className="text-red-600 dark:text-red-400">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <p className="text-sm line-clamp-2 mb-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center">
                              <Tag className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{project.services[0]}{project.services.length > 1 ? ` +${project.services.length - 1}` : ''}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{formatDate(project.createdAt)}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === 'in-progress' ? 'In Progress' : 
                             project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Add New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="Enter project title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" placeholder="Enter client name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter project description" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>Cancel</Button>
              <Button>Create Project</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}