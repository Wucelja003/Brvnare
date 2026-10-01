import { Component, type ReactNode } from 'react'

/** Ako WebGL ne radi (stari uređaj, isključen GPU), prikaži rezervni sadržaj */
export default class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
