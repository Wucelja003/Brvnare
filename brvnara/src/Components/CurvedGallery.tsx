import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useInView } from 'motion/react'
import * as THREE from 'three'

/**
 * Beskonačna traka slika na zakrivljenoj WebGL površini (three.js).
 * Traka klizi sama od sebe (ne zavisi od skrola); kada se mišem pređe
 * preko nje, uspori da bi se slika mogla pogledati.
 */

const vertexShader = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    // Zakrivljenje — što dalje od centra ekrana, to dublje
    world.z -= world.x * world.x * uBend;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uPlane;
  uniform vec2 uImage;
  uniform float uRadius;
  uniform float uHover;
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    // object-fit: cover + blago približavanje na hover
    float planeRatio = uPlane.x / uPlane.y;
    float imageRatio = uImage.x / uImage.y;
    vec2 fit = planeRatio > imageRatio
      ? vec2(1.0, imageRatio / planeRatio)
      : vec2(planeRatio / imageRatio, 1.0);
    vec2 uv = (vUv - 0.5) * fit * (1.0 - 0.07 * uHover) + 0.5;
    vec4 color = texture2D(uMap, uv);

    // Zaobljeni uglovi sa mekom ivicom
    vec2 p = (vUv - 0.5) * uPlane;
    float d = roundedBox(p, uPlane * 0.5, uRadius);
    float aa = fwidth(d);
    float alpha = 1.0 - smoothstep(-aa, aa, d);

    gl_FragColor = vec4(color.rgb, alpha);
    #include <colorspace_fragment>
  }
`

interface GalleryProps {
  images: string[]
  reduceMotion?: boolean
  onSelect?: (index: number) => void
}

function Strip({
  images,
  reduceMotion,
  onSelect,
  slowRef,
}: GalleryProps & { slowRef: MutableRefObject<boolean> }) {
  const textures = useTexture(images)
  const { viewport, size } = useThree()
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const hovered = useRef<number | null>(null)
  const motion = useRef({ offset: 0, speed: 1 })

  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 8
      tex.needsUpdate = true
    })
  }, [textures])

  // Dimenzije u world jedinicama, prilagođene širini ekrana
  const mobile = size.width < 640
  const h = viewport.height * (mobile ? 0.72 : 0.76)
  const w = mobile ? Math.min(viewport.width * 0.8, h * 1.22) : h * 1.42
  const step = w * 1.07
  const period = images.length * step

  const uniforms = useMemo(
    () =>
      textures.map((tex) => {
        const img = tex.image as { width: number; height: number }
        return {
          uMap: { value: tex },
          uPlane: { value: new THREE.Vector2(1, 1) },
          uImage: { value: new THREE.Vector2(img.width, img.height) },
          uRadius: { value: 0.1 },
          uHover: { value: 0 },
          uBend: { value: 0 },
        }
      }),
    [textures],
  )

  useEffect(() => {
    uniforms.forEach((u) => {
      u.uPlane.value.set(w, h)
      u.uRadius.value = Math.min(w, h) * 0.055
    })
  }, [uniforms, w, h])

  useEffect(
    () => () => {
      document.body.style.cursor = ''
    },
    [],
  )

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    const m = motion.current

    // Brzina: puna, usporena kada je miš iznad, nula za reduced-motion
    const targetSpeed = reduceMotion ? 0 : slowRef.current ? 0.18 : 1
    m.speed = THREE.MathUtils.damp(m.speed, targetSpeed, 3, dt)
    m.offset -= w * 0.17 * m.speed * dt

    // Beskonačno: ravan koja izađe levo vraća se desno (van kadra)
    for (let i = 0; i < images.length; i++) {
      const mesh = meshes.current[i]
      if (!mesh) continue
      let x = (i * step + m.offset) % period
      if (x < 0) x += period
      mesh.position.x = x - period / 2 + step / 2
    }

    const half = viewport.width / 2
    const bend = 1.5 / Math.max(half * half, 0.0001)
    uniforms.forEach((u, i) => {
      u.uBend.value = bend
      u.uHover.value = THREE.MathUtils.damp(
        u.uHover.value,
        hovered.current === i ? 1 : 0,
        8,
        dt,
      )
    })
  })

  return (
    <group>
      {uniforms.map((u, i) => (
        <mesh
          key={images[i]}
          ref={(el) => {
            meshes.current[i] = el
          }}
          onPointerOver={() => {
            hovered.current = i
            if (onSelect) document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            if (hovered.current === i) hovered.current = null
            document.body.style.cursor = ''
          }}
          onClick={() => onSelect?.(i)}
        >
          <planeGeometry args={[w, h, 48, 1]} />
          <shaderMaterial
            uniforms={u}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
          />
        </mesh>
      ))}
    </group>
  )
}

export default function CurvedGallery(props: GalleryProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const slowRef = useRef(false)
  // Ne crtaj dok sekcija nije blizu ekrana
  const inView = useInView(wrapRef, { margin: '25% 0px 25% 0px' })

  return (
    <div
      ref={wrapRef}
      className="h-full w-full"
      style={{ touchAction: 'pan-y' }}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') slowRef.current = true
      }}
      onPointerLeave={() => {
        slowRef.current = false
      }}
    >
      <Canvas
        flat
        dpr={[1, 1.75]}
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [0, 0, 8], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Strip {...props} slowRef={slowRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
