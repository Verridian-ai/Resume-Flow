import { User, Job, Example, Message, DashboardStats, Notification, CoachAssignment, Activity, FitScore, JobStatus } from '@/types'

// Demo Users
export const demoUsers: Record<string, User> = {
  seeker: {
    id: '1',
    name: 'Alex Rivera',
    email: 'applicant@demo.com',
    role: 'seeker',
    location: 'San Francisco, CA',
    goal: 'Senior Backend Engineer at a growth-stage startup',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    phone: '+1 (415) 555-0123',
    memberSince: new Date('2024-01-15'),
    profile: {
      bio: 'Passionate software engineer with a focus on building scalable backend systems and mentoring emerging talent. I thrive in collaborative environments where innovation meets practical problem-solving.',
      careerObjectives: 'Seeking a Senior Backend Engineering role at a growth-stage startup where I can leverage my expertise in distributed systems and team leadership to drive technical excellence and business impact.',
      personalInterests: ['Open Source Contributions', 'Technical Writing', 'Mentorship', 'Rock Climbing', 'Photography'],
      workPreferences: {
        remoteWork: true,
        hybridWork: true,
        onSite: false,
        willingToRelocate: false
      }
    }
  },
  coach: {
    id: '2',
    name: 'Sarah Chen',
    email: 'coach@demo.com',
    role: 'coach',
    location: 'Austin, TX',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    phone: '+1 (512) 555-0456',
    memberSince: new Date('2023-08-20'),
    profile: {
      bio: 'Experienced career coach with 10+ years in tech recruitment and career development. Specializing in helping engineers transition to leadership roles and advance their careers.',
      personalInterests: ['Professional Development', 'Mentoring', 'Leadership Training', 'Hiking', 'Coffee']
    }
  }
}

// Mock Jobs Data
export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Senior Backend Engineer',
    company: 'TechFlow Inc',
    location: 'San Francisco, CA (Remote)',
    salary: '$140K - $180K',
    type: 'Full-time',
    description: 'We are looking for a Senior Backend Engineer to join our growing engineering team. You will be responsible for designing and implementing scalable microservices architecture, optimizing database performance, and mentoring junior developers.',
    requirements: ['5+ years of backend development experience', 'Expert knowledge of Node.js, Python, or Go', 'Experience with microservices architecture', 'Strong knowledge of databases (PostgreSQL, MongoDB)', 'Experience with cloud platforms (AWS, GCP, Azure)'],
    fitScore: 'green',
    status: 'applied',
    appliedDate: new Date('2024-11-01'),
    lastUpdated: new Date('2024-11-05'),
    link: 'https://techflow.com/careers/backend-senior',
    commuteTime: 0,
    companySize: '201-500',
    remote: true,
    keywords: ['Node.js', 'Microservices', 'PostgreSQL', 'AWS', 'Team Leadership']
  },
  {
    id: '2',
    title: 'Principal Software Engineer',
    company: 'ScaleTech',
    location: 'Palo Alto, CA',
    salary: '$180K - $220K',
    type: 'Full-time',
    description: 'Join our principal engineering team to architect next-generation distributed systems. You will work closely with product and design teams to define technical strategy and lead major initiatives.',
    requirements: ['8+ years of software engineering experience', 'Expert in distributed systems design', 'Experience leading large-scale projects', 'Strong background in system design', 'Experience with high-traffic applications'],
    fitScore: 'green',
    status: 'saved',
    lastUpdated: new Date('2024-11-04'),
    link: 'https://scaletech.com/careers/principal-engineer',
    commuteTime: 45,
    companySize: '1000+',
    remote: false,
    keywords: ['Distributed Systems', 'System Design', 'Leadership', 'Scalability', 'Architecture']
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'StartupXYZ',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$120K - $150K',
    type: 'Full-time',
    description: 'Exciting opportunity to build the backend infrastructure for our AI-powered platform. Work with modern technologies and have significant impact on product development.',
    requirements: ['3+ years of backend development', 'Experience with Python or Node.js', 'Knowledge of RESTful APIs', 'Experience with Docker and Kubernetes', 'Understanding of CI/CD pipelines'],
    fitScore: 'orange',
    status: 'interview',
    appliedDate: new Date('2024-10-28'),
    lastUpdated: new Date('2024-11-02'),
    link: 'https://startupxyz.com/jobs/backend-dev',
    commuteTime: 30,
    companySize: '51-200',
    remote: false,
    keywords: ['Python', 'Node.js', 'Docker', 'Kubernetes', 'AI/ML']
  },
  {
    id: '4',
    title: 'Senior Software Engineer',
    company: 'MegaCorp',
    location: 'New York, NY',
    salary: '$130K - $160K',
    type: 'Full-time',
    description: 'Traditional enterprise software company looking for senior engineers to modernize their technology stack and build next-generation applications.',
    requirements: ['5+ years of Java or .NET development', 'Experience with enterprise systems', 'Knowledge of database design', 'Understanding of software architecture patterns', 'Experience with agile development'],
    fitScore: 'red',
    status: 'rejected',
    appliedDate: new Date('2024-10-15'),
    lastUpdated: new Date('2024-10-20'),
    link: 'https://megacorp.com/careers/senior-engineer',
    commuteTime: 0,
    companySize: '10000+',
    remote: true,
    keywords: ['Java', 'Enterprise', 'Agile', 'Database Design']
  },
  {
    id: '5',
    title: 'Lead Backend Engineer',
    company: 'InnovateCo',
    location: 'Seattle, WA',
    salary: '$160K - $200K',
    type: 'Full-time',
    description: 'Lead a team of backend engineers to build scalable APIs and services. Own the technical vision for backend architecture and mentor team members.',
    requirements: ['6+ years of backend experience', 'Team leadership experience', 'Expert knowledge of backend technologies', 'Experience with system design and architecture', 'Strong communication and mentoring skills'],
    fitScore: 'green',
    status: 'offer',
    appliedDate: new Date('2024-10-20'),
    lastUpdated: new Date('2024-11-03'),
    link: 'https://innovate.co/careers/lead-backend',
    commuteTime: 0,
    companySize: '201-500',
    remote: true,
    keywords: ['Leadership', 'System Architecture', 'Mentoring', 'API Design', 'Team Building']
  }
]

// Mock Examples Data
export const examplesData: Example[] = [
  {
    id: '1',
    title: 'Led Migration to Microservices Architecture',
    situation: 'Our monolithic e-commerce platform was experiencing performance issues as we scaled to millions of users. The codebase had become difficult to maintain and deploy.',
    task: 'As the lead backend engineer, I needed to architect a migration strategy to microservices that would improve scalability, maintainability, and deployment velocity while minimizing business disruption.',
    action: 'I designed a comprehensive migration plan, led a team of 4 engineers, and implemented a strangler fig pattern. I created service boundaries based on domain-driven design, implemented API gateways, and established monitoring and observability across all services. I also created detailed documentation and training materials for the team.',
    result: 'Reduced deployment time by 80%, improved system uptime to 99.9%, and enabled the team to deploy independently. The migration was completed 3 months ahead of schedule and saved the company $200K in infrastructure costs annually.',
    createdAt: new Date('2024-10-15'),
    tags: ['Leadership', 'Architecture', 'Microservices', 'Team Management'],
    relevance: 95,
    story: 'This was a transformative project that showcased my ability to lead complex technical initiatives and drive business value through engineering excellence.'
  },
  {
    id: '2',
    title: 'Optimized Database Performance for High-Traffic Application',
    situation: 'Our social media platform was experiencing slow query performance during peak hours, affecting user experience and causing customer complaints.',
    task: 'I was tasked with identifying and resolving the performance bottlenecks to ensure smooth user experience during high-traffic periods.',
    action: 'I conducted thorough performance profiling, identified inefficient queries and missing indexes, implemented query optimization strategies, and added database caching. I also worked with DevOps to optimize database infrastructure and implemented connection pooling.',
    result: 'Reduced average query response time from 2.5 seconds to 200ms, handled 3x more concurrent users, and improved customer satisfaction scores by 25%.',
    createdAt: new Date('2024-09-20'),
    tags: ['Database Optimization', 'Performance', 'Problem Solving'],
    relevance: 88,
    story: 'This project demonstrated my ability to quickly diagnose complex performance issues and implement effective solutions under pressure.'
  },
  {
    id: '3',
    title: 'Mentored Junior Developer to Senior Level',
    situation: 'We hired a junior developer who was struggling with complex backend concepts and was not meeting performance expectations.',
    task: 'As part of my leadership responsibilities, I needed to mentor this developer to help them succeed and grow their skills.',
    action: 'I created a personalized development plan, scheduled regular 1-on-1 mentoring sessions, provided code review feedback, assigned progressively challenging projects, and connected them with learning resources. I also involved them in architecture discussions to broaden their perspective.',
    result: 'The developer was promoted to mid-level after 8 months and to senior level within 2 years. They now lead their own projects and mentor other team members.',
    createdAt: new Date('2024-08-10'),
    tags: ['Mentoring', 'Leadership', 'Team Development', 'Career Growth'],
    relevance: 92,
    story: 'This experience reinforced my passion for developing talent and creating a positive, growth-oriented team culture.'
  }
]

// Mock Conversation History
export const conversationHistory: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi! I\'m your AI career coach. I\'m here to help you capture your work accomplishments in STAR format. Let\'s start with something you\'re proud of from your recent work experience.',
    timestamp: new Date('2024-11-07T09:00:00')
  },
  {
    id: '2',
    role: 'user',
    content: 'I recently led a project to migrate our e-commerce platform from a monolithic architecture to microservices. It was a complex undertaking that took about 6 months.',
    timestamp: new Date('2024-11-07T09:01:30')
  },
  {
    id: '3',
    role: 'assistant',
    content: 'That sounds like an impressive project! Migration to microservices is a significant technical undertaking. What was the driving force behind this migration? What problems were you trying to solve?',
    timestamp: new Date('2024-11-07T09:02:15')
  },
  {
    id: '4',
    role: 'user',
    content: 'We were experiencing major scalability issues. The monolithic codebase was becoming too large to manage effectively, deployment was taking hours, and the system was becoming a bottleneck for our growth. Users were experiencing slow load times during peak hours.',
    timestamp: new Date('2024-11-07T09:03:45')
  }
]

// Mock Dashboard Stats
export const dashboardStats: DashboardStats = {
  level: 12,
  currentStreak: 7,
  totalPoints: 2840,
  examplesCreated: 23,
  jobsApplied: 8,
  interviewsScheduled: 3,
  profileCompletion: 85
}

// Mock Notifications
export const notificationsData: Notification[] = [
  {
    id: '1',
    title: 'New Job Match Found!',
    message: 'We found 3 new jobs that match your profile perfectly. Check them out in your dashboard.',
    type: 'success',
    read: false,
    createdAt: new Date('2024-11-07T08:30:00'),
    actionUrl: '/jobs'
  },
  {
    id: '2',
    title: 'Interview Reminder',
    message: 'You have an interview with TechFlow Inc tomorrow at 2:00 PM. Good luck!',
    type: 'info',
    read: false,
    createdAt: new Date('2024-11-06T15:20:00'),
    actionUrl: '/jobs'
  },
  {
    id: '3',
    title: 'Document Generated',
    message: 'Your tailored cover letter for ScaleTech is ready for review.',
    type: 'success',
    read: true,
    createdAt: new Date('2024-11-06T10:15:00'),
    actionUrl: '/documents'
  }
]

// Mock Coach Assignments
export const coachAssignments: CoachAssignment[] = [
  {
    id: '1',
    seekerId: '1',
    seekerName: 'Alex Rivera',
    seekerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    status: 'active',
    assignedDate: new Date('2024-10-01'),
    lastContact: new Date('2024-11-05'),
    nextSession: new Date('2024-11-10'),
    notes: 'Alex is making excellent progress on his job search. He has a strong technical background and is well-prepared for interviews.'
  },
  {
    id: '2',
    seekerId: '3',
    seekerName: 'Jamie Kim',
    seekerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie',
    status: 'active',
    assignedDate: new Date('2024-09-15'),
    lastContact: new Date('2024-11-03'),
    nextSession: new Date('2024-11-12'),
    notes: 'Focusing on improving resume storytelling and interview preparation. Strong technical skills but needs help with communication.'
  },
  {
    id: '3',
    seekerId: '4',
    seekerName: 'Morgan Taylor',
    seekerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    status: 'active',
    assignedDate: new Date('2024-08-20'),
    lastContact: new Date('2024-11-01'),
    nextSession: new Date('2024-11-08'),
    notes: 'Career changer transitioning from finance to tech. Making good progress on building technical foundation.'
  }
]

// Mock Activity Feed
export const activityData: Activity[] = [
  {
    id: '1',
    type: 'example_created',
    title: 'New Example Created',
    description: 'Added "Led Migration to Microservices Architecture" to your story bank',
    timestamp: new Date('2024-11-06T14:30:00'),
    userId: '1'
  },
  {
    id: '2',
    type: 'job_applied',
    title: 'Job Application Submitted',
    description: 'Applied to Senior Backend Engineer at TechFlow Inc',
    timestamp: new Date('2024-11-01T11:15:00'),
    userId: '1'
  },
  {
    id: '3',
    type: 'document_generated',
    title: 'Cover Letter Generated',
    description: 'AI generated tailored cover letter for ScaleTech position',
    timestamp: new Date('2024-10-30T16:45:00'),
    userId: '1'
  },
  {
    id: '4',
    type: 'session_scheduled',
    title: 'Coaching Session Scheduled',
    description: 'Next session with Sarah Chen scheduled for November 10th',
    timestamp: new Date('2024-10-28T09:20:00'),
    userId: '1'
  }
]

// Utility functions to get filtered data
export const getJobsByStatus = (status: JobStatus) => jobsData.filter(job => job.status === status)
export const getJobsByFitScore = (score: FitScore) => jobsData.filter(job => job.fitScore === score)
export const getGreenJobs = () => jobsData.filter(job => job.fitScore === 'green')
export const getOrangeJobs = () => jobsData.filter(job => job.fitScore === 'orange')
export const getRedJobs = () => jobsData.filter(job => job.fitScore === 'red')
export const getRecentActivity = (days: number = 7) => {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return activityData.filter(activity => activity.timestamp >= cutoff)
}