import React from 'react';

import '../index.css';
import api from "../utils/Api";
import { CurrentUserContext, defaultUser } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then(userInfo => {
      setCurrentUser(userInfo);
    })
    .catch(err => {
      console.log(`Ошибка получения данных пользователя: ${err}`);
    })
  }, []);

  React.useEffect(() => {
    api.getCards()
    .then(cards => {
      setCards(cards);
    })
    .catch(err => {
      console.log(`Ошибка получения карточки места: ${err}`);
    })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({name, about}) {
    api.updateUserInfo({name, about})
    .then(newUserInfo => {
      setCurrentUser(newUserInfo);
      closeAllPopup();
    })
    .catch(err => {
      console.log(`Ошибка обновления данных пользователя: ${err}`);
    })
  }

  function handleUpdateAvatar({avatar}) {
    api.updateUserAvatar({avatar})
    .then(newUserInfo => {
      setCurrentUser(newUserInfo);
      closeAllPopup();
    })
    .catch(err => {
      console.log(`Ошибка обновления аватара пользователя: ${err}`);
    })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.createCard({name, link})
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopup();
    })
    .catch(err => {
      console.log(`Ошибка создания новой карточки: ${err}`);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(`Ошибка обновления состояния кнопки лайк: ${err}`);
    })
  }

  function handleCardDelete(card) {
    if (card.owner._id === currentUser._id) {
      api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.log(`Ошибка удаления карточки: ${err}`);
      })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        >
        </EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        >
        </AddPlacePopup>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
        />
        <PopupWithForm
          title="Вы уверены?"
          name="delete-place"
          buttonText="Да"
          onClose={closeAllPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
