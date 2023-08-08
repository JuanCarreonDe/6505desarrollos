import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Montaña1 = () => {
  // const computer = useGLTF("./montain/8montanas.glb");
  const computer = useGLTF("./montain/scene.gltf");

  // Crear un material de wireframe
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: "#585794",
    // color: "#fff",
    wireframe: true,
  });

  // Recorrer los nodos del modelo y aplicar el material de wireframe
  const applyWireframe = (node) => {
    if (node instanceof THREE.Mesh) {
      node.material = wireframeMaterial;
    }

    if (node.children) {
      node.children.forEach(applyWireframe);
    }
  };

  // Aplicar el material de wireframe a todos los nodos del modelo
  applyWireframe(computer.scene);

  return (
    <group>
      <primitive
        object={computer.scene}
        scale={[1200,1200,1200]}
        // scale={60}
        rotation={[0, 1, 0]}
        // rotation={[0, 1, 0]}
        // position={[-55, 0, 0]}
        position={[-100, -20, 120]}
      />
    </group>
  );
};

const Montaña2 = () => {
  const model = useGLTF("./montain/scene2.glb");

  return (
    <group>
      <meshBasicMaterial attach={"material"} color={"#fff"}>
        {/* <spotLight
          position={[-15, 0, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          distance={100}
          castShadow
        /> */}

        <primitive
        object={model.scene}
        scale={[1200,1200,1200]}
        // scale={60}
        rotation={[0, 1, 0]}
        // rotation={[0, 1, 0]}
        // position={[-55, 0, 0]}
        position={[-100, -20, 120]}
        />
      </meshBasicMaterial>
    </group>
  );
};


const Montañas = () => {
  return (
    <>
    <Montaña1/>
    <Montaña2/>
    </>
  );
};


// export { Montaña, Montaña2 };
export default Montañas;