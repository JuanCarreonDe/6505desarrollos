import React, { useState } from "react";
import { ComputersCanvas } from "./canvas";
import { PorsheCanvas } from "./canvas";
import { PlanetCanvas } from "./canvas";
import Escene from "./Escene";

const Content = () => {
//   const [activeComponent, setActiveComponent] = useState(
//     "PlanetCanvas"
//   );

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <section className="section__hero hero">
        <Escene/>
    </section>
  );
};

export default Content;
