import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { cn } from '../lib/utils'

gsap.registerPlugin(Draggable, InertiaPlugin)

export interface CircleGalleryProps {
  images?: string[]
  /** Poluprečnik kruga kao % od manje strane KONTEJNERA (ne viewporta) */
  radiusPercent?: number
  itemWidth?: number
  itemHeight?: number
  itemScale?: number
  borderRadius?: number
  enableDrag?: boolean
  throwResistance?: number
  animationDuration?: number
  showNumbers?: boolean
  /** Stepeni u sekundi (0 = isključeno) */
  autoSpin?: number
  /** Blago umanjenje/zatamnjenje kartica na „daljoj" strani kruga */
  depth?: number
  /** Kartice se stapaju sa pozadinom na levoj i desnoj ivici umesto da budu odsečene */
  edgeFade?: boolean
  className?: string
  itemClassName?: string
  onItemClick?: (index: number, image: string) => void
}

export const CircleGallery: React.FC<CircleGalleryProps> = ({
  images = [],
  radiusPercent = 38,
  itemWidth = 280,
  itemHeight = 400,
  itemScale = 0.85,
  borderRadius = 8,
  enableDrag = true,
  throwResistance = 0.35,
  animationDuration = 0.9,
  showNumbers = true,
  autoSpin = 0,
  depth = 0.14,
  edgeFade = true,
  className,
  itemClassName,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const proxyRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const draggableRef = useRef<Draggable[] | null>(null)
  const spinRef = useRef<gsap.core.Tween | null>(null)
  const introRef = useRef<gsap.core.Timeline | null>(null)
  const draggingRef = useRef(false)
  const focusedRef = useRef<number | null>(null)
  /** rotation = ugao točka u stepenima, radius = trenutni poluprečnik (animira se na ulazu) */
  const stateRef = useRef({ rotation: 0, radius: 0 })

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const total = images.length

  /** Poluprečnik koji sigurno staje u kontejner — ovo je bio uzrok sečenja na telefonu */
  const measureRadius = useCallback(() => {
    const box = containerRef.current?.getBoundingClientRect()
    if (!box || !box.width || !box.height) return 0
    const shorter = Math.min(box.width, box.height)
    const wanted = shorter * (radiusPercent / 100)
    const maxX = box.width / 2 - (itemWidth * itemScale) / 2
    const maxY = box.height / 2 - (itemHeight * itemScale) / 2
    return Math.max(0, Math.min(wanted, maxX, maxY))
  }, [radiusPercent, itemWidth, itemHeight, itemScale])

  /** Jedan prolaz kroz sve kartice — kartice ostaju uspravne, samo se pomeraju po krugu */
  const apply = useCallback(() => {
    if (focusedRef.current !== null) return
    const { rotation, radius } = stateRef.current
    const rad = (rotation * Math.PI) / 180
    const step = (2 * Math.PI) / Math.max(total, 1)

    for (let i = 0; i < total; i++) {
      const el = itemRefs.current[i]
      if (!el) continue
      const angle = i * step + rad
      // 0 = dalja strana kruga, 1 = strana bliža posmatraču (dole)
      const near = (Math.sin(angle) + 1) / 2
      gsap.set(el, {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        rotation: 0,
        scale: itemScale * (1 - depth + depth * near),
        force3D: true,
      })
      const z = 100 + Math.round(near * 60)
      if (el.style.zIndex !== String(z)) el.style.zIndex = String(z)
    }
  }, [total, itemScale, depth])

  /** Uvodna animacija: kartice se pojave u centru pa razlete u krug */
  useEffect(() => {
    const items = itemRefs.current.slice(0, total).filter(Boolean)
    if (!items.length) return

    gsap.set(items, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 0.2,
      opacity: 0,
      force3D: true,
    })
    stateRef.current.radius = 0

    const tl = gsap.timeline()
    introRef.current = tl
    tl.to(items, {
      opacity: 1,
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.05,
    })
    tl.to(
      stateRef.current,
      {
        radius: measureRadius(),
        duration: animationDuration,
        ease: 'power3.inOut',
        onUpdate: apply,
      },
      '-=0.15',
    )

    return () => {
      tl.kill()
      introRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  /** Promena veličine kontejnera → novi poluprečnik */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      if (introRef.current?.isActive()) return
      stateRef.current.radius = measureRadius()
      apply()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [measureRadius, apply])

  /** Neprekidna rotacija */
  useEffect(() => {
    if (!autoSpin || focusedIndex !== null) return
    const spin = gsap.to(stateRef.current, {
      rotation: `+=${autoSpin > 0 ? 360 : -360}`,
      duration: Math.abs(360 / autoSpin),
      ease: 'none',
      repeat: -1,
      onUpdate: apply,
    })
    spinRef.current = spin
    return () => {
      spin.kill()
      spinRef.current = null
    }
  }, [autoSpin, focusedIndex, apply])

  /** Prevlačenje — rotira nevidljivi proxy, kartice prate njegov ugao */
  useEffect(() => {
    if (!enableDrag || focusedIndex !== null || !proxyRef.current) return

    const onSpin = function (this: Draggable) {
      stateRef.current.rotation = this.rotation
      apply()
    }

    const instances = Draggable.create(proxyRef.current, {
      type: 'rotation',
      trigger: containerRef.current,
      inertia: true,
      throwResistance,
      allowNativeTouchScrolling: true,
      onPress: () => {
        spinRef.current?.pause()
        draggingRef.current = false
      },
      onDragStart: () => {
        draggingRef.current = true
      },
      onDrag: onSpin,
      onThrowUpdate: onSpin,
      onDragEnd: () => {
        window.setTimeout(() => {
          draggingRef.current = false
        }, 60)
      },
      onThrowComplete: () => {
        spinRef.current?.resume()
      },
      onRelease: () => {
        if (!draggingRef.current) spinRef.current?.resume()
      },
    })
    draggableRef.current = instances
    gsap.set(proxyRef.current, { rotation: stateRef.current.rotation })

    return () => {
      instances.forEach((d) => d.kill())
      draggableRef.current = null
    }
  }, [enableDrag, throwResistance, focusedIndex, apply])

  /** Uvećanje jedne kartice na klik */
  const focusItem = (index: number | null) => {
    focusedRef.current = index
    setFocusedIndex(index)

    if (index === null) {
      const { rotation, radius } = stateRef.current
      const rad = (rotation * Math.PI) / 180
      const step = (2 * Math.PI) / Math.max(total, 1)
      itemRefs.current.slice(0, total).forEach((el, i) => {
        if (!el) return
        const angle = i * step + rad
        const near = (Math.sin(angle) + 1) / 2
        gsap.to(el, {
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
          rotation: 0,
          scale: itemScale * (1 - depth + depth * near),
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.55,
          ease: 'power2.inOut',
        })
      })
      return
    }

    itemRefs.current.slice(0, total).forEach((el, i) => {
      if (!el) return
      if (i === index) {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: itemScale * 1.7,
          zIndex: 1000,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
        })
      } else {
        gsap.to(el, {
          scale: itemScale * 0.8,
          opacity: 0.35,
          filter: 'blur(3px)',
          duration: 0.55,
          ease: 'power2.inOut',
        })
      }
    })
  }

  const handleItemClick = (index: number, image: string) => {
    if (draggingRef.current) return
    if (focusedIndex !== null && focusedIndex !== index) return
    focusItem(focusedIndex === index ? null : index)
    onItemClick?.(index, image)
  }

  useEffect(
    () => () => {
      gsap.killTweensOf(stateRef.current)
      itemRefs.current.forEach((el) => el && gsap.killTweensOf(el))
    },
    [],
  )

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (focusedIndex !== null && e.target === containerRef.current)
          focusItem(null)
      }}
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        enableDrag && focusedIndex === null && 'cursor-grab active:cursor-grabbing',
        className,
      )}
      style={{
        touchAction: 'pan-y',
        ...(edgeFade
          ? {
              maskImage:
                'linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%)',
            }
          : null),
      }}
    >
      {/* Nevidljivi element koji Draggable rotira */}
      <div ref={proxyRef} className="pointer-events-none absolute h-px w-px opacity-0" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-0 w-0">
        {images.map((image, index) => {
          const isGradient =
            image.startsWith('linear-gradient') ||
            image.startsWith('radial-gradient')
          return (
            <div
              key={image + index}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              onClick={() => handleItemClick(index, image)}
              className={cn(
                'pointer-events-auto absolute cursor-pointer select-none overflow-hidden shadow-[0_18px_40px_-18px_rgba(53,71,51,0.55)]',
                focusedIndex === index && 'ring-2 ring-brand-cream/70',
                itemClassName,
              )}
              style={{
                width: itemWidth,
                height: itemHeight,
                borderRadius,
                transformOrigin: 'center center',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                background: isGradient ? image : undefined,
              }}
            >
              {!isGradient && (
                <img
                  src={image}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              )}
              {showNumbers && (
                <span className="absolute left-2 top-2 z-10 text-sm font-bold text-white/80 drop-shadow-md">
                  {String(index + 1).padStart(3, '0')}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CircleGallery
