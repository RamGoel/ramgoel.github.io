import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const FounderSection = () => {
    return (
        <div className="h-[80vh] flex w-[60%] mx-auto items-center justify-center gap-5">
            <Image
                src={LINKEDIN_PROFILE_URL}
                width={800}
                className="rounded-full w-[300px] h-[300px]"
                height={800}
                alt="profile-image"
            />

            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold mb-[-15px]">
                    Meet the Founder
                </h1>
                <p className="text-lg ">
                    I&apos;m Ram from India. I&apos;m a{' '}
                    <span className="text-emerald-500">
                        full stack engineer with GenAI expertise
                    </span>
                    . My inhouse products have been used by few hundred users,
                    and my work for companies have been used by{' '}
                    <span className="text-emerald-500">
                        {' '}
                        millions of users.
                    </span>{' '}
                    <br />
                    <br />
                    I&apos;ve been working with startups for the{' '}
                    <span className="text-emerald-500">last 3 years</span>, and
                    I&apos;ve seen first hand how important it is to launch
                    quickly. I am quick to understand the product and the
                    market, and{' '}
                    <span className="text-emerald-500">
                        I can build without designs
                    </span>
                    , so you can get a fully functional MVP in 2-3 weeks.
                    <br />
                    <br />
                    I&apos;m excited to help you launch your product, and I look
                    forward to working with you.
                </p>
            </div>
        </div>
    )
}

export default FounderSection
