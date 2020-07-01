import ApiService from "@/core/services/api.service";

export const GET_CURRENT_INVESTMENTS = "getCurrentInvestments";

export const SET_CURRENT_INVESTMENTS = "setCurrentInvestments";

const state = {
  current: []
};

const actions = {
  [GET_CURRENT_INVESTMENTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/crowd-funding/investment?expand=loan,project,user")
        .then(({ data }) => {
          context.commit(SET_CURRENT_INVESTMENTS, data.data.rows);
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
  }
};

export default {
  state,
  actions,
  mutations
};
