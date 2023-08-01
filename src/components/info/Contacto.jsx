import React from "react";
import correo from "../../assets/correo.png";
import direccion from "../../assets/direccion.png";
import telefono from "../../assets/telefono.png";

const Contacto = () => {
  return (
    <>
      <div className="info__title">
        <span className="info__span"></span>
        <h1 className="info__h1">Contacto</h1>
      </div>
      <ul className="contacto__ul">
        <li className="contacto__li">
          <img src={direccion} alt="" className="contacto__img" />
          <p className="contacto__p">
            66633, Cesáreo Sepúlveda 107, La Encarcacion, Cd Apodaca, N.L.
          </p>
        </li>
        <li className="contacto__li">
          <img src={telefono} alt="" className="contacto__img" />
          <p className="contacto__p">81 1966 5468</p>
        </li>
        <li className="contacto__li">
          <img src={correo} alt="" className="contacto__img" />
          <p className="contacto__p">hola@6505desarrollos.com.mx</p>
        </li>
      </ul>
    </>
  );
};

export default Contacto;
