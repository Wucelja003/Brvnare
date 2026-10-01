import { motion, useReducedMotion, type Variants } from 'motion/react'
import { softEase } from '../../lib/motion'

type Tag = 'h1' | 'h2' | 'h3'

const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 }

/** Gradijent za istaknute reči u naslovima (isti kao do sada na sajtu) */
export const greenHighlight =
  'bg-gradient-to-b from-[#5a7a54] via-[#43603f] to-[#354733] bg-clip-text text-transparent'

interface Props {
  as?: Tag
  pre: string
  highlight?: string
  className?: string
  highlightClassName?: string
  /** Kašnjenje pre prve reči (s) */
  delay?: number
  /** Animiraj odmah (npr. hero), a ne tek kada uđe u ekran */
  immediate?: boolean
  /** Uz `immediate`: animacija čeka dok ovo ne postane true */
  play?: boolean
}

/**
 * Naslov čije reči „izranjaju" ispod maske jedna za drugom.
 * Čitačima ekrana se čita kao običan tekst (aria-label).
 */
export default function SplitHeading({
  as = 'h2',
  pre,
  highlight,
  className = '',
  highlightClassName = greenHighlight,
  delay = 0,
  immediate = false,
  play = true,
}: Props) {
  const reduce = useReducedMotion()
  const Heading = motionTags[as]
  const words = [
    ...pre.split(' ').filter(Boolean).map((w) => ({ w, hl: false })),
    ...(highlight ?? '').split(' ').filter(Boolean).map((w) => ({ w, hl: true })),
  ]
  const label = [pre, highlight].filter(Boolean).join(' ')

  const word: Variants = {
    hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
    show: (i: number) => ({
      y: '0%',
      opacity: 1,
      transition: { duration: 0.95, ease: softEase, delay: delay + i * 0.07 },
    }),
  }

  const trigger = immediate
    ? { animate: play ? ('show' as const) : ('hidden' as const) }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '-12% 0px' } }

  return (
    <Heading aria-label={label} initial="hidden" {...trigger} className={className}>
      {words.map(({ w, hl }, i) => (
        <span key={i} aria-hidden="true">
          <span className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-bottom">
            <motion.span
              custom={i}
              variants={word}
              className={`inline-block ${hl ? highlightClassName : ''}`}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Heading>
  )
}
