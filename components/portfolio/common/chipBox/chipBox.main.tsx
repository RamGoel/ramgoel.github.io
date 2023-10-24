import React, { useState } from 'react'

const ChipBox = ({ data, key1, onChangeHandler }: { data: Array<string>, key1?: number, onChangeHandler?: Function }) => {
  const [selected, setSelected] = useState<number>(0)
  return (
    <div className='flex items-center justify-start flex-wrap'>
      {
        data.map((item: string, index: number) => {
          return <div onClick={() => {
            key1 === 110001 && setSelected(index)
            if (onChangeHandler && key1 === 110001) {
              onChangeHandler(index)
            }
          }} key={key1 + item} className={`${(key1 === 110001 && selected === index) ? 'bg-teal-400/10 border-teal-400/10 border-2' : 'bg-transparent border-teal-400/10 border-2'} px-3 py-1 mr-2 cursor-pointer my-1 md:my-0 rounded-full`}>
            <p className='text-xs font-bold font-regular text-teal-300 '>{item}</p>
          </div>
        })
      }
    </div>
  )
}

export default ChipBox