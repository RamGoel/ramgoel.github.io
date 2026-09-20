import { Head, Html, Main, NextScript } from 'next/document'

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;if(d){r.classList.add('dark');r.style.colorScheme='dark';}else{r.style.colorScheme='light'}}catch(e){}})();`

/** Site-wide shell only. Per-page OG/Twitter live in `PageMeta`. */
export default function Document() {
    return (
        <Html lang="en" suppressHydrationWarning>
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="author" content="Ram Goel" />
                <meta name="theme-color" content="#fafafa" />
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </Head>
            <body className="bg-white text-neutral-900 antialiased dark:bg-zinc-950 dark:text-neutral-100">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
