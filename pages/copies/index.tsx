'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const staggerContainer = {
    animate: {
        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
}

const staggerItem = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
    },
}

const copies = [
    {
        name: 'Sarvam',
        href: '/copies/sarvam',
        content: 'Landing page recreation',
    },
    {
        name: 'Sarvam v2',
        href: '/copies/sarvam-v2',
        content: 'Updated marketing layout',
    },
    {
        name: 'Sarvam Team',
        href: '/copies/sarvam-team',
        content: 'Team page with scroll motion',
    },
    {
        name: 'Supermemory',
        href: '/copies/supermemory',
        content: 'Dark product marketing site',
    },
    {
        name: 'Growth Square',
        href: '/copies/growth-square',
        content: 'Agency-style landing page',
    },
    {
        name: 'WhatsApp',
        href: '/copies/whatsapp',
        content: 'Web chat UI recreation',
    },
]

export default function Copies() {
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
                            <svg
                                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </Link>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-3">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                            UI studies
                        </h3>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            Recreations and design experiments — practice for layout, motion, and craft.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-3">
                        <ul className="space-y-4 text-sm">
                            {copies.map((copy) => (
                                <li key={copy.href}>
                                    <Link href={copy.href} className="slide-underline text-neutral-900">
                                        {copy.name}
                                    </Link>
                                    <span className="text-neutral-500"> — {copy.content}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
