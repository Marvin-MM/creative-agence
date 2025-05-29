// src/components/admin/analytics-chart.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts'
import { TrendingUp, Users, Eye, MessageSquare, Calendar } from 'lucide-react'

// Mock data generator for demo purposes
const generateMockData = (days: number) => {
  const data = []
  const now = new Date()
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      shortDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pageViews: Math.floor(Math.random() * 200) + 50 + (i % 7 === 0 ? 100 : 0), // Higher on weekends
      visitors: Math.floor(Math.random() * 100) + 25,
      contacts: Math.floor(Math.random() * 10) + 1,
      newsletter: Math.floor(Math.random() * 15) + 2,
      bounceRate: Math.floor(Math.random() * 20) + 30, // 30-50%
      sessionDuration: Math.floor(Math.random() * 120) + 60, // 1-3 minutes
    })
  }
  
  return data
}

export function AnalyticsChart() {
  const [timeRange, setTimeRange] = useState('30')
  const [data, setData] = useState(generateMockData(30))
  const [chartType, setChartType] = useState('pageViews')

  useEffect(() => {
    setData(generateMockData(parseInt(timeRange)))
  }, [timeRange])

  const chartConfig = {
    pageViews: {
      title: 'Page Views',
      dataKey: 'pageViews',
      color: '#3b82f6',
      icon: Eye,
      description: 'Total page views over time'
    },
    visitors: {
      title: 'Unique Visitors',
      dataKey: 'visitors',
      color: '#10b981',
      icon: Users,
      description: 'Unique visitors to your website'
    },
    contacts: {
      title: 'Contact Forms',
      dataKey: 'contacts',
      color: '#f59e0b',
      icon: MessageSquare,
      description: 'Contact form submissions'
    },
    newsletter: {
      title: 'Newsletter Signups',
      dataKey: 'newsletter',
      color: '#8b5cf6',
      icon: TrendingUp,
      description: 'New newsletter subscribers'
    },
    bounceRate: {
      title: 'Bounce Rate',
      dataKey: 'bounceRate',
      color: '#ef4444',
      icon: TrendingUp,
      description: 'Percentage of single-page sessions'
    },
    sessionDuration: {
      title: 'Session Duration',
      dataKey: 'sessionDuration',
      color: '#06b6d4',
      icon: Calendar,
      description: 'Average session duration in seconds'
    }
  }

  const currentConfig = chartConfig[chartType as keyof typeof chartConfig]

  // Calculate trend
  const currentPeriod = data.slice(-7).reduce((sum, item) => sum + item[currentConfig.dataKey], 0)
  const previousPeriod = data.slice(-14, -7).reduce((sum, item) => sum + item[currentConfig.dataKey], 0)
  const trend = previousPeriod > 0 ? ((currentPeriod - previousPeriod) / previousPeriod * 100) : 0

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case 'contacts':
      case 'newsletter':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="shortDate" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [value, currentConfig.title]}
            />
            <Bar 
              dataKey={currentConfig.dataKey} 
              fill={currentConfig.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )
      
      case 'bounceRate':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="shortDate" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${value}%`, currentConfig.title]}
            />
            <Area 
              type="monotone" 
              dataKey={currentConfig.dataKey} 
              stroke={currentConfig.color}
              fill={currentConfig.color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        )
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="shortDate" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [value.toLocaleString(), currentConfig.title]}
            />
            <Line 
              type="monotone" 
              dataKey={currentConfig.dataKey} 
              stroke={currentConfig.color}
              strokeWidth={3}
              dot={{ fill: currentConfig.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: currentConfig.color, strokeWidth: 2 }}
            />
          </LineChart>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${currentConfig.color}15` }}>
              <currentConfig.icon className="w-5 h-5" style={{ color: currentConfig.color }} />
            </div>
            <div>
              <CardTitle className="text-lg">{currentConfig.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{currentConfig.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(chartConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <config.icon className="w-4 h-4" />
                      {config.title}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Trend Indicator */}
        <div className="flex items-center gap-2 mt-2">
          <div className="text-2xl font-bold">
            {currentPeriod.toLocaleString()}
            {chartType === 'bounceRate' && '%'}
            {chartType === 'sessionDuration' && 's'}
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend).toFixed(1)}% vs last week
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}