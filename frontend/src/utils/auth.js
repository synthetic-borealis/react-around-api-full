import { baseUrl, baseHeaders, routePaths } from './constants';

const _authHandleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const signup = (email, password) => {
  return fetch(`${baseUrl}${routePaths.signup}`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({email, password}),
  })
  .then(_authHandleResponse);
  // Errors/exceptions are handled in App.js
};

const signin = (email, password) => {
  return fetch(`${baseUrl}${routePaths.signin}`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify({ email, password }),
  })
  .then(_authHandleResponse);
};

const getUserData = (token) => {
  return fetch(`${baseUrl}${routePaths.userInfo}`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(_authHandleResponse);
};

const updateUserInfo = (token, { name, about }) => {
  return fetch(`${baseUrl}${routePaths.userInfo}`, {
    method: 'PATCH',
    headers: {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, about }),
  })
  .then(_authHandleResponse);
};

const updateUserAvatar = (token, avatar) => {
  return fetch(`${baseUrl}${routePaths.userAvatar}`, {
    method: 'PATCH',
    headers: {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ avatar }),
  })
  .then(_authHandleResponse);
};

const getCards = (token) => {
  return fetch(`${baseUrl}${routePaths.cards}`, {
    method: 'GET',
    headers: {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(_authHandleResponse);
};

export {
  signup,
  signin,
  getUserData,
  updateUserInfo,
  updateUserAvatar,
  getCards,
};
