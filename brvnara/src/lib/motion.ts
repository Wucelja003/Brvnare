import { useEffect, useState } from 'react'

/** Mekana kriva za sve animacije u navigaciji */
export const softEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** true kada je viewport >= 768px (md) */
export function useIsDesktop(query = '(min-width: 768px)') {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return isDesktop
}
