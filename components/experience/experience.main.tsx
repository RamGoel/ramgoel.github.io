import React from 'react'
import { experiences } from './experience.constants'
import { ExperienceProps } from './experience.types'
import Card from './experience.card'

const Experience = () => {
  return (
    <div>
      <h1 className='text-slate-200 text-2xl font-semibold'>Experience</h1>
      {
        experiences.map((item:ExperienceProps) => {
          return <Card data={item} key={item.key} />
        })
      }
    </div>
  )
}

export default Experience