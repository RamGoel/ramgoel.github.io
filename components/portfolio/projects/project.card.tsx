import React from 'react'
import { ProjectProps } from './projects.types'
import Image from 'next/image'
import ChipBox from '../common/chipBox/chipBox.main'

const ProjectCard = ({ data, type }: { data: ProjectProps, type: string }) => {
    const {
        key,
        name,
        preview,
        extras,
        skills,
        url,
        description
    } = data
    return (
        <div className=' rounded-xl md:flex  my-3 p-3 '>
            <div className='mr-3 w-full h-[200px] text-center md:w-[170px] md:h-[100px]'>
                <Image
                    src={preview}
                    style={{
                        objectFit: 'cover'
                    }}
                    alt='project image'
                    className=' rounded-lg w-full h-full my-2 md:my-0 border-2 border-gray-700'
                />
                <a style={{ textDecoration: 'none' }} href={url} className=' hover:text-teal-300 tracking-wide  text-white rounded-lg text-[12px] font-semibold'>
                    Go to Website <i className=' fa fa-external-link text-[11px] ml-1' />
                </a>
            </div>
            <div className='md:w-3/4'>
                {type === 'blog' && <p className='leading-relaxed font-semibold text-lg my-0'>{description}</p>}
                <div className='flex items-center mb-2 justify-between'>
                    <p className='  font-medium text-md text-slate-200 leading-tight'>{name}</p>

                </div>
                {type !== 'blog' && <p className='text-xs leading-relaxed mb-2'>{description}</p>}
                <ChipBox data={skills} key={key} />
            </div>
        </div>
    )
}

export default ProjectCard