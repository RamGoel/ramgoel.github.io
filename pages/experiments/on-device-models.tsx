'use client'

import Link from 'next/link'
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

interface Message {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
}

interface ConversationMessage {
    role: 'system' | 'user' | 'assistant'
    content: string
}

type AppPhase =
    | 'checking'
    | 'unsupported'
    | 'unavailable'
    | 'downloading'
    | 'ready'
    | 'thinking'
    | 'error'

declare global {
    interface Window {
        LanguageModel: {
            create: (options?: {
                initialPrompts?: ConversationMessage[]
                monitor?: (m: {
                    addEventListener: (type: string, listener: (e: { loaded: number }) => void) => void
                }) => void
            }) => Promise<{
                prompt: (message: string) => Promise<string>
            }>
        }
    }
}

const SYSTEM_PROMPT =
    'You are a helpful assistant. Always give very brief, concise responses. Keep answers short - maximum 2-3 sentences. Be direct and to the point.'

const SUGGESTIONS = [
    'What can you do on-device?',
    'Explain transformers in one sentence',
    'Write a short haiku about browsers',
]

function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function OnDeviceModels() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [phase, setPhase] = useState<AppPhase>('checking')
    const [error, setError] = useState<string | null>(null)
    const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const isInitialized = useRef(false)
    const conversationHistory = useRef<ConversationMessage[]>([
        { role: 'system', content: SYSTEM_PROMPT },
    ])

    const canChat = phase === 'ready'
    const isBusy = phase === 'thinking' || phase === 'downloading' || phase === 'checking'

    useEffect(() => {
        if (isInitialized.current || typeof window === 'undefined') return

        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isEdge = /Edg/.test(navigator.userAgent)

        if ('LanguageModel' in window) {
            isInitialized.current = true
            void initializeModel()
            return
        }

        if (!isChrome && !isEdge) {
            setPhase('unsupported')
            setError('This demo needs Chrome Canary (v128+) or Edge Dev with the Prompt API enabled.')
        } else {
            setPhase('unavailable')
            setError('LanguageModel API is not available. Enable the Prompt API flag, then reload.')
        }
    }, [])

    const initializeModel = async () => {
        try {
            setPhase('downloading')
            setError(null)
            setDownloadProgress(0)

            await window.LanguageModel.create({
                monitor(m) {
                    m.addEventListener('downloadprogress', (e) => {
                        const progress = Math.round(e.loaded * 100)
                        setDownloadProgress(progress)
                    })
                },
            })

            setDownloadProgress(null)
            setPhase('ready')
            requestAnimationFrame(() => inputRef.current?.focus())
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error'
            setPhase('error')
            setError(`Failed to initialize: ${message}`)
            setDownloadProgress(null)
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, phase])

    const getAIResponse = async (userMessage: string): Promise<string> => {
        conversationHistory.current.push({ role: 'user', content: userMessage })

        const session = await window.LanguageModel.create({
            initialPrompts: conversationHistory.current,
        })

        const response = await session.prompt(userMessage)
        conversationHistory.current.push({ role: 'assistant', content: response })
        return response
    }

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim()
            if (!trimmed || !canChat) return

            setMessages((prev) => [...prev, { id: uid(), role: 'user', content: trimmed }])
            setInput('')
            setPhase('thinking')
            setError(null)

            if (inputRef.current) {
                inputRef.current.style.height = 'auto'
            }

            try {
                const response = await getAIResponse(trimmed)
                setMessages((prev) => [
                    ...prev,
                    { id: uid(), role: 'assistant', content: response },
                ])
                setPhase('ready')
                requestAnimationFrame(() => inputRef.current?.focus())
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error'
                setError(message)
                setMessages((prev) => [
                    ...prev,
                    {
                        id: uid(),
                        role: 'system',
                        content: 'Something went wrong processing that message. Try again.',
                    },
                ])
                setPhase('ready')
            }
        },
        [canChat]
    )

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        void sendMessage(input)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            void sendMessage(input)
        }
    }

    const handleClear = () => {
        setMessages([])
        setError(null)
        conversationHistory.current = [{ role: 'system', content: SYSTEM_PROMPT }]
        setPhase('ready')
        inputRef.current?.focus()
    }

    const autoResize = () => {
        const el = inputRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`
    }

    const statusLabel = (() => {
        switch (phase) {
            case 'checking':
                return 'Checking browser support…'
            case 'downloading':
                return downloadProgress !== null
                    ? `Downloading model · ${downloadProgress}%`
                    : 'Preparing model…'
            case 'thinking':
                return 'Thinking on-device…'
            case 'ready':
                return 'Ready · runs fully on your device'
            case 'unsupported':
                return 'Unsupported browser'
            case 'unavailable':
                return 'API not available'
            case 'error':
                return 'Setup failed'
            default:
                return ''
        }
    })()

    const statusDot =
        phase === 'ready'
            ? 'bg-emerald-500'
            : phase === 'error' || phase === 'unsupported' || phase === 'unavailable'
              ? 'bg-red-500'
              : 'bg-amber-400 animate-pulse'

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto px-5 lg:px-6">
            {/* Header */}
            <header className="flex-shrink-0 pt-6 pb-4 space-y-4 border-b border-neutral-100">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
                >
                    <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </Link>

                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                        <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
                            On-device chat
                        </h1>
                        <p className="text-sm text-neutral-500">
                            Chrome Prompt API · nothing leaves your machine
                        </p>
                    </div>
                    {messages.length > 0 && (
                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={phase === 'thinking'}
                            className="text-xs text-neutral-400 hover:text-neutral-900 disabled:opacity-40 transition-colors duration-200 shrink-0 pt-1"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                        <span>{statusLabel}</span>
                    </div>

                    {phase === 'downloading' && downloadProgress !== null && (
                        <div
                            className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={downloadProgress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <div
                                className="h-full bg-neutral-900 transition-[width] duration-300 ease-out"
                                style={{ width: `${downloadProgress}%` }}
                            />
                        </div>
                    )}
                </div>

                {error && phase !== 'thinking' && (
                    <div
                        className={`rounded-lg px-3 py-3 text-sm leading-relaxed ${
                            phase === 'unsupported' || phase === 'unavailable'
                                ? 'bg-amber-50 text-amber-900'
                                : 'bg-red-50 text-red-800'
                        }`}
                        role="alert"
                    >
                        <p>{error}</p>
                        {(phase === 'unsupported' || phase === 'unavailable') && (
                            <p className="mt-2 text-xs opacity-80">
                                Use Chrome Canary / Edge Dev, enable the Prompt API, then reload this page.
                            </p>
                        )}
                        {phase === 'error' && (
                            <button
                                type="button"
                                onClick={() => void initializeModel()}
                                className="mt-2 text-xs font-medium underline underline-offset-2 hover:no-underline"
                            >
                                Try again
                            </button>
                        )}
                    </div>
                )}
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-6 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col justify-center gap-8">
                        <div className="space-y-2">
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                Ask anything. Replies stay on this device — useful for private drafts,
                                quick explanations, and offline-friendly experiments.
                            </p>
                        </div>

                        {canChat && (
                            <div className="space-y-3">
                                <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                                    Try asking
                                </p>
                                <ul className="space-y-2">
                                    {SUGGESTIONS.map((suggestion) => (
                                        <li key={suggestion}>
                                            <button
                                                type="button"
                                                onClick={() => void sendMessage(suggestion)}
                                                className="group w-full text-left text-sm text-neutral-900 slide-underline py-1"
                                            >
                                                {suggestion}
                                                <span className="ml-2 text-neutral-300 group-hover:text-neutral-500 transition-colors">
                                                    →
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {!canChat && !error && (
                            <p className="text-sm text-neutral-400">Setting things up…</p>
                        )}
                    </div>
                ) : (
                    <div className="space-y-5">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${
                                    message.role === 'user'
                                        ? 'justify-end'
                                        : message.role === 'system'
                                          ? 'justify-center'
                                          : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[90%] text-sm leading-relaxed whitespace-pre-wrap break-words ${
                                        message.role === 'user'
                                            ? 'bg-neutral-900 text-white px-3.5 py-2.5 rounded-2xl rounded-br-md'
                                            : message.role === 'system'
                                              ? 'text-neutral-500 text-xs text-center max-w-md'
                                              : 'text-neutral-700'
                                    }`}
                                >
                                    {message.role === 'assistant' && (
                                        <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                                            Assistant
                                        </span>
                                    )}
                                    {message.content.trim()}
                                </div>
                            </div>
                        ))}

                        {phase === 'thinking' && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1.5 py-1" aria-live="polite" aria-label="Assistant is typing">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Composer */}
            <form
                onSubmit={handleSubmit}
                className="flex-shrink-0 pb-6 pt-2 border-t border-neutral-100"
            >
                <div className="flex items-end gap-2 rounded-xl border border-neutral-200 bg-white focus-within:border-neutral-400 transition-colors duration-200 p-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                            autoResize()
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={canChat ? 'Message…' : 'Waiting for model…'}
                        disabled={!canChat}
                        rows={1}
                        aria-label="Message"
                        className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed max-h-40 leading-relaxed"
                    />
                    <button
                        type="submit"
                        disabled={!canChat || isBusy || !input.trim()}
                        aria-label="Send message"
                        className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors duration-200 active:scale-[0.97]"
                    >
                        {phase === 'thinking' ? (
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        )}
                    </button>
                </div>
                <p className="mt-2 text-[11px] text-neutral-400">
                    Enter to send · Shift+Enter for a new line
                </p>
            </form>
        </div>
    )
}
