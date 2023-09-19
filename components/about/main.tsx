import React from 'react'
import PImage from './image'
import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Text from './text'
import Socials from './socials'

const About = () => {
  return (
      <div className='flex md:h-screen md:w-1/3 flex-row items-center justify-center'>
          <div>
          <PImage src={LINKEDIN_PROFILE_URL} />
          <Text />
          <Socials />
          </div>
    </div>
  )
}

export default About