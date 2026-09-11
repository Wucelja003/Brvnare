import {
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type SVGProps,
} from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import './ProcessSection.css'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

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

type Step = {
  key: string
  Icon: (p: SVGProps<SVGSVGElement>) => ReactElement
}

const steps: Step[] = [
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
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  }

  const selectTab = (index: number) => {
    const next = (index + steps.length) % steps.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      selectTab(active + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      selectTab(active - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectTab(steps.length - 1)
    }
  }

  const ActiveIcon = steps[active].Icon

  return (
    <section
      aria-labelledby="proces-heading"
      className="relative px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(320px,0.9fr)_1.15fr] lg:items-start lg:gap-16"
        >
          {/* LEVO — koraci */}
          <motion.div variants={item}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
              {t('process.eyebrow')}
            </span>
            <h2
              id="proces-heading"
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl"
            >
              {t('process.titlePre')}{' '}
              <span className="bg-gradient-to-b from-[#5a7a54] via-[#43603f] to-[#354733] bg-clip-text pb-[0.16em] text-transparent">
                {t('process.titleHighlight')}
              </span>
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-brand-brown/80">
              {t('process.subtitle')}
            </p>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Koraci procesa"
              onKeyDown={handleKeyDown}
              className="mt-8 flex flex-col gap-1.5 lg:mt-10"
            >
              {steps.map((step, index) => {
                const isActive = active === index
                return (
                  <button
                    key={step.key}
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                    type="button"
                    role="tab"
                    id={`proces-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls="proces-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={`relative w-full cursor-pointer rounded-2xl px-4 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown ${
                      isActive ? '' : 'hover:bg-brand-brown/5'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="proces-indicator"
                        transition={{ duration: 0.4, ease: EASE }}
                        className="absolute inset-0 rounded-2xl bg-brand-brown/10"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative flex items-start gap-4">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? 'border-brand-brown bg-brand-brown text-brand-cream'
                            : 'border-brand-brown/25 text-brand-brown/50'
                        }`}
                      >
                        <step.Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span
                            className={`text-base font-semibold ${
                              isActive ? 'text-brand-green' : 'text-brand-brown/60'
                            }`}
                          >
                            {t(`process.${step.key}.title`)}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] text-brand-brown/40">
                            0{index + 1}
                          </span>
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.span
                              key="copy"
                              initial={
                                reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
                              }
                              animate={
                                reduce
                                  ? { opacity: 1 }
                                  : { height: 'auto', opacity: 1 }
                              }
                              exit={
                                reduce ? { opacity: 0 } : { height: 0, opacity: 0 }
                              }
                              transition={{ duration: 0.35, ease: EASE }}
                              className="block overflow-hidden"
                            >
                              <span className="block pt-2 text-sm leading-relaxed text-brand-brown/80">
                                {t(`process.${step.key}.desc`)}
                              </span>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            {viewAllHref && (
              <Link
                to={viewAllHref}
                className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full text-sm font-semibold text-brand-green transition-colors duration-200 hover:text-brand-brown"
              >
                {t('process.viewAll')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </motion.div>

          {/* DESNO — panel sa ikonicom */}
          <motion.div variants={item} className="min-w-0">
            <div className="rounded-3xl border border-[#4a2d19] bg-brand-brown p-2 shadow-[0_30px_70px_-25px_rgba(74,45,25,0.5)]">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream/70">
                  {t(`process.${steps[active].key}.title`)}
                </span>
                <span className="font-mono text-[11px] text-brand-cream/40">
                  Korak {active + 1} / {steps.length}
                </span>
              </div>
              <div
                id="proces-panel"
                role="tabpanel"
                aria-labelledby={`proces-tab-${active}`}
                className="min-h-[380px] overflow-hidden rounded-2xl border border-brand-cream/10 bg-black/15 sm:min-h-[420px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex h-full flex-col items-start gap-6 p-7 sm:p-10"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-cream text-brand-brown shadow-lg">
                      <ActiveIcon className="h-8 w-8" />
                    </span>
                    <div>
                      <span className="font-mono text-xs text-brand-cream/50">
                        0{active + 1} / 0{steps.length}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold text-brand-cream sm:text-3xl">
                        {t(`process.${steps[active].key}.title`)}
                      </h3>
                      <p className="mt-3 max-w-md leading-relaxed text-brand-cream/80">
                        {t(`process.${steps[active].key}.desc`)}
                      </p>
                    </div>

                    {/* Napredak — tačkice */}
                    <div className="mt-auto flex items-center gap-2 pt-4">
                      {steps.map((s, i) => (
                        <span
                          key={s.key}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === active
                              ? 'w-8 bg-brand-cream'
                              : 'w-1.5 bg-brand-cream/25'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
