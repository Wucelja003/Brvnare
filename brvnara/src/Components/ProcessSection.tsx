import { useEffect, useRef, useState, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import { softEase } from '../lib/motion'
import './ProcessSection.css'

const iconBase: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const ConsultIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)
const DesignIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...p}>
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
)
const BuildIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...p}>
    <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
    <path d="M17.64 15 22 10.64" />
    <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.33 2.25.93l1.25 1.25" />
  </svg>
)
const InteriorIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...p}>
    <path d="M5 11a2 2 0 0 0-2 2v3h18v-3a2 2 0 0 0-2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3z" />
    <path d="M7 11V9a1 1 0 0 1 1-1h3v3M13 11V8h3a1 1 0 0 1 1 1v2" />
    <path d="M4 16v3M20 16v3" />
  </svg>
)
const KeyIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...p}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
)

const steps = [
  { key: 'step1', Icon: ConsultIcon },
  { key: 'step2', Icon: DesignIcon },
  { key: 'step3', Icon: BuildIcon },
  { key: 'step4', Icon: InteriorIcon },
  { key: 'step5', Icon: KeyIcon },
]

export default function ProcessSection({
  viewAllHref,
}: {
  viewAllHref?: string
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<boolean[]>(() => steps.map(() => false))

  // Popuna šine i aktivne tačke prate skrol
  useEffect(() => {
    const wrap = timelineRef.current
    if (!wrap) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const anchor = (window.innerHeight || 800) * 0.55
      const p = Math.min(
        1,
        Math.max(0, (anchor - rect.top) / Math.max(rect.height, 1)),
      )
      setProgress(p)
      const dots = wrap.querySelectorAll<HTMLElement>('[data-dot]')
      setActive(
        Array.from(dots).map((d) => {
          const r = d.getBoundingClientRect()
          return r.top + r.height / 2 <= anchor + 2
        }),
      )
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      {/* Zaglavlje */}
      <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
          {t('process.eyebrow')}
        </span>
        <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl">
          {t('process.titlePre')}{' '}
          <span className="bg-gradient-to-b from-[#5a7a54] via-[#43603f] to-[#354733] bg-clip-text pb-[0.16em] text-transparent">
            {t('process.titleHighlight')}
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-brand-brown/80">
          {t('process.subtitle')}
        </p>
      </div>

      {/* Vremenska linija — šina po sredini, kartice naizmenično levo/desno */}
      <div ref={timelineRef} className="relative mx-auto max-w-5xl">
        {/* Šina */}
        <div className="process-rail pointer-events-none absolute bottom-10 left-[27px] top-10 w-0.5 -translate-x-1/2 md:left-1/2" />
        {/* Popuna koja raste sa skrolom */}
        <div
          className="process-fill pointer-events-none absolute left-[27px] top-10 w-0.5 -translate-x-1/2 rounded-full bg-brand-brown md:left-1/2"
          style={{ height: `calc(${progress} * (100% - 5rem))` }}
        />

        <ol className="relative space-y-5 sm:space-y-7">
          {steps.map((step, i) => {
            const even = i % 2 === 0
            const isActive = active[i]
            return (
              <li key={step.key} className="relative md:grid md:grid-cols-2">
                {/* Tačka sa brojem — tačno na šini */}
                <span
                  data-dot
                  className={`process-dot absolute left-[27px] top-10 z-10 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[13px] font-bold md:left-1/2 md:top-1/2 ${
                    isActive
                      ? 'is-active border-brand-brown bg-brand-brown text-brand-cream'
                      : 'border-brand-brown/20 bg-[#faf6ec] text-brand-brown/45'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: softEase }}
                  className={`pl-16 sm:pl-20 md:pl-0 ${
                    even ? 'md:col-start-1 md:pr-16' : 'md:col-start-2 md:pl-16'
                  }`}
                >
                  <div
                    className={`process-card group relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-sm sm:p-7 ${
                      isActive
                        ? 'border-brand-brown/35 bg-[#f8f1e0] shadow-[0_26px_60px_-30px_rgba(53,71,51,0.6)]'
                        : 'border-brand-brown/12 bg-[#faf6ec]/75 shadow-[0_18px_44px_-30px_rgba(53,71,51,0.5)]'
                    }`}
                  >
                    {/* Veliki broj u pozadini kartice */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 text-[76px] font-bold leading-none text-brand-brown/[0.06]"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`relative grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-500 ${
                        isActive
                          ? 'bg-brand-brown text-brand-cream'
                          : 'bg-brand-brown/10 text-brand-brown'
                      }`}
                    >
                      <step.Icon className="h-[22px] w-[22px]" />
                    </span>

                    <h3 className="relative mt-5 text-xl font-bold text-brand-green sm:text-[22px]">
                      {t(`process.${step.key}.title`)}
                    </h3>
                    <p className="relative mt-2.5 max-w-md leading-relaxed text-brand-brown/75">
                      {t(`process.${step.key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>

        {viewAllHref && (
          <div className="mt-14 text-center">
            <Link
              to={viewAllHref}
              className="group inline-flex items-center gap-2 rounded-full border border-brand-brown/25 bg-[#faf6ec]/70 px-7 py-3.5 text-sm font-semibold text-brand-brown backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-brown/50 hover:bg-[#f8f1e0]"
            >
              {t('process.viewAll')}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
