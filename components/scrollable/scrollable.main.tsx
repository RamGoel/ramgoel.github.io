import React from 'react'
import Experience from '../experience/experience.main'
import Acheivements from '../acheivements/main'
import Projects from '../projects/main'

const Scrollable = () => {
  return (
    <div className='scroll-d-none h-screen md:w-1/2 overflow-y-scroll py-3 '>
      <div className='w-11/12 mx-auto'>

          <Experience />
          <Acheivements />
          <Projects />
      </div>
    </div>
  )
}

export default Scrollable