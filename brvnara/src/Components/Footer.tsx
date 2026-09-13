import { motion, type Variants } from 'motion/react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="relative mt-auto w-full overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Slika iza */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src="/brvnara_photo/Photo_5.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative">
        {/* Vidljivi deo slike na vrhu */}
        <div className="h-32 sm:h-40 md:h-48" />

        <div className="relative bg-brand-brown">
          {/* Zakrivljeni prelaz — levo */}
          <div className="absolute left-0 top-0 z-10 -translate-y-full">
            <svg
              width="614"
              height="153"
              viewBox="0 0 614 153"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative top-px h-auto w-[220px] sm:w-[300px]"
            >
              <path
                d="M0 0H451.601C467.78 0 483.071 7.75893 491.954 21.2815C558.518 122.612 538.359 153.074 614 153H0V0Z"
                fill="#6b4226"
              />
            </svg>
          </div>

          {/* Zakrivljeni prelaz — desno */}
          <div className="absolute right-0 top-0 z-10 -translate-y-full">
            <svg
              width="614"
              height="153"
              viewBox="0 0 614 153"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative top-px h-auto w-[220px] scale-x-[-1] sm:w-[300px]"
            >
              <path
                d="M0 0H451.601C467.78 0 483.071 7.75893 491.954 21.2815C558.518 122.612 538.359 153.074 614 153H0V0Z"
                fill="#6b4226"
              />
            </svg>
          </div>

          <div className="mx-auto w-full max-w-6xl px-4 py-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12"
            >
              <motion.div variants={itemVariants} className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="/BrvnaraLogo.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 brightness-0 invert sm:h-12 sm:w-12"
                  />
                  <h2 className="text-4xl font-bold text-brand-cream sm:text-5xl md:text-6xl">
                    Brvnara
                  </h2>
                </div>
                <p className="mt-2 text-sm uppercase tracking-[0.25em] text-brand-cream/70 sm:text-base">
                  {t('footer.tagline')}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide text-brand-cream sm:gap-4"
              >
                <Link to="/paketi" className="transition-colors hover:text-brand-cream/70">
                  {t('nav.packages')}
                </Link>
                <span className="text-brand-cream/40">—</span>
                <Link to="/modeli" className="transition-colors hover:text-brand-cream/70">
                  {t('nav.models')}
                </Link>
                <span className="text-brand-cream/40">—</span>
                <Link to="/kontakt" className="transition-colors hover:text-brand-cream/70">
                  {t('nav.contact')}
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-brand-cream transition-colors hover:text-brand-cream/70"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-brand-cream transition-colors hover:text-brand-cream/70"
                  aria-label="X"
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-brand-cream transition-colors hover:text-brand-cream/70"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex w-full flex-col items-center justify-between gap-6 border-t border-brand-cream/20 pt-8 text-center sm:flex-row sm:text-left md:pt-10"
              >
                <div className="text-xs text-brand-cream/70 sm:text-sm">
                  <p>
                    © {new Date().getFullYear()} Brvnara. {t('footer.rights')}
                  </p>
                </div>

                <div className="text-xs uppercase tracking-wide text-brand-cream/70 sm:text-right sm:text-sm">
                  <p>Jela Komerc × Brvnara</p>
                  <p>{t('footer.tagline')}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
