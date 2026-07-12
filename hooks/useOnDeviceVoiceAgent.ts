import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type ConversationMessage = {
    role: 'system' | 'user' | 'assistant'
    content: string
}

export type VoiceTurn = {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
}

export type VoicePhase =
    | 'checking'
    | 'unsupported'
    | 'unavailable'
    | 'needs-mic'
    | 'downloading'
    | 'idle'
    | 'listening'
    | 'thinking'
    | 'speaking'
    | 'error'

type SpeechRecognitionLike = {
    continuous: boolean
    interimResults: boolean
    lang: string
    processLocally?: boolean
    start: () => void
    stop: () => void
    abort: () => void
    onresult: ((event: SpeechRecognitionEventLike) => void) | null
    onerror: ((event: { error: string }) => void) | null
    onend: (() => void) | null
}

type SpeechRecognitionEventLike = {
    resultIndex: number
    results: ArrayLike<{
        isFinal: boolean
        0: { transcript: string }
    }>
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike

declare global {
    interface Window {
        LanguageModel: {
            create: (options?: {
                initialPrompts?: ConversationMessage[]
                monitor?: (m: {
                    addEventListener: (
                        type: string,
                        listener: (e: { loaded: number }) => void
                    ) => void
                }) => void
            }) => Promise<{
                prompt: (message: string) => Promise<string>
            }>
        }
        SpeechRecognition?: SpeechRecognitionCtor
        webkitSpeechRecognition?: SpeechRecognitionCtor
    }
}

type LanguageModelSession = {
    prompt: (message: string) => Promise<string>
}

export const DEFAULT_SYSTEM_PROMPT = `You are a calm, sharp on-device voice assistant running fully in the browser — no cloud.

Speak like a helpful friend: warm, clear, and brief.
Keep every reply to one or two short sentences, ready to be spoken aloud.
No lists, markdown, bullet points, or stage directions.
If the user switches to Hindi, reply in Hindi; otherwise stay in English.
Prefer concrete answers over hedging. If you do not know something, say so simply.`

export const DEFAULT_GREETING =
    'Hey — I am running entirely on your device. Ask me anything.'

export const DEFAULT_PACE = 1.35

export const VOICE_LANGUAGES = [
    { code: 'en-US', label: 'English' },
    { code: 'hi-IN', label: 'Hindi' },
] as const

function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
    if (typeof window === 'undefined') return null
    return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

const ENGLISH_VOICE_PREFS = ['daniel', 'samantha', 'alex', 'karen', 'moira', 'google us english', 'microsoft david', 'microsoft zira']
const HINDI_VOICE_PREFS = ['lekha', 'google हिन्दी', 'google hindi', 'microsoft hemant', 'microsoft kalpana']

function scoreVoice(voice: SpeechSynthesisVoice, prefs: string[], langPrefix: string) {
    const name = voice.name.toLowerCase()
    const prefIndex = prefs.findIndex((p) => name.includes(p))
    let score = prefIndex === -1 ? 100 : prefIndex
    if (voice.localService) score -= 20
    if (voice.lang.toLowerCase().startsWith(langPrefix)) score -= 5
    if (voice.default) score -= 1
    return score
}

function pickBestVoice(list: SpeechSynthesisVoice[], lang: string) {
    const prefix = lang.split('-')[0].toLowerCase()
    const prefs = prefix === 'hi' ? HINDI_VOICE_PREFS : ENGLISH_VOICE_PREFS

    const candidates = list.filter(
        (v) =>
            v.lang.toLowerCase().startsWith(prefix) ||
            prefs.some((p) => v.name.toLowerCase().includes(p))
    )

    const pool = candidates.length > 0 ? candidates : list
    return (
        [...pool].sort(
            (a, b) => scoreVoice(a, prefs, prefix) - scoreVoice(b, prefs, prefix)
        )[0] || null
    )
}

function statusLabelFor(phase: VoicePhase, downloadProgress: number | null) {
    switch (phase) {
        case 'checking':
            return 'Checking browser support…'
        case 'downloading':
            return downloadProgress !== null
                ? `Downloading model · ${downloadProgress}%`
                : 'Preparing on-device model…'
        case 'needs-mic':
            return 'Microphone permission needed'
        case 'idle':
            return 'Ready · listening resumes automatically'
        case 'listening':
            return 'Listening…'
        case 'thinking':
            return 'Thinking on-device…'
        case 'speaking':
            return 'Speaking…'
        case 'unsupported':
            return 'Unsupported browser'
        case 'unavailable':
            return 'APIs not available'
        case 'error':
            return 'Something went wrong'
        default:
            return ''
    }
}

export function useOnDeviceVoiceAgent() {
    const [turns, setTurns] = useState<VoiceTurn[]>([])
    const [phase, setPhase] = useState<VoicePhase>('checking')
    const [error, setError] = useState<string | null>(null)
    const [downloadProgress, setDownloadProgress] = useState<number | null>(null)
    const [interimTranscript, setInterimTranscript] = useState('')
    const [localStt, setLocalStt] = useState(false)
    const [micLevel, setMicLevel] = useState(0)
    const [language, setLanguage] = useState('en-US')
    const [voiceURI, setVoiceURI] = useState('')
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
    const [conversationStarted, setConversationStarted] = useState(false)
    const [pace, setPace] = useState(DEFAULT_PACE)
    const [greeting, setGreeting] = useState(DEFAULT_GREETING)
    const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT)

    const isInitialized = useRef(false)
    const sessionRef = useRef<LanguageModelSession | null>(null)
    const conversationHistory = useRef<ConversationMessage[]>([
        { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
    ])
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
    const mediaStreamRef = useRef<MediaStream | null>(null)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const rafRef = useRef<number | null>(null)
    const phaseRef = useRef<VoicePhase>('checking')
    const languageRef = useRef(language)
    const voiceURIRef = useRef(voiceURI)
    const paceRef = useRef(pace)
    const greetingRef = useRef(greeting)
    const systemPromptRef = useRef(systemPrompt)
    const conversationStartedRef = useRef(false)
    const turnsEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        phaseRef.current = phase
    }, [phase])

    useEffect(() => {
        languageRef.current = language
    }, [language])

    useEffect(() => {
        voiceURIRef.current = voiceURI
    }, [voiceURI])

    useEffect(() => {
        paceRef.current = pace
    }, [pace])

    useEffect(() => {
        greetingRef.current = greeting
    }, [greeting])

    useEffect(() => {
        systemPromptRef.current = systemPrompt
    }, [systemPrompt])

    useEffect(() => {
        conversationStartedRef.current = conversationStarted
    }, [conversationStarted])

    useEffect(() => {
        turnsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [turns, interimTranscript, phase])

    useEffect(() => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

        const loadVoices = () => {
            const list = window.speechSynthesis.getVoices()
            setVoices(list)
            const best = pickBestVoice(list, languageRef.current)
            if (best) setVoiceURI(best.voiceURI)
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, [])

    useEffect(() => {
        if (voices.length === 0) return
        const match = pickBestVoice(voices, language)
        if (match) setVoiceURI(match.voiceURI)
    }, [language, voices])

    const canTalk = phase === 'idle' || phase === 'listening'
    const isActive = phase === 'listening' || phase === 'thinking' || phase === 'speaking'

    const stopMeter = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        setMicLevel(0)
    }, [])

    const startMeter = useCallback((stream: MediaStream) => {
        stopMeter()
        const ctx = new AudioContext()
        const source = ctx.createMediaStreamSource(stream)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        source.connect(analyser)
        audioCtxRef.current = ctx
        analyserRef.current = analyser

        const data = new Uint8Array(analyser.frequencyBinCount)
        const tick = () => {
            analyser.getByteTimeDomainData(data)
            let sum = 0
            for (let i = 0; i < data.length; i++) {
                const v = (data[i] - 128) / 128
                sum += v * v
            }
            setMicLevel(Math.min(1, Math.sqrt(sum / data.length) * 4))
            rafRef.current = requestAnimationFrame(tick)
        }
        tick()
    }, [stopMeter])

    const releaseMic = useCallback(() => {
        stopMeter()
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop())
        mediaStreamRef.current = null
        void audioCtxRef.current?.close()
        audioCtxRef.current = null
        analyserRef.current = null
    }, [stopMeter])

    const ensureMic = useCallback(async () => {
        if (mediaStreamRef.current) return mediaStreamRef.current
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
            },
        })
        mediaStreamRef.current = stream
        startMeter(stream)
        return stream
    }, [startMeter])

    const stopSpeaking = useCallback(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel()
        }
        if (phaseRef.current === 'speaking') {
            setPhase('idle')
        }
    }, [])

    const speak = useCallback(
        (text: string) =>
            new Promise<void>((resolve) => {
                if (!('speechSynthesis' in window)) {
                    resolve()
                    return
                }

                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel()
                }

                const utterance = new SpeechSynthesisUtterance(text)
                utterance.rate = paceRef.current
                utterance.pitch = 1
                utterance.lang = languageRef.current

                const voicesList = window.speechSynthesis.getVoices()
                const selected =
                    voicesList.find((v) => v.voiceURI === voiceURIRef.current) ||
                    pickBestVoice(voicesList, languageRef.current)
                if (selected) utterance.voice = selected

                utterance.onend = () => resolve()
                utterance.onerror = () => resolve()
                setPhase('speaking')
                window.speechSynthesis.speak(utterance)
            }),
        []
    )

    const getAIResponse = useCallback(async (userMessage: string) => {
        conversationHistory.current.push({ role: 'user', content: userMessage })

        let session = sessionRef.current
        if (!session) {
            session = await window.LanguageModel.create({
                initialPrompts: [{ role: 'system', content: systemPromptRef.current }],
            })
            sessionRef.current = session
        }

        const response = await session.prompt(userMessage)
        conversationHistory.current.push({ role: 'assistant', content: response })
        return response
    }, [])

    const processTranscript = useCallback(
        async (transcript: string) => {
            const trimmed = transcript.trim()
            if (!trimmed) {
                setPhase('idle')
                return
            }

            setTurns((prev) => [...prev, { id: uid(), role: 'user', content: trimmed }])
            setPhase('thinking')
            setError(null)

            try {
                const response = await getAIResponse(trimmed)
                const spoken = response.replace(/\s+/g, ' ').trim()
                setTurns((prev) => [...prev, { id: uid(), role: 'assistant', content: spoken }])
                await speak(spoken)

                // Always continue listening after a reply
                setPhase('idle')
                setTimeout(() => {
                    if (phaseRef.current === 'idle') {
                        void startListeningRef.current?.()
                    }
                }, 60)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error'
                setError(message)
                setTurns((prev) => [
                    ...prev,
                    {
                        id: uid(),
                        role: 'system',
                        content: 'Could not get an on-device reply. Try again.',
                    },
                ])
                setPhase('idle')
            }
        },
        [getAIResponse, speak]
    )

    const startListeningRef = useRef<(() => Promise<void>) | null>(null)

    const stopListening = useCallback(() => {
        try {
            recognitionRef.current?.stop()
        } catch {
            // ignore
        }
    }, [])

    const startListening = useCallback(async () => {
        if (phaseRef.current === 'thinking' || phaseRef.current === 'speaking') return

        const Ctor = getSpeechRecognitionCtor()
        if (!Ctor) {
            setError('Speech recognition is not available in this browser.')
            setPhase('unavailable')
            return
        }

        try {
            await ensureMic()
        } catch {
            setPhase('needs-mic')
            setError('Microphone access is required for the voice agent.')
            return
        }

        stopSpeaking()
        setInterimTranscript('')
        setError(null)

        const preferredLang = languageRef.current || navigator.language || 'en-US'
        const attempts: Array<{ lang: string; processLocally: boolean }> = [
            { lang: preferredLang, processLocally: false },
            { lang: preferredLang.split('-')[0], processLocally: false },
            { lang: 'en-US', processLocally: false },
            { lang: preferredLang, processLocally: true },
            { lang: 'en-US', processLocally: true },
        ]

        // Dedupe identical attempts
        const seen = new Set<string>()
        const queue = attempts.filter((a) => {
            const key = `${a.lang}:${a.processLocally}`
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })

        let attemptIndex = 0
        let settled = false
        let retrying = false

        const runAttempt = () => {
            const attempt = queue[attemptIndex]
            if (!attempt) {
                setError(
                    'Speech recognition language is not supported. Try Chrome with English speech enabled.'
                )
                setPhase('idle')
                setLocalStt(false)
                return
            }

            retrying = false
            const recognition = new Ctor()
            recognition.continuous = false
            recognition.interimResults = true
            recognition.lang = attempt.lang

            let localEnabled = false
            if (attempt.processLocally && 'processLocally' in recognition) {
                try {
                    recognition.processLocally = true
                    localEnabled = true
                } catch {
                    localEnabled = false
                }
            }
            setLocalStt(localEnabled)

            let finalText = ''
            const liveRef = { current: '' }

            recognition.onresult = (event) => {
                let interim = ''
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const piece = event.results[i][0].transcript
                    if (event.results[i].isFinal) finalText += piece
                    else interim += piece
                }
                liveRef.current = (finalText + ' ' + interim).trim()
                setInterimTranscript(liveRef.current)
            }

            recognition.onerror = (event) => {
                if (retrying) return

                if (event.error === 'aborted' || event.error === 'no-speech') {
                    setPhase('idle')
                    return
                }

                if (
                    (event.error === 'language-not-supported' ||
                        event.error === 'service-not-allowed') &&
                    attemptIndex < queue.length - 1
                ) {
                    retrying = true
                    attemptIndex += 1
                    recognitionRef.current = null
                    try {
                        recognition.abort()
                    } catch {
                        // ignore
                    }
                    runAttempt()
                    return
                }

                setError(`Speech recognition error: ${event.error}`)
                setPhase('idle')
            }

            recognition.onend = () => {
                if (retrying || settled) return
                if (recognitionRef.current !== recognition) return

                recognitionRef.current = null
                const text = finalText.trim() || liveRef.current.trim()
                setInterimTranscript('')
                if (text) {
                    settled = true
                    void processTranscript(text)
                } else if (phaseRef.current === 'listening') {
                    setPhase('idle')
                }
            }

            recognitionRef.current = recognition
            setPhase('listening')
            try {
                recognition.start()
            } catch (err) {
                if (attemptIndex < queue.length - 1) {
                    retrying = true
                    attemptIndex += 1
                    runAttempt()
                    return
                }
                const message = err instanceof Error ? err.message : 'Could not start listening'
                setError(message)
                setPhase('idle')
            }
        }

        runAttempt()
    }, [ensureMic, processTranscript, stopSpeaking])

    startListeningRef.current = startListening

    const beginConversation = useCallback(async () => {
        if (phaseRef.current === 'thinking' || phaseRef.current === 'speaking') return
        if (conversationStartedRef.current) {
            void startListening()
            return
        }

        setError(null)
        setConversationStarted(true)
        conversationStartedRef.current = true

        const greetingText = greetingRef.current.trim() || DEFAULT_GREETING
        setTurns([{ id: uid(), role: 'assistant', content: greetingText }])
        conversationHistory.current.push({ role: 'assistant', content: greetingText })

        await speak(greetingText)
        setPhase('idle')

        setTimeout(() => {
            if (phaseRef.current === 'idle') void startListeningRef.current?.()
        }, 60)
    }, [speak, startListening])

    const startOrListen = useCallback(async () => {
        if (phaseRef.current === 'speaking') {
            stopSpeaking()
            return
        }
        if (!conversationStartedRef.current) {
            await beginConversation()
            return
        }
        await startListening()
    }, [beginConversation, startListening, stopSpeaking])

    const toggleListening = useCallback(() => {
        if (phaseRef.current === 'listening') {
            stopListening()
            return
        }
        if (phaseRef.current === 'speaking') {
            stopSpeaking()
            setPhase('idle')
            return
        }
        void startOrListen()
    }, [startOrListen, stopListening, stopSpeaking])

    const initializeModel = useCallback(async () => {
        try {
            setPhase('downloading')
            setError(null)
            setDownloadProgress(0)

            const session = await window.LanguageModel.create({
                initialPrompts: [{ role: 'system', content: systemPromptRef.current }],
                monitor(m) {
                    m.addEventListener('downloadprogress', (e) => {
                        setDownloadProgress(Math.round(e.loaded * 100))
                    })
                },
            })

            sessionRef.current = session
            conversationHistory.current = [{ role: 'system', content: systemPromptRef.current }]
            setDownloadProgress(null)
            setPhase('idle')
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error'
            setPhase('error')
            setError(`Failed to initialize model: ${message}`)
            setDownloadProgress(null)
        }
    }, [])

    useEffect(() => {
        if (isInitialized.current || typeof window === 'undefined') return

        const isChrome =
            /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isEdge = /Edg/.test(navigator.userAgent)
        const hasLM = 'LanguageModel' in window
        const hasSR = Boolean(getSpeechRecognitionCtor())
        const hasTTS = 'speechSynthesis' in window
        const hasMic = Boolean(navigator.mediaDevices?.getUserMedia)

        if (!hasLM || !hasSR || !hasTTS || !hasMic) {
            if (!isChrome && !isEdge) {
                setPhase('unsupported')
                setError(
                    'This voice agent needs Chrome/Edge with the Prompt API, Speech Recognition, and Speech Synthesis.'
                )
            } else {
                setPhase('unavailable')
                const missing = [
                    !hasLM && 'LanguageModel (Prompt API)',
                    !hasSR && 'Speech Recognition',
                    !hasTTS && 'Speech Synthesis',
                    !hasMic && 'Microphone (getUserMedia)',
                ].filter(Boolean)
                setError(`Missing: ${missing.join(', ')}. Enable flags and reload.`)
            }
            return
        }

        isInitialized.current = true
        void initializeModel()
    }, [initializeModel])

    useEffect(() => {
        return () => {
            stopListening()
            stopSpeaking()
            releaseMic()
        }
    }, [releaseMic, stopListening, stopSpeaking])

    const clearSession = useCallback(() => {
        stopListening()
        stopSpeaking()
        setTurns([])
        setInterimTranscript('')
        setError(null)
        setConversationStarted(false)
        conversationStartedRef.current = false
        conversationHistory.current = [{ role: 'system', content: systemPromptRef.current }]
        sessionRef.current = null
        setPhase('idle')
        void window.LanguageModel.create({
            initialPrompts: [{ role: 'system', content: systemPromptRef.current }],
        })
            .then((session) => {
                sessionRef.current = session
            })
            .catch(() => {
                // Will recreate lazily on next prompt
            })
    }, [stopListening, stopSpeaking])

    const applySystemPrompt = useCallback(async () => {
        if (phaseRef.current === 'thinking' || phaseRef.current === 'speaking' || phaseRef.current === 'listening') {
            return
        }
        const prompt = systemPromptRef.current.trim() || DEFAULT_SYSTEM_PROMPT
        systemPromptRef.current = prompt
        setSystemPrompt(prompt)
        conversationHistory.current = [{ role: 'system', content: prompt }]
        try {
            const session = await window.LanguageModel.create({
                initialPrompts: [{ role: 'system', content: prompt }],
            })
            sessionRef.current = session
        } catch {
            sessionRef.current = null
        }
    }, [])

    const statusLabel = useMemo(
        () => statusLabelFor(phase, downloadProgress),
        [phase, downloadProgress]
    )

    return {
        turns,
        phase,
        error,
        downloadProgress,
        interimTranscript,
        localStt,
        micLevel,
        language,
        setLanguage,
        languages: VOICE_LANGUAGES,
        conversationStarted,
        pace,
        setPace,
        greeting,
        setGreeting,
        systemPrompt,
        setSystemPrompt,
        applySystemPrompt,
        canTalk,
        isActive,
        statusLabel,
        turnsEndRef,
        startListening,
        startOrListen,
        beginConversation,
        stopListening,
        toggleListening,
        stopSpeaking,
        clearSession,
        initializeModel,
    }
}
