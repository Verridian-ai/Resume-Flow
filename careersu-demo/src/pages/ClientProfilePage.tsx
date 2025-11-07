import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  ArrowLeft,
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail as MailIcon,
  Target,
  Award,
  TrendingUp,
  Clock,
  Star,
  MessageCircle
} from 'lucide-react'
import { User as UserType } from '@/types'
import { formatDate, formatRelativeTime } from '@/utils/utils'
import { mockClientsData, ClientProgress } from '@/data/mockClientData'

interface ClientProfilePageProps {
  user: UserType
}

export function ClientProfilePage({ user }: ClientProfilePageProps) {
  const { clientId } = useParams<{ clientId: string }>()
  
  // Find the client data
  const client = mockClientsData.find(c => c.seekerId === clientId)
  
  if (!client) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Client Not Found</h1>
          <p className="text-gray-400 mb-6">The requested client profile could not be found.</p>
          <Link to="/dashboard">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Client Profile' }
      ]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="metallic-gold">Client Profile</span>
          </h1>
          <p className="text-gray-400">
            Viewing profile for {client.seekerName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message Client
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </div>

      {/* Client Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Profile Completion</p>
                <p className="text-2xl font-bold text-white mt-1">{client.profileCompletion}%</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Examples</p>
                <p className="text-2xl font-bold text-white mt-1">{client.examplesCount}/{client.targetExamplesCount}</p>
              </div>
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-white mt-1">{client.totalSessions}</p>
              </div>
              <div className="h-12 w-12 bg-green-400/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Readiness</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {client.meetsCriteria ? '100%' : `${client.profileCompletion}%`}
                </p>
              </div>
              <div className={`h-12 w-12 ${client.meetsCriteria ? 'bg-green-400/10' : 'bg-yellow-400/10'} rounded-lg flex items-center justify-center`}>
                {client.meetsCriteria ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Client Info & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={client.seekerAvatar} alt={client.seekerName} />
                  <AvatarFallback className="text-lg">
                    {client.seekerName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{client.seekerName}</h3>
                  <p className="text-muted-foreground">{client.seekerEmail}</p>
                  <Badge variant="outline" className="mt-1">
                    Member since {formatDate(client.assignedDate)}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-400">Total Sessions</span>
                  <p className="text-sm text-white">{client.totalSessions}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-400">Last Contact</span>
                  <p className="text-sm text-white">{formatRelativeTime(client.lastContact)}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-400">Next Session</span>
                  <p className="text-sm text-white">
                    {client.nextSession ? formatRelativeTime(client.nextSession) : 'Not scheduled'}
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-400">Status</span>
                  <div>
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-400">Resume</span>
                    {getStatusBadge(client.resumeStatus)}
                  </div>
                  <p className="text-xs text-gray-500">{client.resumes.length} version(s)</p>
                </div>

                <div className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-400">Cover Letter</span>
                    {getStatusBadge(client.coverLetterStatus)}
                  </div>
                  <p className="text-xs text-gray-500">{client.coverLetters.length} version(s)</p>
                </div>
              </div>

              {/* Recent Documents */}
              <div className="space-y-2">
                {client.resumes.slice(0, 3).map((resume) => (
                  <div key={resume.id} className="flex items-center justify-between p-2 rounded bg-muted/20">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{resume.jobTitle}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(resume.lastUpdated)}</p>
                      </div>
                    </div>
                    {getStatusBadge(resume.status)}
                  </div>
                ))}

                {client.coverLetters.slice(0, 2).map((letter) => (
                  <div key={letter.id} className="flex items-center justify-between p-2 rounded bg-muted/20">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <MailIcon className="h-4 w-4 text-accent flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">Cover Letter - {letter.company}</p>
                        <p className="text-xs text-gray-500">{formatRelativeTime(letter.lastUpdated)}</p>
                      </div>
                    </div>
                    {getStatusBadge(letter.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {client.meetsCriteria ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    All Criteria Met
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    Action Items ({client.gaps.length})
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {client.gaps.length > 0 ? (
                <ul className="space-y-2">
                  {client.gaps.map((gap, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                      <div className="h-4 w-4 border border-yellow-400 rounded-full flex-shrink-0 mt-0.5"></div>
                      {gap}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Client is fully prepared and ready!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Session Notes & Activity */}
        <div className="space-y-6">
          {/* Session Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Session Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {client.sessionNotes.slice(0, 3).map((note, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/20">
                  <p className="text-sm text-white">{note}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {client.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}