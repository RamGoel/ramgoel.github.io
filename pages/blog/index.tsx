import { motion } from 'framer-motion'
import fs from 'fs'
import matter from 'gray-matter'
import moment from 'moment'
import Link from 'next/link'
import path from 'path'

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

type Blog = {
    title: string
    date: string
    slug: string
}

const BlogPage = ({ blogs }: { blogs: Blog[] }) => {
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
                            Writing
                        </h3>
                        {blogs.length === 0 ? (
                            <p className="text-sm text-neutral-500">No posts yet.</p>
                        ) : (
                            <ul className="space-y-4 text-sm">
                                {blogs.map((blog) => (
                                    <li key={blog.slug} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className="slide-underline text-neutral-900"
                                        >
                                            {blog.title}
                                        </Link>
                                        <span className="text-neutral-400 shrink-0 text-xs sm:text-sm">
                                            {blog.date}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default BlogPage

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
