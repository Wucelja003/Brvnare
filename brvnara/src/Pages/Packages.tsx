import { useState } from 'react'
import { motion, type Variants } from 'motion/react'
import { Check, Minus, X, Home } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Status = 'yes' | 'partial' | 'no'
type Variant = 'light' | 'dark' | 'cream'

const columns = [
  { nameKey: 'pkg.cabin.name', price: '12.000 €', size: '25 m²', featured: false },
  { nameKey: 'pkg.family.name', price: '28.000 €', size: '55 m²', featured: true },
  { nameKey: 'pkg.premium.name', price: '45.000 €', size: '90 m²', featured: false },
]

// Placeholder opcije (tekst nije finalan)
const groups: {
  title: string
  rows: { feature: string; cells: [Status, Status, Status] }[]
}[] = [
  {
    title: 'Konstrukcija',
    rows: [
      { feature: 'Drvena konstrukcija', cells: ['yes', 'yes', 'yes'] },
      { feature: 'Krov i izolacija', cells: ['yes', 'yes', 'yes'] },
      { feature: 'Terasa', cells: ['partial', 'yes', 'yes'] },
    ],
  },
  {
    title: 'Enterijer',
    rows: [
      { feature: 'Kupatilo', cells: ['yes', 'yes', 'yes'] },
      { feature: 'Opremljena kuhinja', cells: ['partial', 'yes', 'yes'] },
      { feature: 'Nameštaj po meri', cells: ['no', 'partial', 'yes'] },
    ],
  },
  {
    title: 'Dodatno',
    rows: [
      { feature: '3D projekat', cells: ['yes', 'yes', 'yes'] },
      { feature: 'Pametna kuća', cells: ['no', 'no', 'yes'] },
      { feature: 'Garancija 10 godina', cells: ['partial', 'yes', 'yes'] },
    ],
  },
]

const gridCols =
  'grid grid-cols-[minmax(150px,1.4fr)_minmax(140px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)]'

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const rowVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

function StatusChip({
  status,
  variant = 'light',
}: {
  status: Status
  variant?: Variant
}) {
  if (status === 'yes') {
    const cls =
      variant === 'cream'
        ? 'bg-brand-brown text-brand-cream'
        : variant === 'dark'
          ? 'border border-brand-cream/40 text-brand-cream'
          : 'border border-brand-brown/40 text-brand-brown'
    return (
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${cls}`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </span>
    )
  }
  if (status === 'partial') {
    const cls =
      variant === 'cream'
        ? 'border-brand-brown/50 text-brand-brown/70'
        : variant === 'dark'
          ? 'border-brand-cream/40 text-brand-cream/60'
          : 'border-brand-brown/40 text-brand-brown/70'
    return (
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed ${cls}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </span>
    )
  }
  const cls =
    variant === 'cream'
      ? 'bg-brand-brown/10 text-brand-brown/40'
      : variant === 'dark'
        ? 'bg-white/10 text-white/35'
        : 'bg-brand-brown/5 text-brand-brown/40'
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${cls}`}
    >
      <X className="h-3.5 w-3.5" />
    </span>
  )
}

const legend: { status: Status; label: string }[] = [
  { status: 'yes', label: 'Uključeno' },
  { status: 'partial', label: 'Delimično / doplata' },
  { status: 'no', label: 'Nije uključeno' },
]

export default function Packages() {
  const { t } = useI18n()
  const [selected, setSelected] = useState<number | null>(1)
  const [hovered, setHovered] = useState<number | null>(null)

  const colState = (i: number) => {
    const sel = selected === i
    const hov = hovered === i
    const bg = sel
      ? 'bg-brand-cream border-x border-brand-cream'
      : hov
        ? 'bg-brand-cream/10 border-x border-brand-cream/15'
        : columns[i].featured
          ? 'bg-white/[0.06] border-x border-white/10'
          : 'border-x border-transparent'
    return {
      sel,
      className: `cursor-pointer transition-colors duration-200 ${bg}`,
      onMouseEnter: () => setHovered(i),
      onMouseLeave: () => setHovered(null),
      onClick: () => setSelected(i),
    }
  }

  return (
    <section
      id="paketi"
      className="relative scroll-mt-24 px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Zaglavlje */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 grid gap-6 sm:mb-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="models-hline" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
                {t('packages.eyebrow')}
              </span>
            </div>
            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl">
              {t('packages.title')}
            </h2>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            {legend.map((item) => (
              <li key={item.status} className="flex items-center gap-2">
                <StatusChip status={item.status} variant="light" />
                <span className="text-sm text-brand-brown/80">{item.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Tabela paketa — braon kartica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-[#4a2d19] bg-brand-brown shadow-[0_30px_70px_-20px_rgba(74,45,25,0.55)]"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[680px]">
              {/* Zaglavlje kolona */}
              <div className={`${gridCols} border-b border-white/10`}>
                <div className="sticky left-0 z-10 flex items-end bg-brand-brown px-6 py-6">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-cream/70">
                    Paket
                  </span>
                </div>
                {columns.map((column, i) => {
                  const st = colState(i)
                  return (
                    <div
                      key={column.nameKey}
                      className={`px-5 py-6 ${st.className}`}
                      onMouseEnter={st.onMouseEnter}
                      onMouseLeave={st.onMouseLeave}
                      onClick={st.onClick}
                    >
                      <div className="flex items-center gap-2">
                        {column.featured && (
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                              st.sel
                                ? 'bg-brand-brown text-brand-cream'
                                : 'bg-brand-cream text-brand-brown'
                            }`}
                          >
                            <Home className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span
                          className={`text-base font-bold ${
                            st.sel ? 'text-brand-brown' : 'text-brand-cream'
                          }`}
                        >
                          {t(column.nameKey)}
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-2xl font-bold ${
                          st.sel ? 'text-brand-brown' : 'text-brand-cream'
                        }`}
                      >
                        {t('packages.priceFrom')} {column.price}
                      </p>
                      <p
                        className={`mt-1 text-xs font-medium ${
                          st.sel ? 'text-brand-brown/60' : 'text-brand-cream/60'
                        }`}
                      >
                        {column.size}
                      </p>
                      {column.featured && (
                        <span
                          className={`mt-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
                            st.sel
                              ? 'bg-brand-brown text-brand-cream'
                              : 'bg-brand-cream text-brand-brown'
                          }`}
                        >
                          Najpopularnije
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Grupe opcija */}
              {groups.map((group, groupIndex) => (
                <motion.div
                  key={group.title}
                  variants={listVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  <div className={`${gridCols} border-b border-white/10`}>
                    <div className="sticky left-0 z-10 bg-brand-brown px-6 pb-2.5 pt-6">
                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-cream/70">
                        {group.title}
                      </h3>
                    </div>
                    {columns.map((_, i) => {
                      const st = colState(i)
                      return (
                        <div
                          key={i}
                          className={st.className}
                          onMouseEnter={st.onMouseEnter}
                          onMouseLeave={st.onMouseLeave}
                          onClick={st.onClick}
                        />
                      )
                    })}
                  </div>
                  {group.rows.map((row, rowIndex) => (
                    <motion.div
                      key={row.feature}
                      variants={rowVariants}
                      className={`${gridCols} ${
                        groupIndex === groups.length - 1 &&
                        rowIndex === group.rows.length - 1
                          ? ''
                          : 'border-b border-white/10'
                      }`}
                    >
                      <div className="sticky left-0 z-10 flex items-center bg-brand-brown px-6 py-4">
                        <span className="text-sm font-bold text-brand-cream">
                          {row.feature}
                        </span>
                      </div>
                      {row.cells.map((status, cellIndex) => {
                        const st = colState(cellIndex)
                        return (
                          <div
                            key={cellIndex}
                            className={`flex items-center px-5 py-4 ${st.className}`}
                            onMouseEnter={st.onMouseEnter}
                            onMouseLeave={st.onMouseLeave}
                            onClick={st.onClick}
                          >
                            <StatusChip
                              status={status}
                              variant={st.sel ? 'cream' : 'dark'}
                            />
                          </div>
                        )
                      })}
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-brown to-transparent lg:hidden" />
        </motion.div>
      </div>
    </section>
  )
}
