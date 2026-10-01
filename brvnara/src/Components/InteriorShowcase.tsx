import { useRef } from 'react'
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
    <section ref={sectionRef} className="relative py-20 sm:py-28">
      {/* Linije između polja: gap-px na braon podlozi */}
      <div className="grid gap-px border-y border-brand-brown/15 bg-brand-brown/15 lg:grid-cols-[1fr_1.4fr]">
        {/* Levo — velika slika */}
        <div className="relative min-h-[62svh] overflow-hidden bg-[#2a1a0f] lg:min-h-0">
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
            <motion.ul
              variants={textItem}
              className="mt-6 flex flex-wrap gap-2"
            >
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
        </div>

        {/* Desno — mozaik: slika / tekst, pa obrnuto */}
        <div className="grid gap-px">
          {rows.map((row, i) => (
            <div key={row.title} className="grid gap-px sm:grid-cols-2">
              <div
                className={`group relative min-h-[220px] overflow-hidden bg-[#2a1a0f] sm:min-h-[220px] xl:min-h-[250px] ${
                  i % 2 === 1 ? 'sm:order-2' : ''
                }`}
              >
                <img
                  src={row.image}
                  alt={row.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-brown/20 transition-colors duration-700 group-hover:bg-transparent" />
              </div>

              <motion.div
                className="relative flex flex-col justify-center overflow-hidden bg-[#faf6ec] px-8 py-7 sm:px-10 xl:px-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10% 0px' }}
                variants={textStagger}
              >
                {/* Redni broj kao vodeni žig */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-3 text-[76px] font-bold leading-none text-brand-brown/[0.06]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <motion.p
                  variants={textItem}
                  className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-brown"
                >
                  {row.subtitle}
                </motion.p>
                <motion.h3
                  variants={textItem}
                  className="relative mt-3 text-2xl leading-tight text-brand-green xl:text-3xl"
                >
                  {row.title}
                </motion.h3>
                <motion.p
                  variants={textItem}
                  className="relative mt-3 max-w-sm text-sm leading-relaxed text-brand-brown/70"
                >
                  {row.text}
                </motion.p>
                <motion.div variants={textItem} className="relative mt-5">
                  <Link
                    to={row.link.to}
                    className="group/link relative inline-flex items-center gap-2 pb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-brown"
                  >
                    {row.link.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover/link:translate-x-1"
                    >
                      →
                    </span>
                    <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-brand-brown/30" />
                    <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-brand-brown transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
