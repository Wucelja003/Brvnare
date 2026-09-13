import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'motion/react'
import { useI18n } from '../i18n/LanguageContext'
import { softEase, useIsDesktop } from '../lib/motion'
import LanguageSwitcher from './LanguageSwitcher'
import InquiryButton from './nav/InquiryButton'
import MenuIcon from './nav/MenuIcon'
import MorphLabel from './nav/MorphLabel'
import ScrollProgress from './nav/ScrollProgress'

// Glavni linkovi u panelu
const PRIMARY_LINKS = [
  { key: 'nav.process', to: '/proces' },
  { key: 'nav.models', to: '/modeli' },
  { key: 'nav.packages', to: '/paketi' },
  { key: 'nav.contact', to: '/kontakt' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'X', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

const CLOSED_WIDTH_DESKTOP = 208
const CLOSED_WIDTH_MOBILE = 178
const OPEN_WIDTH = 300
const CONTENT_WIDTH = OPEN_WIDTH - 16

const ITEM_DELAY = 0.14
const ITEM_STAGGER = 0.045

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.45,
        ease: softEase,
        delay: ITEM_DELAY + i * ITEM_STAGGER,
      },
      y: {
        type: 'spring',
        stiffness: 420,
        damping: 42,
        mass: 0.9,
        restDelta: 0.01,
        delay: ITEM_DELAY + i * ITEM_STAGGER,
      },
    },
  }),
}

// Krem staklo sa braon ivicom — čitljivo i preko videa i preko krem pozadine
const SURFACE =
  'bg-brand-cream/85 border border-brand-brown/15 backdrop-blur-xl shadow-[0_12px_34px_-16px_rgba(53,71,51,0.45)]'

// Logo se boji maskom (SVG je jednobojan) — braon na krem podlozi
const logoMask: React.CSSProperties = {
  maskImage: 'url(/BrvnaraLogo.svg)',
  WebkitMaskImage: 'url(/BrvnaraLogo.svg)',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
}

export default function Header() {
  const { t } = useI18n()
  const location = useLocation()
  const reduce = useReducedMotion()
  const isDesktop = useIsDesktop('(min-width: 1024px)')
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closedWidth = isDesktop ? CLOSED_WIDTH_DESKTOP : CLOSED_WIDTH_MOBILE
  const overlay = location.pathname === '/'
  const [pastHero, setPastHero] = useState(false)
  // Logo je krem dok stoji preko hero videa, inače braon
  const onVideo = overlay && !pastHero

  const closeMenu = () => setMenuOpen(false)

  // Prati da li smo proskrolovali hero video (samo na početnoj)
  useEffect(() => {
    if (!overlay) {
      setPastHero(false)
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      setPastHero(window.scrollY > window.innerHeight - 120)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [overlay])

  // Zatvori meni pri promeni rute
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  // Escape zatvara meni
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="relative flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo — bez podloge */}
          <Link
            to="/"
            aria-label="Brvnara — početna"
            className="group flex h-[52px] items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3"
          >
            <span
              aria-hidden="true"
              style={logoMask}
              className={`h-8 w-8 shrink-0 transition-colors duration-300 group-hover:rotate-[8deg] sm:h-9 sm:w-9 ${
                onVideo ? 'bg-brand-cream' : 'bg-brand-brown'
              }`}
            />
            <span
              className={`hidden text-[15px] font-bold uppercase tracking-[0.26em] transition-colors duration-300 lg:inline ${
                onVideo
                  ? 'text-brand-cream drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'
                  : 'text-brand-brown'
              }`}
            >
              Brvnara
            </span>
          </Link>

          {/* Centralna kapsula — meni koji se širi */}
          <div className="absolute left-1/2 top-2.5 z-50 -translate-x-1/2">
            <motion.div
              initial={false}
              animate={{ width: menuOpen ? OPEN_WIDTH : closedWidth }}
              transition={
                reduce ? { duration: 0.01 } : { duration: 0.45, ease: softEase }
              }
              className="relative rounded-[30px] p-2"
            >
              {/* Podloga panela — pojavljuje se samo kada je otvoren */}
              <motion.div
                initial={false}
                animate={{ opacity: menuOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: softEase }}
                className={`pointer-events-none absolute inset-0 rounded-[30px] ${SURFACE}`}
              />

              <div className="relative">
                <div
                  className={`flex h-[52px] w-full items-center justify-between gap-2 rounded-full py-1.5 pl-1.5 pr-2 text-brand-brown ${
                    menuOpen ? '' : SURFACE
                  }`}
                >
                  <button
                    ref={toggleRef}
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-expanded={menuOpen}
                    aria-label={menuOpen ? t('nav.close') : t('nav.menu')}
                    className="flex cursor-pointer items-center gap-2.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  >
                    <MenuIcon open={menuOpen} />
                    <MorphLabel value={menuOpen ? t('nav.close') : t('nav.menu')} />
                  </button>
                  <ScrollProgress />
                </div>

                <AnimatePresence initial={false}>
                  {menuOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : { duration: 0.45, ease: softEase }
                      }
                      className="overflow-hidden"
                    >
                      <div className="flex justify-center">
                        <motion.div
                          initial={reduce ? false : 'hidden'}
                          animate={reduce ? false : 'visible'}
                          style={{ width: CONTENT_WIDTH }}
                          className="shrink-0 px-4 pb-3 pt-6"
                        >
                          {/* Glavni linkovi */}
                          <div className="flex flex-col gap-1.5">
                            <motion.span
                              custom={0}
                              variants={ITEM_VARIANTS}
                              className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-brown/50"
                            >
                              {t('nav.menu')}
                            </motion.span>
                            {PRIMARY_LINKS.map((link, i) => (
                              <motion.div
                                key={link.to}
                                custom={1 + i}
                                variants={ITEM_VARIANTS}
                                className="w-fit"
                              >
                                <Link
                                  to={link.to}
                                  onClick={closeMenu}
                                  className="block text-[26px] font-bold leading-tight tracking-tight text-brand-brown transition-colors hover:text-brand-brown/55"
                                >
                                  {t(link.key)}
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            custom={5}
                            variants={ITEM_VARIANTS}
                            className="my-6 h-px w-full bg-brand-brown/15"
                          />

                          {/* Društvene mreže */}
                          <div className="flex flex-col gap-3">
                            <motion.span
                              custom={7}
                              variants={ITEM_VARIANTS}
                              className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-brown/50"
                            >
                              {t('nav.social')}
                            </motion.span>
                            <div className="flex flex-wrap gap-x-5 gap-y-2">
                              {SOCIAL_LINKS.map((link, i) => (
                                <motion.a
                                  key={link.label}
                                  href={link.href}
                                  custom={8 + i}
                                  variants={ITEM_VARIANTS}
                                  className="text-sm font-semibold text-brand-brown/70 transition-colors hover:text-brand-brown"
                                >
                                  {link.label}
                                </motion.a>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          <motion.div
                            custom={11}
                            variants={ITEM_VARIANTS}
                            className="mt-7"
                          >
                            <InquiryButton onClick={closeMenu} full />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Jezik (uvek) + upit (desktop) */}
          <div
            className={`flex items-center gap-2.5 transition-opacity duration-300 lg:opacity-100 ${
              menuOpen ? 'pointer-events-none opacity-0 lg:pointer-events-auto' : ''
            }`}
          >
            <LanguageSwitcher />
            <div className="hidden lg:block">
              <InquiryButton />
            </div>
          </div>
        </div>

        {/* Klik van menija zatvara */}
        <AnimatePresence>
          {menuOpen && (
            <motion.button
              type="button"
              aria-label={t('nav.close')}
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 -z-10 cursor-default"
            />
          )}
        </AnimatePresence>
      </header>

      {/* Odmak za sadržaj kada nema hero videa ispod headera */}
      {!overlay && <div className="h-20" aria-hidden="true" />}
    </>
  )
}
