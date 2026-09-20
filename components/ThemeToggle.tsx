import { Moon, Sun } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from './ThemeProvider'

/** Match BlockResolvePhotos: w-44 (176px) / 6 tiles ≈ 29.3px */
const TILE_PX = 176 / 6
const DURATION_MS = 780
/** Cap keyframes so a fine grid stays smooth */
const MAX_FRAMES = 120

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type ViewTransitionDoc = Document & {
    startViewTransition: (update: () => void) => {
        ready: Promise<void>
        finished: Promise<void>
    }
}

function getViewTransitionDoc(): ViewTransitionDoc | null {
    if (typeof document === 'undefined') return null
    if (!('startViewTransition' in document)) return null
    return document as ViewTransitionDoc
}

function gridForViewport(width: number, height: number) {
    const cols = Math.max(1, Math.round(width / TILE_PX))
    const rows = Math.max(1, Math.round(height / TILE_PX))
    return { cols, rows }
}

/** Build a CSS clip-path that shows the first `count` tiles (by order). */
function blockClipPath(
    order: number[],
    count: number,
    cols: number,
    rows: number,
    width: number,
    height: number,
) {
    if (count <= 0) return 'inset(100%)'

    const bw = width / cols
    const bh = height / rows
    const parts: string[] = []

    for (let i = 0; i < count; i++) {
        const idx = order[i]
        const col = idx % cols
        const row = Math.floor(idx / cols)
        const x = col * bw
        const y = row * bh
        parts.push(`M${x} ${y}h${bw}v${bh}h${-bw}z`)
    }

    return `path('${parts.join(' ')}')`
}

/** Tile indices sorted by distance from the click point (center of each tile). */
function tileOrderFromPoint(
    x: number,
    y: number,
    cols: number,
    rows: number,
    width: number,
    height: number,
) {
    const bw = width / cols
    const bh = height / rows
    const tiles = Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const cx = col * bw + bw / 2
        const cy = row * bh + bh / 2
        const dist = (cx - x) ** 2 + (cy - y) ** 2
        return { i, dist }
    })
    tiles.sort((a, b) => a.dist - b.dist)
    return tiles.map((t) => t.i)
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, toggleTheme, mounted } = useTheme()
    const btnRef = useRef<HTMLButtonElement>(null)

    const onToggle = useCallback(async () => {
        const doc = getViewTransitionDoc()
        if (!doc || prefersReducedMotion()) {
            toggleTheme()
            return
        }

        const btn = btnRef.current
        const rect = btn?.getBoundingClientRect()
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40
        const y = rect ? rect.top + rect.height / 2 : 40
        const width = window.innerWidth
        const height = window.innerHeight
        const { cols, rows } = gridForViewport(width, height)
        const order = tileOrderFromPoint(x, y, cols, rows, width, height)
        const total = cols * rows
        const frameCount = Math.min(MAX_FRAMES, total)

        const root = document.documentElement
        root.classList.add('theme-transitioning')

        try {
            const transition = doc.startViewTransition(() => {
                flushSync(() => {
                    toggleTheme()
                })
            })

            await transition.ready

            const frames = Array.from({ length: frameCount + 1 }, (_, f) => {
                const count = Math.round((f / frameCount) * total)
                return {
                    clipPath: blockClipPath(order, count, cols, rows, width, height),
                }
            })

            document.documentElement.animate(frames, {
                duration: DURATION_MS,
                easing: `steps(${frameCount}, end)`,
                fill: 'both',
                pseudoElement: '::view-transition-new(root)',
            })

            await transition.finished
        } catch {
            // Theme may already have flipped inside the transition callback
        } finally {
            root.classList.remove('theme-transitioning')
        }
    }, [toggleTheme])

    return (
        <button
            ref={btnRef}
            type="button"
            onClick={onToggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors duration-200 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-600 dark:hover:bg-neutral-800 ${className}`}
        >
            <span className="sr-only">Toggle theme</span>
            {mounted ? (
                theme === 'dark' ? (
                    <Sun size={16} strokeWidth={1.75} />
                ) : (
                    <Moon size={16} strokeWidth={1.75} />
                )
            ) : (
                <span className="w-4 h-4" aria-hidden />
            )}
        </button>
    )
}
