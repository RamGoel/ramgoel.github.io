'use client'
import Layout from '@/components/Layout'
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

export default function Home() {
    return (
        <Layout>
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
                    <p className="text-neutral-600 leading-loose">
                        I&apos;m a frontend engineer at{' '}
                        <a href="https://sarvam.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                            sarvam
                        </a>
                        . My work spans building interfaces for voice AI products, design systems, and developer tools.
                    </p>
                    <p className="text-neutral-600 leading-loose">
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
                    <p className="text-neutral-600 leading-loose">
                        Outside work — movies, speaking at events, and traveling somewhere.
                    </p>
                    <p className="text-neutral-600 leading-loose">
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
            </motion.div>
        </Layout>
    )
}
