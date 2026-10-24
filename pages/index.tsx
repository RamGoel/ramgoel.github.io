import { PageMeta } from '@/components/PageMeta'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight } from 'lucide-react'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import moment from 'moment'
import path from 'path'
import { projects, projectGroups } from '@/utils/data'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { Tooltip, type TooltipRefProps } from 'react-tooltip'

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

function ProjectPreview({ src, title }: { src: string; title: string }) {
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

    return (
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900">
            {status !== 'ready' && (
                <p
                    role="status"
                    className="text-center text-xs text-neutral-500 dark:text-neutral-400"
                >
                    {status === 'error'
                        ? 'Preview unavailable'
                        : 'Loading preview…'}
                </p>
            )}
            {status !== 'error' && (
                <Image
                    src={src}
                    alt={`${title} preview`}
                    fill
                    sizes="320px"
                    unoptimized
                    className={`object-contain ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setStatus('ready')}
                    onError={() => setStatus('error')}
                />
            )}
        </div>
    )
}

export default function Home({ blogs = [] }: { blogs: Blog[] }) {
    const previewRef = useRef<TooltipRefProps>(null)
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
                title="Ram's Space"
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
                    <div className="space-y-6 w-full">
                        {/* Photo */}
                        <figure className="relative h-44 w-44 overflow-hidden rounded-lg">
                            <Image
                                src="/ram.png"
                                alt="Ram Goel"
                                width={460}
                                height={460}
                                className="h-full w-full object-cover object-top"
                                priority
                            />
                            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-1 pt-6 font-display text-xs font-medium tracking-wide text-white/80">
                                Munnar&apos;26
                            </figcaption>
                        </figure>

                        {/* About */}
                        <motion.div variants={staggerItem} className="space-y-5">
                            <div className="space-y-4 text-sm">
                                <p className="text-neutral-600 dark:text-neutral-400 leading-loose">
                                    Currently at{' '}
                                    <a href="https://sarvam.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Sarvam
                                    </a>
                                    {' '}building interfaces for agents. Previously sole engineer at{' '}
                                    <a href="https://getconch.ai" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Conch AI
                                    </a>
                                    {' '}(acquired), and SEO/performance at{' '}
                                    <a href="https://animall.in" target="_blank" rel="noopener noreferrer" className="slide-underline text-neutral-900 dark:text-neutral-100">
                                        Animall
                                    </a>
                                    {' '}for 100K+ daily users.
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
                                                                const label = project.title

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
                                                                                data-tooltip-id="project-preview"
                                                                                data-tooltip-content={project.preview}
                                                                                data-project-preview={project.id}
                                                                                aria-describedby="project-preview"
                                                                                onClick={() => previewRef.current?.open({
                                                                                    anchorSelect: `[data-project-preview="${project.id}"]`,
                                                                                })}
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
            <Tooltip
                ref={previewRef}
                id="project-preview"
                place="right"
                positionStrategy="fixed"
                offset={12}
                delayShow={120}
                delayHide={180}
                clickable
                noArrow
                opacity={1}
                globalCloseEvents={{
                    escape: true,
                    scroll: true,
                    resize: true,
                    clickOutsideAnchor: true,
                }}
                className="!z-50 !rounded-md !border-0 !bg-transparent !p-0 shadow-md motion-reduce:!transition-none"
                style={{
                    width: 'min(320px, calc(100vw - 24px), calc((100vh - 24px) * 16 / 9))',
                }}
                render={({ content, activeAnchor }) =>
                    content && (
                        <ProjectPreview
                            key={content}
                            src={content}
                            title={activeAnchor?.textContent?.trim() || 'Project'}
                        />
                    )
                }
            />
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
