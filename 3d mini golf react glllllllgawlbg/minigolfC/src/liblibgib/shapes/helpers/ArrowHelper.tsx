/*
<Arrow direction={new THREE.Vector3(1, 1, 0)} origin={new THREE.Vector3(0, 0, 0)} length={2} color="blue" />
<ArrowHelper direction={[1, 1, 0]} origin={[0, 0, 0]} length={2} color="blue" />

*/
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ArrowHelper as ThreeArrowHelper, Vector3 } from "three";

export function ArrowHelper({ direction = [0, 0, 1], origin = [0, 0, 0], length = 1, color = "yellow" }) {
  const arrowRef = useRef();

  // Convert array props to Vector3
  const dir = new Vector3(...direction).normalize();
  const pos = new Vector3(...origin);

  useFrame(() => {
    if (arrowRef.current) {
      arrowRef.current.setDirection(dir);
      arrowRef.current.setLength(length);
    }
  });

  return <primitive object={new ThreeArrowHelper(dir, pos, length, color)} ref={arrowRef} />;
}
