'use client'
import { PageMeta } from '@/components/PageMeta'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { talks, projects, blogs } from '@/utils/data'
import { useState, useCallback, useEffect } from 'react'

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
}

const staggerItem = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
    },
}

const photos = ['/ram-1.png', '/ram-3.png', '/ram-4.png', '/ram-5.png']

const ease = [0.25, 0.4, 0.25, 1]

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.img
                src={src}
                alt="Ram Goel"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease }}
                className="max-w-[45vw] max-h-[45vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
            />
        </motion.div>
    )
}

function AboutSection({ onViewWork, onPhotoClick }: { onViewWork: () => void; onPhotoClick: (src: string) => void }) {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-5"
        >
            {/* Photos */}
            <motion.div variants={staggerItem} className="flex -space-x-3">
                {photos.map((src, i) => (
                    <button
                        key={src}
                        onClick={() => onPhotoClick(src)}
                        className={`group relative hover:z-10 transition-all duration-200 hover:scale-105 ${i === 2 ? 'hidden lg:block' : ''}`}
                        style={{
                            zIndex: photos.length - i,
                            transform: [
                                'rotate(-5deg)',
                                'rotate(3deg) translateY(4px)',
                                'rotate(-1deg) translateY(-3px)',
                                'rotate(6deg) translateY(2px)',
                            ][i],
                        }}
                    >
                        <div className="w-28 h-28 rounded-md overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                            <Image src={src} alt="Ram Goel" width={112} height={112} className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                    </button>
                ))}
            </motion.div>

            {/* About */}
            <motion.div variants={staggerItem} className="space-y-5">
                <h1 className="text-xl font-semibold text-neutral-900">Ram Goel</h1>
                <div className="space-y-4 text-sm">
                    <p className="text-neutral-600 leading-loose">
                        Currently at{' '}
                        <a href="https://sarvam.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            Sarvam AI
                        </a>
                        , where I work on frontend platform engineering and the voice agents product — design system, SDKs, and real-time voice interfaces that actually get things done.
                    </p>
                    <p className="text-neutral-600 leading-loose">
                        Before Sarvam, I was the sole engineer at{' '}
                        <a href="https://getconch.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            Conch AI
                        </a>
                        , an AI writing copilot that was later acquired. I built the Chrome extension, the editor, auth, payments — learned a lot about owning a product end to end. Before that, I worked on SEO and performance at{' '}
                        <a href="https://animall.in" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            Animall
                        </a>
                        {' '}for 100K+ daily users.
                    </p>
                    <p className="text-neutral-600 leading-loose">
                        I enjoy talking about frontend, ai x design, on-device models & dev workflows. Outside work, I speak at conferences, travel when I can, and build random stuff on weekends. Been writing code since 2019.
                    </p>
                    <p className="text-neutral-600 leading-loose">
                        <a href="https://github.com/RamGoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            GitHub
                        </a>
                        {' '}&middot;{' '}
                        <a href="https://x.com/theRamGoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            Twitter
                        </a>
                        {' '}&middot;{' '}
                        <a href="https://linkedin.com/in/ramgoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            LinkedIn
                        </a>
                        {' '}&middot;{' '}
                        <a href="mailto:rgoel766@gmail.com" className="slide-underline text-neutral-900">
                            Email
                        </a>
                    </p>
                </div>
            </motion.div>

            {/* View My Work */}
            <motion.div variants={staggerItem}>
                <button
                    onClick={onViewWork}
                    className="group flex items-center gap-1.5 text-xs bg-neutral-900 text-white px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors duration-200 mt-4"
                >
                    View My Work
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
            </motion.div>
        </motion.div>
    )
}

function WorkSection({ onBack }: { onBack: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="space-y-10"
        >
            <button
                onClick={onBack}
                className="group flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
            >
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back
            </button>

            {/* Side Projects */}
            <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Things I&apos;ve Built</h3>
                <ul className="space-y-4 text-sm">
                    {projects.map((project) => {
                        const projectUrl = Array.isArray(project.url) ? project.url[0] : (project.video || project.url)
                        const isExternal = projectUrl.startsWith('http')
                        return (
                            <li key={project.id + project.title}>
                                <a
                                    href={projectUrl}
                                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className="slide-underline text-neutral-900"
                                >
                                    {project.title}
                                </a>
                                {project.content && <span className="text-neutral-500"> — {project.content}</span>}
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="border-t border-neutral-100" />

            {/* Talks */}
            <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Talks</h3>
                <ul className="space-y-4 text-sm">
                    {talks.map((talk) => (
                        <li key={talk.id}>
                            <a href={talk.url} target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                                {talk.title}
                            </a>
                            <span className="text-neutral-500"> — {talk.content}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Blogs */}
            <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Blogs</h3>
                <ul className="space-y-4 text-sm">
                    {blogs.map((blog) => (
                        <li key={blog.id}>
                            <Link href={`/blog/${blog.slug}`} className="slide-underline text-neutral-900">
                                {blog.title}
                            </Link>
                            <span className="text-neutral-500"> — {blog.content}</span>
                        </li>
                    ))}
                </ul>
                <Link href="/blog" className="inline-block text-xs text-neutral-400 hover:text-neutral-900 transition-colors duration-200 pt-1">
                    View all →
                </Link>
            </div>

        </motion.div>
    )
}

export default function Home() {
    const [showWork, setShowWork] = useState(false)
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
    const closeLightbox = useCallback(() => setLightboxSrc(null), [])

    return (
        <>
            <PageMeta
                title="Ram Goel — Frontend Engineer"
                description="Frontend engineer at Sarvam AI. Design systems, SDKs, and voice agents."
                path="/"
                ogSlug="default"
                appendSiteName={false}
            />
            <div className="h-screen overflow-hidden relative">
                {/* About pane — centered, fixed in place */}
                <div
                    className="absolute inset-0 flex justify-center items-start pt-6 lg:pt-12 transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] overflow-y-auto"
                    style={{
                        opacity: showWork ? 0.3 : 1,
                        filter: showWork ? 'blur(3px)' : 'none',
                        transform: showWork ? (typeof window !== 'undefined' && window.innerWidth < 1024 ? 'translateX(-100%) scale(1)' : 'translateX(-400px) scale(0.97)') : 'translateX(0) scale(1)',
                        pointerEvents: showWork ? 'none' : 'auto',
                    }}
                >
                    <div className="w-full max-w-xl px-5 lg:px-6 py-6 lg:py-16">
                        <AboutSection onViewWork={() => setShowWork(true)} onPhotoClick={setLightboxSrc} />
                    </div>
                </div>

                {/* Work pane — slides in from right */}
                <div
                    className="absolute top-0 right-0 h-full overflow-y-auto flex justify-center transition-all duration-500 ease-[cubic-bezier(0.25,0.4,0.25,1)] w-full lg:w-[60%]"
                    style={{
                        transform: showWork ? 'translateX(0)' : 'translateX(100%)',
                        opacity: showWork ? 1 : 0,
                        pointerEvents: showWork ? 'auto' : 'none',
                    }}
                >
                    <div className="w-full max-w-xl px-5 lg:px-6 py-6 lg:py-16">
                        {showWork && <WorkSection onBack={() => setShowWork(false)} />}
                        <div className="h-32" />
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {lightboxSrc && <Lightbox src={lightboxSrc} onClose={closeLightbox} />}
            </AnimatePresence>
        </>
    )
}
