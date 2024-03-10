import React from 'react'
import { experiences } from './experience.constants'
import { ExperienceProps } from './experience.types'
import Card from './experience.card'
import ExperienceItem from './experience.item'
import BlogCard from '@/components/blogs/blog-card'

const Experience = ({ type }:{type:string}) => {
  return (
    <div id='experience' className='py-5'>
      <h1 className='text-slate-200 text-2xl font-semibold'>{
        type==='profession'?"Experience":'Extracurricular'
      }</h1>
      {/* <table className='mt-1 mb-[30px] w-full border-collapse text-left'>
        <thead className='sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur'>
          <tr>
            <td className='py-4 pr-8 text-sm font-semibold text-slate-200'>Company</td>
            <td className='py-4 pr-8 text-sm font-semibold text-slate-200'>Role</td>
            <td className='py-4 pr-8 text-sm font-semibold text-slate-200'>Dates</td>
          </tr>
        </thead>
        <tbody>
          {
            experiences.filter(item => item.type === type).map((item: ExperienceProps) => {
              return <ExperienceItem data={item} key={item.key} />
            })
          }
        </tbody>
      </table> */}

      {
        experiences.filter(item => item.type === type).map((item: ExperienceProps) => {
          return <Card data={item} key={item.key} />
        })
      }

    </div>
  )
}

export default Experience