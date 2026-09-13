import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/LanguageContext'
import './InquiryButton.css'

export default function InquiryButton({
  onClick,
  className = '',
  full = false,
}: {
  onClick?: () => void
  className?: string
  full?: boolean
}) {
  const { t } = useI18n()

  return (
    <Link
      to="/kontakt"
      onClick={onClick}
      className={`cta-flow group flex h-[52px] items-center justify-center gap-2.5 rounded-full px-6 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-cream ${
        full ? 'w-full' : ''
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="cta-dot h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cream"
      />
      <span className="whitespace-nowrap">{t('nav.inquiry')}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cta-arrow h-4 w-4 shrink-0"
      >
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    </Link>
  )
}
