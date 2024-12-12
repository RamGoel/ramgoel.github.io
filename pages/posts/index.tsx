import Navbar from '@/components/nav'
import matter from 'gray-matter'
import moment from 'moment'
import { Bricolage_Grotesque } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const font = Bricolage_Grotesque({ subsets: ['latin'] })

const PostPage = ({ posts }: { posts: any }) => {
    return (
        <div className="bg-zinc-900 text-white min-h-screen">
            <Navbar />
            <Head>
                <title>Posts</title>
                <meta
                    name="description"
                    content="Writing about things I care about"
                />
                <meta property="og:title" content="Posts" />
                <meta
                    property="og:description"
                    content="Writing about things I care about"
                />
                <meta property="og:image" content={`/api/og?title=Posts`} />
            </Head>
            <div className="w-10/12 xl:w-1/2 my-[30px] mx-auto">
                {posts.length ? (
                    posts.map((post: any) => (
                        <Link
                            href={`/posts/${post.slug}`}
                            key={post.id}
                            className="flex hover:bg-zinc-800 rounded-xl flex-col gap-1 cursor-pointer transition-all duration-300 p-4"
                        >
                            <h1
                                className={`text-2xl ${font.className} font-semibold`}
                            >
                                {post.title}
                            </h1>
                            <p className="text-md opacity-60">
                                {moment(post.date).format('ddd, DD MMMM YYYY')}
                            </p>

                            <div className="flex items-center gap-1">
                                <ReactMarkdown className={`${font.className}`}>
                                    {post.content.slice(0, 100) + '...'}
                                </ReactMarkdown>
                                <span className={`${font.className} underline`}>
                                    Read More
                                </span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="w-10/12 xl:w-1/2 my-[30px] mx-auto">
                        <h1 className="text-md text-center text-neutral-600">
                            coming soon...
                        </h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export async function getStaticProps({ params }: { params: any }) {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    const posts = filenames.map((filename) => {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
            slug: filename.replace('.md', ''),
            title: data.title,
            date: data.date,
            content: content,
            id: filename,
        }
    })

    return {
        props: {
            posts,
        },
    }
}

export default PostPage
