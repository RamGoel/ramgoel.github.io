import React from 'react'
import { experiences } from './experience.constants'
import { ExperienceProps } from './experience.types'
import Card from './experience.card'
import ExperienceItem from './experience.item'
import BlogCard from '@/components/blogs/blog-card'

const Experience = ({ type }: { type: string }) => {

  const validExperiences = experiences.filter(item => item.type === type)
  return (
    <div id='experience' className='py-5'>
      <h1 className='text-slate-200 text-2xl font-semibold'>{
        type === 'profession' ? "Experience" : 'Extracurricular'
      }</h1>

      {
        validExperiences.slice(0, 2).map((item: ExperienceProps) => {
          return <Card data={item} key={item.key} />
        })
      }

      <div className='py-3 text-center'>
        <p>
          + {validExperiences.length - 2} more
        </p>
      </div>

    </div>
  )
}

export default Experience