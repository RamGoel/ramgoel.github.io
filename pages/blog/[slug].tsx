import ComponentRenderer from '@/components/blogs/component-render';
import { useRouter } from 'next/router'
import React from 'react'
import { BlogRouter } from './router';
import BlogRenderer from '@/components/blogs/blog-renderer';

const BlogPage = () => {
    const router = useRouter();


    return (
        router?.query?.slug ? <BlogRenderer blogData={BlogRouter[(router.query.slug as any)]} /> : null
    )
}

export default BlogPage