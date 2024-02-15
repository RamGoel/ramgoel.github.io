import React from 'react'

const Contact = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='mx-auto my-10 flex items-center justify-between '>
                <div className='border-2 rounded-lg p-2 mx-auto flex flex-col md:flex-row items-center justify-between'>
                    <a href='mailto:rgoel766@gmail.com?subject=Hello Ram&body=I came from your website, I need a freelancer for my business' className='p-1 bg-white flex items-center rounded-lg px-4 text-black hover:scale-105 transition-all justify-center w-full'>send me a mail!</a>
                </div>
            </div>
        </div>
    )
}

export default Contact