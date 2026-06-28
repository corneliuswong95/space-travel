import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

import { UNIT_SPHERE } from './shared'

// A thin Fresnel shell: transparent where it faces the camera, glowing at the silhouette —
// so it reads as light scattering through an atmosphere (or a star's corona) at the limb.
const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), uPower);
    gl_FragColor = vec4(uColor, fresnel * uIntensity);
  }
`

interface AtmosphereProps {
  /** The body's rendered radius; the shell is sized relative to it. */
  radius: number
  color: string
  /** Shell size relative to the body radius (how far the glow reaches past the limb). */
  scale?: number
  /** Higher = tighter glow hugging the edge. */
  power?: number
  intensity?: number
}

export function Atmosphere({
  radius,
  color,
  scale = 1.2,
  power = 3,
  intensity = 1,
}: AtmosphereProps) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uPower: { value: power },
          uIntensity: { value: intensity },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.FrontSide,
      }),
    [color, power, intensity],
  )

  useEffect(() => () => material.dispose(), [material])

  // raycast disabled so the shell never steals hover/click from the body beneath it.
  return (
    <mesh geometry={UNIT_SPHERE} scale={radius * scale} material={material} raycast={() => null} />
  )
}
