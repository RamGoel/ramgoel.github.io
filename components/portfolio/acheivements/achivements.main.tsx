import React from 'react'
import { achievements } from './achivements.constants'

const Acheivements = () => {

  return (
    <div>
      <h1 className='text-slate-200 text-2xl font-semibold'>Achievements</h1>
      {
        achievements.map((item: string, index: number) => {
          return <div className='flex items-top my-2' key={item + index}>
            <i className='fa fa-angle-right mr-2 mt-1 text-small align-top'/>
            <p className='mt-0'>{'  '}{item}</p>
          </div>
        })
      }

    </div>
  )
}

export default Acheivements