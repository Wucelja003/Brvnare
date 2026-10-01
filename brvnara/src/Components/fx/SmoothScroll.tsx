import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

/** Na promenu strane skok na vrh (hash linkove npr. /#paketi rešava Home) */
function ScrollToTopOnRoute() {
  const lenis = useLenis()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    // Native skok + sinhronizacija Lenis-a (njegov cilj može biti zastareo)
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [pathname, hash, lenis])

  return null
}

/** Lenis smooth scroll za ceo sajt (poštuje prefers-reduced-motion) */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        autoRaf: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      }}
    >
      <ScrollToTopOnRoute />
      {children}
    </ReactLenis>
  )
}
