import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head title="Ram Goel">
                <script async src="https://tally.so/widgets/embed.js"></script>
            </Head>
            <body className="">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
