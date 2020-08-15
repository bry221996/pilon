import ApiService from "@/core/services/api.service";

export const ADD_RULE = "addRule";
export const UPDATE_RULE = "updateRule";

export const GET_RULES = "getRules";
export const SET_RULES = "setRules";
export const GET_INDUSTRIES = "getIndustries";
export const SET_INDUSTRIES = "setIndustries";

const state = {
  industries: [
    "Professional Services",
    "Health and Medical",
    "Construction",
    "Marine and Shipping",
    "Arts, Entetainment, and Recreation",
    "Training and Education",
    "Science and Techno;ogy",
    "Whalesale and Retail Trade",
    "Transport, Storage, and logistic",
    "Tourism",
    "Manufacturing and Engineering",
    "Food and Beverage",
    "Information and Technology",
    "Marketing and Communication",
    "Apparels",
    "Oil and Gas"
  ],
  list: []
};

const mutations = {
  [SET_RULES](state, rules) {
    state.list = rules;
  },
  [UPDATE_RULE](state, rule) {
    const index = state.list.findIndex(r => r.id == rule.id);
    state.list[index] = rule;
  },
  [SET_INDUSTRIES](state, industries) {
    state.industries = [];
    Object.keys(industries).forEach(index => {
      state.industries.push({ key: parseInt(index), display: industries[index] })
    });
  }
};

const actions = {
  [GET_INDUSTRIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/data-list?expand=project-industries")
        .then(({ data }) => {
          context.commit(SET_INDUSTRIES, data.data['project-industries']);
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

  [GET_RULES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/crowd-funding/auto-invest")
        .then(({ data }) => {
          context.commit(SET_RULES, data.data.rows);
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
