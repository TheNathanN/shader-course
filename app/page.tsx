"use client"
import * as THREE from "three"
import { Inter } from "@next/font/google"
import styles from "./page.module.css"
import { useRef, useState } from "react"
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber"
import { OrthographicCamera } from "@react-three/drei"
import { Perf } from "r3f-perf"
// @ts-ignore
import fragmentShader from "../shaders/fshader.glsl"
// @ts-ignore
import vertexShader from "../shaders/vshader.glsl"

const inter = Inter({ subsets: ["latin"] })

function Plane(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const uniforms = {
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: 0.0, y: 0.0 } },
    u_color: { value: new THREE.Color(0x00ff00) },
  }

  const vshader = vertexShader

  const fshader = fragmentShader

  useFrame((state, delta) => {
    uniforms.u_mouse.value.x = Math.abs(state.mouse.x * 10000)
    uniforms.u_mouse.value.y = Math.abs(state.mouse.y * 10000)
    uniforms.u_time.value += delta
    if (uniforms.u_resolution !== undefined) {
      uniforms.u_resolution.value.x = state.size.width
      uniforms.u_resolution.value.y = state.size.height
    }
    // console.log(uniforms.u_time.value)
  })

  return (
    <mesh {...props} ref={ref}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vshader}
        fragmentShader={fshader}
      />
    </mesh>
  )
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Canvas>
        <Perf />
        <OrthographicCamera args={[-1, 1, 1, -1, 0.1, 10]}>
          <Plane />
        </OrthographicCamera>
      </Canvas>
    </main>
  )
}
