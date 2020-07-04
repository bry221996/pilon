const ID_TOKEN_KEY = "id_token";
const ID_USER_KEY = "auth_user";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export const destroyUser = () => {
  window.localStorage.removeItem(ID_USER_KEY);
};

export const saveUser = user => {
  window.localStorage.setItem(ID_USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(ID_USER_KEY)) || {};
};

export default {
  getToken,
  saveToken,
  destroyToken,
  saveUser,
  getUser,
  destroyUser
};
