import React from "react";

const Comencemos = () => {
  return (
    <>
      <div className="comencemos__text">
        <h2 className="comencemos__h2">
          Si tienes una idea innovadora que podamos apoyar
        </h2>
        <p className="comencemos__p">¡Queremos escucharlo!</p>
      </div>
      <form className="comencemos__form">
        <div className="comencemos__inputs">
          <input
            className="comencemos__input"
            type="text"
            name="nombre"
            id=""
            placeholder="Nombre"
          />
          <input
            className="comencemos__input"
            type="text"
            name="empresa"
            id=""
            placeholder="Empresa"
          />
          <input
            className="comencemos__input"
            type="text"
            name="correo"
            id=""
            placeholder="Correo"
          />
          <input
            className="comencemos__input"
            type="number"
            name="telefono"
            id=""
            placeholder="Teléfono"
          />
        </div>
        <textarea
          className="comencemos__textarea"
          name=""
          id=""
          placeholder="Mensaje"
        ></textarea>
        <div className="comencemos__condiciones">
          <label>
            <input
              className="comencemos__check"
              type="checkbox"
              name=""
              id=""
            />
            He leído y acepto la{" "}
            <span className="comencemos__span">Política de Privacidad</span>
          </label>
          <button className="comencemos__button" type="submit">
            ENVIAR MENSAJE
          </button>
        </div>
      </form>
    </>
  );
};

export default Comencemos;
