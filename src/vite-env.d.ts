/// <reference types="vite/client" />
import * as React from 'react'

interface ReplayWebPageProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  source: string,
  url: string,
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'replay-web-page': ReplayWebPageProps;
        }
    }
}
