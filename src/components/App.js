import React from 'react';
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";

import '../index.css';
import api from "../utils/Api";
import { getContent } from '../utils/Auth';
import { CurrentUserContext, defaultUser } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithAlert from './PopupWithAlert';
import Login from './Login';
import Register from './Register';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isRegsPopupOpen, setIsRegsPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [alertPopupResult, setAlertPopupResult] = React.useState(false);
  const [alertPopupText, setAlertPopupText] = React.useState('');
  const navigate = useNavigate();

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

  React.useEffect(() => {
    tokenCheck();
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

  function handelRegsResult(result, text) {
    setAlertPopupResult(result);
    setAlertPopupText(text);
    setIsRegsPopupOpen(true);
  }

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setSelectedCard(null);
    setIsRegsPopupOpen(false);
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

  function handleLogin() {
    tokenCheck();
  }

  function handleLogout() {
    setLoggedIn(false);
    setEmail('');
    navigate('/');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getContent(jwt).then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        }
      })
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onHandleLogout={handleLogout}/>
        <Routes>
          <Route path='/' element={loggedIn ?
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            /> : <Navigate to="./sign-in" />
          }/>
          <Route path="/sign-in" element={
            <Login onHandleLogin={handleLogin} />
          } />
          <Route path="/sign-up" element={
            <Register onHandelRegsResult={handelRegsResult}/>
          } />
          <Route path="/*" element={
            <Navigate to="./sign-in" />
          }/>
        </Routes>
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
        <PopupWithAlert
          isOpen={isRegsPopupOpen}
          onClose={closeAllPopup}
          result={alertPopupResult}
          text={alertPopupText}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
