import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { useI18n } from '../i18n/LanguageContext'
import Hero from '../Components/Hero'
import Introduce from '../Components/Introduce'
import Marquee from '../Components/fx/Marquee'
import ProcessSection from '../Components/ProcessSection'
import InteriorShowcase from '../Components/InteriorShowcase'
import ModelsSection from '../Components/ModelsSection'
import Packages from './Packages'
import FaqSection from '../Components/FaqSection'

export default function Home() {
  const { t } = useI18n()
  const { hash } = useLocation()
  const lenis = useLenis()

  // Skrol do #paketi kada se dođe sa druge strane.
  // Nekoliko pokušaja jer slike iznad mogu da pomere layout dok se učitavaju.
  useEffect(() => {
    if (hash !== '#paketi') return
    let tries = 0
    let timer: number
    const run = () => {
      const el = document.getElementById('paketi')
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth' })
      }
      if (++tries < 4) timer = window.setTimeout(run, 250)
    }
    timer = window.setTimeout(run, 100)
    return () => window.clearTimeout(timer)
  }, [hash, lenis])

  return (
    <>
      <Hero />

      {/* Saradnja — spolja → iznutra */}
      <Introduce />

      <Marquee items={t('marquee.items').split('|')} />

      {/* Proces (teaser) → /proces */}
      <ProcessSection viewAllHref="/proces" />

      {/* Enterijer — šta sređujemo unutra */}
      <InteriorShowcase />

      {/* 3D modeli i realizovane kuće (three.js) → /modeli */}
      <ModelsSection viewAllHref="/modeli" />

      {/* Paketi — sekcija na početnoj */}
      <Packages />

      {/* Česta pitanja */}
      <FaqSection />
    </>
  )
}
