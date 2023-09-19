import React from 'react'
import PImage from './image'
import { LINKEDIN_PROFILE_URL } from '@/utils/strings'
import Text from './text'
import Socials from './socials'

const Main = () => {
  return (
      <div>
          <PImage src={LINKEDIN_PROFILE_URL} />
          <Text />
          <Socials />
    </div>
  )
}

export default Main