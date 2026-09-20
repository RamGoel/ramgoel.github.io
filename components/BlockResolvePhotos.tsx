import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

const COLS = 6
const ROWS = 6
const TILE_COUNT = COLS * ROWS
const HOLD_MS = 1800
const TILE_STAGGER_MS = 12
const TILE_FADE_MS = 120
const RESOLVE_MS = TILE_COUNT * TILE_STAGGER_MS + TILE_FADE_MS

type Props = {
    photos: string[]
    onSelect: (src: string) => void
    alt?: string
    objectPosition?: string
    className?: string
    width?: number
    height?: number
}

export default function BlockResolvePhotos({
    photos,
    onSelect,
    alt = 'Photo',
    objectPosition = 'object-top',
    className = 'w-44 h-44',
    width = 176,
    height = 176,
}: Props) {
    const [index, setIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(1 % Math.max(photos.length, 1))
    const [resolving, setResolving] = useState(false)
    const [reduceMotion, setReduceMotion] = useState(false)
    const [themePaused, setThemePaused] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduceMotion(mq.matches)
        const onChange = () => setReduceMotion(mq.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    // Pause while theme strip-flip is running
    useEffect(() => {
        const root = document.documentElement
        const sync = () => {
            setThemePaused(root.classList.contains('theme-strip-flipping'))
        }
        sync()
        const obs = new MutationObserver(sync)
        obs.observe(root, { attributes: true, attributeFilter: ['class'] })
        return () => obs.disconnect()
    }, [])

    const finishResolve = useCallback(() => {
        setIndex(nextIndex)
        setResolving(false)
    }, [nextIndex])

    // Settle mid-resolve when theme switch starts
    useEffect(() => {
        if (themePaused && resolving) {
            finishResolve()
        }
    }, [themePaused, resolving, finishResolve])

    useEffect(() => {
        if (photos.length < 2 || themePaused) return

        const tick = () => {
            const upcoming = (index + 1) % photos.length
            setNextIndex(upcoming)

            if (reduceMotion) {
                setIndex(upcoming)
                return
            }

            setResolving(true)
        }

        const hold = window.setTimeout(tick, HOLD_MS)
        return () => window.clearTimeout(hold)
    }, [index, photos.length, reduceMotion, themePaused])

    useEffect(() => {
        if (!resolving || themePaused) return
        const done = window.setTimeout(finishResolve, RESOLVE_MS)
        return () => window.clearTimeout(done)
    }, [resolving, finishResolve, themePaused])

    const current = photos[index]
    const next = photos[nextIndex]

    return (
        <button
            type="button"
            onClick={() => onSelect(current)}
            className={`group relative block overflow-hidden rounded-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-neutral-100 ${className}`}
            aria-label={`View ${alt}`}
        >
            <Image
                src={current}
                alt={alt}
                width={width}
                height={height}
                priority
                className={`w-full h-full object-cover ${objectPosition}`}
            />

            {resolving && !reduceMotion && (
                <div
                    className="absolute inset-0 grid"
                    style={{
                        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                    }}
                    aria-hidden
                >
                    {Array.from({ length: TILE_COUNT }, (_, i) => {
                        const col = i % COLS
                        const row = Math.floor(i / COLS)
                        return (
                            <div
                                key={`${next}-${i}`}
                                className="relative overflow-hidden opacity-0 animate-block-resolve"
                                style={{
                                    animationDelay: `${i * TILE_STAGGER_MS}ms`,
                                    animationDuration: `${TILE_FADE_MS}ms`,
                                }}
                            >
                                <div
                                    className="absolute"
                                    style={{
                                        width: `${COLS * 100}%`,
                                        height: `${ROWS * 100}%`,
                                        left: `${-col * 100}%`,
                                        top: `${-row * 100}%`,
                                    }}
                                >
                                    <img
                                        src={next}
                                        alt=""
                                        className={`w-full h-full object-cover ${objectPosition}`}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </button>
    )
}
