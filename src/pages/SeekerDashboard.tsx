import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  TrendingUp, 
  MessageCircle, 
  FileText, 
  Users, 
  Calendar,
  Award,
  Clock,
  Plus,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react'
import { User, DashboardStats, Notification, Activity } from '@/types'
import { formatRelativeTime } from '@/utils/utils'
import { dashboardStats, notificationsData, activityData } from '@/data/mockData'

interface SeekerDashboardProps {
  user: User
}

export function SeekerDashboard({ user }: SeekerDashboardProps) {
  const navigate = useNavigate()
  const recentActivity = activityData.slice(0, 5)
  const recentNotifications = notificationsData.slice(0, 5)

  const handleQuickAction = (action: any) => {
    if (action.link) {
      navigate(action.link)
    }
  }

  const statCards = [
    {
      title: 'Profile Level',
      value: dashboardStats.level,
      icon: Award,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 this week'
    },
    {
      title: 'Current Streak',
      value: `${dashboardStats.currentStreak} days`,
      icon: Clock,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: 'Keep it up!'
    },
    {
      title: 'Total Points',
      value: dashboardStats.totalPoints.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      change: '+150 this week'
    },
    {
      title: 'Profile Complete',
      value: `${dashboardStats.profileCompletion}%`,
      icon: Target,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      change: 'Almost there!'
    }
  ]

  const quickActions = [
    {
      title: 'Add Example',
      description: 'Capture a work accomplishment',
      icon: Plus,
      color: 'bg-primary',
      link: '/chat'
    },
    {
      title: 'Find Jobs',
      description: 'Search new opportunities',
      icon: Users,
      color: 'bg-accent',
      link: '/jobs'
    },
    {
      title: 'Chat with AI',
      description: 'Get career guidance',
      icon: MessageCircle,
      color: 'bg-green-500',
      link: '/chat'
    },
    {
      title: 'Create Document',
      description: 'Generate tailored resume',
      icon: FileText,
      color: 'bg-purple-500',
      link: '/documents'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">Ready to advance your career today?</p>
        </div>
        <div className="flex items-center gap-4 bg-card border border-border rounded-xl px-6 py-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{dashboardStats.level}</p>
            <p className="text-gray-400 text-xs">Level</p>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{dashboardStats.currentStreak}</p>
            <p className="text-gray-400 text-xs">Day Streak</p>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{dashboardStats.totalPoints}</p>
            <p className="text-gray-400 text-xs">Points</p>
          </div>
        </div>
      </div>

      {/* Profile Completion Alert */}
      {dashboardStats.profileCompletion < 100 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Complete Your Profile</h3>
                <p className="text-gray-400 text-sm">Your profile is {dashboardStats.profileCompletion}% complete</p>
              </div>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/profile')}
              >
                Continue
              </Button>
            </div>
            <div className="mt-4 w-full bg-black/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                style={{ width: `${dashboardStats.profileCompletion}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card 
                key={index} 
                className="cursor-pointer hover-lift group transition-all duration-200 hover:scale-105"
                onClick={() => handleQuickAction(action)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-white mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 mx-auto mt-2 group-hover:text-white transition-colors" />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Important updates and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className={`p-3 rounded-lg border ${!notification.read ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                  <div className="flex items-start gap-3">
                    <Badge 
                      variant={notification.type === 'success' ? 'success' : notification.type === 'warning' ? 'warning' : 'secondary'}
                      className="text-xs"
                    >
                      {notification.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{notification.title}</p>
                      <p className="text-sm text-gray-400">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}