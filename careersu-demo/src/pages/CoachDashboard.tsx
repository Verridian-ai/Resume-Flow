import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  Target,
  FileText,
  Mail,
  AlertCircle,
  ThumbsUp,
  Eye,
  Edit
} from 'lucide-react'
import { User, ClientProgress } from '@/types'
import { formatRelativeTime } from '@/utils/utils'
import { mockClientsData } from '@/data/mockClientData'

interface CoachDashboardProps {
  user: User
}

export function CoachDashboard({ user }: CoachDashboardProps) {
  const navigate = useNavigate()
  const clients = mockClientsData
  const readyClients = clients.filter(c => c.meetsCriteria)
  const totalSessions = clients.reduce((sum, c) => sum + c.totalSessions, 0)
  const avgCompletion = Math.round(clients.reduce((sum, c) => sum + c.profileCompletion, 0) / clients.length)

  const handleViewFullProfile = (clientId: string) => {
    navigate(`/client-profile/${clientId}`)
  }

  const handleMessageClient = () => {
    navigate('/chat')
  }

  const handleScheduleSession = () => {
    // In a real app, this would open a scheduling modal
    console.log('Schedule session clicked')
  }

  const handleViewAllClients = () => {
    navigate('/clients')
  }

  const handleEditDocument = (documentId: string) => {
    // In a real app, this would open a document editor
    console.log('Edit document:', documentId)
  }

  const statCards = [
    {
      title: 'Total Clients',
      value: clients.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: `${readyClients.length} fully ready`
    },
    {
      title: 'Sessions This Month',
      value: totalSessions,
      icon: Calendar,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: 'Across all clients'
    },
    {
      title: 'Avg. Completion',
      value: `${avgCompletion}%`,
      icon: Target,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      change: '+12% this month'
    },
    {
      title: 'Client Rating',
      value: '4.9',
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      change: 'Excellent feedback'
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'final':
        return <Badge variant="success" className="text-xs">Complete</Badge>
      case 'in_progress':
      case 'review':
        return <Badge variant="warning" className="text-xs">In Progress</Badge>
      case 'draft':
        return <Badge variant="secondary" className="text-xs">Draft</Badge>
      default:
        return <Badge variant="destructive" className="text-xs">Not Started</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Coach Dashboard</h1>
          <p className="text-gray-400">Manage your clients and track their progress</p>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-6 py-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{clients.length}</p>
            <p className="text-gray-400 text-xs">Active Clients</p>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{readyClients.length}</p>
            <p className="text-gray-400 text-xs">100% Ready</p>
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

      {/* Client Management - Detailed Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Client Management</h2>
            <p className="text-gray-400 mt-1">Track progress, documents, and readiness for each client</p>
          </div>
          <Button size="sm" variant="outline" onClick={handleViewAllClients}>
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="space-y-6">
          {clients.map((client) => (
            <Card key={client.seekerId} className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={client.seekerAvatar} alt={client.seekerName} />
                      <AvatarFallback>
                        {client.seekerName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{client.seekerName}</CardTitle>
                        {client.meetsCriteria ? (
                          <Badge variant="success" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            100% Ready
                          </Badge>
                        ) : (
                          <Badge variant="warning" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            In Progress
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{client.seekerEmail}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>Member since {formatRelativeTime(client.assignedDate)}</span>
                        <span>•</span>
                        <span>{client.totalSessions} total sessions</span>
                        <span>•</span>
                        <span>Last contact: {formatRelativeTime(client.lastContact)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleMessageClient}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleScheduleSession}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* Profile Completion */}
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">Profile</span>
                      <span className="text-lg font-bold text-white">{client.profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          client.profileCompletion === 100 ? 'bg-green-400' : 
                          client.profileCompletion >= 75 ? 'bg-yellow-400' : 
                          'bg-red-400'
                        }`}
                        style={{ width: `${client.profileCompletion}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Resume Status */}
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">Resume</span>
                      {getStatusBadge(client.resumeStatus)}
                    </div>
                    <p className="text-xs text-gray-500">{client.resumes.length} version(s)</p>
                  </div>

                  {/* Cover Letter Status */}
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">Cover Letter</span>
                      {getStatusBadge(client.coverLetterStatus)}
                    </div>
                    <p className="text-xs text-gray-500">{client.coverLetters.length} version(s)</p>
                  </div>

                  {/* Examples Count */}
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">Examples</span>
                      <span className="text-lg font-bold text-white">{client.examplesCount}/{client.targetExamplesCount}</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          client.examplesCount >= client.targetExamplesCount ? 'bg-green-400' : 
                          client.examplesCount >= client.targetExamplesCount * 0.7 ? 'bg-yellow-400' : 
                          'bg-red-400'
                        }`}
                        style={{ width: `${Math.min((client.examplesCount / client.targetExamplesCount) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Gaps and Documents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gaps / Action Items */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      {client.meetsCriteria ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                          All Criteria Met
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                          Action Items ({client.gaps.length})
                        </>
                      )}
                    </h4>
                    {client.gaps.length > 0 ? (
                      <ul className="space-y-2">
                        {client.gaps.map((gap, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                            <ArrowUpRight className="h-4 w-4 mt-0.5 text-yellow-400 flex-shrink-0" />
                            {gap}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        Client is fully prepared and ready!
                      </p>
                    )}
                  </div>

                  {/* Documents */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Recent Documents
                    </h4>
                    <div className="space-y-2">
                      {client.resumes.slice(0, 2).map((resume) => (
                        <div key={resume.id} className="flex items-center justify-between p-2 rounded bg-muted/20 hover:bg-muted/40 transition-colors">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">{resume.jobTitle}</p>
                              <p className="text-xs text-gray-500">{formatRelativeTime(resume.lastUpdated)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(resume.status)}
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleEditDocument(resume.id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {client.coverLetters.slice(0, 1).map((letter) => (
                        <div key={letter.id} className="flex items-center justify-between p-2 rounded bg-muted/20 hover:bg-muted/40 transition-colors">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-white truncate">Cover Letter - {letter.company}</p>
                              <p className="text-xs text-gray-500">{formatRelativeTime(letter.lastUpdated)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(letter.status)}
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleEditDocument(letter.id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Session Info and Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm">
                    {client.nextSession && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        <span className="text-gray-400">
                          Next session: <span className="text-white font-medium">{formatRelativeTime(client.nextSession)}</span>
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-400">
                        Last note: <span className="text-white">{client.sessionNotes[0]}</span>
                      </span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="primary" onClick={() => handleViewFullProfile(client.seekerId)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}