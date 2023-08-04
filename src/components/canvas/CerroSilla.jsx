// import React, { Suspense, useEffect, useState, useRef } from "react";
import {useGLTF} from "@react-three/drei";

const CerroSilla = () => {
  const model = useGLTF("./cerro/cerromitad2.glb");
  // const model = useGLTF("./montain/montanaMOD.glb");

  return (
    <>
    <group position={[-10, -41, -30]} scale={[25, 25, 25]} rotation={[0, 3.2, 0]}>
      {/* Modelo con wireframe */}
      <mesh {...model.nodes["EXPORT_GOOGLE_SAT_WM"]}>
        <meshBasicMaterial attach="material" color="#585794" wireframe />
      </mesh>
    </group>
    <group position={[-10, -41, -30]} scale={[25, 25, 25]} rotation={[0, 3.2, 0]}>
      {/* Modelo solido*/}
      <mesh {...model.nodes["EXPORT_GOOGLE_SAT_WM"]}>
        <meshBasicMaterial attach="material" color="#262157"/>
      </mesh>
    </group>
    </>
  );
};

export default CerroSilla;
