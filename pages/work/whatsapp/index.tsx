import React, { useState } from 'react'
import styles from './page.module.css'
import {
    FaRegWindowClose,
    FaRegWindowMaximize,
    FaRegWindowMinimize,
    FaWhatsapp,
    FaWindowClose,
    FaWindowMaximize,
    FaWindowMinimize,
} from 'react-icons/fa'
import {
    AppWindowMac,
    Archive,
    BellOff,
    CircleArrowDown,
    CopyIcon,
    Edit,
    Filter,
    Lock,
    LucideMinimize,
    Maximize,
    Menu,
    MessageCircle,
    PhoneCall,
    Search,
    Settings,
    Star,
    X,
} from 'lucide-react'
import Image from 'next/image'
import moment from 'moment'

interface Message {
    title: string
    image: string
    lastMessage: {
        author: string
        text: string
        time: Date
    }
    unreadMessages: number
    isMuted: boolean
}

const MESSAGES: Message[] = [
    {
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=500',
        title: 'React Developers',
        lastMessage: {
            author: 'Sarah Chen',
            text: 'Anyone up for code review?',
            time: new Date(),
        },
        unreadMessages: 12,
        isMuted: false,
    },
    {
        image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=500',
        title: 'Project Alpha Team',
        lastMessage: {
            author: 'Mike Johnson',
            text: 'Deployment successful! 🚀',
            time: new Date(),
        },
        unreadMessages: 45,
        isMuted: true,
    },
    {
        image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=500',
        title: 'Design Squad',
        lastMessage: {
            author: 'Emma Wilson',
            text: 'New mockups ready for review',
            time: new Date(),
        },
        unreadMessages: 8,
        isMuted: false,
    },
    {
        image: 'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=500',
        title: 'Coffee & Code',
        lastMessage: {
            author: 'Alex Martinez',
            text: 'Who&apos;s up for pair programming?',
            time: new Date(),
        },
        unreadMessages: 156,
        isMuted: true,
    },
    {
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=500',
        title: 'Bug Hunters',
        lastMessage: {
            author: 'David Kim',
            text: 'Found a critical bug in production',
            time: new Date(),
        },
        unreadMessages: 73,
        isMuted: false,
    },
    {
        image: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=500',
        title: 'DevOps Team',
        lastMessage: {
            author: 'Rachel Singh',
            text: 'Server maintenance in 30 mins',
            time: new Date(),
        },
        unreadMessages: 29,
        isMuted: true,
    },
]
const WhatsappScreen = () => {
    return (
        <div className={styles.outerContainer}>
            <Topbar />
            <div className={styles.innerContainer}>
                <Sidebar />
                <Layout />
            </div>
        </div>
    )
}

const Topbar = () => {
    return (
        <div className={styles.topbar}>
            <div>
                <FaWhatsapp />
                <span>Whatsapp</span>
            </div>

            <div>
                <button>
                    <FaRegWindowMinimize />
                </button>
                <button>
                    <CopyIcon />
                </button>
                <button>
                    <X />
                </button>
            </div>
        </div>
    )
}

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState('menu')
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarRow}>
                <button
                    className={`${styles.sidebarItem} ${activeTab === 'menu' ? styles.active : ''}`}
                    onClick={() => setActiveTab('menu')}
                >
                    <Menu />
                </button>
                <div className={styles.sidebarRow}>
                    <button
                        className={`${styles.sidebarItem} ${activeTab === 'chats' ? styles.active : ''}`}
                        onClick={() => setActiveTab('chats')}
                    >
                        <MessageCircle />
                    </button>
                    <button
                        className={`${styles.sidebarItem} ${activeTab === 'calls' ? styles.active : ''}`}
                        onClick={() => setActiveTab('calls')}
                    >
                        <PhoneCall />
                    </button>
                    <button
                        className={`${styles.sidebarItem} ${activeTab === 'status' ? styles.active : ''}`}
                        onClick={() => setActiveTab('status')}
                    >
                        <CircleArrowDown />
                    </button>
                </div>
            </div>
            <hr />
            <div className={styles.sidebarRow}>
                <button
                    className={`${styles.sidebarItem} ${activeTab === 'favorites' ? styles.active : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    <Star />
                </button>
                <button
                    className={`${styles.sidebarItem} ${activeTab === 'archive' ? styles.active : ''}`}
                    onClick={() => setActiveTab('archive')}
                >
                    <Archive />
                </button>
                <hr />
                <button
                    className={`${styles.sidebarItem} ${activeTab === 'settings' ? styles.active : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    <Settings />
                </button>
                <button className={`${styles.sidebarItem}`}>
                    <Image
                        src={'/favicon.ico'}
                        width={30}
                        height={30}
                        className={styles.sidebarProfileIcon}
                        alt="profile"
                    />
                </button>
            </div>{' '}
        </div>
    )
}

const Layout = () => {
    return (
        <div className={styles.chatLayout}>
            <ChatList />
            <NoSelectedChat />
        </div>
    )
}

const NoSelectedChat = () => {
    return (
        <div className={styles.emptyChat}>
            <div>
                <FaWhatsapp />

                <h1>Whatsapp for Windows</h1>
                <p>
                    Send and receive messages without keeping your phone online
                </p>
                <p>
                    Use whatsapp on upto 4 linked devices and 1 phone at the
                    same time
                </p>
            </div>

            <div>
                <div>
                    <Lock />
                    <p>End-to-end encrypted</p>
                </div>
            </div>
        </div>
    )
}

const ChatList = () => {
    return (
        <div className={styles.chatView}>
            <div className={styles.chatHeader}>
                <h1>Chats</h1>

                <div>
                    <button>
                        <Edit />
                    </button>
                    <button>
                        <Filter />
                    </button>
                </div>
            </div>
            <div className={styles.chatSearch}>
                <Search />
                <input type="text" placeholder="Search or start a new chat" />
            </div>
            <div className={styles.chatList}>
                {MESSAGES.map((item) => (
                    <ChatCard key={item.title} data={item} />
                ))}
            </div>
        </div>
    )
}

const ChatCard = ({ data }: { data: Message }) => {
    return (
        <div className={styles.chatCard}>
            <div>
                <Image src={data.image} alt="dp" width={80} height={80} />
            </div>
            <div>
                <h1>{data.title}</h1>
                {data.lastMessage ? (
                    <p className="line-clamp-1">
                        {data.lastMessage.author}: {data.lastMessage.text}
                    </p>
                ) : null}
            </div>
            <div className={styles.chatCardMeta}>
                {data.lastMessage ? (
                    <p>{moment(data.lastMessage.time).format('hh:mm')}</p>
                ) : null}

                <div>
                    {data.isMuted ? <BellOff /> : null}
                    {data.unreadMessages > 0 ? (
                        <p className={styles.unreadMessages}>
                            {data.unreadMessages}
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default WhatsappScreen
