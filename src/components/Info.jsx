import { useState } from "react";
import Nosotros from "./info/Nosotros";
import Servicios from "./info/Servicios";
import Contacto from "./info/Contacto";
import Comencemos from "./info/Comencemos";

const Info = ({ models, active, setActive }) => {
  // const [active, setActive] = useState();

  return (
    <>
      {models.map((model) => (
        <div
          key={model.id}
          className={`${
            active === model.id ? "escene__info--active" : ""
          } escene__info`}
        >
          <div className="info__close" onClick={() => setActive(-3)}>
            <span className="close__span 
            "
            >x</span>
            {/* <span className="close__span close__span--2"></span> */}
          </div>
          {active === 0 ? <Nosotros /> : ""}
          {active === 1 ? <Servicios /> : ""}
          {active === 2 ? <Contacto /> : ""}
          {active === 3 ? <Comencemos /> : ""}
          {/* <p className="info__p">{model.description}</p> */}
        </div>
      ))}
    </>
  );
};

export default Info;
