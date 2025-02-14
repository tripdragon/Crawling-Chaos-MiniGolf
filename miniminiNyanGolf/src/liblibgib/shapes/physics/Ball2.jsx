
// import { Canvas, useThree } from '@react-three/fiber'

import { useEffect, useRef } from 'react'
import { useFrame } from "@react-three/fiber";

import { ArrowHelper } from "@liblibgib/shapes/helpers/ArrowHelper.jsx";
import { RigidBody, useRapier } from "@react-three/rapier";
import { Vector2, Vector3, Raycaster } from 'three'



// direction : Vector3
export function Ball2({ position, scale=1, color=0x0000ff, direction=null, ...props}) {
  // const [ref, api] = useState(null);

  const ref = useRef();

  // const { world } = useRapier();


//   // // Function to apply random impulse to each ball
//   const applyImpulse = (direction) => {
//     // debugger
//
//       // Apply a random impulse to blast the ball
//       // ballRef.applyImpulse({ x: (Math.random() - 0.5) * 5, y: 5, z: -10 }, true);
//       // ballRef.applyImpulse({ x: 0, y: 0, z: -10 }, true);
//
//       // const vv = new Vector3().fromArray(direction);
//       // console.log("vv",vv);
// console.log("direction", direction);
//       // ref.current.position = [0,2,0]
//       const _direction = new Vector3(0,10030303,0);
//       ref.current.applyImpulse(_direction, true);
//       // ref.current.applyImpulse(direction.multiplyScalar(200), true);
//       // ballRef.applyImpulse(new Vector3(0,0,1).multiplyScalar(200), true);
//
//       // console.log("applyImpulse", ballRef, direction);
//
//   };

  // // Function to apply random impulse to each ball
  // const applyImpulse = (direction) => {
  //   // debugger
  //   if (ref.current) {
  //     // Apply a random impulse to blast the ball
  //     // ballRef.applyImpulse({ x: (Math.random() - 0.5) * 5, y: 5, z: -10 }, true);
  //     // ballRef.applyImpulse({ x: 0, y: 0, z: -10 }, true);
  //
  //     // const vv = new Vector3().fromArray(direction);
  //     // console.log("vv",vv);
  //     // ballRef.applyImpulse(vv.multiplyScalar(power), true);
  //
  //     console.log("applyImpulse");
  //
  //   }
  // };

  // Apply impulse to the ball
  // useFrame(() => {
  //   // if (ref.current && applyImpulse){
  //   // // if (ref && applyImpulse){
  //   //
  //   //   debugger
  //   // }
  //   if (ref.current && applyImpulse && direction) {
  //     applyImpulse(ref.current, direction);
  //   }
  // // }, [direction, applyImpulse]);
  // },[]);

  useEffect(() => {
    const apply = () => {
      console.log("apply");
      const power = 0.04;
      ref.current.applyImpulse(direction.normalize().multiplyScalar(power), true);
      // ref.current.applyImpulse({x:0,y:0.01,z:0}, true);
    }

    // Wait for the next frame to apply the impulse
    const id = requestAnimationFrame(apply);

    // Cleanup the animation frame when the component unmounts
    return () => cancelAnimationFrame(id);

  },[]);

  return (

    <RigidBody ref={ref} position={position} colliders="ball" type="dynamic" mass="1">
      <mesh >
        <sphereGeometry args={[scale, 12, 12]} />
        <meshStandardMaterial color={color}  />
        {/* <ArrowHelper direction={[1, 1, 0]} origin={[0, 0, 0]} length={2} color="blue" /> */}


      </mesh>
    </RigidBody>

  )
}
