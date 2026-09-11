import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import Introduce from '../Components/Introduce'
import ProcessSection from '../Components/ProcessSection'
import ModelsSection from '../Components/ModelsSection'
import Packages from './Packages'
import FaqSection from '../Components/FaqSection'

export default function Home() {
  const { t } = useI18n()
  const { hash } = useLocation()

  // Skrol do #paketi kada se dođe sa druge strane (nav „Naši paketi").
  // Nekoliko pokušaja jer lazy slike iznad mogu da pomere layout.
  useEffect(() => {
    if (hash !== '#paketi') return
    let tries = 0
    let timer: number
    const run = () => {
      const el = document.getElementById('paketi')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      if (++tries < 4) timer = window.setTimeout(run, 250)
    }
    timer = window.setTimeout(run, 100)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/45" />

        {/* Meki prelaz u krem pozadinu na dnu (duži + topliji među-ton) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-72 bg-gradient-to-b from-transparent via-brand-brown/20 to-brand-cream sm:h-96" />

        <div className="relative z-10 max-w-2xl px-6 text-center text-white">
          <h1 className="text-5xl font-semibold tracking-tight drop-shadow-md sm:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90 drop-shadow">
            {t('home.subtitle')}
          </p>
          <Link
            to="/#paketi"
            className="mt-8 inline-block rounded-lg bg-brand-brown px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-brand-brown/90"
          >
            {t('home.cta')}
          </Link>
        </div>
      </section>

      {/* Introduce — saradnja sa Jela Komerc */}
      <Introduce />

      {/* Proces (teaser) → /proces */}
      <ProcessSection viewAllHref="/proces" />

      {/* Modeli (teaser) → /modeli */}
      <ModelsSection viewAllHref="/modeli" />

      {/* Paketi — sekcija na početnoj */}
      <Packages />

      {/* Česta pitanja */}
      <FaqSection />
    </>
  )
}
