import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { softEase } from '../lib/motion'
import HouseModelCard from '../Components/HouseModelCard'
import { houseModels } from '../data/houseModels'
import { packagePlans, type PackagePlan } from '../data/packages'

type Filter = 'sve' | PackagePlan['id']

export default function ModelsPage() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState<Filter>('sve')

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'sve', label: 'Svi modeli', count: houseModels.length },
    ...packagePlans.map((p) => ({
      id: p.id as Filter,
      label: p.name,
      count: houseModels.filter((m) => m.packageId === p.id).length,
    })),
  ]
  const visible = houseModels.filter((m) => filter === 'sve' || m.packageId === filter)

  return (
    <div className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32">
      {/* Zaglavlje */}
      <motion.header
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: softEase }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
          (03) — Modeli
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-6xl">
          Modeli kuća
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-brown/80">
          Provereni rasporedi koje prilagođavamo vašim željama — ili polazna
          tačka za potpuno novu kuću.
        </p>

        {/* Filter po paketu */}
        <div className="-mx-5 mt-9 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div className="inline-flex gap-1.5 whitespace-nowrap rounded-full border border-brand-brown/12 bg-[#faf6ec]/70 p-1.5 backdrop-blur-sm">
          {filters.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`relative flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                  active ? 'text-brand-cream' : 'text-brand-brown/70 hover:text-brand-brown'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="models-filter"
                    transition={{ duration: reduce ? 0 : 0.4, ease: softEase }}
                    className="absolute inset-0 rounded-full bg-brand-brown"
                  />
                )}
                <span className="relative">{f.label}</span>
                <span
                  className={`relative rounded-full px-1.5 text-[11px] tabular-nums ${
                    active ? 'bg-brand-cream/20' : 'bg-brand-brown/10'
                  }`}
                >
                  {f.count}
                </span>
              </button>
            )
          })}
        </div>
        </div>
      </motion.header>

      {/* Kartice */}
      <motion.div layout className="mx-auto mt-14 grid max-w-6xl gap-6 sm:mt-16 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((model) => (
            <motion.div
              key={model.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: softEase }}
            >
              <HouseModelCard model={model} index={houseModels.indexOf(model)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Po meri */}
      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-center gap-5 rounded-[30px] border border-[#4a2d19] bg-brand-brown px-7 py-10 text-center shadow-[0_36px_80px_-34px_rgba(74,45,25,0.75)] sm:mt-20 sm:px-10">
        <h2 className="max-w-xl text-2xl font-bold text-brand-cream sm:text-3xl">
          Ne vidite model koji vam odgovara?
        </h2>
        <p className="max-w-lg text-sm leading-relaxed text-brand-cream/70">
          Svaki model je samo polazna tačka. Crtamo raspored po vašoj meri — od
          broja soba do položaja prozora prema pogledu.
        </p>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/kontakt"
            className="group flex h-[52px] items-center gap-2.5 rounded-full bg-brand-cream px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-brown transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.45)]"
          >
            Kuća po meri
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            to="/paketi"
            className="flex h-[52px] items-center rounded-full border border-brand-cream/30 px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-cream transition-colors duration-300 hover:bg-brand-cream/10"
          >
            Uporedite pakete
          </Link>
        </div>
      </div>
    </div>
  )
}
