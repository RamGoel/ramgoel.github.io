'use client'
import { miniProjects, projects, talks } from '@/utils/data'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

// Navigation sections
const sections = ['About', 'Thoughts', 'Projects'] as const
type Section = (typeof sections)[number]

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

// ============================================
// Custom Cursor Component
// ============================================

function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        // Check if device has fine pointer (mouse)
        if (!window.matchMedia('(pointer: fine)').matches) return

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a') || target.closest('button') || target.tagName === 'A' || target.tagName === 'BUTTON') {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', updatePosition)
        document.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', updatePosition)
            document.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    // Don't render on touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
        return null
    }

    return (
        <div
            className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 1L14 7.5L7.5 9L6 14L1 1Z"
                    fill="black"
                    stroke="white"
                    strokeWidth="0.5"
                />
            </svg>
        </div>
    )
}

// ============================================
// Sidebar Component
// ============================================

function Sidebar({ 
    activeSection, 
    onSectionChange 
}: { 
    activeSection: Section
    onSectionChange: (section: Section) => void 
}) {
    return (
        <aside className="w-full lg:w-[160px] p-6 lg:p-8 lg:pt-12 lg:h-screen lg:sticky lg:top-0 flex lg:flex-col">
            <nav className="flex lg:flex-col gap-1 font-display">
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => onSectionChange(section)}
                        className={`
                            text-left px-3 py-2 rounded-lg text-[15px] tracking-tight
                            transition-colors duration-200
                            ${activeSection === section 
                                ? 'text-neutral-900' 
                                : 'text-neutral-400 hover:text-neutral-600'
                            }
                        `}
                    >
                        {section}
                    </button>
                ))}
            </nav>
        </aside>
    )
}

// ============================================
// Content Sections
// ============================================

function AboutSection() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-5"
        >
            {/* Name */}
            <motion.div variants={staggerItem}>
                <h1 className="text-xl font-semibold text-neutral-900">Ram Goel</h1>
            </motion.div>

            {/* Bio */}
            <motion.div variants={staggerItem} className="space-y-4 text-sm">
                <p className="text-neutral-600 leading-loose ">
                    I&apos;m a frontend engineer at{' '}
                    <a href="https://sarvam.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                        sarvam
                    </a>
                    . My work spans building interfaces for voice AI products, design systems, and developer tools.
                </p>
                <p className="text-neutral-600 leading-loose ">
                    I&apos;ve been writing code since 2019. Started with web development during college, built websites for events like TEDx and hackathons. In 2022, I interned at{' '}
                    <a href="https://animall.in" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                        Animall
                    </a>
                    {' '}working on SEO and survey automation for 100K+ daily users. Later, I joined{' '}
                    <a href="https://getconch.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                        Conch
                    </a>
                    {' '}as the sole engineer, leading the entire tech stack for an AI writing & study copilot that was later acquired.
                </p>
                <p className="text-neutral-600 leading-loose ">
                    Outside work — movies, speaking at events, and traveling somewhere new every birthday.
                </p>
                <p className="text-neutral-600 leading-loose ">
                    Find me on{' '}
                    <a href="https://github.com/RamGoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                        GitHub
                    </a>
                    ,{' '}
                    <a href="https://x.com/theRamGoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                        Twitter
                    </a>
                    ,{' '}
                    <a href="https://linkedin.com/in/ramgoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                        LinkedIn
                    </a>
                    , or{' '}
                    <a href="mailto:rgoel766@gmail.com" className="slide-underline text-neutral-900">
                        email me
                    </a>
                    .
                </p>
            </motion.div>

            {/* GitHub Activity */}
            {/* <motion.div variants={staggerItem} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    GitHub Activity
                </h3>
                <div className="space-y-2">
                    <Image
                        src="/graph-work.png"
                        alt="Work GitHub contributions"
                        width={500}
                        height={100}
                        className="rounded-lg border border-neutral-100"
                    />
                    <Image
                        src="/graph-personal.png"
                        alt="Personal GitHub contributions"
                        width={500}
                        height={100}
                        className="rounded-lg border border-neutral-100"
                    />
                </div>
            </motion.div> */}
        </motion.div>
    )
}

function ThoughtsSection() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
        >
            {/* Talks */}
            <motion.div variants={staggerItem} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Talks
                </h3>
                <ul className="space-y-4 text-sm">
                    {talks.map((talk) => (
                        <li key={talk.id}>
                            <a 
                                href={talk.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="slide-underline text-neutral-900"
                            >
                                {talk.title}
                            </a>
                            <span className="text-neutral-500"> — {talk.content}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Blogs */}
            <motion.div variants={staggerItem} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Blogs
                </h3>
                <ul className="space-y-4 text-sm">
                    <li>
                        <a
                            href="https://dev.to/ramgoel/multiple-environments-in-frontend-applications-2k07"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slide-underline text-neutral-900"
                        >
                            Multiple Environments in Frontend Applications
                        </a>
                        <span className="text-neutral-500"> — using env-cmd</span>
                    </li>
                    <li>
                        <a
                            href="https://medium.com/@rgoel766/importance-of-og-title-and-twitter-title-tags-for-link-previews-9c303a667b9e"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slide-underline text-neutral-900"
                        >
                            OG Title and Twitter Title Tags
                        </a>
                        <span className="text-neutral-500"> — for link previews</span>
                    </li>
                </ul>
            </motion.div>
        </motion.div>
    )
}

function ProjectsSection() {
    return (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
        >
            {/* Side Projects */}
            <motion.div variants={staggerItem} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Side Projects
                </h3>
                <ul className="space-y-4 text-sm">
                    {projects.map((project) => {
                        const projectUrl = Array.isArray(project.url) ? project.url[0] : (project.video || project.url)
                        
                        return (
                            <li key={project.id + project.title}>
                                <a
                                    href={projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="slide-underline text-neutral-900"
                                >
                                    {project.title}
                                </a>
                                {project.content && (
                                    <span className="text-neutral-500"> — {project.content}</span>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-neutral-100" />

            {/* Open Source */}
            <motion.div variants={staggerItem} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Open Source
                </h3>
                <ul className="space-y-4 text-sm">
                    <li>
                        <a
                            href="https://github.com/DiceDB/dice/pulls?q=author%3ARamGoel+is%3Amerged+"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slide-underline text-neutral-900"
                        >
                            DiceDB
                        </a>
                        <span className="text-neutral-500"> — navbar styling and broken links fix</span>
                    </li>
                    <li>
                        <a
                            href="https://github.com/asyncapi/website/pulls?q=author%3ARamGoel+is%3Amerged+"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="slide-underline text-neutral-900"
                        >
                            AsyncAPI
                        </a>
                        <span className="text-neutral-500"> — UI fixes for logo sizing and responsive images</span>
                    </li>
                </ul>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-neutral-100" />

            {/* Mini Projects */}
            <motion.div variants={staggerItem} className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Mini Projects <span className="normal-case tracking-normal">— curiosity stuff</span>
                </h3>
                <ul className="space-y-4 text-sm">
                    {miniProjects.map((project) => (
                        <li key={project.id + project.title}>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="slide-underline text-neutral-900"
                            >
                                {project.title}
                            </a>
                            {project.content && (
                                <span className="text-neutral-500"> — {project.content}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    )
}

// ============================================
// Main Page Component
// ============================================

export default function Home() {
    const [activeSection, setActiveSection] = useState<Section>('About')

    const handleSectionChange = useCallback((section: Section) => {
        if (section === activeSection) return
        
        // Use View Transitions API if available
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setActiveSection(section)
            })
        } else {
            setActiveSection(section)
        }
    }, [activeSection])

    const renderContent = () => {
        switch (activeSection) {
            case 'About':
                return <AboutSection />
            case 'Thoughts':
                return <ThoughtsSection />
            case 'Projects':
                return <ProjectsSection />
            default:
                return <AboutSection />
        }
    }

    return (
        <>
            <CustomCursor />
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar */}
                <Sidebar 
                    activeSection={activeSection} 
                    onSectionChange={handleSectionChange} 
                />

                {/* Vertical Divider - starts at content edge */}
                <div className="hidden lg:block pt-12">
                    <div className="w-px h-[70vh] bg-neutral-100" />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-12 lg:pl-16 lg:max-w-2xl [view-transition-name:content]">
                    {renderContent()}
                </main>
            </div>

            {/* Last Updated */}
            <div className="fixed bottom-4 left-4 text-xs text-neutral-400 hidden lg:block font-display">
                Last updated: Jan 2026
            </div>
        </>
    )
}
