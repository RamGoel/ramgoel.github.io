import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Story = () => {
    return (
        <div className='relative md:h-screen flex items-center mb-10'>
            <div>
                <p className='text-sm leading-7 w-11/12 text-justify'>
                    I am a software engineer & 4th year CS undergrad from Uttar Pradesh, India. I love solving problems using code.
                    <br /><br />
                    I have worked with 5 AgriTech, Fintech, SaaS startups, as Frontend Intern, from very early stage to 100k DAU. I work mostly with NextJs, Typescript and React Native and can do everyting from development to deployment.
                    <br /><br />
                    I have worked with 10+ clients as freelancer, whether it is adding a feature or building a MVP from scratch for your business, I can do it all.
                </p>

                <div className='flex items-center justify-start mt-4'>
                    <Link className='p-2 text-sm underline underline-offset-8 hover:-mb-3 transition-all' href='#experience'>
                        Experience  <i className='fa fa-arrow-right -rotate-45 group-hover:ml-2 transition-all'></i>
                    </Link>
                    <Link className='p-2 text-sm underline underline-offset-8 hover:-mb-3 transition-all' href='#projects'>
                        Side Projects  <i className='fa fa-arrow-right -rotate-45 group-hover:ml-2 transition-all'></i>
                    </Link>

                </div>

                <div className='absolute bottom-5 hidden md:block opacity-30 text-center w-full left-0'>
                    <Link href={'#projects'}>
                        <Image src={require('@/public/arrow.gif')} className='mx-auto' width={50} height={50} alt='down-arrow' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Story