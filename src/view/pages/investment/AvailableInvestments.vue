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
          @change="updateFilter"
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
    <div class="col-12 mt-3" v-if="projects.length">
      <project
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />

      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="hasPrevPage ? '' : 'disabled'">
            <a class="page-link" @click.prevent="prevPage">Previous</a>
          </li>
          <template v-for="page in pages">
            <li
              class="page-item"
              :key="page"
              :class="page == pagination.currentPage ? 'active' : ''"
            >
              <a class="page-link" @click.prevent="setPage(page)">{{ page }}</a>
            </li>
          </template>
          <li class="page-item" :class="hasNextPage ? '' : 'disabled'">
            <a class="page-link" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="col-12 mt-3 text-center" v-if="!projects.length">
      <p>* * * No available fundings * * *</p>
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
      page: 1,
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
      projects: state => state.projects.available.rows,
      pagination: state => state.projects.available.pagination
    }),
    pages() {
      return Math.ceil(
        this.pagination.totalCount / this.pagination.defaultPageSize
      );
    },
    hasPrevPage() {
      return this.pagination.currentPage > 1;
    },
    hasNextPage() {
      return this.pagination.currentPage < this.pages;
    },
    query() {
      let query = { page: this.page, 'per-page': 5 };
      if (this.tenureRange) {
        query.tenure_range = this.tenureRange;
      }
      return query;
    }
  },
  async mounted() {
    await this.loadItems();
    this.isLoaded = true;
  },
  methods: {
    setPage(page) {
      this.page = page;
      this.loadItems();
    },
    nextPage() {
      this.page = this.page + 1;
      this.loadItems();
    },
    prevPage() {
      this.page = this.page - 1;
      this.loadItems();
    },
    updateFilter() {
      this.page = 1;
      this.loadItems();
    },
    async loadItems() {
      await this.$store.dispatch(GET_AVAILABLE_PROJECTS, this.query);
    }
  }
};
</script>

<style scoped>
.page-item {
  cursor: pointer;
}
</style>
