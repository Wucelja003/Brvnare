import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import './ModelsSection.css'

const images = [
  '/3dmodels/3dmodel1.jpg',
  '/3dmodels/3dmodels1.jpg',
  '/3dmodels/3dmodel3.jpg',
  '/3dmodels/3dmodel4.jpg',
]

export default function ModelsSection({
  viewAllHref,
}: {
  viewAllHref?: string
}) {
  const { t } = useI18n()
  const gridRef = useRef<HTMLDivElement>(null)

  // Otkrivanje kartica pri skrolu (stagger preko transition-delay)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll<HTMLElement>('.model-card')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.2 },
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative px-5 py-20 sm:px-8 sm:py-28">
      {/* Zaglavlje */}
      <div className="mx-auto mb-14 max-w-6xl sm:mb-16">
        <div className="flex items-center gap-4">
          <span className="models-hline" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-brown">
            {t('models.eyebrow')}
          </span>
        </div>
        <h2 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-brand-green sm:text-5xl">
          {t('models.titlePre')}{' '}
          <span className="bg-gradient-to-b from-[#5a7a54] via-[#43603f] to-[#354733] bg-clip-text pb-[0.16em] text-transparent">
            {t('models.titleHighlight')}
          </span>
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-brand-brown/80">
          {t('models.body')}
        </p>
      </div>

      {/* Galerija */}
      <div
        ref={gridRef}
        className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2"
      >
        {images.map((src, i) => (
          <figure
            key={src}
            className="model-card group relative overflow-hidden rounded-2xl border border-brand-green/10 shadow-sm"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={src}
                alt={`${t('models.tag')} ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Badge */}
            <figcaption className="pointer-events-none absolute left-4 top-4 rounded-full bg-brand-brown/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-cream backdrop-blur-sm">
              {t('models.tag')}
            </figcaption>

            {/* Donji preliv */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </figure>
        ))}
      </div>

      {viewAllHref && (
        <div className="mx-auto mt-12 max-w-6xl">
          <Link
            to={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c4e2f]"
          >
            {t('models.viewAll')}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </section>
  )
}
