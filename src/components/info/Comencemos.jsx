import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Comencemos = () => {
  const form = useRef();
  const [formState, setFormState] = useState({
    user_nombre: '',
    user_empresa: '',
    user_correo: '',
    user_telefono: '',
    user_mensaje: '',
    aceptar_terminos: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formState.aceptar_terminos) {
      setErrorMessage('Debes aceptar los términos y condiciones.');
      return;
    }

    // Validación de campos obligatorios
    for (const key in formState) {
      if (formState[key] === '' && key !== 'aceptar_terminos') {
        setErrorMessage('Debes llenar todos los campos obligatorios.');
        return;
      }
    }

    setErrorMessage('');
    setIsSubmitting(true);

    emailjs
      .sendForm('service_tc6de8f', 'template_ypjs1eu', form.current, 'gGACcUY4VLAjLX-JP')
      .then(
        (result) => {
          console.log(result.text);
          // Limpiar los campos después de enviar el correo
          setFormState({
            user_nombre: '',
            user_empresa: '',
            user_correo: '',
            user_telefono: '',
            user_mensaje: '',
            aceptar_terminos: false,
          });
          setIsSubmitting(false);
        },
        (error) => {
          console.log(error.text);
          setIsSubmitting(false);
        }
      );
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <div className="info__body">
        <div className="comencemos__text">
          <h2 className="comencemos__h2">
            Si tienes una idea innovadora que podamos apoyar
          </h2>
          <p className="comencemos__p">¡Queremos escucharlo!</p>
        </div>
        <form ref={form} onSubmit={sendEmail} className="comencemos__form">
          <div className="comencemos__inputs">
            <input
              className="comencemos__input"
              type="text"
              name="user_nombre"
              value={formState.user_nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              // required
            />
            <input
              className="comencemos__input"
              type="text"
              name="user_empresa"
              value={formState.user_empresa}
              onChange={handleInputChange}
              placeholder="Empresa"
              // required
            />
            <input
              className="comencemos__input"
              type="email"
              name="user_correo"
              value={formState.user_correo}
              onChange={handleInputChange}
              placeholder="Correo"
              // required
            />
            <input
              className="comencemos__input"
              type="tel"
              name="user_telefono"
              value={formState.user_telefono}
              onChange={handleInputChange}
              placeholder="Teléfono"
              // required
            />
          </div>
          <textarea
            className="comencemos__textarea"
            name="user_mensaje"
            value={formState.user_mensaje}
            onChange={handleInputChange}
            placeholder="Mensaje"
            // required
          ></textarea>
          <div className="comencemos__condiciones">
            <label>
              <input
                className="comencemos__check"
                type="checkbox"
                name="aceptar_terminos"
                checked={formState.aceptar_terminos}
                onChange={handleInputChange}
                // required
              />
              He leído y acepto la{" "}
              <span className="comencemos__span">Política de Privacidad</span>
            </label>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="comencemos__button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'ENVIAR MENSAJE'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Comencemos;