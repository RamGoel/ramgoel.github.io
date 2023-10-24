import React from 'react'

const Contact = () => {
    return (
        <div className='section flex items-center justify-center'>
            <div className='w-11/12 mx-auto flex items-center justify-between p-4 '>
                <div className='border-2 rounded-lg p-2 mx-auto flex items-center justify-between'>
                    <input type="text" placeholder='email' className='p-3 bg-black border-none focus-visible:outline-none' />
                    <a href='mailto:rgoel766@gmail.com?subject=Hello Ram&body=I came from your website, I need a freelancer for my business' className='p-1 bg-white flex items-center self-stretch rounded-lg px-4 text-black hover:scale-105 transition-all'>get a quote</a>
                </div>
            </div>
        </div>
    )
}

export default Contact