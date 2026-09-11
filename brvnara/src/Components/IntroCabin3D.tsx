import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BROWN = '#6b4226'
const DARK_BROWN = '#4a2d19'
const GREEN = '#354733'
const CREAM = '#f0e6d2'

const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
// Blagi "bounce" na kraju (easeOutBack)
const easeOutBack = (x: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

type PartConfig = {
  finalY: number
  fromY: number
  start: number
  dur: number
}

// Redosled sklapanja: pod → telo → krov → vrata → prozori → dimnjak
const parts: PartConfig[] = [
  { finalY: 0, fromY: -1.6, start: 0.0, dur: 0.6 }, // pod
  { finalY: 0.65, fromY: -1.1, start: 0.4, dur: 0.6 }, // telo
  { finalY: 1.7, fromY: 4.2, start: 0.95, dur: 0.7 }, // krov
  { finalY: 0.475, fromY: 0.475, start: 1.5, dur: 0.5 }, // vrata
  { finalY: 0.85, fromY: 0.85, start: 1.6, dur: 0.5 }, // prozor levo
  { finalY: 0.85, fromY: 0.85, start: 1.68, dur: 0.5 }, // prozor desno
  { finalY: 1.95, fromY: 4.6, start: 1.85, dur: 0.6 }, // dimnjak
]

const END = 1.85 + 0.6 // poslednji start + trajanje
const HOLD = 0.9 // pauza pre prelaza u sajt

function Cabin({ onComplete }: { onComplete: () => void }) {
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const elapsed = useRef(0)
  const done = useRef(false)

  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, 0.05)
    const t = elapsed.current

    parts.forEach((c, i) => {
      const m = meshes.current[i]
      if (!m) return
      const p = clamp01((t - c.start) / c.dur)
      const e = p <= 0 ? 0 : easeOutBack(p)
      m.position.y = c.fromY + (c.finalY - c.fromY) * e
      const s = p <= 0 ? 0.0001 : Math.max(0.0001, e)
      m.scale.setScalar(s)
      const mat = m.material as THREE.MeshStandardMaterial
      mat.opacity = clamp01((t - c.start) / (c.dur * 0.4))
    })

    if (group.current) group.current.rotation.y = Math.sin(t * 0.55) * 0.35

    if (!done.current && t > END + HOLD) {
      done.current = true
      onComplete()
    }
  })

  const mat = (color: string) => (
    <meshStandardMaterial
      color={color}
      transparent
      opacity={0}
      roughness={0.8}
      metalness={0}
    />
  )

  return (
    <group ref={group} position={[0, -0.85, 0]}>
      {/* pod */}
      <mesh ref={(m) => { meshes.current[0] = m }} castShadow position={[0, parts[0].fromY, 0]}>
        <boxGeometry args={[2.7, 0.2, 2.3]} />
        {mat(DARK_BROWN)}
      </mesh>
      {/* telo */}
      <mesh ref={(m) => { meshes.current[1] = m }} position={[0, parts[1].fromY, 0]}>
        <boxGeometry args={[2.1, 1.1, 1.7]} />
        {mat(BROWN)}
      </mesh>
      {/* krov (piramida) */}
      <mesh
        ref={(m) => { meshes.current[2] = m }}
        position={[0, parts[2].fromY, 0]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <coneGeometry args={[1.75, 1.0, 4]} />
        {mat(GREEN)}
      </mesh>
      {/* vrata */}
      <mesh ref={(m) => { meshes.current[3] = m }} position={[0, parts[3].fromY, 0.86]}>
        <boxGeometry args={[0.45, 0.75, 0.08]} />
        {mat(DARK_BROWN)}
      </mesh>
      {/* prozor levo */}
      <mesh ref={(m) => { meshes.current[4] = m }} position={[-0.62, parts[4].fromY, 0.86]}>
        <boxGeometry args={[0.4, 0.4, 0.08]} />
        {mat(CREAM)}
      </mesh>
      {/* prozor desno */}
      <mesh ref={(m) => { meshes.current[5] = m }} position={[0.62, parts[5].fromY, 0.86]}>
        <boxGeometry args={[0.4, 0.4, 0.08]} />
        {mat(CREAM)}
      </mesh>
      {/* dimnjak */}
      <mesh ref={(m) => { meshes.current[6] = m }} position={[0.55, parts[6].fromY, -0.2]}>
        <boxGeometry args={[0.28, 0.7, 0.28]} />
        {mat(DARK_BROWN)}
      </mesh>
    </group>
  )
}

export default function IntroCabin3D({
  onComplete,
}: {
  onComplete: () => void
}) {
  // Sigurnosni tajmer ako WebGL zakaže — svejedno pusti u sajt
  useEffect(() => {
    const id = window.setTimeout(onComplete, 6000)
    return () => window.clearTimeout(id)
  }, [onComplete])

  return (
    <div className="intro-cabin">
      <Canvas
        camera={{ position: [3.6, 1.9, 4.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} />
        <Cabin onComplete={onComplete} />
      </Canvas>
    </div>
  )
}
