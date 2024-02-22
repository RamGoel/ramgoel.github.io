import Link from 'next/link'
import React from 'react'

const Story = () => {
    return (
        <div className='md:h-screen flex items-center mb-10'>
            <div>
                <h1 className='text-8xl shadow text-left font-outline-2 text-transparent font-bold leading-[120px]'>
                    I build, <br />apps and <span className='text-white italic'>websites</span>
                </h1>

                <div className='flex items-center justify-start mt-4'>
                    <Link className='p-2 text-lg underline underline-offset-8 hover:-mb-3 transition-all' href='#experience'>
                        Past Experience  <i className='fa fa-arrow-right -rotate-45 group-hover:ml-2 transition-all'></i>
                    </Link>
                    <Link className='p-2 text-lg underline underline-offset-8 hover:-mb-3 transition-all' href='#projects'>
                        Projects  <i className='fa fa-arrow-right -rotate-45 group-hover:ml-2 transition-all'></i>
                    </Link>
                    <Link className='p-2 text-lg underline underline-offset-8 hover:-mb-3 transition-all' href='#freelance'>
                        Work  <i className='fa fa-arrow-right -rotate-45 group-hover:ml-2 transition-all'></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Story