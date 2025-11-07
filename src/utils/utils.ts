import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getFitScoreColor(score: 'green' | 'orange' | 'red'): string {
  switch (score) {
    case 'green': return 'text-green-400'
    case 'orange': return 'text-yellow-400'
    case 'red': return 'text-red-400'
    default: return 'text-gray-400'
  }
}

export function getFitScoreBg(score: 'green' | 'orange' | 'red'): string {
  switch (score) {
    case 'green': return 'bg-green-500/10 border-green-500/20'
    case 'orange': return 'bg-yellow-500/10 border-yellow-500/20'
    case 'red': return 'bg-red-500/10 border-red-500/20'
    default: return 'bg-gray-500/10 border-gray-500/20'
  }
}