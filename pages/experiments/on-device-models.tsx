'use client'

import { PageMeta } from '@/components/PageMeta'
import { ChatMessage, ChatPhase, useOnDeviceChat } from '@/hooks/useOnDeviceChat'
import Link from 'next/link'
import { FormEvent, KeyboardEvent, RefObject } from 'react'

function BackLink() {
    return (
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
    )
}

function ChatHeader({
    hasMessages,
    phase,
    onClear,
}: {
    hasMessages: boolean
    phase: ChatPhase
    onClear: () => void
}) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
                <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
                    On-device chat
                </h1>
                <p className="text-sm text-neutral-500">
                    Chrome Prompt API · nothing leaves your machine
                </p>
            </div>
            {hasMessages && (
                <button
                    type="button"
                    onClick={onClear}
                    disabled={phase === 'thinking'}
                    className="text-xs text-neutral-400 hover:text-neutral-900 disabled:opacity-40 transition-colors duration-200 shrink-0 pt-1"
                >
                    Clear
                </button>
            )}
        </div>
    )
}

function StatusBar({
    phase,
    statusLabel,
    downloadProgress,
}: {
    phase: ChatPhase
    statusLabel: string
    downloadProgress: number | null
}) {
    const statusDot =
        phase === 'ready'
            ? 'bg-emerald-500'
            : phase === 'error' || phase === 'unsupported' || phase === 'unavailable'
              ? 'bg-red-500'
              : 'bg-amber-400 animate-pulse'

    return (
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
    )
}

function ErrorBanner({
    error,
    phase,
    onRetry,
}: {
    error: string
    phase: ChatPhase
    onRetry: () => void
}) {
    if (phase === 'thinking') return null

    return (
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
                    onClick={onRetry}
                    className="mt-2 text-xs font-medium underline underline-offset-2 hover:no-underline"
                >
                    Try again
                </button>
            )}
        </div>
    )
}

function EmptyState({
    canChat,
    error,
    suggestions,
    onSuggestion,
}: {
    canChat: boolean
    error: string | null
    suggestions: string[]
    onSuggestion: (text: string) => void
}) {
    return (
        <div className="h-full flex flex-col justify-center gap-8">
            <p className="text-sm text-neutral-600 leading-relaxed">
                Ask anything. Replies stay on this device — useful for private drafts, quick
                explanations, and offline-friendly experiments.
            </p>

            {canChat && (
                <div className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Try asking
                    </p>
                    <ul className="space-y-2">
                        {suggestions.map((suggestion) => (
                            <li key={suggestion}>
                                <button
                                    type="button"
                                    onClick={() => onSuggestion(suggestion)}
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
    )
}

function MessageBubble({ message }: { message: ChatMessage }) {
    return (
        <div
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
    )
}

function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div
                className="flex items-center gap-1.5 py-1"
                aria-live="polite"
                aria-label="Assistant is typing"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    )
}

function MessageList({
    messages,
    phase,
    messagesEndRef,
}: {
    messages: ChatMessage[]
    phase: ChatPhase
    messagesEndRef: RefObject<HTMLDivElement>
}) {
    return (
        <div className="space-y-5">
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}
            {phase === 'thinking' && <TypingIndicator />}
            <div ref={messagesEndRef} />
        </div>
    )
}

function ChatComposer({
    input,
    canChat,
    isBusy,
    phase,
    inputRef,
    onSubmit,
    onChange,
    onKeyDown,
}: {
    input: string
    canChat: boolean
    isBusy: boolean
    phase: ChatPhase
    inputRef: RefObject<HTMLTextAreaElement>
    onSubmit: (e: FormEvent) => void
    onChange: (value: string) => void
    onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <form onSubmit={onSubmit} className="flex-shrink-0 pb-6 pt-2 border-t border-neutral-100">
            <div className="flex items-end gap-2 rounded-xl border border-neutral-200 bg-white focus-within:border-neutral-400 transition-colors duration-200 p-2">
                <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={onKeyDown}
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
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14M12 5l7 7-7 7"
                            />
                        </svg>
                    )}
                </button>
            </div>
            <p className="mt-2 text-[11px] text-neutral-400">
                Enter to send · Shift+Enter for a new line
            </p>
        </form>
    )
}

export default function OnDeviceModels() {
    const {
        messages,
        input,
        phase,
        error,
        downloadProgress,
        canChat,
        isBusy,
        statusLabel,
        suggestions,
        messagesEndRef,
        inputRef,
        sendMessage,
        clearChat,
        initializeModel,
        handleSubmit,
        handleKeyDown,
        handleInputChange,
    } = useOnDeviceChat()

    return (
        <>
            <PageMeta
                title="On-device chat"
                description="Chat with Chrome’s on-device Prompt API — nothing leaves your machine."
                path="/experiments/on-device-models"
                ogSlug="on-device-models"
            />
            <div className="flex flex-col h-screen max-w-2xl mx-auto px-5 lg:px-6">
            <header className="flex-shrink-0 pt-6 pb-4 space-y-4 border-b border-neutral-100">
                <BackLink />
                <ChatHeader
                    hasMessages={messages.length > 0}
                    phase={phase}
                    onClear={clearChat}
                />
                <StatusBar
                    phase={phase}
                    statusLabel={statusLabel}
                    downloadProgress={downloadProgress}
                />
                {error && (
                    <ErrorBanner
                        error={error}
                        phase={phase}
                        onRetry={() => void initializeModel()}
                    />
                )}
            </header>

            <div className="flex-1 overflow-y-auto py-6 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {messages.length === 0 ? (
                    <EmptyState
                        canChat={canChat}
                        error={error}
                        suggestions={suggestions}
                        onSuggestion={(text) => void sendMessage(text)}
                    />
                ) : (
                    <MessageList
                        messages={messages}
                        phase={phase}
                        messagesEndRef={messagesEndRef}
                    />
                )}
            </div>

            <ChatComposer
                input={input}
                canChat={canChat}
                isBusy={isBusy}
                phase={phase}
                inputRef={inputRef}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>
        </>
    )
}
