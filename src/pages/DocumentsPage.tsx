import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { 
  FileText, 
  Plus, 
  Download, 
  Edit, 
  Eye, 
  Sparkles, 
  Target, 
  Clock,
  CheckCircle2,
  Zap,
  Search
} from 'lucide-react'

export function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'resume' | 'cover-letter' | 'tailored'>('all')

  const documents = [
    {
      id: '1',
      title: 'General Resume - Software Engineer',
      type: 'resume',
      status: 'current',
      lastModified: new Date('2024-11-05'),
      version: '3.2',
      tailoredFor: null,
      aiScore: 92,
      fitJobs: 5
    },
    {
      id: '2',
      title: 'TechFlow Cover Letter',
      type: 'cover-letter',
      status: 'generated',
      lastModified: new Date('2024-11-03'),
      version: '1.1',
      tailoredFor: 'TechFlow Inc - Senior Backend Engineer',
      aiScore: 95,
      fitJobs: 1
    },
    {
      id: '3',
      title: 'ScaleTech Resume - Principal Engineer',
      type: 'tailored',
      status: 'current',
      lastModified: new Date('2024-11-02'),
      version: '2.0',
      tailoredFor: 'ScaleTech - Principal Software Engineer',
      aiScore: 88,
      fitJobs: 1
    },
    {
      id: '4',
      title: 'StartupXYZ Resume - Backend Dev',
      type: 'tailored',
      status: 'generated',
      lastModified: new Date('2024-11-01'),
      version: '1.3',
      tailoredFor: 'StartupXYZ - Backend Developer',
      aiScore: 85,
      fitJobs: 1
    }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (doc.tailoredFor && doc.tailoredFor.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === 'all' || doc.type === selectedType
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge variant="success">Current</Badge>
      case 'generated':
        return <Badge variant="warning">Generated</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume':
        return <FileText className="h-4 w-4" />
      case 'cover-letter':
        return <Edit className="h-4 w-4" />
      case 'tailored':
        return <Target className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const quickActions = [
    {
      title: 'Generate New Resume',
      description: 'Create a fresh resume from your examples',
      icon: Sparkles,
      color: 'bg-primary',
      action: () => console.log('Generate resume')
    },
    {
      title: 'Tailor for Job',
      description: 'Customize document for a specific role',
      icon: Target,
      color: 'bg-accent',
      action: () => console.log('Tailor document')
    },
    {
      title: 'AI Optimization',
      description: 'Let AI improve your existing document',
      icon: Zap,
      color: 'bg-green-500',
      action: () => console.log('Optimize document')
    }
  ]

  return (
    <div className="p-8 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Documents' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="metallic-gold">Documents</span> Manager
          </h1>
          <p className="text-muted-foreground">
            Create, customize, and track your application documents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="cursor-pointer hover-lift" onClick={action.action}>
                <CardContent className="p-6 text-center">
                  <div className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-white mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            All ({documents.length})
          </Button>
          <Button
            variant={selectedType === 'resume' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('resume')}
          >
            Resumes
          </Button>
          <Button
            variant={selectedType === 'cover-letter' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('cover-letter')}
          >
            Cover Letters
          </Button>
          <Button
            variant={selectedType === 'tailored' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('tailored')}
          >
            Tailored Docs
          </Button>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTypeIcon(doc.type)}
                    <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                    {getStatusBadge(doc.status)}
                  </div>
                  
                  {doc.tailoredFor && (
                    <p className="text-sm text-accent mb-2">Tailored for: {doc.tailoredFor}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Modified {doc.lastModified.toLocaleDateString()}</span>
                    </div>
                    <span>Version {doc.version}</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>AI Score: {doc.aiScore}%</span>
                    </div>
                    {doc.fitJobs > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {doc.fitJobs} job match{doc.fitJobs !== 1 ? 'es' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="primary">
                    <Target className="h-4 w-4 mr-2" />
                    Tailor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first document to get started
          </p>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Document
          </Button>
        </div>
      )}

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Document Insights
          </CardTitle>
          <CardDescription>AI-powered recommendations for your documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Optimization Opportunities</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Add more quantified achievements to improve impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Include relevant keywords for tech startup roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                  <span>Highlight leadership experience more prominently</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Success Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average AI Score</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Documents Generated</span>
                  <span className="text-sm font-medium">12 this month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tailoring Success Rate</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}