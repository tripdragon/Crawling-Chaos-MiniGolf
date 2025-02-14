
// template

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function ClickHandler() {
  const { gl } = useThree();

  useEffect(() => {
    const handleClick = (event) => {
      console.log("Canvas clicked!", event);
      // Your custom logic here
    };

    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, [gl]);

  return null;
}
