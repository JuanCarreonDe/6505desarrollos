import { useGLTF } from "@react-three/drei";
import { Plane } from "../Floor.jsx";

const Computers = ({position, active}) => {
  const computer = useGLTF("./gaming_desktop_pc/scene.gltf");

  return (
    <>
    
      <mesh>
    {/* <pointLight intensity={1} position={[0, -5, 0]} /> */}
        <primitive 
        object={computer.scene} scale={.5} 
        // position={[50, .2, 50.28]}
        position={position}
        rotation={[0, 3.15, 0]}
        >
          {
            active ? <Plane bShader /> : <></>
          }
         

         </primitive>
      </mesh>

     
    </>
  );
};

export default Computers;
