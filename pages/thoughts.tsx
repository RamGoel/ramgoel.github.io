'use client'
import Layout from '@/components/Layout'
import { talks } from '@/utils/data'
import { motion } from 'framer-motion'

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

export default function ThoughtsPage() {
    return (
        <Layout>
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
                                href="https://medium.com/p/781298957e8f?postPublishedType=initial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="slide-underline text-neutral-900"
                            >
                                The Pagination Architecture
                            </a>
                            <span className="text-neutral-500"> — that works at scale</span>
                        </li>
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
        </Layout>
    )
}
