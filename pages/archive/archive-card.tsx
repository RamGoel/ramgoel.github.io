import ChipBox from '@/components/portfolio/common/chipBox/chipBox.main'
import { ProjectProps } from '@/components/portfolio/projects/projects.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ArchiveCard = ({ data }: { data: ProjectProps }) => {
    return (
        <div className='p-4 min-w-[340px] w-1/3'>
            <div className='flex items-center justify-between'>
                <h1 className='text-sm font-semibold my-3 text-white'>{data?.name} {data?.extras || null}</h1>
                <Link href={data?.url ?? '/'}>
                    <i className='fa fa-external-link text-sm'></i>
                </Link>
            </div>
            <Image src={data?.preview} alt='project-image' className="rounded-xl w-full h-[170px] object-cover" width={300} height={320} />
            <div className='min-h-[150px]'>
                <p className='my-3 text-xs text-white'>{data?.description}</p>
                <ChipBox data={data?.skills} key={data?.key} />
            </div>
        </div>
    )
}

export default ArchiveCard