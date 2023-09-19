import React from 'react'
import { projects } from './projects.constants'
import { ProjectProps } from './projects.types'
import ProjectCard from './project.card'

const Projects = () => {
  return (
    <div>
      <h1 className='text-slate-200 text-2xl font-semibold'>Projects</h1>
      <div>
        {
          projects.map((item: ProjectProps) => {
            return <ProjectCard key={item.key} data={item} />
          })
        }
      </div>
    </div>
  )
}

export default Projects