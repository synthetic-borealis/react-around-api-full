// Components
import { Route, Switch, useHistory } from 'react-router-dom';
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

// Misc. Utils
import api from '../utils/api';
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
  const [currentUserInfo, setCurrentUserInfo] = React.useState({}); // Temporary while the old API is still in use
  const currentUserEmail = currentUserInfo.email ? currentUserInfo.email : '';

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

  const history = useHistory();

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
    api.updateUserInfo(user)
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch(console.log);
  }

  function handleUpdateAvatar({avatar}) {
    api.updateUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(console.log);
  }

  function handleAddPlaceSubmit(card) {
    return api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
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

  function handleLogin({email, password}) {
    auth.signin(email, password)
      .then((loginRes) => {
        if (loginRes.token) {
          localStorage.setItem('jwt', loginRes.token);
          setJwt(loginRes.token);
          setCurrentUserInfo({email})
          setIsLoggedIn(true);
          history.push(routePaths.root);
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
  }

  function verifyLocallyStoredToken() {
    // Ensure locally stored token is valid
    if (jwt.length > 0) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setCurrentUserInfo(res.data);
            setIsLoggedIn(true);
            history.push(routePaths.root);
          } else {
            localStorage.removeItem('jwt');
            setJwt('');
          }
        })
        .catch(console.log);
    }
  }

  function getInitialCardData() {
    api.getInitialCards()
    .then((initialCards) => setCards([...initialCards]))
    .catch(console.log);
  }

  function getUserData() {
    api.getUserData().then(setCurrentUser).catch(console.log);
  }

  React.useEffect(() => {
    verifyLocallyStoredToken();

    // Ensure API request for user information & cards data is only made once
    getInitialCardData();
    getUserData();

    // eslint warns about missing dependencies that don't seem to be
    // neccessary for this hook to work.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-container">
        <Switch>
          <ProtectedRoute path={routePaths.logout} isLoggedIn={isLoggedIn}>
            <Logout onLogout={() => handleLogout()} isLoggedIn={isLoggedIn} history={history} />
          </ProtectedRoute>
          <Route path={routePaths.signin}>
            <Header linkText="Sign up" linkPath={routePaths.signup} currentScreen="login" />
            <Login onSubmit={handleLogin} />
          </Route>
          <Route path={routePaths.signup}>
            <Header linkText="Log in" linkPath={routePaths.signin} currentScreen="signup" />
            <Register onSubmit={handleRegister} />
          </Route>
          <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>
            <Header linkText="Log Out" linkPath={routePaths.logout} currentScreen="main" userEmail={currentUserEmail} />
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
        </Switch>

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
