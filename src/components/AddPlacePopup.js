import React from "react";

import PopupWithForm from './PopupWithForm';


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const[name, setName] = React.useState('');
  const[link, setLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup-form__input popup-form__input_element_title"
        id="card-title-input"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        name="place-title"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup-form__input-error card-title-input-error"></span>
      <input
        className="popup-form__input popup-form__input_element_link"
        id="card-link-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="place-link"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup-form__input-error card-link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
