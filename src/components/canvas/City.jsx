import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const City = () => {
  let ref = useRef();
  const limit = 100;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  let cityLimit = limit * 2 - 20;
  let builds = useMemo(() => {
    const sideLeft = [];
    const sideRight = [];
    for (let i = 0; i < 150; i++) {
      sideLeft.push({
        position: {
          x: Math.random() * (-limit + 20) - 10,
          y: 0,
          z: Math.random() * cityLimit - cityLimit / 2,
        },
        scale: {
          x: 0.9 + mathRandom(1 - 0.9),
          y: 0.1 + Math.abs(mathRandom(8)),
          z: 0.9 + mathRandom(1 - 0.9),
        },
      });
      sideRight.push({
        position: {
          x: Math.random() * (limit - 20) + 10,
          y: 0,
          z: Math.random() * cityLimit - cityLimit / 2,
        },
        scale: {
          x: 0.9 + mathRandom(1 - 0.9),
          y: 0.1 + Math.abs(mathRandom(8)),
          z: 0.9 + mathRandom(1 - 0.9),
        },
      });
    }
    return { sideLeft, sideRight };
  }, [cityLimit]);

  useLayoutEffect(() => {}, []);

  useEffect(() => {
    builds.sideLeft.forEach((build, i) => {
      dummy.position.set(build.position.x, build.position.y, build.position.z);
      dummy.scale.set(build.scale.x * 5, build.scale.y * 5, build.scale.z * 5);
      dummy.position.setY((build.scale.y * 5) / 2);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });

    builds.sideRight.forEach((build, i) => {
      dummy.position.set(build.position.x, build.position.y, build.position.z);
      dummy.scale.set(build.scale.x * 5, build.scale.y * 5, build.scale.z * 5);
      dummy.position.setY((build.scale.y * 5) / 2);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i + 150, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [builds.sideLeft, builds.sideRight, dummy]);

  return (
    <>
      <directionalLight position={[10, 1, 1]} color="#ffffff" />
      <directionalLight position={[-1, -1, -1]} color="#ffd738" />
      <ambientLight color="#ffffff" />
      <instancedMesh ref={ref} args={[null, null, 300]}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshPhongMaterial
          attach="material"
          color="#880E4F"
          flatShading={true}
        />
      </instancedMesh>
    </>
  );
};

export default City;