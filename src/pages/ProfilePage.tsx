import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Edit, 
  Save,
  ExternalLink,
  Target,
  Award,
  TrendingUp
} from 'lucide-react'
import { User as UserType } from '@/types'
import { formatDate } from '@/utils/utils'

interface ProfilePageProps {
  user: UserType
}

export function ProfilePage({ user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [profile, setProfile] = React.useState(user)

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to the backend
    console.log('Profile saved:', profile)
  }

  const profileCompletion = {
    basic: 100, // name, email, location
    contact: 80, // phone, address
    professional: 90, // bio, career objectives
    preferences: 70, // work preferences, social media
    interests: 85 // personal interests
  }

  const overallCompletion = Object.values(profileCompletion).reduce((a, b) => a + b, 0) / Object.keys(profileCompletion).length

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Profile' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="metallic-gold">Profile</span> Management
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and career preferences
          </p>
        </div>
        <Button 
          variant={isEditing ? "primary" : "outline"}
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Completion */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Profile Completion</h3>
              <p className="text-gray-400 text-sm">Complete your profile to get better job matches</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{Math.round(overallCompletion)}%</p>
              <p className="text-gray-400 text-sm">Complete</p>
            </div>
          </div>
          <div className="mt-4 w-full bg-black/30 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
              style={{ width: `${overallCompletion}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-4 text-xs">
            <div className="text-center">
              <div className="font-medium text-white">{profileCompletion.basic}%</div>
              <div className="text-gray-400">Basic Info</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-white">{profileCompletion.contact}%</div>
              <div className="text-gray-400">Contact</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-white">{profileCompletion.professional}%</div>
              <div className="text-gray-400">Professional</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-white">{profileCompletion.preferences}%</div>
              <div className="text-gray-400">Preferences</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-white">{profileCompletion.interests}%</div>
              <div className="text-gray-400">Interests</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.role === 'seeker' ? 'Job Seeker' : 'Career Coach'}</p>
                  <Badge variant="outline" className="mt-1">
                    Member since {profile.memberSince ? formatDate(profile.memberSince) : 'Recently'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  {isEditing ? (
                    <Input 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <Input 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  {isEditing ? (
                    <Input 
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.phone || 'Not provided'}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  {isEditing ? (
                    <Input 
                      value={profile.location || ''}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{profile.location || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Career Goal</label>
                {isEditing ? (
                  <Input 
                    value={profile.goal || ''}
                    onChange={(e) => setProfile({...profile, goal: e.target.value})}
                    placeholder="e.g., Senior Backend Engineer at a growth-stage startup"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{profile.goal || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                {isEditing ? (
                  <Textarea 
                    value={profile.profile?.bio || ''}
                    onChange={(e) => setProfile({
                      ...profile, 
                      profile: {...profile.profile, bio: e.target.value}
                    })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {profile.profile?.bio || 'No bio provided yet.'}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Career Objectives</label>
                {isEditing ? (
                  <Textarea 
                    value={profile.profile?.careerObjectives || ''}
                    onChange={(e) => setProfile({
                      ...profile, 
                      profile: {...profile.profile, careerObjectives: e.target.value}
                    })}
                    placeholder="What are your career objectives?"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {profile.profile?.careerObjectives || 'No career objectives set yet.'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Additional Info */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Profile Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Profile Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">5</div>
                <div className="text-sm text-muted-foreground">Job Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">94%</div>
                <div className="text-sm text-muted-foreground">Match Quality</div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <Badge variant={profile.profile?.contactPreferences?.emailNotifications ? "success" : "secondary"}>
                  {profile.profile?.contactPreferences?.emailNotifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Notifications</span>
                <Badge variant={profile.profile?.contactPreferences?.smsNotifications ? "success" : "secondary"}>
                  {profile.profile?.contactPreferences?.smsNotifications ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Preferred: {profile.profile?.contactPreferences?.preferredContactMethod || 'email'}
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {user.socialMedia && (
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(user.socialMedia).map(([platform, url]) => (
                  url && (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{platform}</span>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  )
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}