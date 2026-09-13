import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { languages } from '../i18n/translations'
import { useI18n } from '../i18n/LanguageContext'
import { softEase } from '../lib/motion'

export default function LanguageSwitcher({
  align = 'right',
}: {
  align?: 'left' | 'right'
}) {
  const { lang, setLang } = useI18n()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = languages.find((l) => l.code === lang)!

  // Zatvori na klik van menija ili Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Izbor jezika"
        className={`group flex h-[52px] cursor-pointer items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 shadow-[0_12px_34px_-16px_rgba(53,71,51,0.45)] backdrop-blur-xl transition-colors duration-300 ${
          open
            ? 'border-brand-brown/35 bg-brand-cream'
            : 'border-brand-brown/15 bg-brand-cream/85 hover:border-brand-brown/30 hover:bg-brand-cream'
        }`}
      >
        {/* Zastavica u krugu */}
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-brown/10 text-[17px] leading-none transition-transform duration-300 group-hover:scale-105">
          {current.flag}
        </span>
        <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-brand-brown">
          {current.code}
        </span>
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.35, ease: softEase }}
          className="h-3.5 w-3.5 text-brand-brown/55"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={
              reduce ? { duration: 0.01 } : { duration: 0.28, ease: softEase }
            }
            className={`absolute z-50 mt-2.5 min-w-[196px] rounded-[22px] border border-brand-brown/15 bg-brand-cream p-2 shadow-[0_26px_54px_-20px_rgba(53,71,51,0.6)] backdrop-blur-xl ${
              align === 'left'
                ? 'left-0 origin-top-left'
                : 'right-0 origin-top-right'
            }`}
          >
            {languages.map((l, i) => {
              const active = l.code === lang
              return (
                <motion.li
                  key={l.code}
                  initial={reduce ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: softEase,
                    delay: reduce ? 0 : 0.05 + i * 0.05,
                  }}
                >
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setLang(l.code)
                      setOpen(false)
                    }}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-2.5 py-2.5 text-left transition-colors duration-200 ${
                      active
                        ? 'bg-brand-brown text-brand-cream'
                        : 'text-brand-brown/85 hover:bg-brand-brown/10'
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[16px] leading-none ${
                        active ? 'bg-brand-cream/20' : 'bg-brand-brown/10'
                      }`}
                    >
                      {l.flag}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold leading-tight">
                        {l.label}
                      </span>
                      <span
                        className={`block text-[10px] font-bold uppercase tracking-[0.16em] ${
                          active ? 'text-brand-cream/60' : 'text-brand-brown/45'
                        }`}
                      >
                        {l.code}
                      </span>
                    </span>
                    {active && (
                      <motion.svg
                        initial={reduce ? false : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.25, ease: softEase }}
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 shrink-0"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
