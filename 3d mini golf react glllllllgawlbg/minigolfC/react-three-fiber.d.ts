import { Object3DNode } from "@react-three/fiber";
import { ArrowHelper } from "three";

declare module "@react-three/fiber" {
  interface ThreeElements {
    primitive: Object3DNode<ArrowHelper, typeof ArrowHelper>;
  }
}
