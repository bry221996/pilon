<template>
  <div class="row mt-5" v-if="isLoaded">
    <div class="col-12">
      <div class="p-5" style="background-color: #F2F3FF;height: 50px; ">
        <p class="text-primary mb-0 font-weight-boldest ls-2 float-left">
          LATEST AVAILABLE FUNDING
        </p>

        <select
          class="form-control float-right"
          style="width: 150px; font-size: 14px; margin-top: -11px;"
          v-model="tenureRange"
          @change="updateQuery"
        >
          <option value="">Filter</option>
          <option
            v-for="(filter, index) in filters"
            :key="index"
            :value="filter.value"
            >{{ filter.display }}</option
          >
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
</template>

<script>
import { GET_AVAILABLE_PROJECTS } from "@/core/services/store/projects.module";
import { mapState } from "vuex";
import Project from "@/view/content/projects/Project.vue";

export default {
  name: "AvailableInvestments",
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
  components: {
    Project
  },
  computed: {
    ...mapState({
      projects: state => state.projects.available
    })
  },
  async mounted() {
    await this.$store.dispatch(GET_AVAILABLE_PROJECTS);
    this.isLoaded = true;
  },
  methods: {
    async updateQuery() {
      if (this.tenureRange) {
        await this.$store.dispatch(
          GET_AVAILABLE_PROJECTS,
          `tenure_range=${this.tenureRange}`
        );
      }
    }
  }
};
</script>
