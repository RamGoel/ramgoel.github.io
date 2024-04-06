import React from 'react'
import Experience from '../experience/experience.main'
import Projects from '../projects/projects.main'
import Story from '../story/story.main'
import Footer from '../common/footer/footer.main'

const Scrollable = () => {
  return (
    <div style={{
      scrollBehavior: 'smooth'
    }} className='scroll-d-none md:h-screen md:w-1/2 md:overflow-y-scroll '>
      <div className='w-11/12 mx-auto'>
        <Story />
       <Projects type='tech' />
        <Experience type='profession' />
        <Footer />

      </div>
    </div>
  )
}

export default Scrollable