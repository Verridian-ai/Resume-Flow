import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { User as UserType } from './types'
import { Navigation } from './components/Navigation'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SeekerDashboard } from './pages/SeekerDashboard'
import { CoachDashboard } from './pages/CoachDashboard'
import { ChatPage } from './pages/ChatPage'
import { JobsPage } from './pages/JobsPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (userData: UserType) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated || !user) {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  // Main app layout with navigation
  const AppLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-background">
      {user && <Navigation user={user} onLogout={handleLogout} />}
      <main className={user ? "pt-0" : ""}>
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
            <AppLayout>
              <LandingPage />
            </AppLayout>
          } 
        />
        <Route 
          path="/login" 
          element={
            <AppLayout>
              <LoginPage onLogin={handleLogin} />
            </AppLayout>
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
                <ChatPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jobs" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <JobsPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <DocumentsPage />
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

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App