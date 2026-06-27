import { Suspense, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface SceneProps {
  children: ReactNode
  /** 'always' while on screen, 'never' when scrolled away. */
  frameloop: 'always' | 'demand' | 'never'
  lowEnd?: boolean
  cameraZ?: number
}

export function Scene({ children, frameloop, lowEnd = false, cameraZ = 3.4 }: SceneProps) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, lowEnd ? 1 : 1.5]}
      gl={{ antialias: !lowEnd, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={2} />
      <Suspense fallback={null}>{children}</Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        // No scroll-zoom: the page must keep scrolling past an embedded viewer.
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.88}
      />
    </Canvas>
  )
}
