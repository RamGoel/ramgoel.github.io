import React from 'react'
import PImage from './image'
import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Text from './text'
import Socials from './socials'
import ContactLine from './contact'

const About = () => {
  return (
    <div className='flex w-full mx-auto md:h-11/12 md:w-1/3 mt-10 flex-row items-center md:justify-center'>
      <div className=''>
        <PImage src={LINKEDIN_PROFILE_URL} />
        <Text />
        <Socials />
        <ContactLine />
      </div>
    </div>
  )
}

export default About