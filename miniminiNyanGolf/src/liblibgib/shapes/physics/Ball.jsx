
// import { Canvas, useThree } from '@react-three/fiber'

import { useEffect, useRef } from 'react'
import { useFrame } from "@react-three/fiber";

import { ArrowHelper } from "@liblibgib/shapes/helpers/ArrowHelper.jsx";
import { RigidBody } from "@react-three/rapier";

// direction : Vector3
export function Ball({ position = [0,0,0], scale=1, color=0x0000ff, applyImpulse, direction, ...props}) {
  // const [ref, api] = useState(null);

  const ref = useRef();

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

  // useEffect(() => {
  // // useFrame(() => {
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

  // useFrame(() => {
  //   if (api) {
  //     // Apply impulse to "toss" the ball forward
  //     api.applyImpulse({ x: 0, y: 5, z: -5 }, true);
  //   }
  // });

  // useEffect(() => {
  //
  //     ref.current.addForce({x:0,y:100,z:0}, true);
  //
  // },[]);


  return (

    <RigidBody ref={ref} position={position} colliders="ball" type="dynamic">
      <mesh>
        <sphereGeometry args={[scale, 12, 12]} />
        <meshStandardMaterial color={color}  />
        {/* <ArrowHelper direction={[1, 1, 0]} origin={[0, 0, 0]} length={2} color="blue" /> */}


      </mesh>
    </RigidBody>

  )
}
