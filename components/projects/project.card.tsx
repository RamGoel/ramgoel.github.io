import React from 'react'
import { ProjectProps } from './projects.types'
import Image from 'next/image'

const ProjectCard = ({ data }: { data: ProjectProps }) => {
    const {
        key,
        name,
        preview,
        extras,
        skills,
        url,
        description
    }=data
  return (
      <div className=' rounded-xl md:flex my-3 p-3 '>
          <div className='mr-3'>
              <Image
                  src={preview}
                  width={150}
                  height={130}
                  alt='project image'
                  className='rounded-lg border-2 border-gray-700'
              />
          </div>
          <div className='md:w-3/4'>
          <a href={url} style={{textDecoration:'none'}} className=' hover:text-teal-300 font-medium text-xl text-slate-200 leading-tight'>{name}</a>
              <p className='text-sm leading-relaxed'>{description}</p>
              <div className='flex items-center justify-start my-2'>
        {
          skills.map((item:string) => {
            return <div key={key+item} className='px-3 py-1 bg-teal-400/10  mr-2 rounded-full'>
              <p className='text-xs font-bold font-regular text-teal-300'>{item}</p>
              </div>
          })
        }
      </div>
          </div>
    </div>
  )
}

export default ProjectCard