import ApiService from "@/core/services/api.service";

export const GET_NOTIFICATIONS = "getNotifications";
export const GET_ACTIVITIES = "getActivities";

export const SET_NOTIFICATIONS = "setNotifications";
export const SET_ACTIVITIES = "setActivities";

const state = {
  notifications: [],
  activities: []
};

const actions = {
  [GET_NOTIFICATIONS](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/notification/message?tab_id=1")
        .then(({ data }) => {
          context.commit(SET_NOTIFICATIONS, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  [GET_ACTIVITIES](context) {
    return new Promise((resolve, reject) => {
      ApiService.get("/notification/message?tab_id=2")
        .then(({ data }) => {
          context.commit(SET_ACTIVITIES, data.data.rows);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  }
};

const mutations = {
  [SET_NOTIFICATIONS](state, notifications) {
    state.notifications = notifications;
  },
  [SET_ACTIVITIES](state, activities) {
    state.activities = activities;
  }
};

export default {
  state,
  actions,
  mutations
};
