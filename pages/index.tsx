import { PageMeta } from '@/components/PageMeta'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText } from 'lucide-react'
import fs from 'fs'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import path from 'path'
import { talks, projects } from '@/utils/data'
import Card from '@/components/Card'
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
                                        <Image src={src} alt="Ram Goel" width={112} height={112} className="w-full h-full object-cover object-top transition-all duration-300" />
                                    </div>
                                </button>
                            ))}
                        </motion.div>

                        {/* About */}
                        <motion.div variants={staggerItem} className="space-y-5">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold text-neutral-900">Ram Goel</h1>
                                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-200">
                                    <FileText size={14} />
                                    Resume
                                </a>
                            </div>
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

                        {/* Things I've Built */}
                        <motion.div variants={staggerItem} className="space-y-3 w-full">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Things I've Built</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {projects.slice(0, 4).map((project, i) => {
                                    const img = i === 0 ? `/project-1.gif` : i === 1 ? `/project-2.gif` : i === 2 ? `/project-3.gif` : i === 3 ? `/project-4.gif` : `/project-${i + 1}.png`
                                    return (
                                        <Card
                                            key={project.id + project.title}
                                            image={img}
                                            title={project.title}
                                            description={project.content}
                                            onClick={() => setLightboxSrc(img)}
                                        />
                                    )
                                })}
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

                        {/* Talks */}
                        <motion.div variants={staggerItem} className="space-y-3 w-full">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">Community</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[...talks].reverse().map((talk, i) => (
                                    <Card
                                        key={talk.id}
                                        image={`/talk-${talks.length - i}.png`}
                                        title={talk.title}
                                        description={talk.content}
                                        onClick={() => setLightboxSrc(`/talk-${talks.length - i}.png`)}
                                    />
                                ))}
                            </div>
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
