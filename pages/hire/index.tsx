'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

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

export default function WorkWithMe() {
    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-full max-w-2xl px-5 lg:px-6 py-6 lg:py-16">
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-10"
            >
                <motion.div variants={staggerItem}>
                    <Link
                        href="/"
                        className="group flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
                    >
                        <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </Link>
                </motion.div>

                <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Open for</h3>
                    <p className="text-sm text-neutral-600">
                        Consulting · Freelance (one-off projects)
                    </p>
                </motion.div>

                <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">I can help if</h3>
                    <ul className="space-y-4 text-sm">
                        <li>
                            <span className="text-neutral-900">App is slow</span>
                            <span className="text-neutral-500"> — I&apos;ll find why and help fix it.</span>
                        </li>
                        <li>
                            <span className="text-neutral-900">Feature idea, no roadmap</span>
                            <span className="text-neutral-500"> — I&apos;ll help you plan and help ship it.</span>
                        </li>
                        <li>
                            <span className="text-neutral-900">Non-tech founder, need guidance</span>
                            <span className="text-neutral-500"> — I&apos;ll be your technical sounding board.</span>
                        </li>
                        <li>
                            <span className="text-neutral-900">Want to use AI but unsure how</span>
                            <span className="text-neutral-500"> — I&apos;ll show you what actually works for your use case.</span>
                        </li>
                        <li>
                            <span className="text-neutral-900">Manual work eating your time</span>
                            <span className="text-neutral-500"> — I&apos;ll help you automate the boring stuff.</span>
                        </li>
                    </ul>
                </motion.div>

                <div className="border-t border-neutral-100" />

                <motion.div variants={staggerItem} className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Background</h3>
                    <ul className="space-y-4 text-sm">
                        <li>
                            Frontend Engineer at{' '}
                            <a href="https://sarvam.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                                Sarvam AI
                            </a>
                        </li>
                        <li>
                            Previously full-stack at{' '}
                            <a href="https://getconch.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                                Conch AI
                            </a>
                            <span className="text-neutral-500"> — acquired</span>
                        </li>
                        <li className="text-neutral-600">5+ years shipping React/Next.js</li>
                    </ul>
                </motion.div>

                <motion.div variants={staggerItem} className="space-y-3">
                    <div className="flex items-center gap-3">
                        <a
                            href="mailto:rgoel766@gmail.com?subject=Let's%20Talk"
                            className="group flex items-center gap-1.5 text-xs bg-neutral-900 text-white px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors duration-200"
                        >
                            Send me an emal
                            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </a>
                        <a
                            href="https://cal.com/ramgoel"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors duration-200 px-3 py-2"
                        >
                            Book a call
                        </a>
                    </div>
                    <p className="text-sm text-neutral-500">
                        Email first for context. I reply within 12h.
                    </p>
                </motion.div>
            </motion.div>
            </div>
        </div>
    )
}
