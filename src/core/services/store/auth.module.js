import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";
export const GET_AUTH_USER = "getAuthUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_JWT = "setJwt";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const state = {
  errors: {},
  user: JwtService.getUser(),
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("user/login", credentials)
        .then(({ data }) => {
          context.commit(SET_JWT, data.data.access_token);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, JSON.parse(response.data.data.message));
          reject(response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [GET_AUTH_USER](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("user/me?expand=fundSummary")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("users", { user: credentials })
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
          reject(response);
        });
    });
  },
  [UPDATE_USER](context, payload) {
    const { email, username, password, image, bio } = payload;
    const user = { email, username, bio, image };
    if (password) {
      user.password = password;
    }

    return ApiService.put("user", user).then(({ data }) => {
      context.commit(SET_AUTH, data);
      return data;
    });
  }
};

const mutations = {
  [SET_JWT](state, token) {
    JwtService.saveToken(token);
    ApiService.setHeader();
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    JwtService.saveUser(user);
    state.errors = {};
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
