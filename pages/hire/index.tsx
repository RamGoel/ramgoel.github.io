'use client'
import CustomLink from '@/components/CustomLink'
import { motion } from 'framer-motion'
import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { HiArrowLeft } from 'react-icons/hi'

const mono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400'],
})

const textBase = 'text-xs'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
}

export default function WorkWithMe() {
    return (
        <motion.div
            className={`flex flex-col gap-6 w-full ${mono.className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Back */}
            <motion.div variants={itemVariants}>
                <Link
                    href="/"
                    className={`${textBase} text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1`}
                >
                    <HiArrowLeft className="w-3 h-3" />
                    back
                </Link>
            </motion.div>

            {/* Header */}
            <motion.div variants={itemVariants}>
                <h1 className={`text-sm text-zinc-100 mb-2`}>Work With Me</h1>
                <div className={`${textBase} inline-flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-zinc-500">Booking for January</span>
                </div>
            </motion.div>

            {/* I can help if... */}
            <motion.div
                className={`${textBase} text-zinc-400`}
                variants={itemVariants}
            >
                <p
                    className={`text-zinc-500 ${textBase} uppercase tracking-wider mb-3`}
                >
                    I can help if
                </p>
                <ul className="space-y-3">
                    <li>
                        <span className="text-zinc-300">App is slow</span>
                        <span className="text-zinc-600"> — </span>
                        <span>I&apos;ll find why and help your team fix it.</span>
                    </li>
                    <li>
                        <span className="text-zinc-300">
                            Feature idea, no roadmap
                        </span>
                        <span className="text-zinc-600"> — </span>
                        <span>
                            I&apos;ll help you plan and help your team ship it.
                        </span>
                    </li>
                    <li>
                        <span className="text-zinc-300">
                            Non-tech founder, need guidance
                        </span>
                        <span className="text-zinc-600"> — </span>
                        <span>I&apos;ll be your technical sounding board.</span>
                    </li>
                    <li>
                        <span className="text-zinc-300">
                            Want to use AI but unsure how
                        </span>
                        <span className="text-zinc-600"> — </span>
                        <span>
                            I&apos;ll show you what actually works for your use case.
                        </span>
                    </li>
                    <li>
                        <span className="text-zinc-300">
                            Manual work eating your time
                        </span>
                        <span className="text-zinc-600"> — </span>
                        <span>
                            I&apos;ll help your team automate the boring stuff.
                        </span>
                    </li>
                </ul>
            </motion.div>

            {/* Background */}
            <motion.div
                className={`${textBase} text-zinc-400`}
                variants={itemVariants}
            >
                <p
                    className={`text-zinc-500 ${textBase} uppercase tracking-wider mb-3`}
                >
                    Background
                </p>
                <ul className="space-y-3">
                    <li>
                        Frontend Engineer at{' '}
                        <CustomLink href="https://sarvam.ai">
                            SarvamAI
                        </CustomLink>
                    </li>
                    <li>
                        Previously full-stack at{' '}
                        <CustomLink href="https://getconch.ai/">
                            Conch AI
                        </CustomLink>{' '}
                        (acquired)
                    </li>
                    <li>5+ years shipping React/Next.js</li>
                </ul>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex gap-3">
                    <a
                        href="mailto:rgoel766@gmail.com?subject=Let's%20Talk"
                        className={`${textBase} px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded transition-colors`}
                    >
                        Email me
                    </a>
                    <a
                        href="https://cal.com/ramgoel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${textBase} px-4 py-2 border border-zinc-700 hover:border-zinc-600 text-zinc-300 rounded transition-colors`}
                    >
                        Book a call
                    </a>
                </div>
                <p className={`${textBase} text-zinc-600`}>
                    Email first for context. I reply within 12h.
                </p>
            </motion.div>
        </motion.div>
    )
}
