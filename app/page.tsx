"use client"
import * as THREE from "three"
import { Inter } from "@next/font/google"
import styles from "./page.module.css"
import { useRef, useState } from "react"
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber"
import {
  OrthographicCamera,
  PerformanceMonitor,
  Stats,
} from "@react-three/drei"
import { Perf } from "r3f-perf"

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

  const vshader = `
  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 0.5, 1.0);
  }
  `

  const fshader = `
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_time;
  
  void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), uv.y);
    gl_FragColor = vec4(color, 1.0);
  }
  `
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
