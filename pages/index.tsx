import { PageMeta } from '@/components/PageMeta'
import { motion, AnimatePresence } from 'framer-motion'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import path from 'path'
import { talks, projects } from '@/utils/data'
import { useState, useCallback, useEffect } from 'react'

type Blog = {
    title: string
    date: string
    slug: string
}

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

export default function Home({ blogs = [] }: { blogs: Blog[] }) {
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
            <div className="min-h-screen flex justify-center">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="w-full px-5 lg:px-[100px] py-6 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
                >
                    {/* Left column */}
                    <div className="space-y-10">
                        {/* Photos */}
                        <motion.div variants={staggerItem} className="flex -space-x-3">
                            {photos.map((src, i) => (
                                <button
                                    key={src}
                                    onClick={() => setLightboxSrc(src)}
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
                                    {' '}on frontend platform and voice agents. Previously sole engineer at{' '}
                                    <a href="https://getconch.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                                        Conch AI
                                    </a>
                                    {' '}(acquired), and SEO/performance at{' '}
                                    <a href="https://animall.in" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900">
                                        Animall
                                    </a>
                                    {' '}for 100K+ daily users. Into frontend, AI × design, and on-device models — I speak at conferences and ship weekend projects. Coding since 2019.
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

                        {/* Blogs */}
                        <motion.div variants={staggerItem} className="space-y-3">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Blogs</h3>
                            <ul className="space-y-4 text-sm">
                                {blogs.map((blog) => (
                                    <li key={blog.slug} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                                        <Link href={`/blog/${blog.slug}`} className="slide-underline text-neutral-900">
                                            {blog.title}
                                        </Link>
                                        <span className="text-neutral-400 shrink-0 text-xs sm:text-sm">
                                            {blog.date}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-10 lg:border-l lg:border-dashed lg:border-neutral-200/40 lg:pl-16">
                        {/* Side Projects */}
                        <motion.div variants={staggerItem} className="space-y-3">
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
                        </motion.div>

                        {/* Talks */}
                        <motion.div variants={staggerItem} className="space-y-3">
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
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {lightboxSrc && <Lightbox src={lightboxSrc} onClose={closeLightbox} />}
            </AnimatePresence>
        </>
    )
}

export const getStaticProps = async () => {
    const blogsDir = path.join(process.cwd(), 'blogs')

    if (!fs.existsSync(blogsDir)) {
        return { props: { blogs: [] } }
    }

    const fileNames = fs.readdirSync(blogsDir)
    const blogs = fileNames
        .map((fileName) => {
            const filePath = path.join(blogsDir, fileName)
            const blog = fs.readFileSync(filePath, 'utf8')
            const { data } = matter(blog)

            return {
                title: data.title as string,
                date: moment(data.date).format('DD MMM, YYYY'),
                rawDate: data.date as string,
                slug: fileName.replace('.md', ''),
                ignore: Boolean(data.ignore),
            }
        })
        .filter((blog) => !blog.ignore)
        .sort((a, b) => moment(b.rawDate).diff(moment(a.rawDate)))
        .map(({ title, date, slug }) => ({ title, date, slug }))

    return { props: { blogs } }
}
