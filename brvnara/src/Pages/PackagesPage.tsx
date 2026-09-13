import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { softEase } from '../lib/motion'
import {
  compareGroups,
  notIncluded,
  offerSteps,
  packagePlans,
  priceFactors,
  type CompareValue,
} from '../data/packages'

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

/** Ćelija u tabeli: kvačica, crtica ili tekst */
function CompareCell({ value }: { value: CompareValue }) {
  if (value === true)
    return (
      <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-brand-brown text-brand-cream">
        <Check className="h-3 w-3" />
      </span>
    )
  if (value === false)
    return (
      <span className="inline-block h-px w-4 bg-brand-brown/30 align-middle" />
    )
  return <span className="text-brand-brown/85">{value}</span>
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: softEase } },
}

export default function PackagesPage() {
  const reduce = useReducedMotion()
  const reveal = reduce
    ? {}
    : {
        variants: fadeUp,
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, margin: '-70px' },
      }

  return (
    <div className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32">
      {/* Zaglavlje strane */}
      <motion.header {...reveal} className="mx-auto max-w-3xl text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
          (04) — Ponuda
        </span>
        <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-6xl">
          Naši paketi
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-brown/80">
          Tri nivoa opremljenosti, jedna ista pažnja prema detalju. Ispod je
          tačno navedeno šta svaki paket sadrži, šta nije uključeno u cenu i od
          čega zavisi konačan iznos.
        </p>

        <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: 'Paketa', v: '3' },
            { k: 'Cena od', v: '350 €/m²' },
            { k: 'Rok izrade', v: '4–16 ned.' },
            { k: 'Garancija', v: 'do 10 god.' },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-brand-brown/12 bg-[#faf6ec]/70 px-4 py-3.5 backdrop-blur-sm"
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-brown/50">
                {s.k}
              </dt>
              <dd className="mt-1 text-base font-bold text-brand-green">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </motion.header>

      {/* Tri paketa */}
      <section className="mx-auto mt-16 grid max-w-6xl gap-5 sm:mt-20 lg:grid-cols-3">
        {packagePlans.map((plan, i) => (
          <motion.article
            key={plan.id}
            {...(reduce
              ? {}
              : {
                  variants: fadeUp,
                  initial: 'hidden' as const,
                  whileInView: 'show' as const,
                  viewport: { once: true, margin: '-70px' },
                  transition: { delay: i * 0.08 },
                })}
            className={`relative flex flex-col rounded-[30px] border p-7 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1.5 sm:p-8 ${
              plan.highlight
                ? 'border-[#4a2d19] bg-brand-brown shadow-[0_36px_80px_-34px_rgba(74,45,25,0.75)]'
                : 'border-brand-brown/12 bg-[#faf6ec]/75 shadow-[0_22px_54px_-32px_rgba(53,71,51,0.55)]'
            }`}
          >
            {plan.badge && (
              <span
                className={`absolute -top-3 left-8 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
                  plan.highlight
                    ? 'bg-brand-cream text-brand-brown'
                    : 'bg-brand-brown text-brand-cream'
                }`}
              >
                {plan.badge}
              </span>
            )}

            <h2
              className={`text-2xl font-bold ${
                plan.highlight ? 'text-brand-cream' : 'text-brand-green'
              }`}
            >
              {plan.name}
            </h2>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                plan.highlight ? 'text-brand-cream/70' : 'text-brand-brown/70'
              }`}
            >
              {plan.tagline}
            </p>

            <div className="mt-7 flex items-end gap-2">
              <span
                className={`text-4xl font-bold leading-none ${
                  plan.highlight ? 'text-brand-cream' : 'text-brand-brown'
                }`}
              >
                {plan.pricePerM2}
              </span>
              <span
                className={`pb-1 text-xs ${
                  plan.highlight ? 'text-brand-cream/55' : 'text-brand-brown/50'
                }`}
              >
                {plan.priceNote}
              </span>
            </div>

            <div
              className={`mt-6 grid grid-cols-3 gap-2 rounded-2xl px-4 py-3 text-center ${
                plan.highlight ? 'bg-brand-cream/10' : 'bg-brand-brown/[0.06]'
              }`}
            >
              {[
                { k: 'Veličina', v: plan.sizeRange },
                { k: 'Rok', v: plan.buildTime },
                { k: 'Garancija', v: plan.warranty },
              ].map((s) => (
                <div key={s.k}>
                  <div
                    className={`text-[9px] font-bold uppercase tracking-[0.14em] ${
                      plan.highlight
                        ? 'text-brand-cream/50'
                        : 'text-brand-brown/45'
                    }`}
                  >
                    {s.k}
                  </div>
                  <div
                    className={`mt-1 text-[11px] font-semibold leading-tight ${
                      plan.highlight ? 'text-brand-cream' : 'text-brand-brown'
                    }`}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <ul className="mt-7 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-start gap-3 text-sm leading-relaxed ${
                    plan.highlight
                      ? 'text-brand-cream/85'
                      : 'text-brand-brown/80'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      plan.highlight
                        ? 'bg-brand-cream/15 text-brand-cream'
                        : 'bg-brand-brown/10 text-brand-brown'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to="/kontakt"
              className={`mt-8 flex h-[52px] items-center justify-center rounded-full text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 ${
                plan.highlight
                  ? 'bg-brand-cream text-brand-brown hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.45)]'
                  : 'border border-brand-brown/30 text-brand-brown hover:border-brand-brown/60 hover:bg-brand-brown/5'
              }`}
            >
              Zatražite ponudu
            </Link>
          </motion.article>
        ))}
      </section>

      {/* Uporedna tabela */}
      <section className="mx-auto mt-24 max-w-6xl sm:mt-32">
        <motion.div {...reveal} className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
            Detaljno poređenje
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            Šta tačno dobijate
          </h2>
          <p className="mt-4 leading-relaxed text-brand-brown/80">
            Kompletna specifikacija po stavkama. Sve što nije navedeno kao
            uključeno, jasno stoji u ponudi kao dodatak.
          </p>
        </motion.div>

        <p className="mt-6 text-xs text-brand-brown/50 lg:hidden">
          Prevucite tabelu levo i desno →
        </p>

        <motion.div
          {...reveal}
          className="mt-4 overflow-x-auto rounded-[28px] border border-brand-brown/12 bg-[#faf6ec]/70 backdrop-blur-sm"
        >
          <table className="w-full min-w-[780px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-brand-brown/12">
                <th className="w-[28%] px-6 py-5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-brown/50">
                  Stavka
                </th>
                {packagePlans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`w-[24%] px-5 py-5 align-top ${
                      plan.highlight ? 'bg-brand-brown/[0.05]' : ''
                    }`}
                  >
                    <div className="text-base font-bold text-brand-green">
                      {plan.name}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-brand-brown/60">
                      od {plan.pricePerM2}/m²
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareGroups.map((group) => (
                <Fragment key={group.group}>
                  <tr className="bg-brand-brown/[0.07]">
                    <td
                      colSpan={4}
                      className="px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-brown"
                    >
                      {group.group}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr
                      key={group.group + row.label}
                      className="border-b border-brand-brown/8 last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 text-left align-top text-sm font-semibold text-brand-green"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={i}
                          className={`px-5 py-4 align-top text-sm ${
                            packagePlans[i].highlight
                              ? 'bg-brand-brown/[0.05]'
                              : ''
                          }`}
                        >
                          <CompareCell value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Detaljno o svakom paketu */}
      <section className="mx-auto mt-24 max-w-6xl sm:mt-32">
        <motion.div {...reveal} className="max-w-2xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
            Objašnjenje
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            Za koga je koji paket
          </h2>
        </motion.div>

        <div className="mt-10 space-y-5">
          {packagePlans.map((plan) => (
            <motion.article
              key={plan.id}
              {...reveal}
              className="grid gap-8 rounded-[30px] border border-brand-brown/12 bg-[#faf6ec]/70 p-7 backdrop-blur-sm sm:p-9 lg:grid-cols-[280px_1fr]"
            >
              <div>
                <h3 className="text-2xl font-bold text-brand-green">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-brown/70">
                  {plan.summary}
                </p>
                <dl className="mt-6 space-y-2.5 border-t border-brand-brown/12 pt-5 text-sm">
                  {[
                    ['Cena', `od ${plan.pricePerM2}/m²`],
                    ['Kvadratura', plan.sizeRange],
                    ['Rok izrade', plan.buildTime],
                    ['Garancija', plan.warranty],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-brand-brown/55">{k}</dt>
                      <dd className="text-right font-semibold text-brand-brown">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                {plan.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="mb-4 leading-relaxed text-brand-brown/80 last:mb-0"
                  >
                    {p}
                  </p>
                ))}

                <div className="mt-7 rounded-2xl bg-brand-brown/[0.06] p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-brown/50">
                    Idealno za
                  </span>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {plan.idealFor.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-brown/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-brown/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Od čega zavisi cena + šta nije uključeno */}
      <section className="mx-auto mt-24 grid max-w-6xl gap-6 sm:mt-32 lg:grid-cols-[1.15fr_1fr]">
        <motion.div {...reveal}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
            Transparentno
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            Od čega zavisi cena
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {priceFactors.map((f) => (
              <div
                key={f.title}
                className="rounded-[24px] border border-brand-brown/12 bg-[#faf6ec]/70 p-6 backdrop-blur-sm"
              >
                <h3 className="text-base font-bold text-brand-green">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-brown/75">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="rounded-[30px] border border-brand-brown/20 bg-brand-brown/[0.06] p-7 backdrop-blur-sm sm:p-8"
        >
          <h2 className="text-xl font-bold text-brand-green sm:text-2xl">
            Nije uključeno u cenu po m²
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-brown/70">
            Ove stavke se dogovaraju posebno da biste tačno znali gde ide svaki
            dinar.
          </p>
          <ul className="mt-6 space-y-3.5">
            {notIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-brand-brown/80"
              >
                <span className="mt-2 h-px w-4 shrink-0 bg-brand-brown/40" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Kako do ponude */}
      <section className="mx-auto mt-24 max-w-6xl sm:mt-32">
        <motion.div {...reveal} className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
            Sledeći korak
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-green sm:text-4xl">
            Kako do konkretne ponude
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {offerSteps.map((s, i) => (
            <motion.div
              key={s.title}
              {...reveal}
              className="relative overflow-hidden rounded-[26px] border border-brand-brown/12 bg-[#faf6ec]/70 p-7 backdrop-blur-sm"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1 -top-3 text-[72px] font-bold leading-none text-brand-brown/[0.06]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="relative text-lg font-bold text-brand-green">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-brand-brown/75">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal}
          className="mt-12 flex flex-col items-center gap-5 rounded-[30px] border border-[#4a2d19] bg-brand-brown px-7 py-10 text-center shadow-[0_36px_80px_-34px_rgba(74,45,25,0.75)] sm:px-10"
        >
          <h2 className="max-w-xl text-2xl font-bold text-brand-cream sm:text-3xl">
            Recite nam kakvu kuću želite — cenu dobijate u roku od 48h.
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-brand-cream/70">
            Nije potrebno da imate gotov projekat. Dovoljni su kvadratura,
            lokacija i par rečenica o tome kako zamišljate prostor.
          </p>
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              to="/kontakt"
              className="group flex h-[52px] items-center gap-2.5 rounded-full bg-brand-cream px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-brown transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.45)]"
            >
              Pošaljite upit
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              to="/proces"
              className="flex h-[52px] items-center rounded-full border border-brand-cream/30 px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-cream transition-colors duration-300 hover:bg-brand-cream/10"
            >
              Pogledajte proces
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
