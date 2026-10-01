import { useEffect, useState } from 'react'

export const INTRO_SEEN_KEY = 'brvnara-intro-seen'
export const INTRO_DONE_EVENT = 'brvnara:intro-done'

/**
 * true kada uvodna 3D animacija više ne prekriva stranu —
 * da bi se animacije u hero sekciji pokrenule tek kada su vidljive.
 */
export function useIntroReady() {
  const [ready, setReady] = useState(() => {
    if (typeof window === 'undefined') return true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    try {
      return sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (ready) return
    const done = () => setReady(true)
    window.addEventListener(INTRO_DONE_EVENT, done)
    // Sigurnosna mreža ako se intro iz nekog razloga ne prikaže
    const fallback = window.setTimeout(done, 9000)
    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, done)
      window.clearTimeout(fallback)
    }
  }, [ready])

  return ready
}
