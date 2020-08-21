<template>
  <div class="row mt-5" v-if="isLoaded">
    <div class="col-12">
      <div class="p-5" style="background-color: #F2F3FF">
        <p class="text-primary mb-0 font-weight-boldest ls-2">
          FUNDING HISTORY
        </p>
      </div>
    </div>
    <div class="col-12 mt-3" v-if="investments.length">
      <investment
        v-for="(investment, index) in investments"
        :key="index"
        :investment="investment"
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
  </div>
</template>

<script>
import { GET_INVESTMENTS_HISTORY } from "@/core/services/store/investments.module";
import { mapState } from "vuex";
import Investment from "@/view/content/investments/Investment.vue";

export default {
  name: "InvestmentHistory",
  data() {
    return {
      page: 1,
      isLoaded: false
    };
  },
  components: {
    Investment
  },
  computed: {
    ...mapState({
      investments: state => state.investments.history.rows,
      pagination: state => state.investments.history.pagination
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
    async loadItems() {
      await this.$store.dispatch(GET_INVESTMENTS_HISTORY, {
        per_page: 5,
        page: this.page
      });
    }
  }
};
</script>
