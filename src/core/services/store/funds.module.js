import ApiService from "@/core/services/api.service";

export const GET_FUND_REQUESTS = "getFundRequests";
export const GET_FUND_HISTORIES = "getFundHistory";

export const SET_FUND_HISTORIES = "setFundHistory";
export const SET_FUND_REQUESTS = "setFundRequests";

const state = {
  list: [],
  history: {
    rows: []
  }
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
  },
  [GET_FUND_HISTORIES](context, query) {
    return new Promise((resolve, reject) => {
      ApiService.get(`/fund/transactions?group=month&${query}`)
        .then(({ data }) => {
          context.commit(SET_FUND_HISTORIES, data.data);
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
  },
  [SET_FUND_HISTORIES](state, history) {
    state.history = history;
    state.history.pagination.currentPage =
      (history.pagination.totalCount - history.pagination.firstRowNo) /
        history.pagination.defaultPageSize +
      1;
  }
};

export default {
  state,
  actions,
  mutations
};
