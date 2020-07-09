import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import htmlClass from "./htmlclass.module";
import config from "./config.module";
import breadcrumbs from "./breadcrumbs.module";
import investments from "./investments.module";
import projects from "./projects.module";
import funds from "./funds.module";
import rules from "./rules.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlClass,
    config,
    breadcrumbs,
    investments,
    projects,
    funds,
    rules
  }
});
