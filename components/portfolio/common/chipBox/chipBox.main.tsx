import React from 'react'

const ChipBox = ({ data, key1, selected, onChangeHandler }: { data: Array<string>, selected?: string, key1?: number, onChangeHandler?: Function }) => {
  return (
    <div className='flex items-center gap-y-2 justify-start flex-wrap'>
      {
        data?.map((item: string, index: number) => {
          return <div onClick={() => {
            if (onChangeHandler && key1 === 110001) {
              onChangeHandler(item)
            }
          }} key={Math.random()} className={`${(key1 === 110001 && selected === item) ? 'bg-teal-400/10 border-teal-400/10 border-2' : 'bg-transparent border-teal-400/10 border-2'} px-3 py-1 mr-2 cursor-pointer my-1 md:my-0 rounded-full`}>
            <p className='text-xs font-bold font-regular text-teal-300 '>{item}</p>
          </div>
        })
      }
    </div>
  )
}

export default ChipBox