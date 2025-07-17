// Add TypeScript declarations for the vapi-widget element
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'vapi-widget': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                'public-key': string
                'assistant-id': string
                mode: string
                theme: string
                'base-bg-color': string
                'accent-color': string
                'cta-button-color': string
                'cta-button-text-color': string
                'border-radius': string
                size: string
                position: string
                title: string
                'start-button-text': string
                'end-button-text': string
                'chat-first-message': string
                'chat-placeholder': string
                'voice-show-transcript': string
            }
        }
    }
}

export const VapiWidget = () => {
    return (
        <>
            <vapi-widget
                public-key="caa6e0f0-c6f1-49f8-ae08-5f918834a321"
                assistant-id="20ab505e-15ef-4e01-a40c-72faf100eef2"
                mode="voice"
                theme="dark"
                base-bg-color="#000000"
                accent-color="#14B8A6"
                cta-button-color="#000000"
                cta-button-text-color="#FFFFFF"
                border-radius="large"
                size="full"
                position="bottom-right"
                title="TALK WITH AI"
                start-button-text="Start"
                end-button-text="End Call"
                chat-first-message="Hey, How can I help you today?"
                chat-placeholder="Type your message..."
                voice-show-transcript="true"
                consent-storage-key="vapi_widget_consent"
            />
            <script
                src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
                async
                type="text/javascript"
            ></script>
        </>
    )
}
