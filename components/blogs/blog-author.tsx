import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

const BlogAuthor = ({date}:{date:string}) => {
    return (
        <div>
            <div className='flex items-center justify-start my-[50px]'>
                <Image src={LINKEDIN_PROFILE_URL} alt='' className='rounded-full object-cover ' width={60} height={60} />
                <div className='ml-3'>
                    <h3 className='text-2xl font-semibold text-white'>Ram Goel</h3>
                    <p className='text-sm'>
                        <i className='fa fa-calendar text-xs mr-2 hover:text-slate-200'></i>
                        {moment(date).format('DD MMMM, YYYY')}
                    </p>
                </div>
                <div className='ml-auto flex items-center justify-end'>
                    <a href='https://linkedin.com/in/ramgoel' className='m-2 p-2 '>
                        <i className='fab fa-linkedin text-2xl hover:text-slate-200'></i>
                    </a>
                    <a href='https://twitter.com/theramgoel' className='m-2 p-2 '>
                        <i className='fab fa-twitter text-2xl hover:text-slate-200'></i>
                    </a>
                </div>
                
            </div>
        </div>
    )
}

export default BlogAuthor