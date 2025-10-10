import Script from 'next/script'

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'atoms-widget': {
        'assistant-id': string;
      };
    }
  }
}

export default function Talks() {
    return (
        <div className="h-screen w-screen">
            <Script src="https://unpkg.com/atoms-widget-core@latest/dist/embed/widget.umd.js" strategy="beforeInteractive" />
            <div className="w-full h-full absolute bottom-0 right-0">
                <atoms-widget assistant-id="68e7fbe9902dcd1149e4ced8"></atoms-widget>
            </div>
        </div>
    )
}
