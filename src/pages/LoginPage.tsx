import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowRight, Loader2, PlayCircle, Users, GraduationCap } from 'lucide-react'
import { User as UserType } from '@/types'
import { demoUsers } from '@/data/mockData'

interface LoginPageProps {
  onLogin: (user: UserType) => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [activeDemo, setActiveDemo] = useState<'applicant' | 'coach' | null>(null)

  // Handle demo parameters from URL
  useEffect(() => {
    const demoParam = searchParams.get("demo")
    if (demoParam === "coach") {
      setActiveDemo('coach')
    } else if (demoParam === "applicant") {
      setActiveDemo('applicant')
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check for demo credentials
      if (formData.email === "applicant@demo.com" && formData.password === "demo123") {
        onLogin(demoUsers.seeker)
        navigate('/dashboard')
        return
      } else if (formData.email === "coach@demo.com" && formData.password === "demo123") {
        onLogin(demoUsers.coach)
        navigate('/dashboard')
        return
      }
      
      // For other credentials, show error
      throw new Error("Invalid credentials. Try demo accounts: applicant@demo.com or coach@demo.com")
    } catch (err: any) {
      setError(err.message || "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role: 'applicant' | 'coach') => {
    setActiveDemo(role)
    const user = role === 'applicant' ? demoUsers.seeker : demoUsers.coach
    setFormData({
      email: user.email,
      password: "demo123",
    })
  }

  const submitDemoLogin = () => {
    setLoading(true)
    setError("")
    
    // Simulate loading for demo login
    setTimeout(() => {
      if (activeDemo === 'applicant') {
        onLogin(demoUsers.seeker)
        navigate('/dashboard')
      } else if (activeDemo === 'coach') {
        onLogin(demoUsers.coach)
        navigate('/dashboard')
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen hexagon-pattern flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8">
        {/* Left side - Branding */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <img 
                src="/resume-flow-logo.png" 
                alt="RESUME FLOW" 
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              Welcome to 
              <span className="block mt-2">
                <span className="metallic-gold">CareerSU</span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered job applications that get you hired faster
            </p>
          </div>

          {/* Demo Options */}
          {!activeDemo && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Try Our Demo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover-lift transition-all"
                  onClick={() => handleDemoLogin('applicant')}
                >
                  <CardHeader className="text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Job Seeker</CardTitle>
                    <CardDescription>
                      Experience the applicant dashboard
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card 
                  className="cursor-pointer hover-lift transition-all"
                  onClick={() => handleDemoLogin('coach')}
                >
                  <CardHeader className="text-center">
                    <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-lg">Career Coach</CardTitle>
                    <CardDescription>
                      Explore the coach dashboard
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Demo accounts use email: applicant@demo.com or coach@demo.com, password: demo123
              </p>
            </div>
          )}
        </div>

        {/* Right side - Login Form */}
        <div className="flex flex-col justify-center">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {activeDemo ? `Demo Login - ${activeDemo === 'applicant' ? 'Job Seeker' : 'Coach'}` : 'Sign In'}
              </CardTitle>
              <CardDescription>
                {activeDemo 
                  ? `You're testing the ${activeDemo === 'applicant' ? 'job seeker' : 'career coach'} experience`
                  : 'Sign in to your account'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="primary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : activeDemo ? (
                    <>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Enter Demo Dashboard
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {activeDemo && (
                <div className="mt-4 text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setActiveDemo(null)
                      setFormData({ email: "", password: "" })
                    }}
                  >
                    Choose Different Demo
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}