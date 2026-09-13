import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

/** Procenat proskrolovane stranice */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const [percent, setPercent] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setPercent(Math.round(value * 100))
  })

  return (
    <span
      aria-hidden="true"
      className="min-w-14 shrink-0 rounded-full bg-brand-brown/10 px-3 py-1.5 text-center text-[13px] font-semibold tabular-nums text-brand-brown/70"
    >
      {percent}%
    </span>
  )
}
