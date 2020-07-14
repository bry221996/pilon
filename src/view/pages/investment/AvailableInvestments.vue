<template>
  <div class="row mt-5" v-if="isLoaded">
    <div class="col-12">

      <div class="p-5" style="background-color: #F2F3FF;height: 50px; ">
        <p class="text-primary mb-0 font-weight-boldest ls-2 float-left">
          LATEST AVAILABLE FUNDING
        </p>


        <select class="form-control float-right" style="width: 150px; font-size: 14px; margin-top: -11px;"> 
          <option>Filter</option>
          <option>0 - 14 days</option>  
          <option>15 - 30 days</option>  
          <option>31 - 45 days</option>  
          <option>46 - 60 days</option>  
          <option>61 - 75 days</option>  
          <option>76 - 90 days</option>  
          <option>91 - 105 days</option>  
          <option>106 - 120 days</option>  
          <option>121 - 135 days</option>  
          <option>136 - 150 days</option>  
          <option>151 - 166 days</option>  
          <option>167 - 180 days</option>  
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
  }
};
</script>
