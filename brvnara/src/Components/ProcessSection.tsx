import { useEffect, useRef, useState, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
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
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<boolean[]>(() => steps.map(() => false))
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    steps.map(() => false),
  )

  // Popuna linije + aktivne tačke prate skrol
  useEffect(() => {
    const wrap = timelineRef.current
    if (!wrap) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight || 800
      const anchor = vh * 0.5
      const p = Math.min(
        1,
        Math.max(0, (anchor - rect.top) / Math.max(rect.height, 1)),
      )
      setProgress(p)
      const dots = wrap.querySelectorAll<HTMLElement>('[data-dot]')
      setActive(
        Array.from(dots).map((d) => d.getBoundingClientRect().top <= anchor + 4),
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

  // Otkrivanje koraka kad uđe u vidokrug
  useEffect(() => {
    const wrap = timelineRef.current
    if (!wrap) return
    const items = wrap.querySelectorAll<HTMLElement>('[data-step]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.step)
            setRevealed((prev) => {
              if (prev[i]) return prev
              const next = [...prev]
              next[i] = true
              return next
            })
          }
        })
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.25 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      {/* Zaglavlje — centrirano */}
      <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
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

      {/* Vremenska linija — linija po sredini, koraci naizmenično levo/desno */}
      <div ref={timelineRef} className="relative mx-auto max-w-4xl">
        {/* Isprekidana linija (mobilno levo, desktop centar) */}
        <div className="pointer-events-none absolute bottom-8 left-7 top-8 w-0 -translate-x-1/2 border-l-2 border-dashed border-brand-brown/25 md:left-1/2" />
        {/* Popuna koja raste sa skrolom */}
        <div
          className="process-fill pointer-events-none absolute left-7 top-8 w-[3px] -translate-x-1/2 rounded-full bg-brand-brown md:left-1/2"
          style={{ height: `calc(${progress} * (100% - 4rem))` }}
        />

        <ol className="relative space-y-10 sm:space-y-14">
          {steps.map((step, i) => {
            const even = i % 2 === 0
            return (
              <li
                key={step.key}
                data-step={i}
                className={`process-step grid grid-cols-[auto_1fr] items-center gap-x-6 md:grid-cols-[1fr_auto_1fr] md:gap-x-10 ${
                  revealed[i] ? 'revealed' : ''
                }`}
              >
                {/* Tačka sa ikonicom — na liniji */}
                <span
                  data-dot
                  className={`process-dot col-start-1 flex h-14 w-14 items-center justify-center rounded-full border-2 md:col-start-2 ${
                    active[i]
                      ? 'is-active border-brand-brown bg-brand-brown text-brand-cream'
                      : 'border-brand-brown/30 bg-brand-cream text-brand-brown/50'
                  }`}
                >
                  <step.Icon className="h-6 w-6" />
                </span>

                {/* Sadržaj — mobilno desno; desktop naizmenično levo/desno */}
                <div
                  className={`col-start-2 ${
                    even
                      ? 'md:col-start-1 md:pr-10 md:text-right'
                      : 'md:col-start-3 md:pl-10'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-brown/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-brand-green sm:text-2xl">
                    {t(`process.${step.key}.title`)}
                  </h3>
                  <p
                    className={`mt-2 max-w-md leading-relaxed text-brand-brown/80 ${
                      even ? 'md:ml-auto' : ''
                    }`}
                  >
                    {t(`process.${step.key}.desc`)}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {viewAllHref && (
          <div className="mt-14 text-center">
            <Link
              to={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c4e2f]"
            >
              {t('process.viewAll')}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
