import React from 'react'
import { FreelanceWorkProps } from '../freelance.types'

const FreelanceWorkCard = ({ item }: { item: FreelanceWorkProps }) => {
    return (
        <li className='my-2'>{item.text}</li>
    )
}

export default FreelanceWorkCard;
