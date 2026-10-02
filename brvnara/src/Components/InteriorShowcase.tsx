import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'
import { softEase } from '../lib/motion'

// Placeholder tekst — menja se kasnije
const rows = [
  {
    image: '/brvnara_photo/Ent_10.jpg',
    alt: 'Dnevni boravak sa staklenim zabatom',
    subtitle: 'Srce kuće',
    title: 'Dnevni boravak',
    text: 'Otvoren prostor pod gredama, velika staklena platna i raspored nameštaja koji prati pogled. Biramo podove, rasvetu i tekstil tako da drvo dođe do izražaja.',
    link: { to: '/modeli', label: 'Pogledajte modele' },
  },
  {
    image: '/brvnara_photo/Ent_7.jpg',
    alt: 'Kuhinja po meri u brvnari',
    subtitle: 'Izrađeno po meri',
    title: 'Kuhinja i trpezarija',
    text: 'Kuhinju projektujemo zajedno sa kućom — elementi, ugradni uređaji, radna ploča i ostave uklopljeni su do poslednjeg centimetra.',
    link: { to: '/paketi', label: 'Šta ulazi u pakete' },
  },
  {
    image: '/brvnara_photo/Ent_3.jpg',
    alt: 'Spavaća soba u potkrovlju',
    subtitle: 'Mir i toplina',
    title: 'Spavaće sobe',
    text: 'Topla svetla, prirodni materijali i tihe boje. Ugradni ormari, uzglavlja i police izrađujemo u našoj radionici, od istog drveta kao i kuća.',
    link: { to: '/kontakt', label: 'Zakažite razgovor' },
  },
]

const highlights = ['Nameštaj po meri', 'Rasveta', 'Podovi i obloge', 'Tekstil i dekor']

const textStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/** Slika koja se „otkrije" odozdo kada uđe u ekran, uz blagi zoom pri hoveru */
function RevealImage({
  src,
  alt,
  className = '',
  children,
}: {
  src: string
  alt: string
  className?: string
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, ease: softEase }}
      className={`group relative overflow-hidden rounded-[28px] bg-brand-brown/10 shadow-[0_30px_70px_-40px_rgba(53,71,51,0.7)] ${className}`}
    >
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          initial={reduce ? false : { scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.5, ease: softEase }}
          className="h-full w-full object-cover"
        />
      </div>
      {children}
    </motion.div>
  )
}

export default function InteriorShowcase() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Blagi parallax velike slike
  const bigY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const textItem: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: softEase } },
  }

  return (
    <section ref={sectionRef} className="relative px-3 py-20 sm:px-4 sm:py-28 lg:px-5">
      {/* Bez podloge — slike lebde na pozadini sajta, tekst stoji direktno na njoj */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1.4fr]">
        {/* Levo — velika slika sa naslovom */}
        <motion.div
          initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 32px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.2, ease: softEase }}
          className="relative min-h-[62svh] overflow-hidden rounded-[32px] bg-[#2a1a0f] shadow-[0_40px_90px_-46px_rgba(53,71,51,0.75)] lg:min-h-0"
        >
          <motion.img
            src="/brvnara_photo/Ent_6.jpg"
            alt="Enterijer brvnare sa kaminom"
            loading="lazy"
            decoding="async"
            style={reduce ? undefined : { y: bigY }}
            className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24160c] via-[#24160c]/25 to-transparent" />

          <motion.div
            className="absolute inset-x-6 bottom-8 sm:inset-x-10 sm:bottom-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={textStagger}
          >
            <motion.span
              variants={textItem}
              className="inline-block rounded-full border border-brand-cream/35 bg-brand-brown/40 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-cream backdrop-blur-md"
            >
              Uređujemo i iznutra
            </motion.span>
            <motion.h2
              variants={textItem}
              className="mt-4 bg-gradient-to-b from-[#fffaf0] via-brand-cream to-[#cdb189] bg-clip-text pb-2 text-6xl leading-none text-transparent sm:text-7xl"
            >
              Enterijer
            </motion.h2>
            <motion.p
              variants={textItem}
              className="mt-3 max-w-md leading-relaxed text-brand-cream/75"
            >
              Ne predajemo prazne zidove. Od prvog nacrta do poslednjeg jastuka
              — enterijer sređujemo mi, u istom duhu kao i kuću.
            </motion.p>
            <motion.ul variants={textItem} className="mt-6 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-brand-cream/20 bg-brand-cream/10 px-3 py-1.5 text-xs font-medium text-brand-cream/85 backdrop-blur-md"
                >
                  {h}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Desno — slika / tekst, pa obrnuto (tekst bez pozadine) */}
        <div className="grid gap-3 sm:gap-4">
          {rows.map((row, i) => {
            const num = String(i + 1).padStart(2, '0')
            return (
              <div key={row.title} className="grid items-center gap-3 sm:grid-cols-2 sm:gap-4">
                <RevealImage
                  src={row.image}
                  alt={row.alt}
                  className={`min-h-[240px] sm:min-h-[230px] xl:min-h-[260px] ${
                    i % 2 === 1 ? 'sm:order-2' : ''
                  }`}
                >
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-3 py-1 font-serif text-xs font-bold text-brand-cream backdrop-blur-md">
                    {num}
                  </span>
                </RevealImage>

                <motion.div
                  className="relative flex flex-col justify-center px-3 py-5 sm:px-6 xl:px-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10% 0px' }}
                  variants={textStagger}
                >
                  <motion.div variants={textItem} className="flex items-center gap-3">
                    <span className="font-serif text-sm font-bold text-brand-brown/45">
                      {num}
                    </span>
                    <span className="h-px w-8 bg-brand-brown/30" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
                      {row.subtitle}
                    </span>
                  </motion.div>
                  <motion.h3
                    variants={textItem}
                    className="mt-4 text-3xl leading-tight text-brand-green xl:text-4xl"
                  >
                    {row.title}
                  </motion.h3>
                  <motion.p
                    variants={textItem}
                    className="mt-3 max-w-sm text-sm leading-relaxed text-brand-brown/75"
                  >
                    {row.text}
                  </motion.p>
                  <motion.div variants={textItem} className="mt-6">
                    <Link
                      to={row.link.to}
                      className="group/link inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-brand-brown/30 transition-all duration-500 group-hover/link:border-brand-brown group-hover/link:bg-brand-brown group-hover/link:text-brand-cream">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 transition-transform duration-500 group-hover/link:-rotate-45"
                          aria-hidden="true"
                        >
                          <path d="M5 12h13M13 6l6 6-6 6" />
                        </svg>
                      </span>
                      {row.link.label}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
