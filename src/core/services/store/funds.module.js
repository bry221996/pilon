import ApiService from "@/core/services/api.service";

export const GET_FUND_REQUESTS = "getFundRequests";

export const SET_FUND_REQUESTS = "setFundRequests";

const state = {
  list: []
};

const actions = {
  [GET_FUND_REQUESTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/fund/request")
        .then(({ data }) => {
          context.commit(SET_FUND_REQUESTS, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_FUND_REQUESTS](state, projects) {
    state.list = projects;
  }
};

export default {
  state,
  actions,
  mutations
};
