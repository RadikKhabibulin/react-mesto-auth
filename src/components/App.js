import { useState, useEffect} from 'react';
import { Route, Navigate, Routes, useNavigate } from "react-router-dom";

import '../index.css';
import api from "../utils/Api";
import { login, register, getContent } from '../utils/Auth';
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
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isRegsPopupOpen, setIsRegsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [alertPopupResult, setAlertPopupResult] = useState({ result: false, text: ''});
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn)
      return

    api.getUserInfo()
    .then(userInfo => {
      setCurrentUser(userInfo);
    })
    .catch(err => {
      console.log(`Ошибка получения данных пользователя: ${err}`);
    });

    api.getCards()
    .then(cards => {
      setCards(cards);
    })
    .catch(err => {
      console.log(`Ошибка получения карточки места: ${err}`);
    })
  }, [loggedIn]);

  useEffect(() => {
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

  function handelRegsOrLoginResult(result) {
    setAlertPopupResult(result);
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

  function handleLogin(email, password) {
    login(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        tokenCheck();
      }
    })
    .catch((err) => {
      handelRegsOrLoginResult({
        result: false,
        text: 'Что-то пошло не так! Попробуйте ещё раз.'
      });
      if (err === 400)
        console.log(`Не передано одно из полей. Код ошибки: ${err}`);
      else if (err === 401)
        console.log(`Пользователь с таким email не найден! Код ошибки: ${err}`);
      else
        console.log('Что-то пошло не так! Попробуйте еще раз.');
    });
  }

  function handleRegister(email, password) {
    register(email, password)
    .then(() => {
      handelRegsOrLoginResult({
        result: true,
        text: 'Вы успешно зарегистрировались!'
      });
      navigate('/sign-in');
    })
    .catch((err) => {
      handelRegsOrLoginResult({
        result: false,
        text: 'Что-то пошло не так! Попробуйте ещё раз.'
      });
      if (err === 400)
        console.log(`Некорректно заполнено одно из полей. Код ошибки: ${err}`);
      else
        console.log(`Ошибка при регистрации. Код ошибки: ${err}`);
    })
  }

  function handleLogout() {
    setLoggedIn(false);
    setEmail('');
    navigate('/');
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getContent(jwt)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/');
        }
      })
      .catch(err => {
        if (err === 400)
          console.log(`Токен не передан или передан не в том формате. Код ошибки: ${err}`);
        else if (err === 401)
          console.log(`Переданный токен некорректен. Код ошибки: ${err}`);
        else
          console.log(`Что-то пошло не так. Код ошибки: ${err}`);
      });
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={email} onHandleLogout={handleLogout}/>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={
            <Login onHandleLogin={handleLogin} />
          } />
          <Route path="/sign-up" element={
            <Register onHandelRegister={handleRegister}/>
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
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
