import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
    mounted: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'theme'

function applyTheme(theme: Theme) {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
        meta.setAttribute('content', theme === 'dark' ? '#09090b' : '#fafafa')
    }
}

function getPreferredTheme(): Theme {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === 'light' || stored === 'dark') return stored
    } catch {
        /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const initial = getPreferredTheme()
        setThemeState(initial)
        applyTheme(initial)
        setMounted(true)

        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const onSystemChange = (e: MediaQueryListEvent) => {
            try {
                if (localStorage.getItem(STORAGE_KEY)) return
            } catch {
                /* ignore */
            }
            const next: Theme = e.matches ? 'dark' : 'light'
            setThemeState(next)
            applyTheme(next)
        }
        mq.addEventListener('change', onSystemChange)
        return () => mq.removeEventListener('change', onSystemChange)
    }, [])

    const setTheme = useCallback((next: Theme) => {
        setThemeState(next)
        try {
            localStorage.setItem(STORAGE_KEY, next)
        } catch {
            /* ignore */
        }
        applyTheme(next)
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }, [setTheme, theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return ctx
}
