export type FitScore = 'green' | 'orange' | 'red'
export type JobStatus = 'saved' | 'applied' | 'interview' | 'rejected' | 'offer'
export type UserRole = 'seeker' | 'coach'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  location?: string
  goal?: string
  avatar?: string
  phone?: string
  memberSince?: Date
  socialMedia?: {
    linkedin?: string
    github?: string
    twitter?: string
    website?: string
  }
  address?: {
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
    timezone?: string
  }
  profile?: {
    bio?: string
    careerObjectives?: string
    personalInterests?: string[]
    workPreferences?: {
      remoteWork?: boolean
      hybridWork?: boolean
      onSite?: boolean
      willingToRelocate?: boolean
    }
    contactPreferences?: {
      emailNotifications?: boolean
      smsNotifications?: boolean
      preferredContactMethod?: 'email' | 'phone' | 'both'
      availableHours?: string
    }
  }
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  type: string
  description: string
  requirements: string[]
  fitScore: FitScore
  status: JobStatus
  appliedDate?: Date
  lastUpdated: Date
  link?: string
  commuteTime?: number
  companySize?: string
  remote: boolean
  keywords: string[]
}

export interface Example {
  id: string
  title: string
  situation: string
  task: string
  action: string
  result: string
  createdAt: Date
  tags: string[]
  relevance: number
  story: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface DashboardStats {
  level: number
  currentStreak: number
  totalPoints: number
  examplesCreated: number
  jobsApplied: number
  interviewsScheduled: number
  profileCompletion: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface CoachAssignment {
  id: string
  seekerId: string
  seekerName: string
  seekerAvatar?: string
  status: 'active' | 'paused' | 'completed'
  assignedDate: Date
  lastContact: Date
  nextSession?: Date
  notes?: string
}

export interface Activity {
  id: string
  type: 'example_created' | 'job_applied' | 'document_generated' | 'session_scheduled'
  title: string
  description: string
  timestamp: Date
  userId: string
  metadata?: Record<string, any>
}