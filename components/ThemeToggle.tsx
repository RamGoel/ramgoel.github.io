import { Moon, Sun } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useTheme } from './ThemeProvider'

const STRIP_PX = 30
const ZOOM_INSET_PX = 15
const ZOOM_OUT_MS = 480
const FLIP_MS = 1400
const ZOOM_IN_MS = 480

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

type Pt = [number, number]

/** Polygon for one ╲ diagonal band (constant x+y). */
function diagonalBandPoints(
    index: number,
    stripStep: number,
    width: number,
    height: number,
): Pt[] | null {
    const a = index * stripStep
    const b = (index + 1) * stripStep

    const pts: Pt[] = []
    const push = (x: number, y: number) => {
        const u = x + y
        if (u >= a - 0.5 && u <= b + 0.5) pts.push([x, y])
    }

    for (const [x, y] of [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height],
    ] as Pt[]) {
        const u = x + y
        if (u >= a && u <= b) pts.push([x, y])
    }

    for (const t of [a, b]) {
        if (t >= 0 && t <= width) push(t, 0)
        if (t - height >= 0 && t - height <= width) push(t - height, height)
        if (t >= 0 && t <= height) push(0, t)
        if (t - width >= 0 && t - width <= height) push(width, t - width)
    }

    const key = (p: Pt) => `${Math.round(p[0] * 10)},${Math.round(p[1] * 10)}`
    const unique = Array.from(new Map(pts.map((p) => [key(p), p])).values())
    if (unique.length < 3) return null

    const cx = unique.reduce((s, p) => s + p[0], 0) / unique.length
    const cy = unique.reduce((s, p) => s + p[1], 0) / unique.length
    unique.sort(
        (p, q) => Math.atan2(p[1] - cy, p[0] - cx) - Math.atan2(q[1] - cy, q[0] - cx),
    )
    return unique
}

function stripsClipPath(
    visible: boolean[],
    stripStep: number,
    width: number,
    height: number,
) {
    const parts: string[] = []
    for (let i = 0; i < visible.length; i++) {
        if (!visible[i]) continue
        const pts = diagonalBandPoints(i, stripStep, width, height)
        if (!pts) continue
        const [first, ...rest] = pts
        parts.push(
            `M${first[0]} ${first[1]}` + rest.map(([x, y]) => `L${x} ${y}`).join('') + 'Z',
        )
    }
    return parts.length ? `path('${parts.join(' ')}')` : 'inset(100%)'
}

function stripFrame(
    count: number,
    stripStep: number,
    width: number,
    height: number,
    flippedCount: number,
    role: 'old' | 'new',
) {
    const visible = Array.from({ length: count }, (_, i) =>
        role === 'old' ? i >= flippedCount : i < flippedCount,
    )
    return {
        clipPath: stripsClipPath(visible, stripStep, width, height),
    }
}

function animatePseudo(
    root: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions & { pseudoElement: string },
) {
    const anim = root.animate(keyframes, { fill: 'forwards', ...options })
    return anim.finished.catch(() => undefined)
}

async function runStripFlipTransition(toggleTheme: () => void) {
    const doc = getViewTransitionDoc()
    if (!doc) {
        toggleTheme()
        return
    }

    const width = window.innerWidth
    const height = window.innerHeight
    const stripStep = STRIP_PX * Math.SQRT2
    const count = Math.max(1, Math.ceil((width + height) / stripStep))
    const root = document.documentElement
    const zoomScale = 1 - (ZOOM_INSET_PX * 2) / Math.min(width, height)

    root.classList.add('theme-strip-flipping')

    try {
        const transition = doc.startViewTransition(() => {
            flushSync(() => {
                toggleTheme()
            })
        })

        await transition.ready

        const oldFull = stripFrame(count, stripStep, width, height, 0, 'old')
        const newHidden = stripFrame(count, stripStep, width, height, 0, 'new')
        const oldGone = stripFrame(count, stripStep, width, height, count, 'old')
        const newFull = stripFrame(count, stripStep, width, height, count, 'new')

        // 1. Zoom out
        await Promise.all([
            animatePseudo(root, [oldFull, oldFull], {
                duration: ZOOM_OUT_MS,
                easing: 'linear',
                pseudoElement: '::view-transition-old(root)',
            }),
            animatePseudo(root, [newHidden, newHidden], {
                duration: ZOOM_OUT_MS,
                easing: 'linear',
                pseudoElement: '::view-transition-new(root)',
            }),
            animatePseudo(
                root,
                [{ transform: 'scale(1)' }, { transform: `scale(${zoomScale})` }],
                {
                    duration: ZOOM_OUT_MS,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-group(root)',
                },
            ),
        ])

        // 2. Flip diagonal strips one-by-one
        const flipFrames = Array.from({ length: count + 1 }, (_, f) => f)
        await Promise.all([
            animatePseudo(
                root,
                flipFrames.map((f) => stripFrame(count, stripStep, width, height, f, 'old')),
                {
                    duration: FLIP_MS,
                    easing: 'linear',
                    pseudoElement: '::view-transition-old(root)',
                },
            ),
            animatePseudo(
                root,
                flipFrames.map((f) => stripFrame(count, stripStep, width, height, f, 'new')),
                {
                    duration: FLIP_MS,
                    easing: 'linear',
                    pseudoElement: '::view-transition-new(root)',
                },
            ),
            animatePseudo(
                root,
                [{ transform: `scale(${zoomScale})` }, { transform: `scale(${zoomScale})` }],
                {
                    duration: FLIP_MS,
                    easing: 'linear',
                    pseudoElement: '::view-transition-group(root)',
                },
            ),
        ])

        // 3. Zoom in
        await Promise.all([
            animatePseudo(root, [oldGone, oldGone], {
                duration: ZOOM_IN_MS,
                easing: 'linear',
                pseudoElement: '::view-transition-old(root)',
            }),
            animatePseudo(root, [newFull, newFull], {
                duration: ZOOM_IN_MS,
                easing: 'linear',
                pseudoElement: '::view-transition-new(root)',
            }),
            animatePseudo(
                root,
                [{ transform: `scale(${zoomScale})` }, { transform: 'scale(1)' }],
                {
                    duration: ZOOM_IN_MS,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-group(root)',
                },
            ),
        ])

        await transition.finished
    } finally {
        root.classList.remove('theme-strip-flipping')
    }
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, toggleTheme, mounted } = useTheme()
    const busyRef = useRef(false)

    const onToggle = useCallback(async () => {
        if (busyRef.current) return

        if (prefersReducedMotion()) {
            toggleTheme()
            return
        }

        busyRef.current = true
        try {
            await runStripFlipTransition(toggleTheme)
        } catch {
            toggleTheme()
        } finally {
            busyRef.current = false
        }
    }, [toggleTheme])

    return (
        <button
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
