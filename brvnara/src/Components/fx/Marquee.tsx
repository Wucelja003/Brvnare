import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'motion/react'

/**
 * Beskonačna traka reči — sama klizi, a brzina i smer prate skrol.
 */
export default function Marquee({
  items,
  baseVelocity = -2.2,
}: {
  items: string[]
  baseVelocity?: number
}) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  })
  const direction = useRef(1)

  // Sadržaj se ponavlja 4 puta; pomeramo ga u krug za jednu četvrtinu
  const xPercent = useTransform(x, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()
    if (vf < 0) direction.current = -1
    else if (vf > 0) direction.current = 1
    move += direction.current * move * vf
    x.set(x.get() + move)
  })

  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-6 font-serif text-5xl font-bold tracking-tight sm:px-10 sm:text-7xl lg:text-8xl ${
              i % 2 === 1
                ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(107,66,38,0.55)]'
                : 'text-brand-brown'
            }`}
          >
            {item}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 text-brand-brown/40 sm:h-7 sm:w-7"
          >
            <path
              fill="currentColor"
              d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z"
            />
          </svg>
        </span>
      ))}
    </>
  )

  return (
    <div
      aria-label={items.join(', ')}
      className="relative overflow-hidden border-y border-brand-brown/15 py-6 sm:py-9"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: xPercent }}
        className="flex w-max whitespace-nowrap"
      >
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  )
}
