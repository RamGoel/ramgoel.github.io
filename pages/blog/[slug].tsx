import path from 'path'
import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import moment from 'moment'
import { motion } from 'framer-motion'
import { containerVariants } from '@/utils/animations'
import Head from 'next/head'
import md from 'markdown-it'
import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { LINKEDIN_PROFILE_URL } from '@/utils/strings'

const BlogPage = ({
    blogString,
    blogData,
}: {
    blogString: any
    blogData: any
}) => {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
        >
            <Head>
                <title>{blogData.title}</title>
                <meta property="og:title" content={blogData.title} />
                <meta property="og:description" content={blogData.content} />
                <meta
                    property="og:image"
                    content={`/api/og?title=${blogData.title}`}
                />
            </Head>
            <motion.main
                variants={containerVariants}
                className="py-[5vh] w-11/12 text-sm md:w-10/12 xl:w-[45%] mx-auto flex flex-col gap-6"
            >
                <div className="flex flex-col font-mono gap-2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-neutral-500"
                    >
                        <ArrowLeftIcon className="w-4 h-4" /> All Blogs
                    </Link>
                    <h1 className="text-2xl font-bold">{blogData.title}</h1>
                    <p className="text-neutral-500">
                        Posted on {blogData.date}
                    </p>
                    <div
                        className="prose custom-prose"
                        dangerouslySetInnerHTML={{
                            __html: md().render(blogString, {
                                html: true,
                                breaks: true,
                                linkify: true,
                                typographer: true,
                            }),
                        }}
                    />
                </div>
            </motion.main>
        </motion.section>
    )
}

export const getStaticPaths = async () => {
    const blogs = fs.readdirSync(path.join(process.cwd(), 'blogs'))
    return {
        paths: blogs.map((blog) => ({ params: { slug: blog } })),
        fallback: false,
    }
}

export const getStaticProps = async ({
    params,
}: {
    params: { slug: string }
}) => {
    const thisBlog = fs.readFileSync(
        path.join(process.cwd(), 'blogs', params.slug),
        'utf8'
    )
    const { content, data } = matter(thisBlog)
    return {
        props: {
            blogString: content,
            blogData: {
                title: data.title,
                date: moment(data.date).format('DD MMM, YYYY'),
            },
        },
    }
}

export default BlogPage
