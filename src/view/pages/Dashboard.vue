<template>
  <v-app>
    <div class="my-10 container-fluid" v-if="isLoaded">
      <div class="row">
        <div class="col-12">
          <funds-summary />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div
            class="px-5 py-3 d-flex justify-content-between align-items-center"
            style="background-color: #f2f3ff"
          >
            <p class="text-primary mb-0 font-weight-boldest ls-2">
              LATEST AVAILABLE FUNDING
            </p>
            <select
              class="form-control"
              style="width: 150px; font-size: 14px"
              v-model="tenureRange"
              @change="updateQuery"
            >
              <option value>Filter</option>
              <option
                v-for="(filter, index) in filters"
                :key="index"
                :value="filter.value"
              >
                {{ filter.display }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-12 mt-3">
          <project
            v-for="(project, index) in projects"
            :key="index"
            :project="project"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="p-5 text-center" style="background-color: #e2f5fe">
            <router-link class="font-weight-boldest" to="/investments/available"
              >VIEW ALL</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import FundsSummary from "@/view/content/dashboard/FundsSummary.vue";
import Project from "@/view/content/projects/Project.vue";
import { GET_AUTH_USER, LOGOUT } from "@/core/services/store/auth.module";
import { GET_AVAILABLE_PROJECTS } from "@/core/services/store/projects.module";
import { mapState } from "vuex";

export default {
  components: {
    FundsSummary,
    Project
  },
  data() {
    return {
      isLoaded: false,
      tenureRange: "",
      filters: [
        { display: "0 - 14 days", value: "0-14" },
        { display: "15 - 30 days", value: "15-30" },
        { display: "31 - 45 days", value: "31-45" },
        { display: "46 - 60 days", value: "46-60" },
        { display: "61 - 75 days", value: "61-75" },
        { display: "76 - 90 days", value: "76-90" },
        { display: "91 - 105 days", value: "91-105" },
        { display: "106 - 120 days", value: "106-120" },
        { display: "121 - 135 days", value: "121-135" },
        { display: "136 - 150 days", value: "136-150" },
        { display: "151 - 166 days", value: "151-166" },
        { display: "167 - 180 days", value: "167-180" }
      ]
    };
  },
  computed: {
    ...mapState({
      projects: state => state.projects.available.rows
    })
  },
  mounted() {
    this.$store
      .dispatch(GET_AUTH_USER)
      .then(() => {
        this.$store
          .dispatch(GET_AVAILABLE_PROJECTS, { "per-page": 3 })
          .then(() => {
            this.isLoaded = true;
          });
      })
      .catch(() => {
        this.$store.dispatch(LOGOUT);
        this.$router.push({ name: "login" });
      });
  },
  methods: {
    async updateQuery() {
      const query = { "per-page": 3 };
      if (this.tenureRange) {
        query.tenure_range = this.tenureRange;
      }
      await this.$store.dispatch(GET_AVAILABLE_PROJECTS, query);
    }
  }
};
</script>
