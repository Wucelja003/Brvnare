import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import { softEase } from '../lib/motion'
import { useIntroReady } from '../lib/introReady'
import SplitHeading from './fx/SplitHeading'

export default function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const ready = useIntroReady()
  const ref = useRef<HTMLElement>(null)

  // Na skrol: video se lagano približava, sadržaj odlazi gore i nestaje
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.22])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: softEase, delay },
  })

  const facts = [t('home.fact1'), t('home.fact2'), t('home.fact3')]

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#1f1a14]"
    >
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        style={reduce ? undefined : { scale: videoScale }}
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Zatamnjenje: jače na ivicama, da tekst i header budu čitljivi */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,10,6,0.28)_0%,rgba(15,10,6,0.62)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />

      {/* Meki prelaz u krem pozadinu na dnu */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-64 bg-gradient-to-b from-transparent via-brand-brown/20 to-brand-cream sm:h-80" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 text-center"
      >
        <motion.span
          {...fadeIn(0.05)}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-brand-cream backdrop-blur-md sm:text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cream" />
          {t('home.badge')}
        </motion.span>

        <SplitHeading
          as="h1"
          immediate
          play={ready}
          delay={0.2}
          pre={t('home.titlePre')}
          highlight={t('home.titleHighlight')}
          className="mt-7 text-[3.4rem] leading-[0.98] text-brand-cream drop-shadow-[0_6px_40px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-[7.25rem]"
          highlightClassName="font-normal italic text-[#ecd9b4]"
        />

        <motion.p
          {...fadeIn(0.75)}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {t('home.subtitle')}
        </motion.p>

        <motion.div
          {...fadeIn(0.9)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/paketi"
            className="group flex h-[54px] items-center gap-4 rounded-full bg-brand-cream pl-7 pr-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-brown shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t('home.cta')}
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-brown text-brand-cream transition-transform duration-300 group-hover:translate-x-0.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
          <Link
            to="/modeli"
            className="flex h-[54px] items-center rounded-full border border-white/35 px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
          >
            {t('nav.models')}
          </Link>
        </motion.div>

        <motion.ul
          {...fadeIn(1.05)}
          className="mt-10 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:flex sm:text-[11px]"
        >
          {facts.map((f, i) => (
            <li key={f} className="flex items-center gap-5">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-white/50" />}
              {f}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Znak za skrol */}
      <motion.div
        {...fadeIn(1.3)}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-brown/70">
          {t('home.scroll')}
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-brand-brown/20">
          <span className="hero-scroll-dot absolute left-0 top-0 h-4 w-px bg-brand-brown" />
        </span>
      </motion.div>
    </section>
  )
}
