import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { softEase } from '../lib/motion'
import { packagePlans } from '../data/packages'
import type { HouseModel } from '../data/houseModels'

const icon = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-[18px] w-[18px]',
  'aria-hidden': true,
}

const AreaIcon = () => (
  <svg {...icon}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h4M3 15h4M9 3v4M15 3v4" />
  </svg>
)
const BedIcon = () => (
  <svg {...icon}>
    <path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6M2 18h20M2 21v-3M22 21v-3" />
    <path d="M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
  </svg>
)
const BathIcon = () => (
  <svg {...icon}>
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3z" />
    <path d="M6 12V5a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2" />
  </svg>
)
const FloorsIcon = () => (
  <svg {...icon}>
    <path d="m12 3 9 5-9 5-9-5 9-5z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
)

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5" aria-hidden="true">
      <path d="M4 12l5 5L20 6" />
    </svg>
  )
}

function Spec({ Icon, value, label }: { Icon: () => ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-brand-brown/[0.06] px-2 py-3 text-center">
      <span className="text-brand-brown/70">
        <Icon />
      </span>
      <span className="text-sm font-bold leading-none text-brand-brown">{value}</span>
      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-brown/45">
        {label}
      </span>
    </div>
  )
}

export default function HouseModelCard({ model, index }: { model: HouseModel; index: number }) {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)
  const plan = packagePlans.find((p) => p.id === model.packageId)!
  const perM2 = parseInt(plan.pricePerM2, 10)
  const estimate = (perM2 * model.area).toLocaleString('sr-RS')
  const count = model.images.length

  const go = (next: number) => {
    setDir(next > current || (current === count - 1 && next === 0) ? 1 : -1)
    setCurrent((next + count) % count)
  }

  return (
    <article className="group/card flex h-full flex-col rounded-[32px] border border-brand-brown/12 bg-[#faf6ec]/80 p-3 shadow-[0_26px_60px_-36px_rgba(53,71,51,0.6)] backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_34px_70px_-34px_rgba(53,71,51,0.7)]">
      {/* Naziv i opis */}
      <header className="px-4 pb-5 pt-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-brown/50">
            Model {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
              plan.highlight
                ? 'bg-brand-brown text-brand-cream'
                : 'border border-brand-brown/25 text-brand-brown'
            }`}
          >
            {plan.name}
          </span>
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-green">
          {model.name}
        </h2>
        <p className="mt-1 text-sm font-semibold text-brand-brown/70">{model.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-brown/75">{model.description}</p>
      </header>

      {/* Slike */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-brand-brown/10">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={model.images[current]}
            src={model.images[current]}
            alt={`${model.name} — slika ${current + 1}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40, scale: 1.04 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.5, ease: softEase }}
            drag={count > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go(current + 1)
              else if (info.offset.x > 50) go(current - 1)
            }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />

        <span className="absolute right-3 top-3 rounded-full bg-brand-cream/85 px-3 py-1 text-[11px] font-bold tabular-nums text-brand-brown backdrop-blur-md">
          {current + 1} / {count}
        </span>

        {count > 1 && (
          <>
            {[
              { label: 'Prethodna slika', to: current - 1, side: 'left-3', path: 'M15 6l-6 6 6 6' },
              { label: 'Sledeća slika', to: current + 1, side: 'right-3', path: 'M9 6l6 6-6 6' },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => go(b.to)}
                className={`absolute ${b.side} top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-brand-cream/85 text-brand-brown shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-brand-cream sm:opacity-0 sm:group-hover/card:opacity-100`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d={b.path} />
                </svg>
              </button>
            ))}

            {/* Tačkice */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {model.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Slika ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-brand-cream' : 'w-1.5 bg-brand-cream/55 hover:bg-brand-cream/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sličice */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {model.images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Prikaži sliku ${i + 1}`}
            onClick={() => go(i)}
            className={`aspect-[4/3] cursor-pointer overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-[#faf6ec] transition-all duration-300 ${
              i === current ? 'ring-brand-brown' : 'opacity-60 ring-transparent hover:opacity-100'
            }`}
          >
            <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Specifikacija i sadržaj */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-6 sm:px-5">
        <div className="grid grid-cols-4 gap-2">
          <Spec Icon={AreaIcon} value={`${model.area} m²`} label="Površina" />
          <Spec Icon={BedIcon} value={String(model.bedrooms)} label={model.bedrooms === 1 ? 'Soba' : 'Sobe'} />
          <Spec Icon={BathIcon} value={String(model.bathrooms)} label="Kupatila" />
          <Spec Icon={FloorsIcon} value={model.floors.includes('+') ? '2' : '1'} label="Nivoa" />
        </div>

        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-brown/50">
            Šta sve ima
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {model.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-brand-brown/85">
                <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-brown text-brand-cream">
                  <Check />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-brand-brown/60">
            <div className="flex gap-1.5">
              <dt>Raspored:</dt>
              <dd className="font-semibold text-brand-brown">{model.floors}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>Terasa:</dt>
              <dd className="font-semibold text-brand-brown">{model.terrace}</dd>
            </div>
          </dl>
        </div>

        {/* Cena + upit */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-brand-brown/12 pt-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-brown/50">
              Okvirno od
            </span>
            <div className="mt-1 text-2xl font-bold leading-none text-brand-brown">
              {estimate} €
            </div>
            <Link to="/paketi" className="mt-1.5 inline-block text-xs text-brand-brown/60 underline-offset-4 hover:underline">
              paket {plan.name} · od {plan.pricePerM2}/m²
            </Link>
          </div>
          <Link
            to="/kontakt"
            className="group/btn flex h-12 items-center gap-2 rounded-full bg-brand-brown px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7c4e2f] hover:shadow-[0_16px_34px_-14px_rgba(107,66,38,0.9)]"
          >
            Upit za model
            <span aria-hidden="true" className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
