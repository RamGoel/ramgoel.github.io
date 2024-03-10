import React from 'react'
import { FreelanceAchievementsProps } from '../freelance.types'

const FreelanceAchievementCard = ({ item }: { item: FreelanceAchievementsProps }) => {
    return (
        <div className='my-2'>
            <h1 className='text-3xl font-bold text-white'>{item.value}+</h1>
            <p className='text-xs'>{item.text}</p>
        </div>
    )
}

export default FreelanceAchievementCard;
