import Header from '@/components/freelance/header'
import Hero from '@/components/freelance/hero'
import React from 'react'
import { Dela_Gothic_One } from 'next/font/google'
import Clients from '@/components/freelance/clients'
import Portfolio from '@/components/freelance/portfolio'
import Contact from '@/components/freelance/contact'
import Socials from '@/components/portfolio/about/socials'
const font = Dela_Gothic_One({ weight: "400", subsets: ['latin'] })

const Freelance = () => {
  return (
    <div className={`${font.className} bg-black`}>
      <Header />
      <Hero />
      <Clients />
      <Portfolio />
      <div className='flex items-center justify-center'>
      <Socials />
      </div>
      <Contact />
    </div>
  )
}

export default Freelance