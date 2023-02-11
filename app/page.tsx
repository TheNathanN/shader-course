"use client"
import * as THREE from "three"
import { Inter } from "@next/font/google"
import styles from "./page.module.css"
import { useRef, useState } from "react"
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber"

const inter = Inter({ subsets: ["latin"] })

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </main>
  )
}
