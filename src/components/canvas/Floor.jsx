// import { useFrame } from "@react-three/fiber";
// import { useMemo, useRef, SphereBufferGeometry } from "react";
// import * as THREE from 'three';
// import { useLoader } from '@react-three/fiber'

// const floorWidth = 700;
// const floorHeight = 700;

// /**
//  const vertexShader = `
//   varying vec2 vUv;
//   uniform float time;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;
//  */


// const vertexShader = /* glsl */`
//   varying vec2 vUv;
//   uniform float time;

//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// /*
// const fragmentShader = `
//   varying vec2 vUv;
//   uniform float time;
//   uniform float radius1;
//   uniform float radius2;
//   uniform float offset;
//   uniform float fadeTime;

//   void main() {
//     // Calcular el radio y la opacidad en función del tiempo y el offset
//     float t = mod(time, fadeTime) / fadeTime; // Normalizar el tiempo dentro del rango de desvanecimiento
//     float r1 = radius1 * t * offset;
//     float r2 = radius2 * t;

//     // Calcular la distancia entre la posición actual y el centro de la primera circunferencia
//     vec2 center1 = vec2(0.5, 0.5);
//     float distance1 = distance(vUv, center1);

//     // Calcular la distancia entre la posición actual y el centro de la segunda circunferencia
//     vec2 center2 = vec2(0.5, 0.5);
//     float distance2 = distance(vUv, center2);

//     // Verificar si el fragmento está dentro de la primera circunferencia
//     if (distance1 <= r1) {
//       // Calcular la opacidad en función de la distancia al centro
//       float opacity = 1.0 - smoothstep(0.0, r1, distance1);
//      // gl_FragColor = vec4(0.53, 0.30, 0.76, opacity); // Color rojo con opacidad variable
//     }
//     // Verificar si el fragmento está dentro de la segunda circunferencia
//     else if (distance2 <= r2) {
//       // Calcular la opacidad en función de la distancia al centro y al tiempo
//       float opacity = 1.0 - smoothstep(0.0, r2, distance2) * smoothstep(fadeTime, 0.0, time);
//       gl_FragColor = vec4(0.53, 0.30, 0.76, opacity); // Color azul con opacidad variable
//     } else {
//       discard; // Descartar el fragmento (hacerlo transparente)
//     }
//   }
// `;
// */ 

// // Fragment shader  0.53, 0.30, 0.76
// const fragmentShader = /* glsl */`
//   varying vec2 vUv;
//   uniform float time;
//   uniform vec2 center1;
//   uniform vec2 center2;
//   uniform float radius1;
//   uniform float radius2;
//   uniform float radius3;
//   uniform float speed;
//   uniform float fadeTime;

//   // Función de reducción gradual
//   float reduceOpacity(float opacity, float t) {
//     return mix(opacity, 0.15, t);
//   }

//   void main() {
//     // Calcular la distancia al centro de los anillos
//     float distance1 = distance(vUv, center1);
//     float distance2 = distance(vUv, center2);
//     float distance3 = distance(vUv, center2);

//     // Calcular el radio y la opacidad en función del tiempo
//     float t = mod(time, fadeTime) / fadeTime; // Normalizar el tiempo dentro del rango de desvanecimiento
//     //float t = mod(time * speed, fadeTime) / fadeTime;
//     float r1 = radius1 * t;
//     float r2 = radius2 * t;
//     float r3 = radius3 * t;

//     // Calcular el brillo del efecto de neón
//     float neonBrightness1 = sin(t * 5.0) * 0.5 + 0.5;
//     float neonBrightness2 = cos(t * 5.0) * 0.5 + 0.5;

//     // Calcular el efecto de emisión de luz
//     vec3 emissionColor1 = vec3(1.0, 0.30, 0.0) * neonBrightness1; // Color de emisión para el primer anillo
//     vec3 emissionColor2 = vec3(0.53, 0.10, 1.0) * neonBrightness1; // Color de emisión para el segundo anillo
//     vec3 emissionColor3 = vec3(0.53, 1.00, 0.76) * neonBrightness1;

//     // Verificar si el fragmento está dentro del anillo 1
//     if (distance1 >= r1 && distance1 <= r1 + 0.01) {
//       // Calcular la opacidad en función de la distancia al centro
//       float opacity1 = 1.0 - smoothstep(0.0, 1.0, t - 0.3);
//       vec3 neonColor1 = vec3(1.0, 0.30, 0.0) * neonBrightness1; // Color rojo con brillo de neón
//       gl_FragColor = vec4(neonColor1 + emissionColor1, 1); 
//     }
//     // Verificar si el fragmento está dentro del anillo 2
//     else if (distance2 >= r2 && distance2 <= r2 + 0.01) {
//       // Calcular la opacidad en función de la distancia al centro
//       float opacity = 1.0 - smoothstep(r2, r2 + 0.02, distance2);
//       vec3 neonColor2 = vec3(0.53, 0.10, 1.0) * neonBrightness1; // Color rojo con brillo de neón
//       gl_FragColor = vec4(neonColor2 + emissionColor2, 1); 
//     } else if(distance3 >= r3 && distance3 <= r3 + 0.01){
//       // Calcular la opacidad en función de la distancia al centro
//       float opacity = 1.0 - smoothstep(r3, r3 + 0.02, distance3);
//       vec3 neonColor3 = vec3(0.43, 0.85, 0.34) * neonBrightness1; // Color rojo con brillo de neón
//       gl_FragColor = vec4(neonColor3 + emissionColor3, 1); 
//     }else {
//       gl_FragColor = vec4(0, 0, 0.0, 0.0); 
//     }
//   }
// `;


// const Plane = ({bShader}) => {

//   const radius1 = 0.1; // Radio máximo del anillo 1
//   const radius2 = 0.15; // Radio máximo del anillo 2
//   const radius3 = 0.05;
//   const fadeTime = 2.0;
//   const speed = 0.3;


//   const mesh = useRef();
//   const uniforms = useMemo(
//     () => ({
//       time: {
//         value: 0.0,
//       },
//       center1: { value: [0.5, 0.5] },
//       center2: { value: [0.5, 0.5] },
//       radius1: { value: radius1 },
//       radius2: { value: radius2 },
//       radius3: { value: radius3 },
//       fadeTime: { value: fadeTime },
//       speed: { value: speed },
//       // u_colorA: { value: new Color("#461675") },
//       // u_colorB: { value: new Color("#884dc4") },
//     }), []
//   );

//   useFrame((state) => {
//     if(bShader){
//       const { clock } = state;
//       mesh.current.material.uniforms.time.value = clock.getElapsedTime();
//     }
    
//   });

//   let material; 
 

//   const texture = useLoader(THREE.TextureLoader, img)
//   texture.wrapS = THREE.RepeatWrapping; 

//   texture.wrapT = THREE.RepeatWrapping; 

//   texture.repeat.set(30, 30); // Repetir la textura 2 veces en dirección horizontal y vertical
//   return (
    
//     <mesh ref={mesh} position={[0, bShader ? 0 : -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]} >
//       <planeGeometry args={[700, 700, 200, 200]} />
//       <meshStandardMaterial map={texture} alphaMap={texture} transparent={true} fog={true} />
//        {
//         bShader ? 
//         <shaderMaterial
//           ref={(node) => (material = node)}
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//           wireframe
//           uniforms={uniforms}
//           extensions={{ derivatives: true }}
//           glslVersion={'#version 300 es'}
//           onBeforeCompile={(shader) => {
//             shader.uniforms.time = { value: 0 };
//             shader.vertexShader = vertexShader;
//             shader.fragmentShader = fragmentShader;
//           }}

//         // onUpdate={(self) => (self.uniforms.time.value += 0.01)} // Actualizar el tiempo en cada frame
//       /> :  <meshBasicMaterial
//                 color="#5f4c70"
//                 wireframe
//               />
//        }
//     </mesh>
//   );
// };

// // function GridPlane() {

// //   const mesh = useRef();

// //   useFrame((state) => {
// //     const { clock } = state;
// //     // mesh.current.material.uniforms.u_time.value += 0.01;
// //   });

  

// //   return (
// //     <mesh >
// //       <gridHelper
// //         ref={mesh}
// //         position={[0, -0.5, 0]}
// //         args={[floorWidth, floorHeight, "#472f5e", "#472f5e"]}
// //       >

// //       </gridHelper>    

// //     </mesh>
// //   );
// // }
// function GridPlane() {
//   return (
//     <gridHelper
//       position={[0, 0.04, 0]}
//       args={[floorWidth, 100, "#d300d6", "#d300d6"]}
//     />    
//   );
// }
// export {Plane, GridPlane};


import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

const floorWidth = 1500;
const floorHeight = 1500;

const Plane = () => {
  // const texture = useLoader(THREE.TextureLoader, img)
  // texture.wrapS = THREE.RepeatWrapping; 

  // texture.wrapT = THREE.RepeatWrapping; 

  // texture.repeat.set(30, 30); // Repetir la textura 2 veces en dirección horizontal y vertical
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} >
      <planeGeometry attach="geometry" args={[floorWidth, floorHeight]} />
      {/* <meshStandardMaterial map={texture} alphaMap={texture} transparent={true} fog={true} /> */}
      <meshBasicMaterial color={"#262157"}/>
    </mesh>
  );
};

function GridPlane() {
    //   // Custom shader material
    //   const vertexShader = `
    //   varying vec2 vUv;

    //   void main() {
    //     vUv = uv;
    //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //   }
    // `;

    // const fragmentShader = `
    //   varying vec2 vUv;

    //   void main() {
    //     float edgeWidth = 0.1; // Adjust this value to control the width of the edge highlight
    //     vec2 gridCoords = fract(vUv * vec2(10.0, 10.0)); // Number of grid cells in x and y directions

    //     float edgeX = min(gridCoords.x, 1.0 - gridCoords.x);
    //     float edgeY = min(gridCoords.y, 1.0 - gridCoords.y);

    //     float edge = min(edgeX, edgeY);

    //     vec3 edgeColor = vec3(0.631,0.631,0.631) // Color for the edge highlight

    //     if (edge < edgeWidth) {
    //       gl_FragColor = vec4(edgeColor, 1.0);
    //     } else {
    //       discard;
    //     }
    //   }
    // `;

    // const uniforms = {
    //   lineColor: { value: new THREE.Color(0xfff) },
    //   highlightColor: { value: new THREE.Color(0xfff) }
    // };
  return (
    <gridHelper
      position={[0, 0, 0]}
      // args={[floorWidth, 100, "#002f3a", "#002f3a"]}
      args={[floorWidth, 100, "#585794", "#585794"]}
    >
      {/* <shaderMaterial
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      //uniforms={uniforms}
      /> */}
      </gridHelper>    
  );
}
export {Plane, GridPlane};