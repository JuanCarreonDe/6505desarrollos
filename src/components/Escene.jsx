// imports fundamentals
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Stars } from "@react-three/drei";
import {
  EffectComposer,
  SSAO,
  Bloom,
  Noise,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize, Resolution } from "postprocessing";

// imports components
import { GridPlane, Plane } from "./canvas/Floor";
import CanvasLoader from "./Loader";
import CerroSilla from "./canvas/CerroSilla";
import Buttons from "./Buttons";
import Annotations from "./Annotations";
import Info from "./Info";
import { models } from "../constants";
import logo from "../assets/Logo.png";
import NosotrosModel from "./canvas/NosotrosModel";
import ServiciosModel from "./canvas/ServiciosModel";
import ContactoModel from "./canvas/ContactoModel";
import ComencemosModel from "./canvas/ComencemosModel";
// import {Montaña, Montaña2} from "./canvas/Montaña";
import Montañas from "./canvas/Montaña";

// import info
// import PlanetInfo from "./Info/PlanetInfo";
// import PcInfo from "./Info/PcInfo";
// import SomethingInfo from "./Info/SomethingInfo";

// consts
const radius = 250; // Radio del circulo
const center = { x: 0, z: 0 }; // Centro del circulo (coordenadas x y z)
// const GruopIds = ["PlanetInfo", "PcInfo", "SomethingInfo"];
// const ChildDiv = ["img_01", "img_02", "img_03"];

function isNear(numero1, numero2, tolerancia) {
  const diferencia = Math.sqrt(
    (numero2.x - numero1.x) * (numero2.x - numero1.x) +
      (numero2.z - numero1.z) * (numero2.z - numero1.z)
  );
  return diferencia <= tolerancia;
}

// animation to camera and target
const Animate = ({ controls, lerping, positionCamera, target }) => {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      // console.log(controls.current.maxDistance);
      if (controls.current.maxDistance === Infinity) {
        camera.position.lerp(positionCamera, 0.05);
        controls.current.target.lerp(target, 0.05);
      } else {
        if (!isNear(camera.position, positionCamera, 1.5)) {
          camera.position.lerp(positionCamera, 0.05);
        }

        if (!isNear(controls.current.target, target, 1.5)) {
          controls.current.target.lerp(target, 0.05);
        }
      }
    }
  });
};

// function to calculate the position of the models in a circle
const calculateTargetCoordinates = (
  model,
  radius,
  center,
  displacement = 0
) => {
  const angle = (360 / models.length) * model.id;
  const x =
    center.x + radius * Math.cos(((angle - displacement) * Math.PI) / 180);
  const z =
    center.z + radius * Math.sin(((angle - displacement) * Math.PI) / 180);
  return { x, y: model.target.y, z };
};

const Escene = () => {
  const [positionCamera, setPositionCamera] = useState();
  const [target, setTarget] = useState();
  const [lerping, setLerping] = useState(false);
  const [active, setActive] = useState();
  const [endAnimation, setEndAnimation] = useState(false);

  const ref = useRef();
  const nosotrosRef = useRef();
  const serviciosRef = useRef();
  const contactoRef = useRef();
  const comencemosRef = useRef();

  // const {camera, gl} = useThree();
  const [camera, setCamera] = useState([]);

  // function to move the camera, change the target and add the active class to the button
  const handleButtonClick = (model) => {
    const { x, y, z } = calculateTargetCoordinates(model, radius, center);

    setActive(model.id);
    setTarget({ x, y, z });
    setPositionCamera(model.camera);
    setLerping(true);
    // console.log({ x, y, z });
    ref.current.maxDistance = 20;
  };

  // effect to welcome animation
  useEffect(() => {
    setPositionCamera({
      x: 160,
      y: 20,
      z: -10,
    });
    setTarget({ x: 70, y: 20, z: -1 });
    setLerping(true);
    setActive(-2);
    // ref.current.minDistance = 80;
  }, []);

  const posNosotros = calculateTargetCoordinates(
    models.at(0),
    radius,
    center,
    -2
  );
  const posServicios = calculateTargetCoordinates(
    models.at(1),
    radius,
    center,
    -2
  );
  const posContacto = calculateTargetCoordinates(
    models.at(2),
    radius,
    center,
    -2
  );
  const posComencemos = calculateTargetCoordinates(
    models.at(3),
    radius,
    center,
    -2
  );
  // const posCerroSilla = calculateTargetCoordinates(
  //   models.at(3),
  //   radius,
  //   center,
  //   -2
  // );

  return (
    <section className="section__hero hero">
      <div className="hero__canvas">
        <Canvas
          camera={{ position: [0, 700, 10], fov: 30 }}
          onPointerDown={() => {
            setLerping(false);
            ref.current.maxDistance = 500;
          }}
          // onChange={(e) => {
          // console.log(e?.camera.position);
          // }}
          style={{
            // background: "#1a1444"
            background: "#0e0728",
          }}
          onWheel={() => {
            setLerping(false);
            ref.current.maxDistance = 500;
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              ref={ref}
              minDistance={25}
              maxPolarAngle={Math.PI / 2.2}
              // set panning limits
              onChange={(e) => {
                const maxX = 250;
                const minX = -250;
                const maxY = 100;
                const minY = -1;
                const maxZ = 250;
                const minZ = -250;
                const x = e?.target.target.x;
                const y = e?.target.target.y;
                const z = e?.target.target.z;
                if (x < minX || x > maxX) {
                  e?.target.target.setX(x < minX ? minX : maxX);
                }
                if (y < minY || y > maxY) {
                  e?.target.target.setY(y < minY ? minY : maxY);
                }
                if (z < minZ || z > maxZ) {
                  e?.target.target.setZ(z < minZ ? minZ : maxZ);
                }
                if (e?.target.target.z < -0.956 && active === -2) {
                  console.log("je");
                  // setEndAnimation(true)
                  setActive(-1)
                }
                
                console.log(e?.target.target.x);
              }}
            />

            {/* args = color="#76c564" near={5} far={100} */}
            <fog attach="fog" args={["#0e0728", 50, 600]} />
            <Stars
              radius={200} // Radius of the inner sphere (default=100)
              depth={50} // Depth of area where stars should fit (default=50)
              count={10000} // Amount of stars (default=5000)
              factor={6} // Size factor (defa0ult=4)
              saturation={1} // Saturation 0-1 (default=0)
              fade // Faded dots (default=false)
              speed={5}
            />
            {/* <CerroSilla /> */}
            <ambientLight intensity={0.6} />
            <CerroSilla />
            <NosotrosModel
              objectRef={nosotrosRef}
              active={models.at(0).active}
              position={[posNosotros.x, 0.5, posNosotros.z]}
            />
            <ServiciosModel
              objectRef={serviciosRef}
              active={models.at(1).active}
              position={[posServicios.x, 0.5, posServicios.z]}
            />
            <ContactoModel
              objectRef={contactoRef}
              active={models.at(2).active}
              position={[posContacto.x, 0.5, posContacto.z]}
            />
            <ComencemosModel
              objectRef={comencemosRef}
              active={models.at(3).active}
              position={[posComencemos.x, 0.5, posComencemos.z]}
            />
            <Montañas />
            <Plane />
            <GridPlane />
            <Animate
              controls={ref}
              positionCamera={positionCamera}
              target={target}
              lerping={lerping}
            />
            <Annotations
              handleButtonClick={handleButtonClick}
              calculateTargetCoordinates={calculateTargetCoordinates}
              models={models}
              radius={radius}
              center={center}
            />
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={2.0} // The bloom intensity.
                blurPass={undefined} // A blur pass.
                kernelSize={KernelSize.SMALL} // blur kernel size
                luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
                luminanceSmoothing={0.5} // smoothness of the luminance threshold. Range is [0, 1]
                mipmapBlur={true} // Enables or disables mipmap blur.
                resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
                resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
              />
              <Noise
                premultiply // enables or disables noise premultiplication
                // blendFunction={BlendFunction.SCREEN} // blend mode
              />
            </EffectComposer>
          </Suspense>
          <Preload all />
        </Canvas>

        {/* navbar */}
        <nav className="escene__btns">
          <Buttons
            models={models}
            active={active}
            // setActive={setActive}
            handleButtonClick={handleButtonClick}
          />
        </nav>

        <div
          className="escene__title title"
          onClick={() => {
            setPositionCamera({
              x: 160,
              y: 20,
              z: -10,
            });
            setTarget({ x: 70, y: 20, z: -1 });
            setLerping(true);
            setActive(-1);
          }}
        >
          <img src={logo} className="title__img"></img>
        </div>

        <div
          className={`${
            active === -1 ? "escene__welcome--active" : ""
          } escene__welcome`}
        >
          <p>Soluciones hechas a tu medida</p>
        </div>

        <Info models={models} active={active} setActive={setActive} />
      </div>
    </section>
  );
};

export default Escene;
