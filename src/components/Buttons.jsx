const Buttons = ({ models, active, handleButtonClick }) => {
    return (
      <ul className="btns__ul">
        {models.map((model) => (
         
          <li key={model.id} className="btns__li" onClick={() => {
              model.active = false;
              handleButtonClick(model)
            }}>
            <span className={`${active === model.id ? "btns__span--active" : ""} btns__span`}>
              {model.title}
            </span>
            {/* <button className={`${active === model.id ? "btns__button--active" : ""} btns__button`} /> */}
          </li>
        ))}
      </ul>
    );
  };

  export default Buttons;