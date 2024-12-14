import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { RiBookLine, RiSettings3Line, RiYoutubeLine } from 'react-icons/ri'

const FOLDERS = [
    {
        title: 'Projects',
        icon: RiSettings3Line,
        onClick: () => {
            console.log('Projects')
        },
    },
    {
        title: 'Youtube',
        icon: RiYoutubeLine,
        onClick: () => {
            console.log('Youtube')
        },
    },
    {
        title: 'Blog',
        icon: RiBookLine,
        onClick: () => {
            console.log('Blog')
        },
    },
    {
        title: 'Blog',
        icon: RiBookLine,
        onClick: () => {
            console.log('Blog')
        },
    },
]

const FolderCard = ({
    title,
    CardIcon,
    onClick,
}: {
    title: string
    CardIcon?: IconType
    onClick: () => void
}) => {
    return (
        <button
            onClick={onClick}
            className="flex group items-center justify-center flex-col"
        >
            <div className="relative">
                <Image
                    src={'/desktop/mac-folder.png'}
                    alt="desktop"
                    className="w-[100px] group-hover:scale-[.95] transition-all duration-150 h-[80px] object-contain"
                    width={100}
                    height={100}
                />
                {CardIcon && (
                    <div className="absolute z-10 group-hover:scale-[.95] transition-all duration-150 flex items-center justify-center opacity-30 bottom-0 left-0 w-full h-full pt-2">
                        <CardIcon size={30} />
                    </div>
                )}
            </div>
            <p className="text-white">{title}</p>
        </button>
    )
}

const DesktopPage = () => {
    return (
        <div className="relative flex flex-col h-screen">
            <Image
                src={'/desktop/bg1.jpg'}
                alt="desktop"
                className="w-screen !z-[0] absolute top-0 left-0 h-screen object-cover"
                width={2000}
                height={2000}
            />

            <div className="!z-[10] flex flex-grow justify-end flex-col h-screen">
                <div className="grid grid-cols-4 max-w-[50%] mx-auto my-auto gap-4">
                    {FOLDERS.map((folder) => (
                        <FolderCard
                            key={folder.title}
                            title={folder.title}
                            CardIcon={folder.icon}
                            onClick={folder.onClick}
                        />
                    ))}
                </div>

                <div className="flex items-center justify-center h-[60px] w-full bg-black/80">
                    <div className="flex w-full text-white justify-between items-center px-4">
                        <div className="flex items-center gap-2">
                            <RiYoutubeLine size={18} />
                            <p>Youtube</p>
                        </div>

                        <p className="text-sm tracking-wide">
                            {moment().format('HH:MM a')} |{' '}
                            {moment().format('DD MMM YYYY')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopPage
