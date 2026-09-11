import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Plan {
  nameKey: string
  pricePerM2: string
  tagline: string
  lead: string
  cta: string
  features: string[]
}

// Placeholder sadržaj (tekst i cene menjamo kasnije)
const plans: Plan[] = [
  {
    nameKey: 'pkg.cabin.name',
    pricePerM2: 'od 350 €/m²',
    tagline: 'Idealna vikendica za odmor i kraće boravke.',
    lead: 'Uključeno:',
    cta: 'Izaberi Vikendicu',
    features: [
      'Drvena konstrukcija od sušenog drveta',
      'Krov i termoizolacija',
      'Osnovno kupatilo',
      'Terasa (opciono)',
      'Idejni 3D projekat',
      'Dostava i montaža',
    ],
  },
  {
    nameKey: 'pkg.family.name',
    pricePerM2: 'od 550 €/m²',
    tagline: 'Prostrana brvnara za celu porodicu.',
    lead: 'Sve iz Vikendice, plus:',
    cta: 'Izaberi Porodičnu',
    features: [
      'Veća kvadratura i raspored po meri',
      'Opremljena kuhinja',
      'Dva kupatila',
      'Kvalitetnija izolacija',
      'Terasa u ceni',
      'Podno grejanje (opciono)',
    ],
  },
  {
    nameKey: 'pkg.premium.name',
    pricePerM2: 'od 800 €/m²',
    tagline: 'Vrhunska brvnara po meri, do najsitnijeg detalja.',
    lead: 'Sve iz Porodične, plus:',
    cta: 'Izaberi Premium',
    features: [
      'Nameštaj po meri',
      'Pametna kuća (smart home)',
      'Premium materijali i završna obrada',
      'Podno grejanje',
      'Garancija 10 godina',
      'Dedicirani projekt menadžer',
    ],
  },
]

function Check({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

export default function Packages() {
  const { t } = useI18n()
  const [active, setActive] = useState(1)
  const reduceMotion = useReducedMotion()
  const plan = plans[active]
  const shift = reduceMotion ? 0 : 18

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: shift },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section
      id="paketi"
      className="relative scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="mx-auto w-full max-w-6xl"
      >
        {/* Zaglavlje */}
        <motion.div variants={item} className="max-w-2xl">
          <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
            {t('packages.eyebrow')}
          </span>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl">
            {t('packages.title')}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-brand-brown/80">
            {t('packages.subtitle')}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Levo — izbor paketa */}
          <div className="space-y-3" role="group" aria-label="Izbor paketa">
            {plans.map((option, index) => {
              const selected = active === index
              return (
                <motion.button
                  key={option.nameKey}
                  variants={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  className={`relative w-full cursor-pointer rounded-2xl border p-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown ${
                    selected
                      ? 'border-transparent'
                      : 'border-brand-green/15 hover:border-brand-brown/40'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="pkg-selected"
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                      className="absolute -inset-px rounded-2xl bg-brand-brown/[0.07] ring-2 ring-inset ring-brand-brown"
                    />
                  )}
                  <span className="relative z-10 flex items-start gap-4">
                    <span
                      className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
                        selected ? 'border-brand-brown' : 'border-brand-green/30'
                      }`}
                    >
                      <motion.span
                        initial={false}
                        animate={{ scale: selected ? 1 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease: EASE }}
                        className="h-2.5 w-2.5 rounded-full bg-brand-brown"
                      />
                    </span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-lg font-bold text-brand-green">
                          {t(option.nameKey)}
                        </span>
                        <span className="text-sm font-bold text-brand-brown">
                          {option.pricePerM2}
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-brand-brown/60">
                        {option.tagline}
                      </span>
                    </span>
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Desno — detalji izabranog (braon kartica) */}
          <motion.div
            variants={item}
            className="rounded-3xl border border-[#4a2d19] bg-brand-brown p-6 shadow-[0_30px_70px_-25px_rgba(74,45,25,0.55)] sm:p-8 lg:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={plan.nameKey}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE }}
              >
                <h3 className="text-2xl font-bold tracking-tight text-brand-cream sm:text-3xl">
                  {t(plan.nameKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-cream/70">
                  {plan.tagline}
                </p>

                {/* Cena po kvadratu */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-brand-cream sm:text-4xl">
                    {plan.pricePerM2}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-brand-cream/50">
                    {t('packages.priceLabel')}
                  </span>
                </div>

                <p className="mt-8 text-sm font-semibold text-brand-cream">
                  {plan.lead}
                </p>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-brand-cream/80"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-cream/15">
                        <Check className="h-3 w-3 text-brand-cream" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/kontakt"
                  className="mt-8 block w-full rounded-full bg-brand-cream px-8 py-3.5 text-center text-sm font-bold uppercase tracking-[0.08em] text-brand-brown transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(0,0,0,0.4)]"
                >
                  {plan.cta}
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
