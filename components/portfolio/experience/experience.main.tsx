import React from 'react'
import { experiences } from './experience.constants'
import { ExperienceProps } from './experience.types'
import Card from './experience.card'

const Experience = ({ type }:{type:string}) => {
  return (
    <div id='experience' className='py-5'>
      <h1 className='text-slate-200 text-2xl font-semibold'>{
        type==='profession'?"Experience":'Extracurricular'
      }</h1>
      {
        experiences.filter(item=>item.type===type).map((item:ExperienceProps) => {
          return <Card data={item} key={item.key} />
        })
      }
    </div>
  )
}

export default Experience