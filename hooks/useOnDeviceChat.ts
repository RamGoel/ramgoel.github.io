import {
    FormEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

export type ChatMessage = {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
}

type ConversationMessage = {
    role: 'system' | 'user' | 'assistant'
    content: string
}

export type ChatPhase =
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
                    addEventListener: (
                        type: string,
                        listener: (e: { loaded: number }) => void
                    ) => void
                }) => void
            }) => Promise<{
                prompt: (message: string) => Promise<string>
            }>
        }
    }
}

const SYSTEM_PROMPT =
    'You are a helpful assistant. Always give very brief, concise responses. Keep answers short - maximum 2-3 sentences. Be direct and to the point.'

export const CHAT_SUGGESTIONS = [
    'What can you do on-device?',
    'Explain transformers in one sentence',
    'Write a short haiku about browsers',
]

function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function statusLabelFor(phase: ChatPhase, downloadProgress: number | null) {
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
}

export function useOnDeviceChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [phase, setPhase] = useState<ChatPhase>('checking')
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

    const initializeModel = useCallback(async () => {
        try {
            setPhase('downloading')
            setError(null)
            setDownloadProgress(0)

            await window.LanguageModel.create({
                monitor(m) {
                    m.addEventListener('downloadprogress', (e) => {
                        setDownloadProgress(Math.round(e.loaded * 100))
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
    }, [])

    useEffect(() => {
        if (isInitialized.current || typeof window === 'undefined') return

        const isChrome =
            /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        const isEdge = /Edg/.test(navigator.userAgent)

        if ('LanguageModel' in window) {
            isInitialized.current = true
            void initializeModel()
            return
        }

        if (!isChrome && !isEdge) {
            setPhase('unsupported')
            setError(
                'This demo needs Chrome Canary (v128+) or Edge Dev with the Prompt API enabled.'
            )
        } else {
            setPhase('unavailable')
            setError(
                'LanguageModel API is not available. Enable the Prompt API flag, then reload.'
            )
        }
    }, [initializeModel])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, phase])

    const getAIResponse = useCallback(async (userMessage: string) => {
        conversationHistory.current.push({ role: 'user', content: userMessage })

        const session = await window.LanguageModel.create({
            initialPrompts: conversationHistory.current,
        })

        const response = await session.prompt(userMessage)
        conversationHistory.current.push({ role: 'assistant', content: response })
        return response
    }, [])

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
        [canChat, getAIResponse]
    )

    const clearChat = useCallback(() => {
        setMessages([])
        setError(null)
        conversationHistory.current = [{ role: 'system', content: SYSTEM_PROMPT }]
        setPhase('ready')
        inputRef.current?.focus()
    }, [])

    const autoResize = useCallback(() => {
        const el = inputRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`
    }, [])

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            void sendMessage(input)
        },
        [input, sendMessage]
    )

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void sendMessage(input)
            }
        },
        [input, sendMessage]
    )

    const handleInputChange = useCallback(
        (value: string) => {
            setInput(value)
            autoResize()
        },
        [autoResize]
    )

    const statusLabel = useMemo(
        () => statusLabelFor(phase, downloadProgress),
        [phase, downloadProgress]
    )

    return {
        messages,
        input,
        phase,
        error,
        downloadProgress,
        canChat,
        isBusy,
        statusLabel,
        suggestions: CHAT_SUGGESTIONS,
        messagesEndRef,
        inputRef,
        sendMessage,
        clearChat,
        initializeModel,
        handleSubmit,
        handleKeyDown,
        handleInputChange,
    }
}
