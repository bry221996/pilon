import ApiService from "@/core/services/api.service";

export const GET_AVAILABLE_PROJECTS = "getAvailableProjects";

export const SET_AVAILABLE_PROJECTS = "setAvailableProjects";

const state = {
  available: [],
  pagination: {}
};

const actions = {
  [GET_AVAILABLE_PROJECTS](context, query = {}) {
    return new Promise((resolve, reject) => {
      let endpoint =
        "crowd-funding/project?expand=loan,companyInfo,invoice&filter=available";

      Object.keys(query).forEach(key => {
        endpoint = `${endpoint}&${key}=${query[key]}`;
      });

      ApiService.get(endpoint)
        .then(({ data }) => {
          context.commit(SET_AVAILABLE_PROJECTS, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_AVAILABLE_PROJECTS](state, projects) {
    state.available = projects;
    state.available.pagination.currentPage =
      (projects.pagination.totalCount - projects.pagination.firstRowNo) /
        projects.pagination.defaultPageSize +
      1;
  }
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
};
