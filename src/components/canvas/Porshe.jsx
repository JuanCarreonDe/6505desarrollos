// import React, { Suspense, useEffect, useState, useRef } from "react";
import {useGLTF} from "@react-three/drei";

const Porshe = () => {
  const model = useGLTF("./cerro/cerromitad2.gltf");

  return (
    <group
    position={[30, -50, -250]}
    scale={[30, 30, 30]}
    rotation={[(-2 * Math.PI) / 180, (110 * Math.PI) / 180, 0]}
  >
    <mesh {...model.nodes["EXPORT_GOOGLE_SAT_WM"]}>
      <meshBasicMaterial attach="material" color="#543A59" wireframe fog={false}
      />
    </mesh>
  </group>
    // <mesh>

    // </mesh>
  );
};

export default Porshe;
