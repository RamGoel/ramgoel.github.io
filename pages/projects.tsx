'use client'
import Layout from '@/components/Layout'
import { miniProjects, projects } from '@/utils/data'
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

export default function ProjectsPage() {
    return (
        <Layout>
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
        </Layout>
    )
}
