import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'
import { INTRO_DONE_EVENT, INTRO_SEEN_KEY } from '../lib/introReady'
import './IntroOverlay.css'

// three.js scena se učitava kao zaseban chunk
const IntroCabin3D = lazy(() => import('./IntroCabin3D'))

export default function IntroOverlay() {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const lenis = useLenis()

  // Odluči pri montiranju da li prikazati intro
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
    } catch {
      /* sessionStorage nedostupan */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!seen && !reduce) setShow(true)
  }, [])

  const dismiss = useCallback(() => {
    setLeaving(true)
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1')
    } catch {
      /* ignoriši */
    }
    window.dispatchEvent(new Event(INTRO_DONE_EVENT))
    window.setTimeout(() => setShow(false), 650)
  }, [])

  // Zaključaj skrol dok je intro prikazan (Lenis + native)
  useEffect(() => {
    if (!show) return
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [show, lenis])

  if (!show) return null

  return (
    <div className={`intro-overlay ${leaving ? 'is-leaving' : ''}`}>
      <Suspense
        fallback={
          <div className="intro-fallback">
            <img src="/BrvnaraLogo.svg" alt="Brvnara" className="intro-logo" />
            <div className="intro-bar" />
          </div>
        }
      >
        <IntroCabin3D onComplete={dismiss} />
      </Suspense>

      <button type="button" onClick={dismiss} className="intro-skip">
        Preskoči
      </button>
    </div>
  )
}
