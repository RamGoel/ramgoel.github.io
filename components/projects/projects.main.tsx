import React from 'react'
import { projects } from './projects.constants'
import { ProjectProps } from './projects.types'
import ProjectCard from './project.card'
import { useRouter } from 'next/navigation'

const Projects = () => {
  const router=useRouter()
  return (
    <div>
      <h1 className='text-slate-200 text-2xl font-semibold'>Projects</h1>
      <div>
        {
          projects.map((item: ProjectProps, index:number) => {
            return index<2 && <ProjectCard key={item.key} data={item} />
          })
        }
      </div>

      <div className='my-3'>
        <p onClick={()=>router.push('/archive')} className='hover:text-teal-300 font-semibold cursor-pointer'>View all projects <i className='fa fa-arrow-right ml-0.5'></i></p>
      </div>
    </div>
  )
}

export default Projects