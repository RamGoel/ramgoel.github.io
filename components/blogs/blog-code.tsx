import React from 'react'
import toast, { Toaster } from 'react-hot-toast';

const BlogCode = ({ code }: { code: string }) => {
    return (
        <div className='bg-black rounded-lg p-5 mt-4 flex items-top justify-start'>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
            <i onClick={() => {
                navigator.clipboard.writeText(code);
                toast.success('Copied to Clipboard!')
            }} className='fa fa-clipboard text-white opacity-80 text-lg mr-5 hover:text-slate-200 hover:scale-105 transition-all cursor-pointer'></i>
            <code className='text-lg text-white opacity-80'><pre>{code}</pre></code>
        </div>
    )
}

export default BlogCode