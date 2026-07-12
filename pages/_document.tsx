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
                    name="description"
                    content="Frontend engineer at Sarvam AI. Design systems, SDKs, and voice agents."
                    data-rh="true"
                />
                <meta name="author" content="Ram Goel" />
                <link rel="author" href="https://ramgoel.com" data-rh="true" />
                <meta
                    property="og:title"
                    content="Ram Goel — Frontend Engineer"
                />
                <meta
                    property="og:description"
                    content="Frontend engineer at Sarvam AI. Design systems, SDKs, and voice agents."
                />
                <meta
                    property="og:image"
                    content="https://ramgoel.com/api/og?title=Frontend%20engineer%20building%20design%20systems%20%26%20voice%20agents"
                />
                <meta property="og:url" content="https://ramgoel.com" />
                <meta
                    name="twitter:title"
                    content="Ram Goel — Frontend Engineer"
                />
                <meta
                    name="twitter:description"
                    content="Frontend engineer at Sarvam AI. Design systems, SDKs, and voice agents."
                />
                <meta
                    name="twitter:image"
                    content="https://ramgoel.com/api/og?title=Frontend%20engineer%20building%20design%20systems%20%26%20voice%20agents"
                />
                <meta name="twitter:site" content="@theramgoel" />
                <meta name="twitter:creator" content="@theramgoel" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#fafafa" />
                <meta property="og:site_name" content="Ram Goel" />
            </Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
