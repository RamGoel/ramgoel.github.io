import { PageMeta } from '@/components/PageMeta'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight } from 'lucide-react'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import moment from 'moment'
import path from 'path'
import { projects, projectGroups } from '@/utils/data'
import BlockResolvePhotos from '@/components/BlockResolvePhotos'
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
const communityPhotos = ['/talk-1.png', '/talk-2.png', '/talk-3.png', '/talk-4.png']

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
                alt="Preview"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease }}
                className="object-contain rounded-lg"
                style={{ maxWidth: 'calc(100vw - 200px)', maxHeight: 'calc(100vh - 200px)' }}
                onClick={(e) => e.stopPropagation()}
            />
        </motion.div>
    )
}

export default function Home({ blogs = [] }: { blogs: Blog[] }) {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
    const closeLightbox = useCallback(() => setLightboxSrc(null), [])
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        sarvam: true,
        conch: false,
        personal: false,
    })

    const toggleGroup = (id: string) => {
        setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
    }

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
                    className="w-full max-w-2xl px-5 py-6 lg:py-16 flex flex-col items-center"
                >
                    {/* Left column */}
                    <div className="space-y-10 w-full">
                        {/* Photos — personal + community, block-resolve cycle */}
                        <motion.div variants={staggerItem} className="flex gap-3">
                            <BlockResolvePhotos
                                photos={photos}
                                onSelect={setLightboxSrc}
                                alt="Ram Goel"
                            />
                            <BlockResolvePhotos
                                photos={communityPhotos}
                                onSelect={setLightboxSrc}
                                alt="Community"
                                objectPosition="object-center"
                                className="h-44 aspect-video"
                                width={313}
                                height={176}
                            />
                        </motion.div>

                        {/* About */}
                        <motion.div variants={staggerItem} className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-normal text-neutral-900 dark:text-neutral-100">Hi, I'm Ram Goel</h1>
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 transition-colors duration-200">
                                    <FileText size={14} />
                                    Resume
                                </a>
                            </div>
                            <div className="space-y-4 text-sm">
                                <p className="text-neutral-600 dark:text-neutral-400 leading-loose">
                                    Currently at{' '}
                                    <a href="https://sarvam.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Sarvam AI
                                    </a>
                                    {' '}on frontend platform and voice agents. Previously sole engineer at{' '}
                                    <a href="https://getconch.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Conch AI
                                    </a>
                                    {' '}(acquired), and SEO/performance at{' '}
                                    <a href="https://animall.in" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Animall
                                    </a>
                                    {' '}for 100K+ daily users. Into frontend, AI × design, and on-device models — I speak at conferences and ship weekend projects. Coding since 2019.
                                </p>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-loose">
                                    <a href="https://github.com/RamGoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        GitHub
                                    </a>
                                    {' '}&middot;{' '}
                                    <a href="https://x.com/theRamGoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Twitter
                                    </a>
                                    {' '}&middot;{' '}
                                    <a href="https://linkedin.com/in/ramgoel" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        LinkedIn
                                    </a>
                                    {' '}&middot;{' '}
                                    <a href="mailto:rgoel766@gmail.com" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Email
                                    </a>
                                </p>
                            </div>
                        </motion.div>

                        {/* Things I&apos;ve Built */}
                        <motion.div variants={staggerItem} className="space-y-3">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Things I&apos;ve Built</h3>
                            <div className="space-y-2">
                                {projectGroups.map((group) => {
                                    const items = projects.filter((p) => p.group === group.id)
                                    const open = openGroups[group.id]

                                    return (
                                        <div key={group.id}>
                                            <button
                                                type="button"
                                                onClick={() => toggleGroup(group.id)}
                                                className="group flex items-center gap-1.5 text-sm text-neutral-900 dark:text-neutral-100"
                                                aria-expanded={open}
                                            >
                                                <ChevronRight
                                                    size={14}
                                                    className={`text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ease-out ${open ? 'rotate-90' : ''}`}
                                                />
                                                <span className="slide-underline">{group.label}</span>
                                                <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                                                    {items.length}
                                                </span>
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {open && (
                                                    <motion.ul
                                                        key={group.id}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="relative ml-[6px] mt-2 space-y-3 border-l border-dotted border-neutral-300 dark:border-neutral-600 pl-5 py-1">
                                                            {items.map((project) => {
                                                                const label = (
                                                                    <>
                                                                        {project.title}
                                                                        {project.in_progress && (
                                                                            <span className="ml-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                                                                WIP
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                )

                                                                const branch = (
                                                                    <svg
                                                                        aria-hidden
                                                                        viewBox="0 0 20 16"
                                                                        className="pointer-events-none absolute -left-5 top-0 h-4 w-5 overflow-visible text-neutral-300 dark:text-neutral-600"
                                                                    >
                                                                        <path
                                                                            d="M 0.5 0 C 0.5 11, 2 13, 18 13"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="1"
                                                                            strokeDasharray="1.5 2.5"
                                                                            strokeLinecap="round"
                                                                        />
                                                                    </svg>
                                                                )

                                                                if (project.preview) {
                                                                    return (
                                                                        <li key={project.id + project.title} className="relative">
                                                                            {branch}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => setLightboxSrc(project.preview!)}
                                                                                className="slide-underline text-left text-sm text-neutral-900 dark:text-neutral-100"
                                                                            >
                                                                                {label}
                                                                            </button>
                                                                        </li>
                                                                    )
                                                                }

                                                                if (project.url) {
                                                                    const external = project.url.startsWith('http')
                                                                    return (
                                                                        <li key={project.id + project.title} className="relative">
                                                                            {branch}
                                                                            <a
                                                                                href={project.url}
                                                                                {...(external
                                                                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                                                                    : {})}
                                                                                className="slide-underline text-sm text-neutral-900 dark:text-neutral-100"
                                                                            >
                                                                                {label}
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                }

                                                                return (
                                                                    <li key={project.id + project.title} className="relative">
                                                                        {branch}
                                                                        <p className="text-sm text-neutral-900 dark:text-neutral-100">{label}</p>
                                                                    </li>
                                                                )
                                                            })}
                                                        </div>
                                                    </motion.ul>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Blogs */}
                        <motion.div variants={staggerItem} className="space-y-3">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Blogs</h3>
                            <ul className="space-y-4 text-sm">
                                {blogs.map((blog) => (
                                    <li key={blog.slug} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                                        <Link href={`/blog/${blog.slug}`} className="slide-underline text-neutral-900 dark:text-neutral-100">
                                            {blog.title}
                                        </Link>
                                        <span className="text-neutral-400 dark:text-neutral-500 shrink-0 text-xs sm:text-sm">
                                            {blog.date}
                                        </span>
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
