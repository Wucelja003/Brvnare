import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import { softEase, useIsDesktop } from '../lib/motion'
import SplitHeading from './fx/SplitHeading'
import CountUp from './fx/CountUp'

// Tačka na fotografiji (stakleni zabat) kroz koju „ulazimo" u kuću
const DOOR = '60% 32%'

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
}

export default function Introduce() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  // Kačenje (pin) samo na dovoljno velikim ekranima — na telefonu prelaz prati karticu
  const pin = useIsDesktop('(min-width: 1024px) and (min-height: 700px)')
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: pinned } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const { scrollYProgress: free } = useScroll({
    target: cardRef,
    offset: ['start 85%', 'end 30%'],
  })

  // Jedan izvor napretka, bez obzira na režim
  const progress = useMotionValue(0)
  const pinRef = useRef(pin)
  useMotionValueEvent(pinned, 'change', (v) => pinRef.current && progress.set(v))
  useMotionValueEvent(free, 'change', (v) => !pinRef.current && progress.set(v))
  useEffect(() => {
    pinRef.current = pin
    progress.set(pin ? pinned.get() : free.get())
  }, [pin, pinned, free, progress])

  const reveal = useTransform(progress, [0.16, 0.72], [0, 1])
  const clip = useTransform(reveal, (v) => `circle(${(v * 150).toFixed(2)}% at ${DOOR})`)
  const exteriorScale = useTransform(progress, [0, 0.78], [1, 1.5])
  const interiorScale = useTransform(progress, [0.18, 1], [1.22, 1])
  const interiorFade = useTransform(reveal, [0.45, 0.55], [0, 1])
  const bar = useTransform(reveal, [0, 1], [0, 1])
  const hintOpacity = useTransform(progress, [0, 0.14], [1, 0])

  const [inside, setInside] = useState(false)
  useMotionValueEvent(reveal, 'change', (v) => setInside(v > 0.5))

  const stats = [
    { value: 100, suffix: '%', label: t('intro.stat1') },
    { value: 3, label: t('intro.stat2') },
    { value: 10, prefix: t('intro.upTo'), label: t('intro.stat3') },
  ]

  return (
    <section ref={sectionRef} className={`relative ${pin ? 'h-[210vh]' : ''}`}>
      <div className={pin ? 'sticky top-0 flex h-screen items-center' : 'py-20 sm:py-28'}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:gap-20 lg:pt-16">
          {/* Levo — tekst */}
          <div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: softEase }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-12 bg-brand-brown/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
                {t('intro.eyebrow')}
              </span>
            </motion.div>

            <SplitHeading
              pre={t('intro.titlePre')}
              highlight={t('intro.titleHighlight')}
              className="mt-6 text-[2.6rem] leading-[1.04] tracking-tight text-brand-green sm:text-5xl xl:text-6xl"
            />

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, ease: softEase, delay: 0.15 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-brand-brown sm:text-xl"
            >
              {t('intro.body1')}
            </motion.p>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.8, ease: softEase, delay: 0.25 }}
              className="mt-4 max-w-xl leading-relaxed text-brand-brown/70"
            >
              {t('intro.body2')}
            </motion.p>

            {/* Brojke */}
            <motion.dl
              {...fadeUp}
              transition={{ duration: 0.8, ease: softEase, delay: 0.35 }}
              className="mt-10 grid max-w-xl grid-cols-3 border-y border-brand-brown/15"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-5 ${i === 0 ? 'pr-3' : 'border-l border-brand-brown/15 px-3 sm:px-5'}`}
                >
                  <dd className="flex items-baseline gap-1 font-serif text-3xl font-bold text-brand-green sm:text-4xl">
                    {s.prefix && (
                      <span className="text-base font-semibold text-brand-green/70 sm:text-lg">
                        {s.prefix}
                      </span>
                    )}
                    <CountUp to={s.value} />
                    {s.suffix}
                  </dd>
                  <dt className="mt-1.5 text-[11px] leading-snug text-brand-brown/65 sm:text-xs">
                    {s.label}
                  </dt>
                </div>
              ))}
            </motion.dl>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, ease: softEase, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Link
                to="/modeli"
                className="group flex h-[52px] items-center gap-4 rounded-full bg-brand-brown pl-7 pr-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-cream shadow-[0_18px_40px_-18px_rgba(107,66,38,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7c4e2f]"
              >
                {t('intro.cta')}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-cream text-brand-brown transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/proces"
                className="group/link relative inline-flex items-center gap-2 pb-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-brown"
              >
                {t('intro.cta2')}
                <span aria-hidden="true" className="transition-transform duration-500 group-hover/link:translate-x-1">→</span>
                <span className="absolute bottom-0 left-0 h-px w-full bg-brand-brown/30" />
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-brand-brown transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
              </Link>
            </motion.div>
          </div>

          {/* Desno — „spolja → iznutra" */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease: softEase }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-[#2a1a0f] shadow-[0_44px_90px_-42px_rgba(53,71,51,0.75)] lg:aspect-auto lg:h-[min(72vh,660px)]">
              {/* Eksterijer — kamera se približava zabatu */}
              <motion.img
                src="/brvnara_photo/Photo_1.jpg"
                alt={t('intro.exterior')}
                decoding="async"
                style={reduce ? undefined : { scale: exteriorScale, transformOrigin: DOOR }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Enterijer — otvara se krug iz zabata */}
              <motion.div
                className="absolute inset-0"
                style={reduce ? { opacity: interiorFade } : { clipPath: clip }}
              >
                <motion.img
                  src="/brvnara_photo/Ent_10.jpg"
                  alt={t('intro.interior')}
                  decoding="async"
                  style={reduce ? undefined : { scale: interiorScale }}
                  className="h-full w-full object-cover object-[62%_50%]"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/20" />

              {/* Oznaka spolja / iznutra */}
              <div className="absolute left-5 top-5 overflow-hidden rounded-full border border-white/25 bg-black/25 px-4 py-1.5 backdrop-blur-md">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={inside ? 'in' : 'out'}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.45, ease: softEase }}
                    className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-cream"
                  >
                    {inside ? t('intro.inside') : t('intro.outside')}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Uputstvo — nestaje čim krene skrol */}
              <motion.div
                style={{ opacity: hintOpacity }}
                className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
              >
                <span className="rounded-full bg-brand-cream/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-brown shadow-lg backdrop-blur-md">
                  {t('intro.scrollHint')}
                </span>
              </motion.div>

              {/* Natpis + napredak */}
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
                <p className="max-w-xs font-serif text-xl font-bold leading-snug text-brand-cream sm:text-2xl">
                  {t('intro.cardCaption')}
                </p>
                <div className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cream/80">
                  <span>{t('intro.exterior')}</span>
                  <span className="relative h-px flex-1 bg-brand-cream/25">
                    <motion.span
                      style={{ scaleX: bar }}
                      className="absolute inset-0 origin-left bg-brand-cream"
                    />
                  </span>
                  <span>{t('intro.interior')}</span>
                </div>
              </div>
            </div>

            {/* Mala kartica saradnje */}
            <div className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-2xl border border-brand-brown/12 bg-[#faf6ec] py-3 pl-3 pr-5 shadow-[0_20px_44px_-24px_rgba(53,71,51,0.6)] xl:flex">
              <span
                aria-hidden="true"
                className="h-10 w-10 shrink-0 bg-brand-brown"
                style={{
                  maskImage: 'url(/BrvnaraLogo.svg)',
                  WebkitMaskImage: 'url(/BrvnaraLogo.svg)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-brown">
                {t('home.badge')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
