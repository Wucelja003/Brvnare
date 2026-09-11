import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import './IntroOverlay.css'

// three.js scena se učitava kao zaseban chunk
const IntroCabin3D = lazy(() => import('./IntroCabin3D'))

const SEEN_KEY = 'brvnara-intro-seen'

export default function IntroOverlay() {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // Odluči pri montiranju da li prikazati intro
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* sessionStorage nedostupan */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!seen && !reduce) setShow(true)
  }, [])

  const dismiss = useCallback(() => {
    setLeaving(true)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignoriši */
    }
    window.setTimeout(() => setShow(false), 650)
  }, [])

  // Zaključaj skrol dok je intro prikazan
  useEffect(() => {
    if (!show) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

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
