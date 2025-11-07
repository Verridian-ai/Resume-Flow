import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { JobCard } from '@/components/JobCard'
import { Plus, Search, Filter, TrendingUp, Clock, Star } from 'lucide-react'
import { jobsData, getGreenJobs, getOrangeJobs, getRedJobs } from '@/data/mockData'
import { Job, FitScore } from '@/types'

export function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | FitScore>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const greenJobs = getGreenJobs()
  const orangeJobs = getOrangeJobs()
  const redJobs = getRedJobs()

  // Filter jobs based on search and filters
  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFitScore = selectedFilter === 'all' || job.fitScore === selectedFilter
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus
    
    return matchesSearch && matchesFitScore && matchesStatus
  })

  const statusCounts = {
    saved: jobsData.filter(j => j.status === 'saved').length,
    applied: jobsData.filter(j => j.status === 'applied').length,
    interview: jobsData.filter(j => j.status === 'interview').length,
    offer: jobsData.filter(j => j.status === 'offer').length,
    rejected: jobsData.filter(j => j.status === 'rejected').length
  }

  const handleJobAction = (action: string, job: Job) => {
    console.log(`Action: ${action} for job: ${job.title}`)
    // In a real app, this would trigger the appropriate action
  }

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Jobs' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="metallic-gold">Jobs</span> Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <Button variant="primary">
          <Plus className="h-5 w-5" />
          Add Job
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{jobsData.length}</div>
            <div className="text-sm text-muted-foreground">Total Jobs</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{statusCounts.applied}</div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.interview}</div>
            <div className="text-sm text-muted-foreground">Interviews</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{statusCounts.offer}</div>
            <div className="text-sm text-muted-foreground">Offers</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{greenJobs.length}</div>
            <div className="text-sm text-muted-foreground">Great Fit</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, company, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
          >
            All Jobs ({jobsData.length})
          </Button>
          <Button
            variant={selectedFilter === 'green' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('green')}
            className="text-green-400 border-green-400 hover:bg-green-400/10"
          >
            Great Fit ({greenJobs.length})
          </Button>
          <Button
            variant={selectedFilter === 'orange' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('orange')}
            className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/10"
          >
            Good Fit ({orangeJobs.length})
          </Button>
          <Button
            variant={selectedFilter === 'red' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('red')}
            className="text-red-400 border-red-400 hover:bg-red-400/10"
          >
            May Not Fit ({redJobs.length})
          </Button>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onAction={(action) => handleJobAction(action, job)}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button variant="primary" onClick={() => {
            setSearchQuery('')
            setSelectedFilter('all')
            setSelectedStatus('all')
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Application Insights
          </CardTitle>
          <CardDescription>AI-powered insights about your job search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">Fit Score Analysis</h4>
              <p className="text-sm text-muted-foreground">
                60% of your applications have high fit scores. Keep focusing on roles that match your skills!
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-1">Response Time</h4>
              <p className="text-sm text-muted-foreground">
                Average response time is 12 days. Follow up on applications older than 2 weeks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <h4 className="font-semibold mb-1">Success Rate</h4>
              <p className="text-sm text-muted-foreground">
                25% interview rate from your applications. Above average for your industry!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}