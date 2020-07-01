import ApiService from "@/core/services/api.service";

export const GET_AVAILABLE_PROJECTS = "getAvailableProjects";

export const SET_AVAILABLE_PROJECTS = "setAvailableProjects";

const state = {
  available: []
};

const actions = {
  [GET_AVAILABLE_PROJECTS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("crowd-funding/project?expand=loan,companyInfo&per_page=2")
        .then(({ data }) => {
          context.commit(SET_AVAILABLE_PROJECTS, data.data.rows);
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
  }
};

export default {
  state,
  actions,
  mutations
};
