import { containerVariants } from '@/utils/animations'
import { motion } from 'framer-motion'
import React from 'react'
import { BlogSection, ProjectsSection, SocialsSection } from '..'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

const BlogPage = ({ posts }: { posts: any }) => {
    return (
        <motion.section
            className={`bg-zinc-900 text-white min-h-screen`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <title>Blog - Ram Goel</title>
            <motion.main
                variants={containerVariants}
                className="py-[5vh] w-11/12 md:w-10/12 xl:w-[45%] mx-auto flex flex-col gap-3"
            >
                <SocialsSection />
                <BlogSection posts={posts} />

                <div className="flex flex-col justify-center items-center gap-2 mt-5 opacity-60 text-sm">
                    <p>--- x --- x --- x --- x --- x ---</p>
                </div>
            </motion.main>
        </motion.section>
    )
}

export default BlogPage

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
