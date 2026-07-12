import { Head, Html, Main, NextScript } from 'next/document'
import { absoluteUrl, ogImageUrl, SITE_URL } from '@/utils/site'

const DEFAULT_TITLE = 'Ram Goel — Frontend Engineer'
const DEFAULT_DESCRIPTION =
    'Frontend engineer at Sarvam AI. Design systems, SDKs, and voice agents.'
const DEFAULT_OG_IMAGE = ogImageUrl('default')

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
                    content={DEFAULT_DESCRIPTION}
                    data-rh="true"
                />
                <meta name="author" content="Ram Goel" />
                <link rel="author" href={SITE_URL} data-rh="true" />
                <meta property="og:title" content={DEFAULT_TITLE} />
                <meta property="og:description" content={DEFAULT_DESCRIPTION} />
                <meta property="og:image" content={DEFAULT_OG_IMAGE} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content={absoluteUrl('/')} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Ram Goel" />
                <meta name="twitter:title" content={DEFAULT_TITLE} />
                <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
                <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
                <meta name="twitter:site" content="@theramgoel" />
                <meta name="twitter:creator" content="@theramgoel" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#fafafa" />
            </Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
