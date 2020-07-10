import ApiService from "@/core/services/api.service";

export const GET_CURRENT_INVESTMENTS = "getCurrentInvestments";
export const GET_INVESTMENTS_HISTORY = "getInvestmentsHistory";

export const SET_CURRENT_INVESTMENTS = "setCurrentInvestments";
export const SET_INVESTMENTS_HISTORY = "setInvestmentsHistory";


const state = {
  current: [],
  history: []
};

const actions = {
  [GET_CURRENT_INVESTMENTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get(
        "/crowd-funding/investment?expand=loan,project,companyInfo"
      )
        .then(({ data }) => {
          context.commit(SET_CURRENT_INVESTMENTS, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_INVESTMENTS_HISTORY](context) {
    return new Promise((resolve, reject) => {
      ApiService.get(
        "/crowd-funding/investment?expand=loan,project,companyInfo&filter=completed"
      )
        .then(({ data }) => {
          context.commit(SET_INVESTMENTS_HISTORY, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_CURRENT_INVESTMENTS](state, investments) {
    state.current = investments;
  },
  [SET_INVESTMENTS_HISTORY](state, investments) {
    state.history = investments;
  }
};

export default {
  state,
  actions,
  mutations
};
