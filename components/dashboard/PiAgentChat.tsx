'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, AlertCircle } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

const SUGGESTED_PROMPTS = [
  'Turn the latest field note into a guide',
  'Show me the material registry',
  'Update the ferrocement mix ratio',
  'Generate social post for foam panel',
  'What build systems are field-tested?',
]

export default function PiAgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'agent',
      content: 'Pi Agent is online. I have access to the Infinite Architecture knowledge base — materials registry, build systems, field notes, and beads history. Ask me anything or give me a task.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [agentStatus, setAgentStatus] = useState<'online' | 'offline' | 'stub'>('stub')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/pi-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: data.response ?? 'No response received.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, agentMsg])
    } catch {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: 'Pi Agent is not reachable. Check PI_AGENT_BASE_URL and PI_AGENT_API_KEY in your environment variables.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errMsg])
      setAgentStatus('offline')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="label-text text-ia-blue block mb-2">PI AGENT</span>
          <h1 className="text-2xl font-black text-ia-text">Knowledge Chat</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${agentStatus === 'online' ? 'bg-ia-sage animate-pulse-slow' : agentStatus === 'stub' ? 'bg-ia-gold animate-pulse-slow' : 'bg-ia-rust'}`} />
          <span className={`label-text ${agentStatus === 'online' ? 'text-ia-sage' : agentStatus === 'stub' ? 'text-ia-gold' : 'text-ia-rust'}`}>
            {agentStatus === 'online' ? 'CONNECTED' : agentStatus === 'stub' ? 'STUB MODE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Stub notice */}
      {agentStatus === 'stub' && (
        <div className="flex items-start gap-3 border border-ia-gold bg-ia-gold bg-opacity-5 p-4">
          <AlertCircle size={14} className="text-ia-gold mt-0.5 flex-shrink-0" />
          <p className="text-xs text-ia-secondary">
            Pi Agent is running in stub mode. Set <code className="text-ia-gold">PI_AGENT_BASE_URL</code> and <code className="text-ia-gold">PI_AGENT_API_KEY</code> in your environment to connect the live agent.
          </p>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 dashboard-panel overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-7 h-7 border flex items-center justify-center flex-shrink-0 ${msg.role === 'agent' ? 'border-ia-blue text-ia-blue' : 'border-ia-orange text-ia-orange'}`}>
              {msg.role === 'agent' ? <Bot size={14} /> : <User size={14} />}
            </div>
            {/* Bubble */}
            <div
              className={`max-w-[75%] p-4 text-sm leading-relaxed ${
                msg.role === 'agent'
                  ? 'bg-bg-elevated border border-ia-border text-ia-secondary'
                  : 'bg-ia-orange text-bg-base font-medium'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 border border-ia-blue text-ia-blue flex items-center justify-center">
              <Bot size={14} />
            </div>
            <div className="bg-bg-elevated border border-ia-border p-4 flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-ia-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-ia-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-ia-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            disabled={loading}
            className="label-text text-ia-muted border border-ia-border px-3 py-1.5 hover:border-ia-blue hover:text-ia-blue transition-colors text-xs disabled:opacity-40"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Ask Pi Agent anything about Infinite Architecture..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          disabled={loading}
          className="flex-1 bg-bg-surface border border-ia-border px-4 py-3 text-sm text-ia-text placeholder:text-ia-muted focus:outline-none focus:border-ia-blue transition-colors font-mono disabled:opacity-40"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="bg-ia-blue text-bg-base px-5 py-3 hover:bg-ia-text transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  )
}
