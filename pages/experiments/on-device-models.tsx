'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
}

interface ConversationMessage {
    role: 'system' | 'user' | 'assistant'
    content: string
}

declare global {
    interface Window {
        LanguageModel: {
            create: (options?: {
                initialPrompts?: ConversationMessage[]
                monitor?: (m: any) => void
            }) => Promise<{
                prompt: (message: string) => Promise<string>
            }>
        }
    }
}

export default function OnDeviceModels() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isApiAvailable, setIsApiAvailable] = useState(false)
    const [status, setStatus] = useState('Initializing...')
    const [error, setError] = useState<string | null>(null)
    const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isInitialized = useRef(false)
    const conversationHistory = useRef<ConversationMessage[]>([
        { role: 'system', content: 'You are a helpful assistant. Always give very brief, concise responses. Keep answers short - maximum 2-3 sentences. Be direct and to the point.' },
    ])

    useEffect(() => {
        // Prevent double initialization in React Strict Mode
        if (isInitialized.current) return
        
        if (typeof window === 'undefined') return
        
        // Detect browser
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isEdge = /Edg/.test(navigator.userAgent)
        const isChromiumBased = isChrome || isEdge
        
        // Check if LanguageModel API is available
        if ('LanguageModel' in window) {
            setIsApiAvailable(true)
            isInitialized.current = true
            initializeChatSession()
        } else {
            // Show browser-specific error
            if (!isChromiumBased) {
                setError('This feature only works on Chrome or Edge browsers. Please open this page in Chrome Canary (v128+) or Edge Dev.')
                setStatus('Unsupported browser')
            } else {
                setError('LanguageModel API is not available. Please use Chrome Canary (v128+) or Edge Dev with the API enabled.')
                setStatus('API not available')
            }
        }
    }, [])

    const initializeChatSession = async () => {
        try {
            setStatus('Initializing AI model...')
            setError(null)

            const session = await window.LanguageModel.create({
                monitor(m: any) {
                    m.addEventListener('downloadprogress', (e: any) => {
                        const progress = Math.round(e.loaded * 100)
                        setDownloadProgress(progress)
                        setStatus(`Downloading model: ${progress}%`)
                        console.log(`Downloaded ${progress}%`)
                    })
                },
            })

            setStatus('Ready to chat!')
            setDownloadProgress(null)
        } catch (err: any) {
            console.error('Error initializing chat:', err)
            setStatus('Error initializing model')
            setError(`Failed to initialize: ${err.message}`)
            addSystemMessage('Failed to initialize chat. Please refresh the page.')
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const addSystemMessage = (content: string) => {
        const systemMessage: Message = {
            role: 'system',
            content,
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, systemMessage])
    }

    const getAIResponse = async (userMessage: string): Promise<string> => {
        try {
            // Add user message to history
            conversationHistory.current.push({ role: 'user', content: userMessage })

            // Create new session with conversation history
            const session = await window.LanguageModel.create({
                initialPrompts: conversationHistory.current,
            })

            // Get response
            const response = await session.prompt(userMessage)

            // Add assistant response to history
            conversationHistory.current.push({ role: 'assistant', content: response })

            return response
        } catch (error: any) {
            console.error('Error getting AI response:', error)
            throw error
        }
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading || !isApiAvailable) return

        const userMessage: Message = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        const messageText = input.trim()
        setInput('')
        setIsLoading(true)
        setError(null)
        setStatus('Processing...')

        try {
            // Get AI response
            const response = await getAIResponse(messageText)

            const assistantMessage: Message = {
                role: 'assistant',
                content: response,
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
            setStatus('Ready to chat!')
        } catch (err: any) {
            setError(`Error: ${err.message}`)
            setStatus('Error processing message')
            addSystemMessage('Sorry, there was an error processing your message.')
            console.error('Error sending message:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClear = () => {
        setMessages([])
        setError(null)
        conversationHistory.current = [
            { role: 'system', content: 'You are a helpful assistant. Always give very brief, concise responses. Keep answers short - maximum 2-3 sentences. Be direct and to the point.' },
        ]
        setStatus('Ready to chat!')
        // Don't re-initialize, just clear messages
    }

    return (
        <div className="flex flex-col h-[calc(100vh-5rem)] min-w-[800px] max-w-5xl mx-auto">
            {/* Header - Fixed height to prevent layout shift */}
            <div className="flex-shrink-0 mb-6 pb-6 border-b border-zinc-800">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            On-Device AI Chatbot
                        </h1>
                        <p className="text-zinc-500 text-sm">
                            Powered by LanguageModel API
                        </p>
                    </div>
                    {messages.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-300 rounded-lg transition-all duration-200 border border-zinc-700 hover:border-zinc-600"
                        >
                            Clear Chat
                        </button>
                    )}
                </div>
                
                {/* Status bar - Fixed height */}
                <div className="h-6 flex items-center">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                            status === 'Ready to chat!' 
                                ? 'bg-green-500 animate-pulse' 
                                : status.includes('Error') 
                                    ? 'bg-red-500' 
                                    : 'bg-yellow-500 animate-pulse'
                        }`} />
                        <span className="text-xs text-zinc-400">
                            {status}
                            {downloadProgress !== null && (
                                <span className="ml-2 text-zinc-500">
                                    <span className="inline-block w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden align-middle ml-2">
                                        <span 
                                            className="block h-full bg-blue-500 transition-all duration-300"
                                            style={{ width: `${downloadProgress}%` }}
                                        />
                                    </span>
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                
                {/* Error/Warning messages - Fixed height container */}
                <div className="min-h-0 mt-3">
                    {error && (
                        <div className={`p-4 rounded-lg backdrop-blur-sm ${
                            status === 'Unsupported browser' 
                                ? 'bg-orange-500/10 border border-orange-500/20' 
                                : 'bg-red-500/10 border border-red-500/20'
                        }`}>
                            <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 ${
                                    status === 'Unsupported browser' ? 'text-orange-400' : 'text-red-400'
                                }`}>
                                    {status === 'Unsupported browser' ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs leading-relaxed ${
                                        status === 'Unsupported browser' ? 'text-orange-300' : 'text-red-300'
                                    }`}>
                                        {error}
                                    </p>
                                    {status === 'Unsupported browser' && (
                                        <div className="mt-2 pt-2 border-t border-orange-500/20">
                                            <p className="text-xs text-orange-400/70">
                                                <strong>Required:</strong> Chrome Canary or Edge Dev browser
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto mb-6 px-2 -mx-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-center max-w-md">
                            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
                                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-zinc-300 mb-2">Start a conversation</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Ask me anything and I&apos;ll respond using on-device AI. 
                                All processing happens locally on your device.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.role === 'user'
                                        ? 'justify-end'
                                        : message.role === 'system'
                                          ? 'justify-center'
                                          : 'justify-start'
                                } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                            >
                                <div
                                    className={`max-w-[85%] lg:max-w-[75%] rounded-2xl px-4 py-3 ${
                                        message.role === 'user'
                                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/20'
                                            : message.role === 'system'
                                              ? 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 text-sm italic backdrop-blur-sm'
                                              : 'bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 shadow-lg backdrop-blur-sm'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                        {message.content?.trim()}
                                    </p>
                                    {message.role !== 'system' && (
                                        <p
                                            className={`text-[10px] mt-2 ${
                                                message.role === 'user' ? 'text-blue-200/70' : 'text-zinc-500'
                                            }`}
                                        >
                                            {message.timestamp.toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl px-4 py-3 backdrop-blur-sm">
                                    <div className="flex space-x-1.5">
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex-shrink-0 flex gap-3 items-end p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isApiAvailable ? "Type your message..." : "API not available"}
                        disabled={!isApiAvailable || isLoading}
                        className="w-full px-4 py-3.5 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!isApiAvailable || isLoading || !input.trim()}
                    className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-zinc-800 disabled:to-zinc-800 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 disabled:shadow-none flex items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="hidden sm:inline">Sending</span>
                        </>
                    ) : (
                        <>
                            <span>Send</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}
