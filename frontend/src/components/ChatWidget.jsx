import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { getApiBaseUrl } from '../utils/api'
import { useTheme } from '../context/ThemeContext'
import {
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Bot,
  User,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react'

const SUGGESTED_QUESTIONS = [
  'What projects has Anuj built?',
  'Is he available for freelance?',
  "What are Anuj's skills in Agentic AI?",
  'Tell me about his experience at Arcgate.',
  'How can I contact Anuj?',
]

export default function ChatWidget({ apiBaseUrl }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I am **Ask Anuj**, an AI assistant trained on Anuj Pathak's background, skills, and projects.\n\nAsk me about his experience in **Agentic AI (LangGraph, MCP)**, **Enterprise RAG systems**, or his **freelance availability**!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { accentHex, effectiveMode } = useTheme()
  const isLightMode = effectiveMode === 'light'
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const resolvedBaseUrl = (apiBaseUrl || getApiBaseUrl()).replace(/\/+$/, '')

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, isOpen, isMinimized])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [isOpen, isMinimized])

  const handleSend = async (messageText) => {
    const textToSend = (messageText || input).trim()
    if (!textToSend || loading) return

    if (textToSend.length > 500) {
      setErrorMsg('Message exceeds 500 character limit.')
      return
    }

    setErrorMsg('')
    const userMsgId = 'user-' + Date.now()
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]

    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${resolvedBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      })

      if (res.status === 429) {
        throw new Error('Rate limit exceeded (max 10 queries/min). Please wait a moment before asking again.')
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Server responded with status ${res.status}`)
      }

      const data = await res.json()
      const botReply = data.reply || "I didn't receive a response. Please try again."

      setMessages((prev) => [
        ...prev,
        {
          id: 'assistant-' + Date.now(),
          role: 'assistant',
          content: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (err) {
      console.error('[ChatWidget] Error sending message:', err)
      const errorResponse =
        err.message ||
        'Could not connect to the AI assistant. Please check your network connection or try again later.'

      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'assistant',
          content: errorResponse,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Conversation cleared! Feel free to ask another question about Anuj's skills, experience, or projects.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setErrorMsg('')
  }

  const handleCopyText = (id, text) => {
    navigator.clipboard?.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.35 }}
          className="fixed bottom-6 right-22 sm:right-24 z-40 select-none"
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Ask Anuj AI Chat Widget"
            className="group relative px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-card), 0 0 24px -6px var(--accent-glow)',
            }}
          >
            {/* Pulsing AI Indicator */}
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm"
              style={{ backgroundImage: 'var(--accent-gradient)' }}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </span>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-theme-primary group-hover:text-accent transition flex items-center gap-1.5">
                <span>Ask Anuj AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span className="text-[10px] font-mono text-theme-muted hidden sm:inline">
                RAG Portfolio Assistant
              </span>
            </div>
          </button>
        </motion.div>
      )}

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className={`fixed z-50 shadow-2xl rounded-3xl border border-theme overflow-hidden flex flex-col transition-all duration-300 ${
              isMinimized
                ? 'bottom-6 right-6 w-80 h-16'
                : 'bottom-4 sm:bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] md:w-[430px] h-[540px] sm:h-[600px] max-h-[86vh]'
            }`}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              boxShadow: `0 20px 45px -10px rgba(0,0,0,0.3), 0 0 30px -5px var(--accent-glow)`,
            }}
          >
            {/* Header Bar */}
            <div
              className="px-4 py-3 border-b border-theme flex items-center justify-between select-none shrink-0"
              style={{
                backgroundColor: 'var(--bg-card-solid)',
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md"
                  style={{ backgroundImage: 'var(--accent-gradient)' }}
                >
                  <Bot className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs sm:text-sm text-theme-primary truncate">
                      Ask Anuj AI
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      RAG
                    </span>
                  </div>
                  <p className="text-[10px] text-theme-muted font-mono truncate">
                    Trained on portfolio &amp; projects
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 text-theme-muted">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg hover:text-theme-primary hover:bg-theme-card transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMinimized((prev) => !prev)}
                  title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                  className="p-1.5 rounded-lg hover:text-theme-primary hover:bg-theme-card transition cursor-pointer"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg hover:text-theme-primary hover:bg-theme-card transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Chat Body (When not minimized) */}
            {!isMinimized && (
              <>
                {/* Scrollable Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-[13px] leading-relaxed">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user'
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {/* Bot Avatar */}
                        {!isUser && (
                          <div
                            className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white text-[11px]"
                            style={{ backgroundImage: 'var(--accent-gradient)' }}
                          >
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm relative group ${
                            isUser
                              ? 'text-white rounded-br-xs'
                              : msg.isError
                              ? 'border border-rose-500/40 bg-rose-500/10 text-rose-300 rounded-bl-xs'
                              : 'border border-theme bg-theme-nav-inner/90 text-theme-primary rounded-bl-xs'
                          }`}
                          style={{
                            backgroundImage: isUser ? 'var(--accent-gradient)' : 'none',
                          }}
                        >
                          {/* Markdown formatted content */}
                          <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none break-words">
                            <ReactMarkdown
                              components={{
                                a: ({ node, ...props }) => (
                                  <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-semibold text-accent hover:opacity-80"
                                  />
                                ),
                                ul: ({ node, ...props }) => (
                                  <ul {...props} className="my-1.5 pl-4 list-disc space-y-1" />
                                ),
                                ol: ({ node, ...props }) => (
                                  <ol {...props} className="my-1.5 pl-4 list-decimal space-y-1" />
                                ),
                                p: ({ node, ...props }) => <p {...props} className="my-1" />,
                                strong: ({ node, ...props }) => (
                                  <strong {...props} className="font-bold text-inherit" />
                                ),
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>

                          {/* Message Footer: Timestamp & Copy Button */}
                          <div
                            className={`flex items-center justify-end gap-1.5 mt-1 text-[10px] ${
                              isUser ? 'text-white/70' : 'text-theme-muted'
                            }`}
                          >
                            <span>{msg.timestamp}</span>
                            {!isUser && (
                              <button
                                type="button"
                                onClick={() => handleCopyText(msg.id, msg.content)}
                                className="opacity-0 group-hover:opacity-100 transition p-0.5 rounded hover:text-theme-primary cursor-pointer"
                                title="Copy answer"
                              >
                                {copiedId === msg.id ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Loading Typing Indicator */}
                  {loading && (
                    <div className="flex gap-2.5 justify-start">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm"
                        style={{ backgroundImage: 'var(--accent-gradient)' }}
                      >
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="border border-theme bg-theme-nav-inner/90 px-4 py-3 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-accent animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[11px] font-mono text-theme-muted ml-2">
                          Retrieving context...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions Pills */}
                <div className="px-3 py-2 border-t border-theme/60 bg-theme-card-hover/40 overflow-x-auto select-none no-scrollbar">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[10px] font-mono text-theme-muted uppercase font-semibold shrink-0">
                      Suggested:
                    </span>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleSend(q)}
                        disabled={loading}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-theme bg-theme-card hover:border-accent hover:text-accent text-theme-secondary transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Bar & Error Notification */}
                <div className="p-3 border-t border-theme bg-theme-card-solid">
                  {errorMsg && (
                    <div className="mb-2 p-2 rounded-xl text-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{errorMsg}</span>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="relative flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        maxLength={500}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about Anuj's skills, projects, or freelance..."
                        className="w-full pl-3.5 pr-14 py-2.5 rounded-2xl border border-theme bg-theme-nav-inner text-xs sm:text-sm text-theme-primary placeholder-theme-muted focus:outline-none focus:border-accent transition shadow-inner"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-theme-muted pointer-events-none">
                        {input.length}/500
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!input.trim() || loading}
                      aria-label="Send message"
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      style={{ backgroundImage: 'var(--accent-gradient)' }}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Micro Footer Disclaimer */}
                  <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-theme-muted">
                    <span>Ask Anuj AI &bull; LangChain + FAISS RAG</span>
                    <span>Max 500 chars &bull; 10 req/min</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
