
import { useState, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Grid, Gltf, Sky } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MinigolfC as Map } from "./MinigolfC.tsx";
// import ClickHandler from "./ClickHandler";


// onClick={handleClick}
export function World({ map }) {
  return (
    <Canvas
      camera={{
              fov: 50,              // Field of view (standard is 50-75)
              aspect: window.innerWidth / window.innerHeight, // Auto aspect ratio
              near: 0.1,            // Minimum render distance
              far: 1000,            // Maximum render distance
              position: [1,1,4],  // Initial camera position
            }}

      >
      <Suspense>
      {/* <Physics gravity={[0, 1, 0]} interpolation={false} colliders={false}> */}
      {/* <Physics gravity={[0, -9.818373, 0]} > */}
      <Physics
        timestep="fixed"
        substeps={10} 
        gravity={[0, -9.818373, 0]}
        interpolation={false}
        colliders={false}
        debug
      >

        <Map />

        {/* {map} */}

    </Physics>
    </Suspense>
    </Canvas>
  )
}
