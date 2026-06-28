import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

import { UNIT_SPHERE } from './shared'
import { Atmosphere } from './Atmosphere'
import { bodyTextureUrl } from './textures'

interface SunProps {
  radius?: number
  animate?: boolean
}

/** Broad, soft outer glow that always faces the camera — the bloom around the star. */
function SunHalo({ radius }: { radius: number }) {
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0.0, 'rgba(255,233,184,0.45)')
    g.addColorStop(0.28, 'rgba(255,186,102,0.24)')
    g.addColorStop(0.55, 'rgba(228,122,54,0.07)')
    g.addColorStop(1.0, 'rgba(228,122,54,0.0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <sprite scale={[radius * 3, radius * 3, 1]} raycast={() => null}>
      <spriteMaterial
        map={texture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        toneMapped={false}
      />
    </sprite>
  )
}

export function Sun({ radius = 1.3, animate = true }: SunProps) {
  const ref = useRef<THREE.Mesh>(null)
  const tex = useTexture(bodyTextureUrl('sun'))
  tex.colorSpace = THREE.SRGBColorSpace

  useFrame((_, delta) => {
    if (animate && ref.current) ref.current.rotation.y += delta * 0.05
  })

  return (
    <group>
      {/* Self-lit photosphere: the emissive map glows regardless of scene lighting. */}
      <mesh ref={ref} geometry={UNIT_SPHERE} scale={radius}>
        <meshStandardMaterial
          color="#000000"
          emissive="#ffffff"
          emissiveIntensity={1.25}
          emissiveMap={tex}
          toneMapped={false}
        />
      </mesh>

      {/* A crisp warm corona at the limb, then a broad soft bloom around it. */}
      <Atmosphere radius={radius} color="#ffca7a" scale={1.13} power={2.2} intensity={0.85} />
      <SunHalo radius={radius} />

      <pointLight position={[0, 0, 0]} intensity={2.5} color="#fff0d8" />
    </group>
  )
}
