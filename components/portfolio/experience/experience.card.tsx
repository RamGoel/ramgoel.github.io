import React from 'react'
import { ExperienceProps } from './experience.types'
import ChipBox from '../common/chipBox/chipBox.main'

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
    <div className=' rounded-xl md:flex my-3 p-3  hover:border-2 shadow-lg hover:scale-[1.02] transition-all cursor-pointerZ py-4 border-gray-700 '>
      <div className='md:w-1/3'>
        <p className='text-sm mt-1 font-semibold'>{start.toLocaleUpperCase()} - {end.toLocaleUpperCase()}</p>
      </div>
      <div className='md:w-3/4'>

      <a href={url} style={{textDecoration:'none'}} className=' hover:text-teal-300	 font-medium text-xl text-slate-200 leading-tight'>{role} • {company}</a>
      <p className='text-sm leading-relaxed mb-2'>{description}</p>
        <ChipBox data={skills} key={key} />
      </div>
    </div>
  )
}

export default Card