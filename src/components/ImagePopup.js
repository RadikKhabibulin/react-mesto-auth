import logo from '../images/header/logo.svg';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_place-image ${card && "popup_popup-opened"}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={card ? card.link : logo} alt="Место" />
        <h3 className="popup__image-title">{card ? card.name : 'Mesto'}</h3>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть изображение"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
