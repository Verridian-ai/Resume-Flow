import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  MessageCircle, 
  Briefcase, 
  FileText, 
  User, 
  Users, 
  Settings, 
  LogOut,
  Bell
} from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { cn } from '@/utils/utils'
import { User as UserType } from '@/types'

interface NavigationProps {
  user: UserType
  onLogout: () => void
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'chat', label: 'AI Chat', icon: MessageCircle, path: '/chat' },
  { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
  { id: 'documents', label: 'Documents', icon: FileText, path: '/documents' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
]

const coachNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
  { id: 'clients', label: 'Clients', icon: Users, path: '/clients' },
  { id: 'chat', label: 'Messages', icon: MessageCircle, path: '/chat' },
  { id: 'workspaces', label: 'Workspaces', icon: Users, path: '/workspaces' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
]

export function Navigation({ user, onLogout }: NavigationProps) {
  const location = useLocation()
  const navItems = user.role === 'coach' ? coachNavigationItems : navigationItems

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/resume-flow-logo.png" 
              alt="RESUME FLOW" 
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* User Avatar */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Logout Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}