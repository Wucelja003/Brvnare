import { lazy, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import { softEase } from '../lib/motion'
import SplitHeading from './fx/SplitHeading'
import ErrorBoundary from './fx/ErrorBoundary'

// three.js galerija je zaseban chunk — učitava se tek kada zatreba
const CurvedGallery = lazy(() => import('./CurvedGallery'))

// 3D renderi naizmenično sa realizovanim kućama
const images = [
  '/3dmodels/3dmodel1.jpg',
  '/brvnara_photo/Photo_7.jpg',
  '/3dmodels/3dmodel4.jpg',
  '/brvnara_photo/Photo_2.jpg',
  '/3dmodels/3dmodels1.jpg',
  '/brvnara_photo/Photo_8.jpg',
  '/3dmodels/3dmodel3.jpg',
  '/brvnara_photo/Photo_5.jpg',
]

/** Rezerva bez WebGL-a: obična traka koja se prevlači */
function StaticStrip() {
  return (
    <div className="flex h-full snap-x gap-4 overflow-x-auto px-5 pb-2 sm:px-8">
      {images.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-[78vw] max-w-[640px] shrink-0 snap-center rounded-[24px] object-cover"
        />
      ))}
    </div>
  )
}

export default function ModelsSection({ viewAllHref }: { viewAllHref?: string }) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: softEase }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-12 bg-brand-brown/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
              {t('models.eyebrow')}
            </span>
          </motion.div>
          <SplitHeading
            pre={t('models.titlePre')}
            highlight={t('models.titleHighlight')}
            className="mt-6 text-4xl leading-[1.05] tracking-tight text-brand-green sm:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: softEase, delay: 0.15 }}
            className="mt-5 max-w-xl leading-relaxed text-brand-brown/80"
          >
            {t('models.body')}
          </motion.p>
        </div>

        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="group flex h-[52px] w-fit shrink-0 items-center gap-4 rounded-full border border-brand-brown/25 bg-[#faf6ec]/70 pl-6 pr-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-brown backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-brown/50"
          >
            {t('models.viewAll')}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-brown text-brand-cream transition-transform duration-300 group-hover:translate-x-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        )}
      </div>

      <div className="relative mt-12 h-[100vw] max-h-[620px] min-h-[340px] w-full sm:mt-14 sm:h-[46vw]">
        <ErrorBoundary fallback={<StaticStrip />}>
          <Suspense fallback={<div className="h-full w-full" />}>
            <CurvedGallery
              images={images}
              reduceMotion={!!reduce}
              onSelect={() => navigate('/modeli')}
            />
          </Suspense>
        </ErrorBoundary>
      </div>

      <p className="mx-auto mt-6 flex max-w-7xl items-center gap-3 px-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-brown/50 sm:px-8">
        <span className="h-px w-8 bg-brand-brown/30" />
        {t('models.hint')}
      </p>
    </section>
  )
}
