// src/components/sections/projects-filter.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Grid3X3,
  List,
  TrendingUp,
  X
} from 'lucide-react'

interface Category {
  name: string
  count: number
}

interface ProjectsFilterProps {
  categories: Category[]
  onFilterChange?: (filters: FilterState) => void
}

interface FilterState {
  search: string
  category: string
  sortBy: string
  viewMode: 'grid' | 'list'
}

export function ProjectsFilter({ categories, onFilterChange }: ProjectsFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    sortBy: 'newest',
    viewMode: 'grid'
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const totalProjects = categories.reduce((sum, cat) => sum + cat.count, 0)

  // Handle filter changes
  useEffect(() => {
    onFilterChange?.(filters)
  }, [filters, onFilterChange])

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }))
  }

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }))
  }

  const handleViewModeChange = (viewMode: 'grid' | 'list') => {
    setFilters(prev => ({ ...prev, viewMode }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      sortBy: 'newest',
      viewMode: 'grid'
    })
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'client', label: 'By Client' }
  ]

  const hasActiveFilters = filters.search !== '' || filters.category !== 'all' || filters.sortBy !== 'newest'

  return (
    <div className="space-y-6">
      {/* Main Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {[filters.search, filters.category !== 'all', filters.sortBy !== 'newest'].filter(Boolean).length}
              </Badge>
            )}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={filters.viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewModeChange('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={filters.viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleViewModeChange('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-muted/50 rounded-lg p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sort By */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.value === 'popular' && <TrendingUp className="w-4 h-4" />}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-sm text-muted-foreground">
                Showing {totalProjects} projects
                {filters.category !== 'all' && (
                  <span> in {filters.category}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={filters.category === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleCategoryChange('all')}
          className="transition-all duration-300"
        >
          All Projects ({totalProjects})
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={filters.category === category.name ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange(category.name)}
            className="transition-all duration-300"
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </motion.div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <span>Active filters:</span>
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: "{filters.search}"
              <X 
                className="w-3 h-3 cursor-pointer hover:text-foreground" 
                onClick={() => handleSearchChange('')}
              />
            </Badge>
          )}
          {filters.category !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Category: {filters.category}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-foreground" 
                onClick={() => handleCategoryChange('all')}
              />
            </Badge>
          )}
          {filters.sortBy !== 'newest' && (
            <Badge variant="secondary" className="gap-1">
              Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-foreground" 
                onClick={() => handleSortChange('newest')}
              />
            </Badge>
          )}
        </motion.div>
      )}
    </div>
  )
}