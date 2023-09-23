import React from 'react'
import { ProjectProps } from './projects.types'
import Image from 'next/image'
import ChipBox from '../common/chipBox/chipBox.main'

const ProjectCard = ({ data, type }: { data: ProjectProps, type:string }) => {
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
                  className=' rounded-lg my-2 md:my-0 border-2 border-gray-700'
              />
          </div>
          <div className='md:w-3/4'>
              {type==='blog' &&  <p className='leading-relaxed font-semibold text-lg my-0'>{description}</p>}
          <a href={url} style={{textDecoration:'none'}} className=' hover:text-teal-300 font-medium text-xl text-slate-200 leading-tight'>{name}</a>
              {type !== 'blog' && <p className='text-sm leading-relaxed mb-2'>{description}</p>}
        <ChipBox data={skills} key={key} />
          </div>
    </div>
  )
}

export default ProjectCard