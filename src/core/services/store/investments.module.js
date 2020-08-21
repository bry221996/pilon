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
  [GET_CURRENT_INVESTMENTS](context, query = {}) {
    return new Promise((resolve, reject) => {
      let endpoint =
        "/crowd-funding/investment?expand=loan,project,companyInfo";

      Object.keys(query).forEach(key => {
        endpoint = `${endpoint}&${key}=${query[key]}`;
      });

      ApiService.get(endpoint)
        .then(({ data }) => {
          context.commit(SET_CURRENT_INVESTMENTS, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_INVESTMENTS_HISTORY](context, query = {}) {
    return new Promise((resolve, reject) => {
      let endpoint =
        "/crowd-funding/investment?expand=loan,project,companyInfo&filter=completed";

      Object.keys(query).forEach(key => {
        endpoint = `${endpoint}&${key}=${query[key]}`;
      });

      ApiService.get(endpoint)
        .then(({ data }) => {
          context.commit(SET_INVESTMENTS_HISTORY, data.data);
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
    state.current.pagination.currentPage =
      (investments.pagination.totalCount - investments.pagination.firstRowNo) /
        investments.pagination.defaultPageSize +
      1;
  },
  [SET_INVESTMENTS_HISTORY](state, investments) {
    state.history = investments;
    state.history.pagination.currentPage =
      (investments.pagination.totalCount - investments.pagination.firstRowNo) /
        investments.pagination.defaultPageSize +
      1;
  }
};

export default {
  state,
  actions,
  mutations
};
