<template>
  <div class="container-fluid mt-5" v-if="loaded">
    <div class="row">
      <div class="col-12">
        <div
          class="p-5 d-flex justify-content-between"
          style="background-color: #F2F3FF"
        >
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            AUTO INVEST RULES
          </p>
          <i
            class="flaticon-add-circular-button text-primary"
            @click="$router.push('/auto-invest/create')"
          ></i>
        </div>
      </div>
    </div>
    <div class="row mt-3 font-weight-boldest">
      <div class="col-4">Rule Name</div>
      <div class="col-2">Interest Range</div>
      <div class="col-2">Tenure Months</div>
      <div class="col-2">Maximum Allocation</div>
      <div class="col-2">Status</div>
    </div>
    <hr />

    <div class="row my-3" v-for="(rule, index) in rules" :key="index">
      <div class="col-4">
        <router-link :to="`/auto-invest/${rule.id}`">
          {{ rule.name || "N/A" }}
        </router-link>
      </div>
      <div class="col-2">
        {{ rule.min_interest }}% - {{ rule.max_interest }}%
      </div>
      <div class="col-2">
        {{ rule.min_tenure }} - {{ rule.max_tenure }} months
      </div>
      <div class="col-2">$ {{ rule.max_allocation }}</div>
      <div class="col-2" v-html="getStatusDisplay(rule.is_enabled)"></div>
    </div>

    <div class="row justify-content-center mt-10">
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_RULES } from "@/core/services/store/rules.module";

export default {
  name: "AutoInvestList",
  data() {
    return {
      page: 1,
      loaded: false
    };
  },
  computed: {
    ...mapState({
      rules: state => state.rules.list.rows,
      pagination: state => state.rules.list.pagination
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
    }
  },
  async mounted() {
    await this.loadItems();
    this.loaded = true;
  },
  methods: {
    getStatusDisplay(status) {
      return status
        ? "<span class='badge badge-success'>Enabled</span>"
        : "<span class='badge badge-warning'>Disabled</span>";
    },
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
    async loadItems() {
      await this.$store.dispatch(GET_RULES, { 'per-page': 10, page: this.page });
    }
  }
};
</script>
