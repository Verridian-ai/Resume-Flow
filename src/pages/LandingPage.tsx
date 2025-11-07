import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Sparkles, Target, Zap, Users, TrendingUp, Shield, GraduationCap, PlayCircle } from 'lucide-react'

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<'applicant' | 'coach'>('applicant')

  return (
    <div className="min-h-screen hexagon-pattern">
      {/* Navigation */}
      <nav className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/resume-flow-logo.png" 
              alt="RESUME FLOW" 
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="primary" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-yellow-400">AI-Powered Job Applications</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Resume Into
            <span className="block mt-2">
              <span className="metallic-gold">Tailored Applications</span>
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Build a library of your best work examples, then let AI automatically match them to job requirements and generate perfectly tailored resumes and cover letters in seconds.
          </p>
        </div>
      </section>

      {/* Role-Based Demo Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Choose Your <span className="metallic-gold">Experience</span>
            </h2>
            <p className="text-lg text-gray-400">
              Try our platform with pre-configured demo accounts
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-muted rounded-lg p-1 mb-8 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('applicant')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-colors ${
                activeTab === 'applicant' 
                  ? 'bg-white text-gray-900 shadow-sm font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-colors ${
                activeTab === 'coach' 
                  ? 'bg-white text-gray-900 shadow-sm font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Coach
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'applicant' && (
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-yellow-400/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Job Seeker Dashboard</CardTitle>
                    <CardDescription className="text-base">
                      Discover AI-powered tools to accelerate your job search
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Core Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>AI resume and cover letter generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>STAR format example library</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>Job tracking with AI fit scoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>Chat with AI career assistant</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Coach Support</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>Matched with experienced career coach</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>Real-time feedback on applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>Interview preparation sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">✓</span>
                        <span>Progress tracking and goal setting</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button size="lg" variant="primary" asChild className="gap-2 flex-1">
                    <Link to="/login?demo=applicant">
                      <PlayCircle className="h-5 w-5" />
                      Try Applicant Demo
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2 flex-1">
                    <Link to="/signup?role=seeker">
                      Create Real Account
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'coach' && (
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Career Coach Dashboard</CardTitle>
                    <CardDescription className="text-base">
                      Powerful tools to guide job seekers to success
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Client Management</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Manage multiple client relationships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Track client progress and milestones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Session scheduling and notes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Performance analytics dashboard</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Review Tools</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Review and edit client documents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Provide inline feedback and suggestions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>AI-assisted coaching recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">✓</span>
                        <span>Collaborative workspace access</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button size="lg" variant="secondary" asChild className="gap-2 flex-1">
                    <Link to="/login?demo=coach">
                      <PlayCircle className="h-5 w-5" />
                      Try Coach Demo
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2 flex-1">
                    <Link to="/signup?role=coach">
                      Create Real Account
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            The <span className="metallic-gold">Complete</span> Job Search Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to land your dream job, powered by cutting-edge AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <Target className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle>Build Your Story Bank</CardTitle>
              <CardDescription>
                Chat with our AI agent daily to capture work accomplishments in STAR format. Build a searchable library of 20-50 rich examples.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Zap className="h-12 w-12 text-cyan-400 mb-4" />
              <CardTitle>AI-Powered Matching</CardTitle>
              <CardDescription>
                Advanced RAG technology matches your examples to job requirements using semantic search, keyword filtering, and knowledge graphs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-gray-300 mb-4" />
              <CardTitle>Instant Generation</CardTitle>
              <CardDescription>
                Generate tailored resumes and cover letters in 30 seconds. What used to take hours now takes minutes.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
              <CardTitle>Smart Job Tracking</CardTitle>
              <CardDescription>
                Save jobs with fit scoring (Green/Orange/Red), track status, and get automatic company research and commute calculations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Users className="h-12 w-12 text-orange-400 mb-4" />
              <CardTitle>Coach Collaboration</CardTitle>
              <CardDescription>
                Career coaches can review your applications, provide inline feedback, and help you refine your approach.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-400 mb-4" />
              <CardTitle>Automated Job Search</CardTitle>
              <CardDescription>
                Search multiple job boards automatically, get AI fit scoring, and import opportunities with one click.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="glass-card border-yellow-400/50">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who are landing interviews faster with AI-powered applications.
            </p>
            <Button size="lg" variant="primary" asChild className="gap-2">
              <Link to="/signup">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/resume-flow-logo.png" 
                alt="RESUME FLOW" 
                className="h-8 w-auto"
              />
              <div>
                <p className="text-sm font-medium">AI-Powered Job Applications</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 RESUME FLOW. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}