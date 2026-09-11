import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

const navLinks = [
  { to: '/proces', key: 'nav.process' },
  { to: '/modeli', key: 'nav.models' },
]

const btnBase =
  'btn-ripple relative overflow-hidden rounded-[20px] px-6 py-[13px] text-[11px] font-bold uppercase tracking-[2px] cursor-pointer transition-all duration-300 border-0 hover:-translate-y-0.5'

export default function Header() {
  const location = useLocation()
  const { t } = useI18n()
  const overlay = location.pathname === '/'
  const [open, setOpen] = useState(false)

  // Zatvori meni pri promeni rute
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Zaključaj skrol dok je mobilni meni otvoren
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link relative text-[16px] font-semibold no-underline whitespace-nowrap transition-colors ${
      isActive ? 'text-white' : 'text-white/80 hover:text-white'
    }`

  const packagesClass =
    'nav-link relative text-[16px] font-semibold no-underline whitespace-nowrap text-white/80 transition-colors hover:text-white'

  return (
    <header
      className={`z-[20] px-5 py-[15px] ${
        overlay ? 'absolute inset-x-0 top-0' : 'sticky top-0 bg-brand-green'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-center gap-3">
          <img
            src="/BrvnaraLogo.svg"
            alt="Brvnara logo"
            className="h-[52px] sm:h-[64px] w-auto brightness-0 invert"
          />
          <span className="text-white text-[20px] sm:text-[26px] tracking-[3px] uppercase font-semibold whitespace-nowrap">
            Brvnara
          </span>
        </Link>

        {/* Desktop navigacija */}
        <nav className="hidden xl:flex nav-glass gap-8 rounded-full bg-black/25 px-7 py-[15px] backdrop-blur-xl">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {t(link.key)}
            </NavLink>
          ))}
          <Link to="/#paketi" className={packagesClass}>
            {t('nav.packages')}
          </Link>
        </nav>

        {/* Desktop: izbor jezika + dugme za formular */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <Link
            to="/kontakt"
            className={`${btnBase} text-white bg-brand-brown hover:bg-[#7c4e2f] hover:shadow-[0_0_20px_rgba(107,66,38,0.6)]`}
          >
            {t('nav.contact')}
          </Link>
        </div>

        {/* Hamburger — mobilni */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Meni"
          aria-expanded={open}
          className="xl:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-full bg-black/30 border border-[rgba(107,66,38,0.5)] backdrop-blur-md transition-colors hover:border-brand-brown z-[30]"
        >
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobilni meni */}
      <div
        className={`xl:hidden fixed inset-0 z-[10] transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-brand-green border-l border-[rgba(107,66,38,0.5)] shadow-[-8px_0_32px_rgba(0,0,0,0.4)] flex flex-col px-7 pt-24 pb-8 transition-transform duration-500 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-6">
            <LanguageSwitcher />
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-white/90 text-[18px] font-semibold py-3 border-b border-[rgba(107,66,38,0.35)] transition-colors hover:text-white"
                style={{
                  animation: open
                    ? `mobileItemIn 0.4s ease ${i * 0.07}s both`
                    : 'none',
                }}
              >
                {t(link.key)}
              </NavLink>
            ))}
            <Link
              to="/#paketi"
              onClick={() => setOpen(false)}
              className="text-white/90 text-[18px] font-semibold py-3 border-b border-[rgba(107,66,38,0.35)] transition-colors hover:text-white"
            >
              {t('nav.packages')}
            </Link>
          </nav>

          <div className="mt-8">
            <Link
              to="/kontakt"
              className={`${btnBase} block text-center w-full text-white bg-brand-brown`}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
