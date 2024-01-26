import BlogHeading from '@/components/blogs/blog-heading'
import React from 'react'
import { BlogRouter } from '../../utils/router'
import BlogCard from '@/components/blogs/blog-card'

const BlogList = () => {
  return (
      <div className='w-10/12 my-10 mx-auto'>
          <title>Blogs@RamGoel</title>
          <BlogHeading size='page' text='Latest Blogs' />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:grid-cols-4'>
              {
                  Object.keys(BlogRouter).map(item => {
                      return <BlogCard key={item} slug={item} heading={BlogRouter[item].title} shortText='Helllel' date={BlogRouter[item].date} />
                  })
              }
          </div>
    </div>
  )
}

export default BlogList