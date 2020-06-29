import ApiService from "@/core/services/api.service";

export const GET_INVESTMENTS = "getInvestments";

export const SET_INVESTMENTS = "setInvestments";

const state = {
  list: []
};

const actions = {
  [GET_INVESTMENTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("crowd-funding/project?expand=loan,companyInfo")
        .then(({ data }) => {
          context.commit(SET_INVESTMENTS, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_INVESTMENTS](state, investments) {
    state.list = investments;
  }
};

export default {
  state,
  actions,
  mutations
};
