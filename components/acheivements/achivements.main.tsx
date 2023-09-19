import React from 'react'
import { achievements } from './achivements.constants'

const Acheivements = () => {
  
  return (
    <div>
      <h1 className='text-slate-200 text-2xl font-semibold'>Achievements</h1>
      {
        achievements.map((item: string, index:number) => {
          return <p key={item+index}>{index + 1} - {item}</p>
        })
      }

    </div>
  )
}

export default Acheivements