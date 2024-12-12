import Navbar from '@/components/nav'
import matter from 'gray-matter'
import moment from 'moment'
import { Bricolage_Grotesque } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import fs from 'fs'
import React from 'react'

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
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                <meta name="title" content="Posts" data-rh="true" />
                <meta
                    name="description"
                    content="Writing about things I care about"
                    data-rh="true"
                />
                <meta name="author" content="Ram Goel" />
                <link rel="author" href="https://ramgoel.com" data-rh="true" />

                <meta property="og:title" content="Posts" />
                <meta
                    property="og:description"
                    content="Writing about things I care about"
                />
                <meta
                    property="og:image"
                    content="https://ramgoel.com/api/og?title=Posts"
                />
                <meta property="og:url" content="https://ramgoel.com/posts" />

                <meta name="twitter:title" content="Posts" />
                <meta
                    name="twitter:description"
                    content="Writing about things I care about"
                />
                <meta
                    name="twitter:image"
                    content="https://ramgoel.com/api/og?title=Posts"
                />
                <meta name="twitter:site" content="@theramgoel" />
                <meta name="twitter:creator" content="@theramgoel" />
                <meta name="twitter:card" content="summary_large_image" />

                <meta name="theme-color" content="#18181B" />
                <meta property="og:site_name" content="Ram Goel" />
                <title>Posts</title>
            </Head>
            <div className="w-10/12 xl:w-1/2 my-[30px] mx-auto">
                {posts.length ? (
                    <div className="flex flex-col gap-2">
                        {posts.map((post: any) => (
                            <Link
                                href={`/posts/${post.slug}`}
                                key={post.slug}
                                className="border-b-[.5px] flex justify-between border-zinc-700 hover:border-zinc-500 border-dashed transition-all duration-300 w-full py-3"
                            >
                                <p>{post.title}</p>

                                <p className="text-sm text-neutral-500">
                                    {moment(post.date).format('DD MMM YYYY')}
                                </p>
                            </Link>
                        ))}
                    </div>
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
