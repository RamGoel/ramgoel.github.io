import React from 'react'
import { ExperienceProps } from './experience.types'

const ExperienceItem = ({ data }: { data: ExperienceProps }) => {
    return (
        <tr className='border-b border-slate-300/10 last:border-none'>
            <td className='py-4 pr-4 align-top text-sm'>{data.company}</td>
            <td className='py-4 pr-4 align-top text-sm'>{data.role}</td>
            <td className='py-4 pr-4 align-top text-sm'>{data.start} - {data.end}</td>
        </tr>
    )
}

export default ExperienceItem