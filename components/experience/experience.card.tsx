import React from 'react'
import { ExperienceProps } from './experience.types'

const Card = ({ data }: { data: ExperienceProps }) => {
  const {
    key,
    role,
    company,
    url,
    description,
    skills,
    start,
    end
  }=data
  return (
    <div className=' rounded-xl md:flex my-3 p-3 '>
      <div className='md:w-1/3'>
        <p>{start} - {end}</p>
      </div>
      <div className='md:w-3/4'>

      <a href={url} style={{textDecoration:'none'}} className=' hover:text-teal-300	 font-medium text-xl text-slate-200 leading-tight'>{role} • {company}</a>
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

export default Card