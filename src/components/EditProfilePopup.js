import { useContext, useEffect, useState } from 'react';

import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description , setDescription] = useState(currentUser.about);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser.name, currentUser.about]);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser.name, currentUser.about]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup-form__input popup-form__input_element_name"
        id="name-input"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        name="profile-name"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup-form__input-error name-input-error"></span>
      <input
        className="popup-form__input popup-form__input_element_description"
        id="description-input"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        name="profile-description"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup-form__input-error description-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
