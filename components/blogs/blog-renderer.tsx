import React from 'react'
import ComponentRenderer from './component-render'
import BlogHeading from './blog-heading'
import BlogAuthor from './blog-author'
import { useRouter } from 'next/router'
type BlogRendererProps = {
    blogData: any
}

type ComponentProps = {
    type: string,
    text: string,
    size: 'page' | 'sub' | 'section'
}
const BlogRenderer = ({ blogData }: BlogRendererProps) => {
    const router = useRouter();
    return (
        <div className='w-10/12 mx-auto my-12'>
            <title>{blogData.title}</title>
            <div className='-my-2' onClick={()=>router.push('/blog')}>
                <i className='fa text-white fa-arrow-left cursor-pointer text-2xl hover:opacity-50'></i>
            </div>
            <BlogAuthor date={blogData.date} />
            <BlogHeading size='page' text={blogData.title} />
            {
                blogData.content.map((item: ComponentProps) => {
                    return <ComponentRenderer key={item.text} {...item} />
                })
            }
        </div>
    )
}

export default BlogRenderer