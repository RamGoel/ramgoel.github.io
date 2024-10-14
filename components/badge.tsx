import React from 'react'

const Badge = ({ text }: { text: string }) => {
    return (
        <div className="bg-blue-300/40 text-blue-200 border border-blue-400 inline-block w-fit px-2 py-[2px] rounded-md">
            <p className="text-xs">{text}</p>
        </div>
    )
}

export default Badge
