import React from 'react'
import { freelanceAchievements, freelanceWork } from './freelance.constant'
import FreelanceWorkCard from './cards/work.card'
import { FreelanceAchievementsProps, FreelanceWorkProps } from './freelance.types'
import FreelanceAchievementCard from './cards/achievements.card'
const subject = 'We need to talk!';
const body = 'Hi Ram, I came from your website and I need some service. Can we have a call so we can discuss this further?'

const Freelance = () => {
    return (
        <div className='my-4 text-sm md:text-md' id="freelance">
            <h1 className='text-slate-200 text-2xl font-semibold'>Freelance</h1>
            <div className='flex items-center justify-between flex-wrap w-full md:w-8/12'>
                {
                    freelanceAchievements.map((item: FreelanceAchievementsProps) => {
                        return <FreelanceAchievementCard item={item} key={item.key} />
                    })
                }
            </div>
            {
                freelanceWork.map((item: FreelanceWorkProps) => {
                    return <FreelanceWorkCard item={item} key={item.key} />
                })
            }

            <p className='mt-4 mb-12'>Need a app/website or any integration? reach me via <a className='text-white font-semibold' href={
                `mailto:rgoel766@gmail.com?subject=${subject}&body=${body}`
            }>mail</a></p>
        </div>
    )
}

export default Freelance