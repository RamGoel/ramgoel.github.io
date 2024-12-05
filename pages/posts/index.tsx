import Navbar from '@/components/nav'
import { posts } from '@/data/posts'
import moment from 'moment'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const PostPage = () => {
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
                    posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex flex-col gap-1 cursor-pointer transition-all duration-300 p-4"
                        >
                            <h1 className="text-2xl font-semibold">
                                {post.title}
                            </h1>
                            <p className="text-md opacity-60">
                                {moment(post.date).format('ddd, DD MMMM YYYY')}
                            </p>
                            <p className="text-md opacity-60">
                                {post.content.slice(0, 100)}...{' '}
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="underline"
                                >
                                    Read more
                                </Link>
                            </p>
                        </div>
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

export default PostPage
