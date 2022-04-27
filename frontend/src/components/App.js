// Components
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';

// Contexts
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// API requests
import * as auth from '../utils/auth';

// Constants
import {
  routePaths,
  popupTransitionDuration,
  tooltipMessages
} from '../utils/constants';

import React from 'react';

function App() {
  const [jwt, setJwt] = React.useState(localStorage.getItem('jwt') ? localStorage.getItem('jwt') : '');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [currentTooltip, setCurrentTooltip] = React.useState({message: '', isSuccessful: true});
  const [selectedCard, setSelectedCard] = React.useState({});

  const navigate = useNavigate();

  function closeAllPopups() {
    setIsTooltipOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    // Ensure visitors don't notice the image popup resetting
    setTimeout(() => {
      setSelectedCard({});
    }, popupTransitionDuration);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(user) {
    auth.updateUserInfo(jwt, user)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar({avatar}) {
    auth.updateUserAvatar(jwt, avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    auth.setCardLikeStatus(jwt, card._id, !isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res.data : c));
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit(card) {
    return auth.addCard(jwt, card)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    auth.removeCard(jwt, card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.log);
  }

  function handleRegister({email, password}) {
    auth.signup(email, password)
      .then((res) => {
        if (res.data) {
          setCurrentTooltip({message: tooltipMessages.success, isSuccessful: true});
        } else {
          throw new Error(`Registration error: response was ${res}`);
        }
      })
      .catch((err) => {
        console.log(err);
        setCurrentTooltip({message: tooltipMessages.error, isSuccessful: false});
      })
      .finally(() => setIsTooltipOpen(true));
  }

  function getCards(token) {
    auth.getCards(token)
      .then((res) => setCards([...res.data]))
      .catch(console.log);
  }

  function handleLogin({email, password}) {
    auth.signin(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setJwt(res.token);
          setIsLoggedIn(true);
          auth.getUserData(res.token)
            .then((user) => {
              setCurrentUser(user.data);
              getCards(res.token);
              navigate(routePaths.root);
            });
        } else {
          throw new Error(`Login error`);
        }
      })
      .catch((err) => {
        console.log(err);
        setCurrentTooltip({message: tooltipMessages.badLogin, isSuccessful: false});
        setIsTooltipOpen(true);
      });
  }

  React.useEffect(() => {
    const closeWhenEscPressesd = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeWhenEscPressesd);

    return () => document.removeEventListener('keydown', closeWhenEscPressesd);
  }, []);

  function handleLogout() {
    // Placeholder route for testing purposes
    // a proper route should also inform the server.
    localStorage.removeItem('jwt');
    setJwt('');
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
  }

  React.useEffect(() => {
    // Ensure locally stored token is valid
    if (jwt.length > 0) {
      auth.getUserData(jwt)
        .then((res) => {
          if (res.data) {
            setCurrentUser(res.data);
            getCards(jwt);
            setIsLoggedIn(true);
            navigate(routePaths.root);
          } else {
            localStorage.removeItem('jwt');
            setJwt('');
          }
        })
        .catch(console.log);
    }

    // eslint warns about missing dependencies that don't seem to be
    // neccessary for this hook to work.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-container">
        <Routes>
          <Route path={routePaths.logout} element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Logout onLogout={() => handleLogout()} isLoggedIn={isLoggedIn} navigate={navigate} />
            </ProtectedRoute>
          }/>
          <Route path={routePaths.signin} element={
            <>
              <Header linkText="Sign up" linkPath={routePaths.signup} currentScreen="login" />
              <Login onSubmit={handleLogin} />
            </>
          } />
          <Route path={routePaths.signup} element={
            <>
              <Header linkText="Log in" linkPath={routePaths.signin} currentScreen="signup" />
              <Register onSubmit={handleRegister} />
            </>
          } />
          <Route path="/" element={
            <>
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header linkText="Log Out" linkPath={routePaths.logout} currentScreen="main" userEmail={currentUser.email} />
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />

              </ProtectedRoute>
            </>
          } />
        </Routes>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUserUpdate={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name="confirm" title="Are you sure?" buttonCaption="Yes" onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isTooltipOpen} onClose={closeAllPopups} tooltip={currentTooltip} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
