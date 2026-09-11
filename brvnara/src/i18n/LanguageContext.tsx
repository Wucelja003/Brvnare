import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Lang } from './translations'

type I18nContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'brvnara-lang'

function readInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'sr' || saved === 'en' || saved === 'de') return saved
  } catch {
    /* localStorage nedostupan */
  }
  return 'sr'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang)

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignoriši */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: string) =>
    translations[lang][key] ?? translations.sr[key] ?? key

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n mora biti unutar <LanguageProvider>')
  return ctx
}
