import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Plane } from "./Floor.jsx";
import * as THREE from "three";
import { useRef } from "react";

const ServiciosModel = ({ objectRef, active, position }) => {
  const computer = useGLTF("./Shields/Escudo_2.gltf");
  // const meshRef = useRef();
  // if (computer.scene) {
  //   // Recorre los objetos del modelo y configura su material como wireframe
  //   computer.scene.traverse((obj) => {
  //     if (obj.isMesh) {
  //       obj.material.wireframe = true;
  //       obj.material.color = "#c01a87";
  //     }
  //   });
  // }
  // useFrame(() => {
  //   // Manipulate or access the properties of the object using the ref
  //   if (objectRef.current) {
  //     // Access properties or apply transformations to the object
  //     objectRef.current.rotation.y += 0.01;
  //     if (objectRef.current.rotation.y >= Math.PI * 2) {
  //       objectRef.current.rotation.y = 0;
  //     }
  //   }
  // });

  // return (
  //   <group>
  //     <mesh>
  //       {/* Luz hemisférica */}
  //       {/* <hemisphereLight
  //         intensity={0.1}
  //         skyColor="#ffffff"
  //         groundColor="#000000"
  //       /> */}

  //       <spotLight
  //         position={[-15, 0, 10]}
  //         angle={0.3}
  //         penumbra={1}
  //         intensity={2}
  //         distance={100}
  //         castShadow
  //       />

  //       <primitive
  //         // ref={objectRef}
  //         ref={meshRef}
  //         object={computer.scene}
  //         scale={3}
  //         rotation={[0, 0, 0]}
  //         position={position}
  //         material={new THREE.MeshBasicMaterial({ wireframe: true, color: "#c01a87"})}
  //       />
  //     </mesh>
  //     <mesh position={[position[0], 0, position[2]]}>
  //       {active ? <Plane bShader /> : <></>}
  //     </mesh>
  //   </group>
  // );
  useFrame(() => {
    // Manipulate or access the properties of the object using the ref
    if (objectRef.current) {
      // Access properties or apply transformations to the object
      objectRef.current.rotation.y += 0.01;
      if(objectRef.current.rotation.y >= Math.PI*2) {
        objectRef.current.rotation.y = 0;
      }
      
    }
  });

  return (
    <group   > 
      <mesh >
        {/* Luz hemisférica */}
        {/* <hemisphereLight
          intensity={0.1}
          skyColor="#ffffff"
          groundColor="#000000"
        /> */}

        <spotLight
          position={[-15, 0, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          distance={100}
          castShadow
        />

        <primitive 
        ref={objectRef}
        object={computer.scene} 
        scale={3} 
        rotation={[0, 0, 0]}
        position={position}
        />
      </mesh>
    <mesh 
      position={[position[0],0 ,position[2]]}
    >
      {
        active ? <Plane bShader /> : <></>
      }

    </mesh>
    </group>
  );
};

export default ServiciosModel;
