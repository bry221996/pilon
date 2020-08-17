import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const GET_AUTH_USER = "getAuthUser";
export const GET_AUTH_CREDIT_CARDS = "getAuthUserCreditCards";
export const UPDATE_PROFILE = "updateProfile";
export const GET_COUNTRIES = "getCountries";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_JWT = "setJwt";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";
export const SET_CREDIT_CARDS = "setAuthUserCreditCards";
export const SET_COUNTRIES = "setCountries";

const state = {
  errors: {},
  user: JwtService.getUser(),
  isAuthenticated: !!JwtService.getToken(),
  creditCards: [],
  countries: []
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
      ApiService.get(
        "user/me?expand=fundSummary,personalInfo,residentialAddress,businessInfo,financialInfo"
      )
        .then(({ data }) => {
          context.commit(SET_AUTH, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_AUTH_CREDIT_CARDS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/kyc/credit-card")
        .then(({ data }) => {
          context.commit(SET_CREDIT_CARDS, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [UPDATE_PROFILE](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.post(
        "user/me/kyc?expand=fundSummary,personalInfo,residentialAddress,businessInfo,financialInfo",
        params
      )
        .then(({ data }) => {
          context.commit(SET_AUTH, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  [GET_COUNTRIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/data-list?expand=countries")
        .then(({ data }) => {
          context.commit(SET_COUNTRIES, data.data.countries);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_JWT](state, token) {
    state.isAuthenticated = true;
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
    JwtService.destroyUser();
  },
  [SET_CREDIT_CARDS](state, creditCards) {
    state.creditCards = creditCards;
  },
  [SET_COUNTRIES](state, countries) {
    state.countries = countries.map(country => {
      return { text: country.name, value: parseInt(country.id) };
    });
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
