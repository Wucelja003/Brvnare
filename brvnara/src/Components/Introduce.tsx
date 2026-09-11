import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import CircleGallery from './CircleGallery'
import './Introduce.css'

// Probna galerija — tvoje fotografije
const galleryImages = [
  '/brvnara_photo/Photo_1.jpg',
  '/brvnara_photo/Photo_2.jpg',
  '/brvnara_photo/Photo_3.jpg',
  '/brvnara_photo/Photo_4.jpg',
  '/brvnara_photo/Photo_5.jpg',
  '/brvnara_photo/Photo_7.jpg',
  '/brvnara_photo/Photo_8.jpg',
  '/brvnara_photo/Ent_1.jpg',
  '/brvnara_photo/Ent_2.jpg',
  '/brvnara_photo/Ent_3.jpg',
]

export default function Introduce() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Detekcija telefona (za responsive galeriju)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Levo — tekst */}
        <div className={`intro-left ${visible ? 'in' : ''}`}>
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="intro-hline" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
              {t('intro.eyebrow')}
            </span>
          </div>

          {/* Naslov */}
          <h2 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl">
            {t('intro.titlePre')}{' '}
            <span className="bg-gradient-to-b from-[#5a7a54] via-[#43603f] to-[#354733] bg-clip-text pb-[0.16em] text-transparent">
              {t('intro.titleHighlight')}
            </span>
          </h2>

          {/* Tekst sa vertikalnom akcentnom linijom */}
          <div className="mt-9 flex gap-6">
            <span className="intro-vline" />
            <div className="max-w-xl space-y-5">
              <p className="text-lg leading-relaxed text-brand-brown sm:text-xl">
                {t('intro.body1')}
              </p>
              <p className="leading-relaxed text-brand-brown/75">
                {t('intro.body2')}
              </p>
            </div>
          </div>

          <Link
            to="/galerija"
            className="btn-ripple btn-wind-brown relative mt-11 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold"
          >
            {t('intro.cta')}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </div>

        {/* Desno — probna kružna galerija */}
        <div className={`intro-right ${visible ? 'in' : ''}`}>
          <div
            className={`relative w-full ${isMobile ? 'h-[380px]' : 'h-[580px]'}`}
          >
            <CircleGallery
              key={isMobile ? 'm' : 'd'}
              images={galleryImages}
              radiusPercent={isMobile ? 30 : 17}
              itemWidth={isMobile ? 96 : 185}
              itemHeight={isMobile ? 132 : 250}
              itemScale={0.9}
              borderRadius={14}
              autoSpin={isMobile ? 18 : 22}
              enableDrag={!isMobile}
              showNumbers={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
