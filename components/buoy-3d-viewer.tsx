"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as THREE from "three"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function BuoyModel() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Load the GLB model
  const gltf = useLoader(GLTFLoader, "/buoy.glb")

  // Rotate the model slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 5.5 : 5}
    >
      <primitive object={gltf.scene} scale={5} />
    </group>
  )
}

function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
      </div>
    </div>
  )
}

interface Buoy3DViewerProps {
  title?: string
  description?: string
  showInfo?: boolean
}

export function Buoy3DViewer({ title = "Buoy Information", description, showInfo = true }: Buoy3DViewerProps) {
  return (
    <Card className="overflow-hidden h-full">
      <CardHeader>
        <CardTitle className="text-primary">Buoy Information</CardTitle>
        <CardDescription>Real-time buoy connectivity</CardDescription>
      </CardHeader>
      <CardContent className={showInfo ? "p-0" : ""}>
        <div className="w-full h-[300px] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 relative">
          <Canvas
            className="w-full h-full"
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <PerspectiveCamera makeDefault position={[10, 7, 5]} fov={60} />
            
            {/* Lights */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />

            {/* Environment for reflections */}
            <Environment preset="sunset" />

            <Suspense fallback={null}>
              <BuoyModel />
            </Suspense>

            {/* Camera Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={5}
              maxDistance={10}
              autoRotate={false}
              autoRotateSpeed={0.5}
              target={[0, 0, 0]}
            />
          </Canvas>

          {/* Overlay instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            Drag to rotate | Scroll to zoom
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
