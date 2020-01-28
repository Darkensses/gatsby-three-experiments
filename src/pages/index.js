import React, { useMemo, useRef, Suspense, useState } from "react"
import { Link } from "gatsby"
import * as THREE from "three"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "./index.css"
import { Canvas, useFrame, useThree } from "react-three-fiber";

function Cubes(props){
  const radius = useMemo(() => 100, []);
  const [theta, setTetha] = useState(0);
  let group = useRef();
  const {camera, scene} = useThree();    
  const geometry = useMemo(() => new THREE.BoxBufferGeometry(20, 20, 20),[]);  
  const light = useMemo(() => new THREE.PointLight( 0xffffff, 1 ), []);    

  const colors = [0xff0000, 0x00ff00, 0x0000ff]

  const cubes = useMemo(() =>
    new Array(300).fill().map((i) => ({
      position: [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ],
      rotation: [
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI
      ],
      scale: [
        Math.random() + 0.5,
        Math.random() + 0.5,
        Math.random() + 0.5
      ],
      layer: i%3      
    })),
    []
  )

  camera.layers.enable(0) // enabled by default
  camera.layers.enable(1)
  camera.layers.enable(2)
  scene.background = new THREE.Color(0xf0f0f0)
  light.layers.enable(0)
  light.layers.enable(1)
  light.layers.enable(2)

  scene.add(camera)
  camera.add(light)

  useFrame(() => {
    setTetha(theta + 0.1);

    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta))
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta))
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta))
    camera.lookAt(scene.position)    
  })  

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh
          layers={cube.layer}
          key={i}
          geometry={geometry}
          material={new THREE.MeshLambertMaterial({ color: colors[i % 3] })}
          position={cube.position}
        />
      ))}
    </group>
  )
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="div__scene">
      <Canvas>
        <Suspense fallback={null}>
          <Cubes />
        </Suspense>
      </Canvas>
    </div>
    <h1>webgl_layers</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
