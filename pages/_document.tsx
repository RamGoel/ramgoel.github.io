import { Head, Html, Main, NextScript } from 'next/document'

export const metadata = {
    title: 'Ram Goel - GenAI and Full Stack Developer',
    description:
        'I work on GenAI and full-stack development. Building Noterr to help organize the internet.',
    image: 'https://ramgoel.com/api/og?title=Ram Goel',
    url: 'https://ramgoel.com',
    siteName: 'Ram Goel',
    type: 'website',
    creator: '@theramgoel',
    card: 'summary_large_image',
    themeColor: '#18181B',
    author: 'Ram Goel',
    keywords: 'Ram Goel, Ram, Goel, ramgoel, ramgoel.com, ramgoel.dev',
    robots: 'index, follow',
    openGraph: {
        title: 'Ram Goel - GenAI and Full Stack Developer',
        description:
            'I work on GenAI and full-stack development. Building Noterr to help organize the internet.',
        images: [{ url: 'https://ramgoel.com/api/og?title=Ram Goel' }],
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@theramgoel',
        title: 'Ram Goel - GenAI and Full Stack Developer',
        description:
            'I work on GenAI and full-stack development. Building Noterr to help organize the internet.',
        images: [{ url: 'https://ramgoel.com/api/og?title=Ram Goel' }],
    },
}

export default function Document() {
    return (
        <Html lang="en">
            <Head></Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
