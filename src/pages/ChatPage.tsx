import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Send, Sparkles, Target, CheckCircle2, Plus, Star } from 'lucide-react'
import { Message } from '@/types'
import { conversationHistory } from '@/data/mockData'

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(conversationHistory)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages([...messages, newMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great example! Now, what was the specific impact or result of this action?",
        "Excellent! Could you tell me more about the challenges you faced while implementing this?",
        "That sounds impressive! What skills did you use or develop during this experience?",
        "Perfect! How did this accomplishment align with your team's or company's goals?",
        "That's a fantastic story! What feedback did you receive from stakeholders?"
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const examplePrompts = [
    "Tell me about a time you led a project",
    "Describe a challenge you overcame",
    "Share an example of innovation",
    "Talk about teamwork experience"
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Breadcrumb items={[{ label: 'AI Chat' }]} />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">AI Career Coach</h1>
          </div>
          <p className="text-muted-foreground">
            Let me help you capture your work accomplishments in STAR format
          </p>
        </div>
      </div>

      {/* Example Progress */}
      <div className="border-b border-border bg-muted/30 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Today's Goal: Add 1 example</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                5 examples this month
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>23 total examples</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    <span>AI Assistant</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Let's capture your achievements</h3>
              <p className="text-muted-foreground mb-6">
                Start by telling me about a recent work accomplishment or project you're proud of.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {examplePrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(prompt)}
                    className="text-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about a recent accomplishment or project..."
              className="resize-none"
              rows={3}
            />
            <Button 
              onClick={handleSend}
              disabled={!input.trim()}
              variant="primary"
              size="lg"
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>AI-powered conversation • Always learning</span>
          </div>
        </div>
      </div>
    </div>
  )
}