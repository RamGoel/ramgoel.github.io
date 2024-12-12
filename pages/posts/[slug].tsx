import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Head from 'next/head'
import moment from 'moment'
import { Bricolage_Grotesque } from 'next/font/google'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft } from 'lucide-react'

const font = Bricolage_Grotesque({ subsets: ['latin'] })

export default function BlogPost({ frontmatter, content, posts }: any) {
    const otherPosts = posts.filter(
        (post: any) => post.title !== frontmatter.title
    )
    return (
        <div className="bg-zinc-900 min-h-screen text-white">
            <Head>
                <title>{`${frontmatter?.title} - Ram Goel`}</title>
                <meta
                    name="description"
                    content={`${frontmatter?.title} - Ram Goel`}
                />
                <meta property="og:title" content={`${frontmatter?.title}`} />
                <meta
                    property="og:description"
                    content={`${frontmatter?.title} - Ram Goel`}
                />
                <meta
                    property="og:image"
                    content={`/api/og?title=${frontmatter?.title}`}
                />
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                <meta
                    name="title"
                    content={`${frontmatter?.title}`}
                    data-rh="true"
                />
                <meta
                    name="description"
                    content={`${frontmatter?.title} - Ram Goel`}
                    data-rh="true"
                />
                <meta name="author" content="Ram Goel" />
                <link rel="author" href="https://ramgoel.com" data-rh="true" />

                <meta property="og:title" content={`${frontmatter?.title}`} />
                <meta
                    property="og:description"
                    content={`${frontmatter?.title} - Ram Goel`}
                />
                <meta
                    property="og:image"
                    content={`https://ramgoel.com/api/og?title=${frontmatter?.title}`}
                />
                <meta
                    property="og:url"
                    content={`https://ramgoel.com/posts/${frontmatter?.slug}`}
                />

                <meta name="twitter:title" content={`${frontmatter?.title}`} />
                <meta
                    name="twitter:description"
                    content={`${frontmatter?.title} - Ram Goel`}
                />
                <meta
                    name="twitter:image"
                    content={`https://ramgoel.com/api/og?title=${frontmatter?.title}`}
                />
                <meta name="twitter:site" content="@theramgoel" />
                <meta name="twitter:creator" content="@theramgoel" />
                <meta name="twitter:card" content="summary_large_image" />

                <meta name="theme-color" content="#18181B" />
                <meta property="og:site_name" content="Ram Goel" />
                <title>{`${frontmatter?.title} - Ram Goel`}</title>
            </Head>

            <div
                className={`flex flex-col gap-2 max-w-2xl pt-5 mx-auto rounded-xl ${
                    otherPosts.length > 0 ? '' : 'pb-[50px]'
                }`}
            >
                <div className="flex justify-between items-center py-4">
                    <Link
                        href="/"
                        className="flex items-center opacity-60 hover:opacity-100 transition-all duration-300 gap-2"
                    >
                        <ChevronLeft size={18} /> Home
                    </Link>
                </div>
                <h1 className={`text-3xl ${font.className} font-semibold`}>
                    {frontmatter?.title}
                </h1>
                <p className="text-md opacity-60">
                    {moment(frontmatter?.date).format('DD MMMM YYYY')}
                </p>
                <ReactMarkdown
                    className={`${font.className}`}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-2xl font-semibold">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-xl font-semibold">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-lg font-semibold">
                                {children}
                            </h3>
                        ),
                        p: ({ children }) => (
                            <p className="text-md">{children}</p>
                        ),
                        code: ({ inline, children, className }: any) => {
                            return (
                                <code className="bg-zinc-800 p-1 rounded-md">
                                    {children}
                                </code>
                            )
                        },
                        ul: ({ children }) => (
                            <ul className="list-disc pl-4">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal pl-4">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="mb-4">{children}</li>
                        ),
                        br: () => <br />,
                        a: ({ children, href }: any) => (
                            <Link href={href} className="underline">
                                {children}
                            </Link>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="bg-zinc-800 p-4 rounded-md">
                                {children}
                            </blockquote>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {otherPosts.length > 0 && (
                <div className="p-4 pb-[50px] flex flex-col gap-2 max-w-2xl pt-10 mx-auto rounded-xl">
                    <h3 className="text-xl font-semibold">More Posts</h3>
                    <div className="flex flex-col gap-2">
                        {otherPosts.map((post: any) => (
                            <Link
                                href={`/posts/${post.slug}`}
                                key={post.slug}
                                className="border-b-[.5px] border-zinc-700 hover:border-zinc-500 border-dashed transition-all duration-300 w-full py-3"
                            >
                                <button>{post.title}</button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filenames = fs.readdirSync(postsDirectory)

    const paths = filenames.map((filename) => ({
        params: { slug: filename.replace('.md', '') },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const filepath = path.join(postsDirectory, `${params.slug}.md`)
    const fileContents = fs.readFileSync(filepath, 'utf8')

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

    const { data, content } = matter(fileContents)

    return {
        props: {
            frontmatter: data,
            content,
            posts,
        },
    }
}
