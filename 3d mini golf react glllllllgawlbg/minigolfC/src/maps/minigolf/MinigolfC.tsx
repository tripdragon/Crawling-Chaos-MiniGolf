
import { useState, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Grid, Gltf, Sky } from "@react-three/drei";
import { RigidBody, useRapier } from "@react-three/rapier";

import { Ball } from '@liblibgib/shapes/physics/Ball.tsx';
import { Ball2 } from '@liblibgib/shapes/physics/Ball2.tsx';

import { Vector2, Vector3, Raycaster } from 'three'
import { ArrowHelper } from "@liblibgib/shapes/helpers/ArrowHelper.tsx";



const gridSize = [10.5, 10.5];

// const url = "http://localhost:5174/models/shoe02withselectormesh.glb";
const url = `${import.meta.env.BASE_URL}models/shoe02withselectormesh.glb`;


let ballIDCount = 0;
let arrowIDCount = 0;

const pointer = new Vector2();
const raycaster = new Raycaster();
const power = 114;

export function MinigolfC() {
  // const [count, setCount] = useState(0)

  const [balls, setBalls] = useState([]);
  const [arrows, setArrows] = useState([]);

  // this ONE STUPIUD function forced the whole app to
  // get all nested
  const { camera, viewport, gl } = useThree();
  const { world } = useRapier();


  const handleClick = (event) => {

    const { clientX, clientY } = event;
    const { width, height } = event.target.getBoundingClientRect();

    // Convert screen coordinates to world coordinates
    // const x = (clientX / width) * 2 - 1;
    // const y = -(clientY / height) * 2 + 1;
    pointer.x = ( clientX / width ) * 2 - 1;
    pointer.y = - ( clientY / height ) * 2 + 1;

    // Project into 3D world space
    raycaster.setFromCamera( pointer, camera );
    // console.log("ray", raycaster.ray.direction);


    // console.log(pointer);
    const pos = raycaster.ray.origin.clone().addScalar(0.2);
    setBalls((prev) => [...prev, { timer: 0, id: ballIDCount++, direction:raycaster.ray.direction.clone(), position: pos, scale: 0.1 }]);
    // setBalls((prev) => [...prev, { id: ballIDCount++, direction:raycaster.ray.direction.clone(), position: [0,1,0], scale: 0.1 }]);

    // setArrows((prev) => [...prev, { id: arrowIDCount++, direction:raycaster.ray.direction.toArray(), origin:raycaster.ray.origin.toArray() }]);

    // setBalls((prev) => [...prev, { id: Math.random(), position: [x * 5, y * 5, 0] }]);
    // setBalls((prev) => [...prev, { id: Math.random(), position: worldPos, scale: 0.1 }]);
    // setBalls((prev) => [...prev, { id: ballIDCount++, position: worldPos }]);

  };

  // // // Function to apply random impulse to each ball
  // const applyImpulse = (ballRef, direction) => {
  //   // debugger
  //   if (ballRef) {
  //     // Apply a random impulse to blast the ball
  //     // ballRef.applyImpulse({ x: (Math.random() - 0.5) * 5, y: 5, z: -10 }, true);
  //     // ballRef.applyImpulse({ x: 0, y: 0, z: -10 }, true);
  //
  //     // const vv = new Vector3().fromArray(direction);
  //     // console.log("vv",vv);
  //
  //     ballRef.applyImpulse(direction.multiplyScalar(200), true);
  //     // ballRef.applyImpulse(new Vector3(0,0,1).multiplyScalar(200), true);
  //
  //     // console.log("applyImpulse", ballRef, direction);
  //
  //   }
  // };

  // const gltf = useGLTF(url)
  // useGLTF.preload(url)
  // <Gltf src={url} />
  // <Gltf src={url} useDraco='/draco-gltf' ... />

  useEffect(() => {
    // sets up click event on canvas

    // const handleClick = (event) => {
    //   console.log("Canvas clicked!", event);
    //   console.log("camera", camera);
    // };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl]);


  // useFrame(() => {
  //     setBalls((prevBalls) => {
  //       const remainingBalls = [];
  //
  //       prevBalls.forEach((ball) => {
  //         // Get the rigid body from the world using the id
  //         const body = world.getRigidBody(ball.id);
  //
  //         // Ensure the body exists and get its position
  //         if (body) {
  //           const position = body.translation();
  //
  //           // If y position is greater than or equal to 10, keep the ball
  //           if (position.y >= 10) {
  //             remainingBalls.push(ball);
  //           }
  //         }
  //       });
  //
  //       return remainingBalls;  // Update the state with the remaining balls
  //     });
  //   });


    useEffect(() => {
      const interval = setInterval(() => {
        setBalls((prevBalls) => {
          return prevBalls.map((ball) => {
            // Update timer for each ball
            const newTimer = ball.timer + 1;

            // Remove ball if timer exceeds a certain limit (e.g., 5 seconds)
            if (newTimer > 200) {
              return null; // Mark for removal
            }

            // Otherwise, keep the ball with updated timer
            return { ...ball, timer: newTimer };
          }).filter(Boolean); // Remove null entries (balls marked for removal)
        });
      }, 200); // Check every 100ms (or adjust as needed)

      return () => clearInterval(interval); // Clean up on unmount
    }, []);


  return (
      <>

      <OrbitControls />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25}/>


      <ambientLight intensity={1} />
      <pointLight intensity={2} position={[-1,1,0]} />
      <pointLight intensity={2} position={[1,1,0]} />
      <directionalLight color="green" position={[0, 0, 5]} />

      <RigidBody position={[0,0.7,0]} colliders="cuboid" type="dynamic">
        <mesh scale={1}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>

      <RigidBody position={[1,0.8,0]} colliders="cuboid" type="dynamic">
        <mesh scale={1}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>



      {/* <Grid /> */}
      {/* {...gridConfig} */}
      <Grid position={[0, -0.01, 0]} args={gridSize}  />

      <Gltf src={url} scale={8} />
      {/* <mesh castShadow receiveShadow geometry={nodes.Suzanne.geometry} {...props}>
        <meshStandardMaterial color="#9d4b4b" />
      </mesh> */}



      <RigidBody position={[0, 10, 0]} colliders="ball" type="dynamic">
        <mesh>
          <sphereGeometry args={[1,12, 12]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>


      <RigidBody position={[0.1, 20, 0]} colliders="ball" type="dynamic">
        <mesh>
          <sphereGeometry args={[1,12, 12]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>

      <Ball position={[0.1,10, -0]} color={0xffffaa} />

      {/* <Ball key={ball.id} position={ball.position} applyImpulse={applyImpulse} /> */}
      {/* <Ball key={ball.id} position={ball.position} scale={ball.scale} applyImpulse={applyImpulse} direction={ball.direction} /> */}
      {balls.map((ball) => (
        <Ball2 key={ball.id} position={ball.position} scale={ball.scale} direction={ball.direction} />
      ))}
      {arrows.map((arrow) => (
        <ArrowHelper key={arrow.id} direction={arrow.direction} origin={arrow.origin} length={1} color="blue" />
      ))}


      {/* floor cuboid trimesh and hull treat the plane as static or fixed, lame sauce */}
      <RigidBody position={[0, 0, 0]} colliders="hull" type="dynamic">
        <mesh rotation={[-Math.PI/2,0,0]}>
          <planeGeometry args={[10,10]} />
          <meshStandardMaterial />
        </mesh>
      </RigidBody>

      </>

  )
}
