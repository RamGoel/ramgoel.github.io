'use client'

import { PageMeta } from '@/components/PageMeta'
import {
    useOnDeviceVoiceAgent,
    VOICE_LANGUAGES,
    VoicePhase,
    VoiceTurn,
} from '@/hooks/useOnDeviceVoiceAgent'
import Link from 'next/link'
import { RefObject } from 'react'

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

function selectClassName() {
    return 'w-full text-xs bg-white border border-neutral-200 rounded-lg px-2.5 py-2 text-neutral-700 focus:outline-none focus:border-neutral-400'
}

function fieldLabelClassName() {
    return 'text-[11px] font-mono uppercase tracking-wider text-neutral-400'
}

function textareaClassName() {
    return 'w-full text-xs bg-white border border-neutral-200 rounded-lg px-2.5 py-2 text-neutral-700 focus:outline-none focus:border-neutral-400 resize-y min-h-[64px] leading-relaxed'
}

function VoiceControls({
    language,
    pace,
    greeting,
    systemPrompt,
    disabled,
    applyDisabled,
    onLanguageChange,
    onPaceChange,
    onGreetingChange,
    onSystemPromptChange,
    onApplySystemPrompt,
}: {
    language: string
    pace: number
    greeting: string
    systemPrompt: string
    disabled: boolean
    applyDisabled: boolean
    onLanguageChange: (code: string) => void
    onPaceChange: (value: number) => void
    onGreetingChange: (value: string) => void
    onSystemPromptChange: (value: string) => void
    onApplySystemPrompt: (prompt: string) => void
}) {
    return (
        <div className="space-y-4">
            <label className="space-y-1.5 block">
                <span className={fieldLabelClassName()}>Language</span>
                <select
                    value={language}
                    disabled={disabled}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className={selectClassName()}
                >
                    {VOICE_LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label}
                        </option>
                    ))}
                </select>
            </label>

            <label className="space-y-1.5 block">
                <div className="flex items-center justify-between gap-2">
                    <span className={fieldLabelClassName()}>Pace</span>
                    <span className="text-[11px] text-neutral-400 tabular-nums">{pace.toFixed(2)}x</span>
                </div>
                <input
                    type="range"
                    min={0.7}
                    max={1.8}
                    step={0.05}
                    value={pace}
                    disabled={disabled}
                    onChange={(e) => onPaceChange(Number(e.target.value))}
                    className="w-full accent-neutral-900"
                />
            </label>

            <label className="space-y-1.5 block">
                <span className={fieldLabelClassName()}>Greeting</span>
                <textarea
                    value={greeting}
                    disabled={disabled}
                    onChange={(e) => onGreetingChange(e.target.value)}
                    rows={3}
                    className={textareaClassName()}
                    placeholder="What the agent says first…"
                />
            </label>

            <div className="space-y-1.5">
                <span className={fieldLabelClassName()}>System prompt</span>
                <textarea
                    value={systemPrompt}
                    disabled={applyDisabled}
                    onChange={(e) => onSystemPromptChange(e.target.value)}
                    rows={5}
                    className={textareaClassName()}
                    placeholder="Instructions for the on-device model…"
                />
                <button
                    type="button"
                    disabled={applyDisabled}
                    onClick={() => onApplySystemPrompt(systemPrompt)}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 disabled:opacity-40 transition-colors"
                >
                    Apply to model session
                </button>
            </div>
        </div>
    )
}

function StatusBar({
    phase,
    statusLabel,
    downloadProgress,
    localStt,
}: {
    phase: VoicePhase
    statusLabel: string
    downloadProgress: number | null
    localStt: boolean
}) {
    const statusDot =
        phase === 'idle'
            ? 'bg-emerald-500'
            : phase === 'listening'
              ? 'bg-rose-500 animate-pulse'
              : phase === 'speaking' || phase === 'thinking' || phase === 'downloading'
                ? 'bg-amber-400 animate-pulse'
                : phase === 'error' ||
                    phase === 'unsupported' ||
                    phase === 'unavailable' ||
                    phase === 'needs-mic'
                  ? 'bg-red-500'
                  : 'bg-neutral-300'

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                <span>{statusLabel}</span>
            </div>
            {localStt && phase === 'idle' && (
                <p className="text-[11px] text-neutral-400">On-device speech recognition requested</p>
            )}
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
    phase: VoicePhase
    onRetry: () => void
}) {
    return (
        <div
            className={`rounded-lg px-3 py-3 text-sm leading-relaxed ${
                phase === 'unsupported' || phase === 'unavailable' || phase === 'needs-mic'
                    ? 'bg-amber-50 text-amber-900'
                    : 'bg-red-50 text-red-800'
            }`}
            role="alert"
        >
            <p>{error}</p>
            {(phase === 'unsupported' || phase === 'unavailable') && (
                <p className="mt-2 text-xs opacity-80">
                    Use Chrome/Edge, enable the Prompt API flags, allow the mic, then reload.
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

function TypingIndicator() {
    return (
        <div className="flex justify-start">
            <div
                className="flex items-center gap-1.5 py-1"
                aria-live="polite"
                aria-label="Assistant is thinking"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-bounce [animation-delay:300ms]" />
            </div>
        </div>
    )
}

function TurnList({
    turns,
    interimTranscript,
    conversationStarted,
    phase,
    turnsEndRef,
}: {
    turns: VoiceTurn[]
    interimTranscript: string
    conversationStarted: boolean
    phase: VoicePhase
    turnsEndRef: RefObject<HTMLDivElement>
}) {
    if (!conversationStarted && turns.length === 0 && !interimTranscript) {
        return (
            <div className="h-full flex flex-col justify-center gap-4">
                <p className="text-sm text-neutral-600 leading-relaxed">
                    Press the mic to start. The agent greets you first, then listens — speech in,
                    on-device model, speech out.
                </p>
                <ul className="text-sm text-neutral-500 space-y-2">
                    <li>1. Agent speaks a short greeting</li>
                    <li>2. You hold to talk</li>
                    <li>3. Model replies on-device, then speaks</li>
                </ul>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            {turns.map((turn) => (
                <div
                    key={turn.id}
                    className={`flex ${
                        turn.role === 'user'
                            ? 'justify-end'
                            : turn.role === 'system'
                              ? 'justify-center'
                              : 'justify-start'
                    }`}
                >
                    <div
                        className={`max-w-[90%] text-sm leading-relaxed whitespace-pre-wrap break-words ${
                            turn.role === 'user'
                                ? 'bg-neutral-900 text-white px-3.5 py-2.5 rounded-2xl rounded-br-md'
                                : turn.role === 'system'
                                  ? 'text-neutral-500 text-xs text-center max-w-md'
                                  : 'text-neutral-700'
                        }`}
                    >
                        {turn.role === 'assistant' && (
                            <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                                Agent
                            </span>
                        )}
                        {turn.content}
                    </div>
                </div>
            ))}
            {interimTranscript && (
                <div className="flex justify-end">
                    <p className="max-w-[90%] text-sm text-neutral-400 italic">{interimTranscript}</p>
                </div>
            )}
            {phase === 'thinking' && <TypingIndicator />}
            <div ref={turnsEndRef} className="h-16" aria-hidden />
        </div>
    )
}

function MicButton({
    phase,
    micLevel,
    disabled,
    conversationStarted,
    onPressStart,
    onPressEnd,
    onClick,
}: {
    phase: VoicePhase
    micLevel: number
    disabled: boolean
    conversationStarted: boolean
    onPressStart: () => void
    onPressEnd: () => void
    onClick: () => void
}) {
    const listening = phase === 'listening'
    const speaking = phase === 'speaking'
    const thinking = phase === 'thinking'
    const label = !conversationStarted
        ? 'Start conversation'
        : listening
          ? 'Release to send'
          : speaking
            ? 'Stop speaking'
            : thinking
              ? 'Thinking…'
              : 'Hold to talk'

    return (
        <button
            type="button"
            disabled={disabled || thinking}
            onMouseDown={onPressStart}
            onMouseUp={onPressEnd}
            onMouseLeave={() => {
                if (listening) onPressEnd()
            }}
            onTouchStart={(e) => {
                e.preventDefault()
                onPressStart()
            }}
            onTouchEnd={(e) => {
                e.preventDefault()
                onPressEnd()
            }}
            onClick={(e) => {
                if (e.detail === 0) onClick()
            }}
            aria-label={label}
            className={`w-full flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-lg transition-colors duration-200 disabled:opacity-40 active:scale-[0.99] ${
                listening
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : speaking
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
            style={
                listening
                    ? { boxShadow: `inset 0 0 0 ${2 + micLevel * 4}px rgba(255,255,255,0.15)` }
                    : undefined
            }
        >
            {thinking ? (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : speaking ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" />
                </svg>
            ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18.75a6 6 0 006-6v-1.5m-12 1.5a6 6 0 006 6m0 0v2.25m0-2.25a6 6 0 01-6-6v-1.5m6 7.5a6 6 0 006-6M12 3a3 3 0 013 3v6a3 3 0 11-6 0V6a3 3 0 013-3z"
                    />
                </svg>
            )}
            <span>{label}</span>
        </button>
    )
}

export default function OnDeviceVoiceAgentPage() {
    const {
        turns,
        phase,
        error,
        downloadProgress,
        interimTranscript,
        localStt,
        micLevel,
        language,
        setLanguage,
        conversationStarted,
        pace,
        setPace,
        greeting,
        setGreeting,
        systemPrompt,
        setSystemPrompt,
        applySystemPrompt,
        statusLabel,
        turnsEndRef,
        startOrListen,
        stopListening,
        toggleListening,
        stopSpeaking,
        clearSession,
        initializeModel,
    } = useOnDeviceVoiceAgent()

    const controlsDisabled =
        phase === 'checking' ||
        phase === 'downloading' ||
        phase === 'unsupported' ||
        phase === 'unavailable' ||
        phase === 'error'

    const editingDisabled =
        controlsDisabled ||
        phase === 'listening' ||
        phase === 'speaking' ||
        phase === 'thinking'

    // System prompt can be edited/applied while listening — apply stops the mic first.
    const systemPromptDisabled = controlsDisabled || phase === 'thinking'

    return (
        <>
            <PageMeta
                title="On-device voice"
                description="Offline-first voice agent — mic to on-device model to speech, fully in the browser."
                path="/experiments/on-device-voice"
                ogSlug="on-device-voice"
            />
            <div className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-white text-neutral-900">
            {/* Config — left */}
            <aside className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-neutral-100 flex flex-col max-h-[42vh] lg:max-h-none overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="p-5 lg:p-8 space-y-6 flex-1">
                    <BackLink />

                    <div className="space-y-1">
                        <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
                            On-device voice
                        </h1>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Mic → speech → Prompt API → speech
                        </p>
                    </div>

                    <VoiceControls
                        language={language}
                        pace={pace}
                        greeting={greeting}
                        systemPrompt={systemPrompt}
                        disabled={editingDisabled}
                        applyDisabled={systemPromptDisabled}
                        onLanguageChange={setLanguage}
                        onPaceChange={setPace}
                        onGreetingChange={setGreeting}
                        onSystemPromptChange={setSystemPrompt}
                        onApplySystemPrompt={(prompt) => void applySystemPrompt(prompt)}
                    />

                    <StatusBar
                        phase={phase}
                        statusLabel={statusLabel}
                        downloadProgress={downloadProgress}
                        localStt={localStt}
                    />

                    {error && (
                        <ErrorBanner
                            error={error}
                            phase={phase}
                            onRetry={() => void initializeModel()}
                        />
                    )}
                </div>

                <div className="p-5 lg:p-8 pt-4 border-t border-neutral-100 mt-auto space-y-3">
                    {phase === 'speaking' && (
                        <button
                            type="button"
                            onClick={() => stopSpeaking()}
                            className="w-full text-xs text-neutral-500 hover:text-neutral-900 transition-colors text-center"
                        >
                            Stop speaking
                        </button>
                    )}
                    <MicButton
                        phase={phase}
                        micLevel={micLevel}
                        disabled={controlsDisabled}
                        conversationStarted={conversationStarted}
                        onPressStart={() => {
                            void startOrListen()
                        }}
                        onPressEnd={() => {
                            if (phase === 'listening') stopListening()
                        }}
                        onClick={toggleListening}
                    />
                </div>
            </aside>

            {/* Chat — right */}
            <main className="flex-1 min-w-0 min-h-0 flex flex-col bg-neutral-50/60">
                <div className="flex-shrink-0 px-5 lg:px-10 py-4 border-b border-neutral-100 bg-white/80 flex items-center justify-between gap-3">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        Conversation
                    </h2>
                    <button
                        type="button"
                        onClick={clearSession}
                        disabled={!conversationStarted || phase === 'thinking'}
                        className="text-xs text-neutral-400 hover:text-neutral-900 disabled:opacity-30 transition-colors duration-200"
                    >
                        Clear
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 lg:px-10 py-6 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <div className="max-w-3xl mx-auto min-h-full">
                        <TurnList
                            turns={turns}
                            interimTranscript={interimTranscript}
                            conversationStarted={conversationStarted}
                            phase={phase}
                            turnsEndRef={turnsEndRef}
                        />
                    </div>
                </div>
            </main>
        </div>
        </>
    )
}
