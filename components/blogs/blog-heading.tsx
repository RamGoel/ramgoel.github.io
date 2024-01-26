import React from 'react'

const styleMapper = {
    'page': 'text-4xl font-bold leading-normal',
    'sub': 'text-2xl',
    'section':'text-3xl font-semibold'
}
const BlogHeading = ({ size='sub', text }: { size: 'page' | 'sub' | 'section', text: string }) => {
    return (
        <div className='mb-4 my-12'>
            <h1 className={`${styleMapper[size]} text-white`}>{text}</h1>
        </div>
    )
}

export default BlogHeading