import { useI18n } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useI18n()

  return (
    <section className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-brand-green">
          {t('about.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-green/80">{t('about.body')}</p>
      </div>
    </section>
  )
}
