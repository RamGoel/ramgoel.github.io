import React from 'react'

const ChipBox = ({data, key}:{data:Array<string>, key:number}) => {
  return (
      <div className='flex items-center justify-start flex-wrap'>
          {
          data.map((item:string) => {
            return <div key={key+item} className='px-3 py-1 bg-teal-400/10 mr-2 my-1 md:my-0 rounded-full'>
              <p className='text-xs font-bold font-regular text-teal-300 '>{item}</p>
              </div>
          })
        }
    </div>
  )
}

export default ChipBox