import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

import type { Body } from '@/data/planets'
import { UNIT_SPHERE } from './shared'
import { bodyTextureUrl, saturnRingUrl } from './textures'

// Representative axial tilts (radians) so each world sits at a believable angle.
const TILT: Record<string, number> = {
  mercury: 0.0,
  venus: 3.09,
  earth: 0.41,
  mars: 0.44,
  jupiter: 0.05,
  saturn: 0.47,
  uranus: 1.71,
  neptune: 0.49,
}

interface PlanetProps {
  body: Body
  radius?: number
  /** Ambient rotation + hover scaling. Pass false to respect reduced motion. */
  animate?: boolean
  /** Pointer hover handling. Off for scenes where the planet shouldn't react to the cursor. */
  interactive?: boolean
  onHoverChange?: (hovered: boolean) => void
}

function SaturnRings({ radius }: { radius: number }) {
  const inner = radius * 1.25
  const outer = radius * 2.2

  const geometry = useMemo(() => {
    const g = new THREE.RingGeometry(inner, outer, 96, 1)
    // Remap UVs so the ring texture maps along the radius (concentric bands).
    const pos = g.attributes.position
    const uv = g.attributes.uv
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const u = (v.length() - inner) / (outer - inner)
      uv.setXY(i, u, 0.5)
    }
    return g
  }, [inner, outer])

  useEffect(() => () => geometry.dispose(), [geometry])

  const tex = useTexture(saturnRingUrl)
  tex.colorSpace = THREE.SRGBColorSpace

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        map={tex}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
        roughness={1}
      />
    </mesh>
  )
}

export function Planet({
  body,
  radius = 1.2,
  animate = true,
  interactive = true,
  onHoverChange,
}: PlanetProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const map = useTexture(bodyTextureUrl(body.id))
  map.colorSpace = THREE.SRGBColorSpace
  map.anisotropy = 8

  const isGiant = body.category === 'gas giant' || body.category === 'ice giant'

  useFrame((_, delta) => {
    const mesh = ref.current
    if (!mesh || !animate) return
    mesh.rotation.y += delta * 0.18
    const target = (hovered ? 1.06 : 1) * radius
    mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, target, 0.15))
  })

  return (
    <group rotation={[TILT[body.id] ?? 0.3, 0, 0]}>
      <mesh
        ref={ref}
        geometry={UNIT_SPHERE}
        scale={radius}
        onPointerOver={
          interactive
            ? (e) => {
                e.stopPropagation()
                setHovered(true)
                onHoverChange?.(true)
                document.body.style.cursor = 'grab'
              }
            : undefined
        }
        onPointerOut={
          interactive
            ? () => {
                setHovered(false)
                onHoverChange?.(false)
                document.body.style.cursor = 'auto'
              }
            : undefined
        }
      >
        <meshStandardMaterial map={map} roughness={isGiant ? 0.9 : 1} metalness={0} />
      </mesh>
      {body.id === 'saturn' ? <SaturnRings radius={radius} /> : null}
    </group>
  )
}
