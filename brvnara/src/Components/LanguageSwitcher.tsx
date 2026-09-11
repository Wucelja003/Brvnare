import { useEffect, useRef, useState } from 'react'
import { languages } from '../i18n/translations'
import { useI18n } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
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
        className="flex items-center gap-2 rounded-full bg-black/25 px-4 py-[10px] text-white backdrop-blur-xl transition-colors hover:bg-black/35"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-[13px] font-semibold uppercase tracking-wide">
          {current.code}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul
        role="listbox"
        className={`absolute right-0 z-50 mt-2 min-w-[172px] origin-top-right rounded-2xl border border-[rgba(107,66,38,0.5)] bg-brand-green/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-95 opacity-0'
        }`}
      >
        {languages.map((l, i) => {
          const active = l.code === lang
          return (
            <li key={l.code}>
              <button
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                style={{
                  animation: open ? `langItemIn 0.3s ease ${i * 0.05}s both` : 'none',
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  active
                    ? 'bg-brand-brown text-white'
                    : 'text-white/85 hover:bg-white/10'
                }`}
              >
                <span className="text-lg leading-none">{l.flag}</span>
                <span className="text-sm font-medium">{l.label}</span>
                {active && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-auto h-4 w-4"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
