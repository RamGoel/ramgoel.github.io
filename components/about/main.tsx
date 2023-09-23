import React from 'react'
import PImage from './image'
import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Text from './text'
import Socials from './socials'

const About = () => {
  return (
    <div className='flex w-11/12 mx-auto md:h-11/12 md:w-1/3 mt-10 flex-row items-center md:justify-center'>
      <div className='flex items-center md:flex-col max-h-screen'>
        <div>
          <PImage src={LINKEDIN_PROFILE_URL} />
        </div>
        <div className='ml-5 md:ml-0'>
          <Text />
          <Socials />
        </div>
      </div>
    </div>
  )
}

export default About