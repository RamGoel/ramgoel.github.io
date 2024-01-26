import React from 'react'

const BlogPara = ({ text }: { text: string }) => {
    return (
        <div className='mt-3'>
            <p className='text-white text-xl space-x-2 leading-9'>{text}</p>
        </div>
    )
}

export default BlogPara