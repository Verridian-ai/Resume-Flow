import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Job } from '@/types'
import { getFitScoreColor, getFitScoreBg, formatRelativeTime } from '@/utils/utils'
import { MapPin, Clock, DollarSign, Building, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'

interface JobCardProps {
  job: Job
  onAction?: (action: string) => void
}

export function JobCard({ job, onAction }: JobCardProps) {
  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'success'
      case 'interview': return 'warning'
      case 'offer': return 'success'
      case 'rejected': return 'destructive'
      default: return 'secondary'
    }
  }

  const getActionButton = () => {
    switch (job.status) {
      case 'saved':
        return (
          <Button 
            size="sm" 
            variant="primary" 
            onClick={() => handleAction('apply')}
            className="w-full"
          >
            Apply Now
          </Button>
        )
      case 'applied':
        return (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handleAction('view')}
            className="w-full"
          >
            View Application
          </Button>
        )
      case 'interview':
        return (
          <Button 
            size="sm" 
            variant="warning" 
            onClick={() => handleAction('interview')}
            className="w-full"
          >
            Interview Prep
          </Button>
        )
      default:
        return (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => handleAction('view')}
            className="w-full"
          >
            View Details
          </Button>
        )
    }
  }

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Badge 
              variant={getStatusColor(job.status) as any}
              className="capitalize"
            >
              {job.status}
            </Badge>
            <Badge 
              variant="outline" 
              className={`${getFitScoreBg(job.fitScore)} ${getFitScoreColor(job.fitScore)}`}
            >
              {job.fitScore.toUpperCase()} FIT
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {job.salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{job.type}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1">
          {job.keywords.slice(0, 3).map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {keyword}
            </Badge>
          ))}
          {job.keywords.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.keywords.length - 3} more
            </Badge>
          )}
        </div>

        {/* Company Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{job.companySize} employees</span>
          <span>{job.remote ? 'Remote' : 'On-site'}</span>
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Updated {formatRelativeTime(job.lastUpdated)}</span>
          {job.appliedDate && (
            <span>Applied {formatRelativeTime(job.appliedDate)}</span>
          )}
        </div>

        {/* Action Button */}
        {getActionButton()}

        {/* External Link */}
        {job.link && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full"
            onClick={() => window.open(job.link, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Original Posting
          </Button>
        )}
      </CardContent>
    </Card>
  )
}