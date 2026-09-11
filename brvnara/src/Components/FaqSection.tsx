import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, X } from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// "Sve" = svi tagovi. Placeholder sadržaj (tekst menjamo kasnije).
const tags = ['Sve', 'Cena', 'Gradnja', 'Materijali', 'Rokovi']

const faqs = [
  {
    tag: 'Cena',
    question: 'Koliko košta izgradnja brvnare?',
    answer:
      'Cena zavisi od kvadrature, izabranog paketa i završne obrade. Okvirno kreće od 350 €/m² za osnovnu vikendicu. Nakon konsultacija dobijate tačnu ponudu. (Placeholder tekst.)',
  },
  {
    tag: 'Cena',
    question: 'Da li je moguće plaćanje na rate?',
    answer:
      'Da, plaćanje se odvija po fazama izgradnje. Detalje dinamike dogovaramo prilikom potpisivanja ugovora. (Placeholder tekst.)',
  },
  {
    tag: 'Gradnja',
    question: 'Koliko traje izgradnja kućice?',
    answer:
      'U proseku od 6 do 12 nedelja, u zavisnosti od veličine i složenosti projekta. (Placeholder tekst.)',
  },
  {
    tag: 'Gradnja',
    question: 'Da li gradite na mojoj parceli?',
    answer:
      'Da. Kućicu izrađujemo i sklapamo na vašoj lokaciji, uz prethodnu pripremu terena i temelja. (Placeholder tekst.)',
  },
  {
    tag: 'Materijali',
    question: 'Koje drvo koristite?',
    answer:
      'Koristimo kvalitetno, sušeno drvo (smreka/bor) prilagođeno klimi, sa zaštitnim premazima. (Placeholder tekst.)',
  },
  {
    tag: 'Materijali',
    question: 'Kakva je izolacija?',
    answer:
      'Ugrađujemo termo i zvučnu izolaciju za celogodišnji boravak; nivo zavisi od paketa. (Placeholder tekst.)',
  },
  {
    tag: 'Rokovi',
    question: 'Da li dobijam garanciju?',
    answer:
      'Da, na konstrukciju dajemo garanciju do 10 godina (zavisno od paketa). (Placeholder tekst.)',
  },
]

export default function FaqSection() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('Sve')
  const [openQuestion, setOpenQuestion] = useState(faqs[0].question)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqs.filter((faq) => {
      const matchesTag = activeTag === 'Sve' || faq.tag === activeTag
      const matchesQuery =
        !q || `${faq.question} ${faq.answer}`.toLowerCase().includes(q)
      return matchesTag && matchesQuery
    })
  }, [query, activeTag])

  const clearFilters = () => {
    setQuery('')
    setActiveTag('Sve')
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto w-full max-w-3xl"
        >
          <motion.div variants={item} className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
              {t('faq.eyebrow')}
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl">
              {t('faq.title')}
            </h2>
          </motion.div>

          {/* Pretraga */}
          <motion.div variants={item} className="mt-8">
            <div className="flex items-center gap-3 rounded-2xl border border-brand-green/15 bg-[#faf6ec] px-5 py-4 transition-colors duration-200 focus-within:border-brand-brown/50">
              <Search className="h-5 w-5 shrink-0 text-brand-brown/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('faq.search')}
                aria-label={t('faq.search')}
                className="w-full bg-transparent text-base text-brand-green placeholder:text-brand-brown/40 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="X"
                  className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-brand-brown/50 transition-colors duration-200 hover:text-brand-brown"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Tagovi */}
          <motion.div
            variants={item}
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
          >
            {tags.map((tag) => {
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTag(tag)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown ${
                    isActive
                      ? 'bg-brand-brown text-brand-cream'
                      : 'border border-brand-brown/25 text-brand-brown/70 hover:border-brand-brown/50 hover:text-brand-brown'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </motion.div>

          {/* Lista pitanja */}
          <motion.div variants={item} className="mt-10">
            {filtered.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filtered.map((faq) => {
                  const isOpen = openQuestion === faq.question
                  const panelId = `faq-${faq.question.replace(/\W+/g, '-').toLowerCase()}`
                  return (
                    <div
                      key={faq.question}
                      className={`rounded-2xl border transition-colors duration-200 ${
                        isOpen
                          ? 'border-brand-brown/30 bg-[#faf6ec]'
                          : 'border-brand-green/12 bg-white/40 hover:border-brand-brown/30'
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenQuestion(isOpen ? '' : faq.question)
                        }
                        className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown sm:px-6 sm:py-5"
                      >
                        <span className="flex-1 text-base font-semibold leading-snug text-brand-green">
                          {faq.question}
                        </span>
                        <span className="hidden shrink-0 text-xs font-medium uppercase tracking-wider text-brand-brown/50 sm:block">
                          {faq.tag}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="shrink-0 text-brand-brown/60 transition-colors duration-200 group-hover:text-brand-brown"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.4, ease: EASE },
                              opacity: { duration: 0.3, ease: EASE },
                            }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm leading-relaxed text-brand-brown/80 sm:px-6 sm:pb-6 sm:text-base">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="rounded-2xl border border-dashed border-brand-brown/30 px-6 py-14 text-center"
              >
                <p className="text-base font-semibold text-brand-green">
                  {t('faq.empty')} „{query.trim()}"
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 cursor-pointer rounded-full border border-brand-brown/30 px-5 py-2 text-sm font-medium text-brand-brown transition-colors duration-200 hover:bg-brand-brown/5"
                >
                  {t('faq.clear')}
                </button>
              </motion.div>
            )}
          </motion.div>

          <motion.p
            variants={item}
            className="mt-10 text-center text-sm text-brand-brown/70"
          >
            {t('faq.help')}{' '}
            <Link
              to="/kontakt"
              className="font-semibold text-brand-green underline-offset-4 hover:underline"
            >
              {t('faq.helpCta')}
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
