<template>
  <div class="my-10 container-fluid" v-if="isLoaded">
    <div class="row">
      <div class="col-12">
        <funds-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="p-5" style="background-color: #F2F3FF">
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            LATEST AVAILABLE INVESTMENTS
          </p>
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
        <div class="p-5 text-center" style="background-color: #E2F5FE">
          <p class="text-info mb-0 font-weight-boldest">VIEW ALL</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FundsSummary from "@/view/content/dashboard/FundsSummary.vue";
import Project from "@/view/content/projects/Project.vue";
// import { GET_AUTH_USER } from "@/core/services/store/auth.module";
import { GET_AVAILABLE_PROJECTS } from "@/core/services/store/projects.module";
import { mapState } from "vuex";

export default {
  components: {
    FundsSummary,
    Project
  },
  data() {
    return {
      isLoaded: false
    }
  },
  computed: {
    ...mapState({
      projects: state => state.projects.available
    })
  },
  async mounted() {
     await this.$store.dispatch(GET_AVAILABLE_PROJECTS);
     this.isLoaded = true;
  }
};
</script>
