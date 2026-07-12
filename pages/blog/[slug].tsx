import { motion } from 'framer-motion'
import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'

const ease = [0.25, 0.4, 0.25, 1] as const

const BlogPage = ({
    blogString,
    blogData,
}: {
    blogString: string
    blogData: { title: string; date: string; slug: string }
}) => {
    const html = md({
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
    }).render(blogString)

    return (
        <>
            <Head>
                <title>{`${blogData.title} - Ram Goel`}</title>
                <meta
                    name="description"
                    content={`${blogData.title} - Ram Goel`}
                    data-rh="true"
                />
                <meta
                    property="og:title"
                    content={`${blogData.title} - Ram Goel`}
                />
                <meta
                    property="og:description"
                    content={`${blogData.title} - Ram Goel`}
                />
                <meta
                    property="og:image"
                    content={`https://ramgoel.github.io/api/og?title=${encodeURIComponent(blogData.title)}`}
                />
                <meta
                    property="og:url"
                    content={`https://ramgoel.github.io/blog/${blogData.slug}`}
                />
                <meta
                    name="twitter:title"
                    content={`${blogData.title} - Ram Goel`}
                />
                <meta
                    name="twitter:description"
                    content={`${blogData.title} - Ram Goel`}
                />
                <meta
                    name="twitter:image"
                    content={`https://ramgoel.github.io/api/og?title=${encodeURIComponent(blogData.title)}`}
                />
            </Head>

            <div className="min-h-screen flex justify-center">
                <div className="w-full max-w-2xl px-5 lg:px-6 py-6 lg:py-16">
                    <motion.article
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease }}
                        className="space-y-8"
                    >
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
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

                        <header className="space-y-2">
                            <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
                                {blogData.title}
                            </h1>
                            <p className="text-sm text-neutral-500">{blogData.date}</p>
                        </header>

                        <div
                            className="blog-prose"
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </motion.article>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const blogsDir = path.join(process.cwd(), 'blogs')

    if (!fs.existsSync(blogsDir)) {
        return { paths: [], fallback: false }
    }

    const blogs = fs.readdirSync(blogsDir)
    return {
        paths: blogs.map((blog) => ({
            params: { slug: blog.replace('.md', '') },
        })),
        fallback: false,
    }
}

export const getStaticProps = async ({
    params,
}: {
    params: { slug: string }
}) => {
    const blogPath = path.join(process.cwd(), 'blogs', `${params.slug}.md`)

    if (!fs.existsSync(blogPath)) {
        return { notFound: true }
    }

    const thisBlog = fs.readFileSync(blogPath, 'utf8')
    const { content, data } = matter(thisBlog)

    if (data.ignore) {
        return { notFound: true }
    }

    return {
        props: {
            blogString: content,
            blogData: {
                title: data.title,
                date: moment(data.date).format('DD MMM, YYYY'),
                slug: params.slug,
            },
        },
    }
}

export default BlogPage
