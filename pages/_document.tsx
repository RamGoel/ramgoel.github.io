import { Head, Html, Main, NextScript } from 'next/document'

/** Site-wide shell only. Per-page OG/Twitter live in `PageMeta`. */
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="author" content="Ram Goel" />
                <meta name="theme-color" content="#fafafa" />
            </Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
