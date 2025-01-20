import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="title"
                    content="Ram Goel - GenAI and Full Stack Developer"
                    data-rh="true"
                />
                <meta
                    name="description"
                    content="I work on GenAI and full-stack development. Building Noterr to help organize the internet."
                    data-rh="true"
                />
                <meta name="author" content="Ram Goel" />
                <link rel="author" href="https://ramgoel.com" data-rh="true" />
                <meta
                    property="og:title"
                    content="Ram Goel - GenAI and Full Stack Developer"
                />
                <meta
                    property="og:description"
                    content="I work on GenAI and full-stack development. Building Noterr to help organize the internet."
                />
                <meta
                    property="og:image"
                    content="https://ramgoel.com/api/og?title=Ram Goel"
                />
                <meta property="og:url" content="https://ramgoel.com" />
                <meta
                    name="twitter:title"
                    content="Ram Goel - GenAI and Full Stack Developer"
                />
                <meta
                    name="twitter:description"
                    content="I work on GenAI and full-stack development. Building Noterr to help organize the internet."
                />
                <meta
                    name="twitter:image"
                    content="https://ramgoel.com/api/og?title=Ram Goel"
                />
                <meta name="twitter:site" content="@theramgoel" />
                <meta name="twitter:creator" content="@theramgoel" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#18181B" />
                <meta property="og:site_name" content="Ram Goel" />
            </Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
