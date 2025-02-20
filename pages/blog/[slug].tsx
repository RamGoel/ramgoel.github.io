import { containerVariants } from '@/utils/animations'
import { motion } from 'framer-motion'
import fs from 'fs'
import matter from 'gray-matter'
import md from 'markdown-it'
import moment from 'moment'
import Head from 'next/head'
import path from 'path'

const BlogPage = ({
    blogString,
    blogData,
}: {
    blogString: any
    blogData: any
}) => {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
        >
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
                    content={`https://ramgoel.com/api/og?title=${blogData.title}`}
                />
                <meta
                    property="og:url"
                    content={`https://ramgoel.com/blog/${blogData.slug}`}
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
                    content={`https://ramgoel.com/api/og?title=${blogData.title}`}
                />
            </Head>
            <motion.main
                variants={containerVariants}
                className="text-sm flex flex-col gap-6"
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium">{blogData.title}</h1>
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
    const thisBlog = fs.readFileSync(
        path.join(process.cwd(), 'blogs', `${params.slug}.md`),
        'utf8'
    )
    const { content, data } = matter(thisBlog)

    if (data.ignore) {
        return {
            notFound: true,
        }
    }
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
