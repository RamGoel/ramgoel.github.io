import React from 'react'
import Experience from '../experience/experience.main'
import Acheivements from '../acheivements/achivements.main'
import Projects from '../projects/projects.main'
import Story from '../story/story.main'
import Footer from '../common/footer/footer.main'
import Freelance from '../freelance/freelance.main'

const Scrollable = () => {
  return (
    <div className='scroll-d-none md:h-screen md:w-1/2 md:overflow-y-scroll py-3 '>
      <div className='w-11/12 mx-auto'>
          <Story />
          <Experience type='profession' />
          {/* <Experience type='position' /> */}
          {/* <Acheivements /> */}
        <Projects type='tech' />
        {/* <Projects type='blog' /> */}
        <Freelance />
        <Footer />

      </div>
    </div>
  )
}

export default Scrollable