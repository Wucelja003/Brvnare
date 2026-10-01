import { useRef, type ComponentType, type SVGProps } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import SplitHeading from './fx/SplitHeading'

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

const ClockIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

// Slike koraka (placeholder — menjaju se kada stignu fotografije sa gradilišta)
const steps: {
  key: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  image: string
}[] = [
  { key: 'step1', Icon: ConsultIcon, image: '/brvnara_photo/Ent_8.jpg' },
  { key: 'step2', Icon: DesignIcon, image: '/3dmodels/3dmodels1.jpg' },
  { key: 'step3', Icon: BuildIcon, image: '/brvnara_photo/Photo_3.jpg' },
  { key: 'step4', Icon: InteriorIcon, image: '/brvnara_photo/Ent_1.jpg' },
  { key: 'step5', Icon: KeyIcon, image: '/brvnara_photo/Photo_7.jpg' },
]

function StepCard({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof steps)[number]
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const cardRef = useRef<HTMLElement>(null)
  const last = index === total - 1
  const num = String(index + 1).padStart(2, '0')

  // Prethodne kartice se blago smanje i zatamne dok nove klize preko njih
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045])
  const shade = useTransform(
    progress,
    [index / total, Math.min(1, (index + 1) / total)],
    [0, last ? 0 : 0.14],
  )
  // Fotografija se lagano „smiri" dok kartica ulazi
  const { scrollYProgress: entering } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })
  const imageScale = useTransform(entering, [0, 1], [1.22, 1])

  const points = t(`process.${step.key}.points`).split('|')

  return (
    <div className="sticky top-24 flex h-[82svh] items-start sm:top-28">
      <motion.article
        ref={cardRef}
        style={reduce ? { top: index * 22 } : { top: index * 22, scale }}
        className={`relative grid w-full origin-top overflow-hidden rounded-[34px] border shadow-[0_-26px_60px_-36px_rgba(53,71,51,0.45),0_44px_90px_-52px_rgba(53,71,51,0.7)] lg:h-[min(calc(100svh-190px),540px)] lg:grid-cols-[1fr_1.05fr] ${
          last
            ? 'border-[#4a2d19] bg-brand-brown text-brand-cream'
            : 'border-brand-brown/12 bg-[#faf6ec] text-brand-brown'
        }`}
      >
        {/* Fotografija (na telefonu gore) */}
        <div className="relative order-first m-2.5 h-44 overflow-hidden rounded-[26px] sm:h-60 lg:order-none lg:col-start-2 lg:row-start-1 lg:m-3 lg:h-auto">
          <motion.img
            src={step.image}
            alt=""
            loading="lazy"
            decoding="async"
            style={reduce ? undefined : { scale: imageScale }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-2xl bg-brand-cream/90 text-brand-brown shadow-lg backdrop-blur-md">
            <step.Icon className="h-5 w-5" />
          </span>
        </div>

        {/* Sadržaj */}
        <div className="relative flex flex-col px-7 pb-8 pt-5 sm:px-10 sm:pb-10 lg:col-start-1 lg:row-start-1 lg:p-12">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] opacity-60">
              {t('process.step')} {num} / {String(total).padStart(2, '0')}
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                last ? 'border-brand-cream/30' : 'border-brand-brown/20'
              }`}
            >
              <ClockIcon className="h-3.5 w-3.5" />
              {t(`process.${step.key}.time`)}
            </span>
          </div>

          {/* Veliki broj u pozadini */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -bottom-8 right-2 select-none font-serif text-[150px] font-bold leading-none text-transparent lg:text-[210px] ${
              last
                ? '[-webkit-text-stroke:1.5px_rgba(240,230,210,0.16)]'
                : '[-webkit-text-stroke:1.5px_rgba(107,66,38,0.13)]'
            }`}
          >
            {num}
          </span>

          <div className="relative mt-6 lg:mt-auto">
            <h3
              className={`text-3xl leading-tight sm:text-4xl ${
                last ? 'text-brand-cream' : 'text-brand-green'
              }`}
            >
              {t(`process.${step.key}.title`)}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed opacity-80">
              {t(`process.${step.key}.desc`)}
            </p>
            <ul className="mt-6 space-y-2.5">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm">
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      last ? 'bg-brand-cream text-brand-brown' : 'bg-brand-brown text-brand-cream'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5" aria-hidden="true">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Zatamnjenje kada je kartica prekrivena */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 bg-[#2a1a0f]"
        />
      </motion.article>
    </div>
  )
}

export default function ProcessSection({ viewAllHref }: { viewAllHref?: string }) {
  const { t } = useI18n()
  const stackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      {/* Zaglavlje */}
      <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
          {t('process.eyebrow')}
        </span>
        <SplitHeading
          pre={t('process.titlePre')}
          highlight={t('process.titleHighlight')}
          className="mt-5 text-4xl leading-[1.05] tracking-tight text-brand-green sm:text-5xl"
        />
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-brand-brown/80">
          {t('process.subtitle')}
        </p>
      </div>

      {/* Kartice koje se slažu jedna preko druge dok se skroluje */}
      <div ref={stackRef} className="relative mx-auto max-w-6xl">
        {steps.map((step, i) => (
          <StepCard
            key={step.key}
            step={step}
            index={i}
            total={steps.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {viewAllHref && (
        <div className="mt-6 text-center">
          <Link
            to={viewAllHref}
            className="group inline-flex h-[52px] items-center gap-4 rounded-full border border-brand-brown/25 bg-[#faf6ec]/70 pl-6 pr-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-brown backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-brown/50"
          >
            {t('process.viewAll')}
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-brown text-brand-cream transition-transform duration-300 group-hover:translate-x-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </section>
  )
}
