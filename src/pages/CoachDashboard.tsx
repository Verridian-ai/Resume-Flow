import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  ArrowUpRight,
  Star,
  Target
} from 'lucide-react'
import { User, CoachAssignment } from '@/types'
import { formatRelativeTime } from '@/utils/utils'
import { coachAssignments } from '@/data/mockData'

interface CoachDashboardProps {
  user: User
}

export function CoachDashboard({ user }: CoachDashboardProps) {
  const activeAssignments = coachAssignments.filter(a => a.status === 'active')
  const stats = {
    activeClients: activeAssignments.length,
    totalSessions: 24,
    completionRate: 87,
    avgRating: 4.9
  }

  const statCards = [
    {
      title: 'Active Clients',
      value: stats.activeClients,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 this month'
    },
    {
      title: 'Sessions This Week',
      value: 8,
      icon: Calendar,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: 'On track'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      change: '+5% this month'
    },
    {
      title: 'Avg. Client Rating',
      value: stats.avgRating,
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      change: 'Excellent feedback'
    }
  ]

  const recentActivities = [
    {
      id: '1',
      type: 'session_completed',
      description: 'Completed coaching session with Alex Rivera',
      timestamp: new Date('2024-11-06T14:30:00'),
      client: 'Alex Rivera'
    },
    {
      id: '2',
      type: 'document_reviewed',
      description: 'Reviewed resume for Jamie Kim',
      timestamp: new Date('2024-11-06T10:15:00'),
      client: 'Jamie Kim'
    },
    {
      id: '3',
      type: 'job_achieved',
      description: 'Client Morgan Taylor received job offer!',
      timestamp: new Date('2024-11-05T16:45:00'),
      client: 'Morgan Taylor'
    }
  ]

  const upcomingSessions = [
    {
      id: '1',
      clientName: 'Alex Rivera',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      time: 'Tomorrow 2:00 PM',
      topic: 'Interview Preparation',
      duration: '60 min'
    },
    {
      id: '2',
      clientName: 'Jamie Kim',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
      time: 'Friday 10:00 AM',
      topic: 'Resume Review',
      duration: '45 min'
    },
    {
      id: '3',
      clientName: 'Morgan Taylor',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
      time: 'Friday 3:00 PM',
      topic: 'Career Planning',
      duration: '60 min'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Coach Dashboard</h1>
          <p className="text-gray-400">Manage your assigned job seekers and team workspaces</p>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-6 py-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{stats.activeClients}</p>
            <p className="text-gray-400 text-xs">Active Clients</p>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">4.9</p>
            <p className="text-gray-400 text-xs">Rating</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`h-12 w-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Your scheduled coaching sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <Avatar>
                    <AvatarImage src={session.clientAvatar} alt={session.clientName} />
                    <AvatarFallback>
                      {session.clientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-white">{session.clientName}</p>
                    <p className="text-sm text-gray-400">{session.topic}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{session.time} • {session.duration}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest client updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Clients
            </div>
            <Button size="sm" variant="outline">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardTitle>
          <CardDescription>Your current coaching assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={assignment.seekerAvatar} alt={assignment.seekerName} />
                    <AvatarFallback>
                      {assignment.seekerName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{assignment.seekerName}</p>
                    <Badge variant="success" className="text-xs capitalize">
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Contact:</span>
                    <span className="text-gray-300">{formatRelativeTime(assignment.lastContact)}</span>
                  </div>
                  {assignment.nextSession && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Session:</span>
                      <span className="text-gray-300">{formatRelativeTime(assignment.nextSession)}</span>
                    </div>
                  )}
                </div>

                {assignment.notes && (
                  <p className="text-xs text-gray-400 mt-3 line-clamp-2">
                    {assignment.notes}
                  </p>
                )}

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="primary" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}