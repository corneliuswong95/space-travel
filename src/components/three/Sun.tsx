import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'

import { UNIT_SPHERE } from './shared'
import { bodyTextureUrl } from './textures'

interface SunProps {
  radius?: number
  animate?: boolean
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
      {/* Self-lit core: the emissive map makes it glow regardless of scene lighting. */}
      <mesh ref={ref} geometry={UNIT_SPHERE} scale={radius}>
        <meshStandardMaterial
          color="#000000"
          emissive="#ffffff"
          emissiveIntensity={1.15}
          emissiveMap={tex}
          toneMapped={false}
        />
      </mesh>

      {/* Soft additive glow shell. */}
      <mesh scale={radius * 1.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#e8a33d"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={2.5} color="#fff0d8" />
    </group>
  )
}
