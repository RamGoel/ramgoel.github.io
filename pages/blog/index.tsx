import CustomLink from '@/components/CustomLink'
import { VapiWidget } from '@/components/VapiWidget'
import fs from 'fs'
import matter from 'gray-matter'
import moment from 'moment'
import path from 'path'

const BlogPage = ({ blogs }: { blogs: any }) => {
    return (
        <div className="flex flex-col gap-4">
            {blogs.map((blog: any) => (
                <div
                    key={blog.slug}
                    className="flex opacity-60 hover:opacity-100 text-md flex-col md:flex-row md:items-center justify-between gap-2"
                >
                    <CustomLink href={`/blog/${blog.slug}`}>
                        {blog.title}
                    </CustomLink>
                    <p className="text-neutral-500">{blog.date}</p>
                </div>
            ))}

            <VapiWidget />
        </div>
    )
}

export default BlogPage

export const getStaticProps = async () => {
    const blogsDir = path.join(process.cwd(), 'blogs')
    
    // Check if blogs directory exists
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
                title: data.title,
                date: moment(data.date).format('DD MMM, YYYY'),
                slug: fileName.replace('.md', ''),
                ignore: data.ignore || false,
            }
        })
        .sort((a, b) => {
            return moment(b.date).diff(moment(a.date))
        })

    return { props: { blogs: blogs.filter((blog) => !blog.ignore) } }
}
