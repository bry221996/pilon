import ApiService from "@/core/services/api.service";

export const ADD_RULE = "addRule";
export const UPDATE_RULE = "updateRule";

export const GET_RULES = "getRules";
export const SET_RULES = "setRules";
export const GET_INDUSTRIES = "getIndustries";
export const SET_INDUSTRIES = "setIndustries";

const state = {
  industries: [],
  list: []
};

const mutations = {
  [SET_RULES](state, rules) {
    state.list = rules;
    state.list.pagination.currentPage =
      (rules.pagination.totalCount - rules.pagination.firstRowNo) /
        rules.pagination.defaultPageSize +
      1;
  },
  [SET_INDUSTRIES](state, industries) {
    state.industries = [];
    Object.keys(industries).forEach(index => {
      state.industries.push({
        key: parseInt(index),
        display: industries[index]
      });
    });
  }
};

const actions = {
  [GET_INDUSTRIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/data-list?expand=project-industries")
        .then(({ data }) => {
          context.commit(SET_INDUSTRIES, data.data["project-industries"]);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  [ADD_RULE](context, params) {
    return new Promise((resolve, reject) => {
      ApiService.post("/crowd-funding/auto-invest", params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  [GET_RULES](context, query = {}) {
    return new Promise((resolve, reject) => {
      let endpoint = "/crowd-funding/auto-invest?";

      Object.keys(query).forEach(key => {
        endpoint = `${endpoint}&${key}=${query[key]}`;
      });

      ApiService.get(endpoint)
        .then(({ data }) => {
          console.log(data.data);
          context.commit(SET_RULES, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },

  [UPDATE_RULE](context, { id, params }) {
    return new Promise((resolve, reject) => {
      ApiService.put(`/crowd-funding/auto-invest/${id}`, params)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
