# Resume-Flow 🚀

**AI-Powered Job Applications That Get You Hired Faster**

Transform your resume into tailored applications with advanced AI matching and career coaching support. Build a library of your best work examples, then let AI automatically match them to job requirements and generate perfectly tailored resumes and cover letters in seconds.

![Resume-Flow Logo](public/resume-flow-logo.png)

## ✨ Features

### 🎯 For Job Seekers
- **AI Resume Generation**: Create tailored resumes and cover letters in 30 seconds
- **STAR Method Examples**: Chat with AI to capture work accomplishments in STAR format
- **Smart Job Tracking**: AI fit scoring (Green/Orange/Red) with job status management
- **AI Career Assistant**: Get real-time feedback and suggestions
- **Coach Collaboration**: Matched with experienced career coaches

### 👥 For Career Coaches
- **Client Management**: Manage multiple client relationships and track progress
- **Session Scheduling**: Schedule and manage coaching sessions
- **Document Review**: Review and edit client documents with inline feedback
- **Performance Analytics**: Track client milestones and success metrics
- **Collaborative Workspace**: Shared access to client materials

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Radix UI primitives
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Notifications**: Sonner

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Verridian-ai/Resume-Flow.git
   cd Resume-Flow
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Add the logo file**
   - Copy `resume-flow-logo.png` to the `public/` directory
   - (You'll need to add this file manually as binary files aren't included in the git history)

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Demo Accounts

The application includes pre-configured demo accounts for testing:

### Job Seeker Demo
- **Email**: `applicant@demo.com`
- **Password**: `demo123`
- **Features**: Job tracking, AI chat, document generation, coach collaboration

### Career Coach Demo  
- **Email**: `coach@demo.com`
- **Password**: `demo123`
- **Features**: Client management, session scheduling, document review, analytics

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── Navigation.tsx   # Main navigation component
│   └── JobCard.tsx      # Job listing component
├── pages/               # Page components
│   ├── LandingPage.tsx  # Main landing page
│   ├── LoginPage.tsx    # Authentication page
│   ├── SeekerDashboard.tsx  # Job seeker dashboard
│   ├── CoachDashboard.tsx   # Coach dashboard
│   ├── ChatPage.tsx     # AI chat interface
│   ├── JobsPage.tsx     # Job tracking
│   ├── DocumentsPage.tsx # Document management
│   └── ProfilePage.tsx  # User profile
├── data/                # Mock data for development
│   └── mockData.ts      # Sample jobs, users, examples
├── types/               # TypeScript type definitions
│   └── index.ts         # All application types
├── utils/               # Utility functions
│   └── utils.ts         # Helper functions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and theme
```

## 🎨 Design System

### Color Palette
- **Background**: Deep dark (`#0a0a0a`)
- **Primary**: Gold (`#FFD700`) - Accent and CTA elements
- **Secondary**: Silver (`#C0C0C0`) - Secondary elements  
- **Accent**: Electric Blue (`#00D4FF`) - Interactive elements
- **Cards**: Dark grey (`#1a1a1a`) - Content containers

### Key Features
- **Sophisticated Dark Theme**: Professional, high-tech aesthetic
- **Geometric Background**: Subtle hexagon pattern overlay
- **Glass Morphism**: Backdrop blur effects for modern look
- **Responsive Design**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with proper contrast ratios

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with side-by-side layouts
- **Tablet**: Collapsible navigation with touch-friendly interactions
- **Mobile**: Stacked layouts with swipe-friendly interfaces

## 🎯 Key User Flows

### Job Seeker Journey
1. **Landing Page** → View features and choose demo
2. **Login** → Access with demo account or sign up
3. **Dashboard** → Overview of job search progress
4. **Job Tracking** → Save and apply to jobs with AI fit scoring
5. **AI Chat** → Capture work examples in STAR format
6. **Documents** → Generate tailored resumes and cover letters
7. **Profile** → Manage preferences and track completion

### Career Coach Journey
1. **Login** → Access coach dashboard
2. **Client Management** → View assigned job seekers
3. **Session Scheduling** → Book and manage coaching sessions
4. **Document Review** → Provide feedback on client materials
5. **Progress Tracking** → Monitor client milestones and success

## 🧪 Demo Features

### AI-Powered Matching
- **Semantic Search**: Advanced RAG technology for job-example matching
- **Keyword Filtering**: Automatic keyword extraction and matching
- **Knowledge Graphs**: Relationship mapping between skills and job requirements

### Smart Job Tracking
- **Fit Scoring**: AI-powered job compatibility assessment
- **Status Management**: Track applications through the pipeline
- **Company Research**: Automatic company information and commute calculations

### Gamification
- **Progress Tracking**: Level system with points and achievements
- **Streak Counting**: Daily activity tracking
- **Profile Completion**: Visual progress indicators

## 🚀 Deployment

The application is built as a static site and can be deployed to any static hosting service:

```bash
# Build for production
pnpm build

# The dist/ folder contains all static assets
# Deploy the dist/ folder to your hosting service
```

### Popular Hosting Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Push to gh-pages branch
- **AWS S3**: Upload to S3 bucket with static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software owned by Verridian AI. All rights reserved.

## 🏢 Company

**Verridian AI** - Transforming job search through artificial intelligence

- Website: [verridian.ai](https://verridian.ai)
- Support: support@verridian.ai

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons
- **shadcn/ui** for the component foundation

---

**Built with ❤️ by Verridian AI**

Ready to transform your job search? [Try the live demo](https://lt7q65ly85ay.space.minimax.io) 🚀