/// <reference types="vite/client" />
import * as React from 'react'

interface ReplayWebPageProps extends React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> {
  replayBase: string
  source: string
  url: string
  embed?: 'default' | 'full' | 'replayonly' | 'replay-with-info'
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'replay-web-page': ReplayWebPageProps
    }
  }
}
