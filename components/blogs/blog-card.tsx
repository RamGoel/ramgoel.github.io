import { useRouter } from 'next/router'
import React from 'react'
import BlogHeading from './blog-heading';
import moment from 'moment';
import Image from 'next/image';
import { LINKEDIN_PROFILE_URL } from '@/utils/strings';

const BlogCard = ({ heading, shortText, date, slug }: { heading: string, shortText: string, date: string, slug: string }) => {
    const router = useRouter();
    return (
        <div className='border-2 cursor-pointer hover:scale-[1.02] transition-transform border-gray-700 rounded-lg max-w-[400px] p-4' onClick={() => router.push(`/blog/${slug}`)}>
                <Image src={LINKEDIN_PROFILE_URL} alt='' className='rounded-full object-cover' width={80} height={80} />
            <div className='-mt-7'>
                <BlogHeading size='sub' text={heading} />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-sm'>
                    <i className='fa fa-calendar text-xs mr-2 hover:text-slate-200'></i>
                    {moment(date).fromNow()}
                </p>

            </div>
        </div>
    )
}

export default BlogCard