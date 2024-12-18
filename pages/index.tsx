import CustomTooltip from '@/components/custom-tooltip'
import { childVariants, containerVariants } from '@/utils/animations'
import { projects, socials } from '@/utils/data'
import { motion } from 'framer-motion'
import fs from 'fs'
import matter from 'gray-matter'
import { ArrowUpRight } from 'lucide-react'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'
import { useEffect, useState } from 'react'
import { RiYoutubeFill, RiYoutubeLine } from 'react-icons/ri'

export default function Home({ posts }: { posts: any }) {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Head>
                <title>Ram Goel - GenAI and Full Stack Developer</title>
            </Head>
            <CustomTooltip id="hover-tooltip" />
            <motion.main
                variants={containerVariants}
                className="py-[5vh] w-11/12 md:w-10/12 xl:w-[45%] mx-auto flex flex-col gap-8"
            >
                <SocialsSection />
                <Image
                    src="/despo.png"
                    width={1000}
                    className="w-11/12 my-[-20px] rounded-lg"
                    height={1000}
                    alt="profile-image"
                />
                <AboutSection />
                <ProjectsSection />
                <BlogSection posts={posts} />
            </motion.main>
        </motion.section>
    )
}

const AboutSection = () => {
    return (
        <div className="flex flex-col gap-2">
            <motion.p variants={childVariants}>
                I&apos;m Ram Goel. I&apos;ve been in software development for{' '}
                {moment().diff(moment('2022-01-01'), 'years')} years.
            </motion.p>

            <motion.p variants={childVariants}>
                A full-stack engineer from India, worked at few startups and did
                some freelance projects.
            </motion.p>

            <motion.p variants={childVariants}>
                Reach out if you want to find a way to work together!
            </motion.p>
        </div>
    )
}

export const ProjectsSection = ({ hideTitle }: { hideTitle?: boolean }) => {
    return (
        <motion.ol
            variants={containerVariants}
            className="flex list-decimal flex-col gap-4"
        >
            {!hideTitle ? (
                <div className="flex flex-col items-start md:flex-row md:items-center justify-between">
                    <h3 className="text-xl font-bold">Side Projects</h3>
                    <Link
                        className="underline flex opacity-60 hover:opacity-100 items-center text-yellow-300"
                        href={
                            'https://www.linkedin.com/in/ramgoel/details/experience/'
                        }
                    >
                        Work Experience <ArrowUpRight size={20} />
                    </Link>
                </div>
            ) : null}
            {projects.map((project, index) => (
                <motion.li
                    key={project.id}
                    variants={childVariants}
                    className="flex flex-col w-full md:flex-row items-center gap-2"
                >
                    <div className="hidden md:flex items-center flex-1 gap-2">
                        <p className="">{index + 1}.</p>
                        <Link
                            href={project.url}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {project.title}
                        </Link>
                        <p className="text-neutral-500 text-left">
                            {project.content}
                        </p>
                    </div>
                    <div className="flex md:hidden items-center w-full gap-2">
                        <p className="">{index + 1}.</p>
                        <Link
                            href={project.url}
                            className="underline hover:text-yellow-200 transition-all"
                        >
                            {project.title}
                        </Link>

                        <p className="text-neutral-500 ml-auto text-right">
                            {project.users} users
                        </p>
                        {project.active && (
                            <div
                                data-tooltip-id="hover-tooltip"
                                data-tooltip-content="Actively working on it"
                                className="bg-green-500 w-2 h-2 animate-pulse rounded-full"
                            ></div>
                        )}
                    </div>
                    <p className="block md:hidden w-full text-neutral-500 text-left">
                        {project.content}
                    </p>
                    <div className="hidden md:flex items-center w-fit gap-2">
                        <p className="text-neutral-500 ml-auto text-right">
                            {project.users} users
                        </p>
                        {project.active && (
                            <div
                                data-tooltip-id="hover-tooltip"
                                data-tooltip-content="Actively working on it"
                                className="bg-green-500 w-2 h-2 animate-pulse rounded-full"
                            ></div>
                        )}
                    </div>
                </motion.li>
            ))}
        </motion.ol>
    )
}

const SocialsSection = () => {
    const [showAllProjects, setShowAllProjects] = useState(false)

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        const showAll = query.has('showAll')
        if (showAll) {
            setShowAllProjects(true)
        }
    }, [])
    return (
        <motion.div
            variants={childVariants}
            className="flex flex-col md:flex-row items-center my-1 justify-start gap-6"
        >
            <div className="flex gap-6 items-center justify-center md:justify-start w-full">
                {socials.map((social) => (
                    <motion.div key={social.name} variants={childVariants}>
                        <Link
                            href={social.url}
                            data-tooltip-id="hover-tooltip"
                            data-tooltip-content={social.name}
                            className="flex items-center gap-2 hover:scale-110 transition-all"
                        >
                            <social.icon size={20} />
                        </Link>
                    </motion.div>
                ))}
                {showAllProjects && (
                    <Link href="/landing" className="ml-auto hidden md:block">
                        <div className="text-yellow-500 bg-yellow-800/30 text-sm rounded-full border-2 border-yellow-700/30 w-fit px-3 py-1 flex items-center gap-2">
                            <ArrowUpRight size={18} /> see mobile apps & landing
                            pages I built
                        </div>
                    </Link>
                )}
            </div>
        </motion.div>
    )
}

const BlogSection = ({ posts }: { posts: any }) => {
    return (
        <motion.div variants={containerVariants}>
            <h3 className="text-xl font-bold">Blog</h3>
            {posts.length ? (
                <div className="flex flex-col gap-2">
                    {posts.map((post: any) => (
                        <Link
                            href={`/posts/${post.slug}`}
                            key={post.slug}
                            className="flex justify-between hover:text-yellow-200 border-zinc-700 hover:border-zinc-500 border-dashed transition-all duration-300 w-full py-3"
                        >
                            <p>{post.title}</p>

                            <div className="flex items-center gap-2">
                                {post.youtube && (
                                    <RiYoutubeLine
                                        size={18}
                                        data-tooltip-id="hover-tooltip"
                                        data-tooltip-content="Related video available"
                                        className="text-neutral-500"
                                    />
                                )}
                                <p className="text-sm text-neutral-500">
                                    {moment(post.date).format('DD MMM YYYY')}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : null}
        </motion.div>
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
            youtube: data.youtube,
        }
    })

    return {
        props: {
            posts,
        },
    }
}
