import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { softEase } from '../../lib/motion'

/** Tekst koji se „premota" (gore/dole) kada se promeni */
export default function MorphLabel({ value }: { value: string }) {
  const reduce = useReducedMotion()
  const minWidth = `${Math.max(value.length, 6)}ch`

  if (reduce) {
    return (
      <span className="inline-block" style={{ minWidth }}>
        {value}
      </span>
    )
  }

  return (
    <span
      className="relative grid items-center overflow-hidden"
      style={{ minWidth }}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.28, ease: softEase }}
          className="col-start-1 row-start-1 whitespace-nowrap text-left"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
