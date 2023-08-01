


function SphereM ()  {
  const vertexShader = /* glsl */`
    uniform vec2 uFrequency;
    uniform vec2 uAmplitude;
    uniform float uTime;

    attribute vec3 position;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(modelPosition.x * uFrequency.x + uTime) * uAmplitude.x;
        modelPosition.x += cos(modelPosition.y * uFrequency.y + uTime) * uAmplitude.y;
        vec4 viewPosition = viewMatrix * modelPosition;
        glPosition = projectionMatrix * viewPosition;

        vUv = uv;
    }

`

const fragmentShader = /* glsl */ `
    precision mediump float;
    uniform vec3 uColor;

    varying vec2 vUv;

    void main(){
        gl_FragColor = vec4(vUv, 0.5,1.0);
    }
`

  return (
    <mesh>
        <sphereGeometry args={[2, 16,16]}  />
        <shaderMaterial
          ref={(node) => (material = node)}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        //   wireframe
          uniforms={{
            uFrequency: { value: 5.0},
            uAmplitude: {value:0.5},
            uTime:{value:0.0},
            uColor:{value: new THREE.Color(shaderProps.color)}
        
        }}
        //   extensions={{ derivatives: true }}
        //   glslVersion={'#version 300 es'}
        //   onBeforeCompile={(shader) => {
        //     shader.uniforms.time = { value: 0 };
        //     shader.vertexShader = vertexShader;
        //     shader.fragmentShader = fragmentShader;
        //   }}

        // onUpdate={(self) => (self.uniforms.time.value += 0.01)} // Actualizar el tiempo en cada frame
      />

    </mesh>
  )
}

export default {SphereM};