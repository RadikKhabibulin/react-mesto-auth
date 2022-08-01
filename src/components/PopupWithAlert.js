import success from '../images/popup/success.svg'
import fail from '../images/popup/fail.svg'

function PopupWithAlert({isOpen, onClose, result}) {
  return (
    <div className={`popup popup_type_alert ${isOpen && "popup_popup-opened"}`}>
      <div className="popup__container">
        <img className="popup__regs-image" src={result.result ? success : fail} alt="Результат регистрации" />
        <p className="popup__regs-text">{result.text}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть форму" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithAlert;
