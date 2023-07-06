import React, { useEffect } from 'react'; // импорт библиотеки
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from './ImagePopup.js';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import * as auth from '../utils/auth.js';
import InfooToolTip from './InfoToolTip.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const navigate = useNavigate();
  const [isOpenError, setIsOpenError] = React.useState(false);
  const [isOpenCurrent, setIsOpenCurrent] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setIsLoggedIn] = React.useState(false)
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('');

  useEffect(() => {
    api.loadingCard()
      .then((res) => {
        setCards(res)
      })
      .catch(error => console.log(error))
  },
    [])

  useEffect(() => {
    api.loadingUserInfo()
      .then((res) => {
        if (res) {
          setCurrentUser(res);
        }
      })
  },
    [])

  //Проверка токена
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      auth.checkToken(token)
        .then((res) => {
          console.log(res)
          setUserEmail(res.email)
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
    [])

  function handleUpdateUser(name, about) {
    api.refreshProfileData(name, about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsOpenError(false);
    setIsOpenCurrent(false);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => {
        console.log(state.data)
        // state.data.map((c) => c._id === card._id ? newCard : c)
      });

    })
      .catch(error => console.log(error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => {
          return c.data._id !== card._id
        }))
      })
      .catch(error => console.log(error))
  }

  function handleUpdateAvatar(url) {
    api.changeAvatar(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCardOnServer(name, link)
      .then((newCard) => {
        console.log(cards, newCard)
        setCards([...cards, { newCard }]);
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  const onRegister = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        setIsOpenCurrent(true);
        navigate('/sign-in');

      })
      .catch((err) => {
        console.log(err)
        setIsOpenError(true)
      })
  }

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token)
        setIsLoggedIn(true);
        navigate('/', { replace: true })
        //Устанавливаем email для дальнейшего использования в профиле
        setUserEmail(email)
      })
      .catch((err) => {
        console.log(err);
        setIsOpenError(true)
      })
  }

  const signOut = () => {
    setIsLoggedIn(false)
    setUserEmail(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    if (loggedIn === true) {
      navigate('/')
    }
  }, [loggedIn, navigate])



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Routes>
            <Route path='/' element={
              <>
                <Header onClick={signOut} email={userEmail} title='Выйти' link='/sign-up' />
                <ProtectedRoute element={Main} loggedIn={loggedIn} onCardDelete={handleCardDelete} cards={cards} onCardLike={handleCardLike} onCardClick={handleCardClick} EditAvatarClick={handleEditAvatarClick} AddPlaceClick={handleAddPlaceClick} EditProfileClick={handleEditProfileClick} />
              </>
            } />
            <Route path='/sign-in' element={
              <>
                <Header title='Регистрация' link='/sign-up' />
                <Login onLogin={onLogin} />
              </>
            } />
            <Route path='/sign-up' element={
              <>
                <Header title='Вход' link='/sign-in' />
                <Register onRegister={onRegister} />
              </>
            } />
          </Routes>
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} closeAllPopups={closeAllPopups} isOpen={isEditProfilePopupOpen}></EditProfilePopup>
          <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} closeAllPopups={closeAllPopups} ></AddPlacePopup>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} />
          <PopupWithForm btnText="Да" name="delete" title="Вы уверены?" >

          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}>

          </ImagePopup>
          <InfooToolTip onClose={closeAllPopups} isOpenCurrent={isOpenCurrent} isOpenError={isOpenError} />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
