import { useI18n } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useI18n()

  return (
    <section className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-brand-green">
          {t('contact.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-brand-green/80">{t('contact.body')}</p>
      </div>
    </section>
  )
}
