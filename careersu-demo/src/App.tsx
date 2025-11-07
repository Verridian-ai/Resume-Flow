import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { User as UserType, UserRole } from './types'
import { Navigation } from './components/Navigation'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SeekerDashboard } from './pages/SeekerDashboard'
import { CoachDashboard } from './pages/CoachDashboard'
import { CoachClientsPage } from './pages/CoachClientsPage'
import { CoachMessagesPage } from './pages/CoachMessagesPage'
import { CoachWorkspacesPage } from './pages/CoachWorkspacesPage'
import { CoachSettingsPage } from './pages/CoachSettingsPage'
import { ChatPage } from './pages/ChatPage'
import { JobsPage } from './pages/JobsPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ClientProfilePage } from './pages/ClientProfilePage'
import { authService } from './lib/workos-auth'
import { demoUsers } from './data/mockData'

function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isDemoSession()) {
          // Handle demo session
          const userRole = authService.getDemoUserRole()
          if (userRole) {
            const demoUser = userRole === 'coach' ? demoUsers.coach : demoUsers.seeker
            setUser(demoUser)
            setIsAuthenticated(true)
          }
        } else {
          // Handle real WorkOS authentication
          const authUser = await authService.getCurrentUser()
          if (authUser) {
            // Convert to UserType - you'd get role from Convex user table
            const user: UserType = {
              id: authUser.id,
              email: authUser.email,
              name: `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim(),
              role: (authUser.role as UserRole) || 'seeker', // Default role, should be fetched from Convex
            }
            setUser(user)
            setIsAuthenticated(true)
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        authService.signOut()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = (userData: UserType) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    authService.signOut()
    setUser(null)
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated || !user) {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  // Main app layout with navigation
  const AppLayout = ({ children, showNav = true }: { children: React.ReactNode, showNav?: boolean }) => (
    <div className="min-h-screen bg-background">
      {user && showNav && <Navigation user={user} onLogout={handleLogout} />}
      <main className={user && showNav ? "pt-0" : ""}>
        {children}
      </main>
    </div>
  )

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : (
              <AppLayout showNav={false}>
                <LandingPage />
              </AppLayout>
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : (
              <AppLayout showNav={false}>
                <LoginPage onLogin={handleLogin} />
              </AppLayout>
            )
          } 
        />

        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' && user ? (
                  <CoachDashboard user={user} />
                ) : user ? (
                  <SeekerDashboard user={user} />
                ) : null}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' ? (
                  <CoachMessagesPage user={user} />
                ) : (
                  <ChatPage />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jobs" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <JobsPage />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <DocumentsPage />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/clients" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' ? (
                  <CoachClientsPage user={user} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/workspaces" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' ? (
                  <CoachWorkspacesPage user={user} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user?.role === 'coach' ? (
                  <CoachSettingsPage user={user} />
                ) : (
                  <ProfilePage user={user!} />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user && <ProfilePage user={user} />}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client-profile/:clientId" 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user && user.role === 'coach' && (
                  <ClientProfilePage user={user} />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App