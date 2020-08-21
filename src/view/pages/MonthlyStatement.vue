<template>
  <div class="container-fluid mt-5" v-if="loaded">
    <div class="row">
      <div class="col-12">
        <div
          class="p-5 d-flex justify-content-between"
          style="background-color: #F2F3FF"
        >
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            MONTHLY STATEMENTS
          </p>
        </div>
      </div>
    </div>
    <div class="row mt-3 font-weight-boldest">
      <div class="col-6">Month</div>
      <div class="col-6">Action</div>
    </div>
    <hr />
    <template>
      <div
        class="row pb-3"
        v-for="(statement, index) in statements"
        :key="index"
      >
        <div class="col-6">{{ statement.label }}</div>
        <div class="col-6 d-flex">
          <div
            class="d-flex align-items-center pr-3"
            style="border-right: 1px solid rgba(0, 0, 0, 0.1)"
          >
            <a
              style="cursor: pointer"
              @click.prevent="download(statement.date, 'pdf')"
            >
              <i class="mr-2 text-primary flaticon2-download-2"></i>
              PDF
            </a>
          </div>
          <div class="d-flex align-items-center pl-3">
            <a
              style="cursor: pointer"
              @click.prevent="download(statement.date, 'html')"
            >
              <i class="mr-2 text-primary flaticon2-download-2"></i>
              HTML
            </a>
          </div>
        </div>
      </div>
    </template>
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
import ApiService from "@/core/services/api.service";

export default {
  name: "MonthlyStatement",
  data() {
    return {
      loaded: false,
      page: 1,
      statements: [],
      pagination: {}
    };
  },
  computed: {
    pages() {
      if ("totalCount" in this.pagination) {
        return Math.ceil(
          this.pagination.totalCount / this.pagination.defaultPageSize
        );
      }
      return 0;
    },
    hasPrevPage() {
      return "currentPage" in this.pagination
        ? this.pagination.currentPage > 1
        : false;
    },
    hasNextPage() {
      return "currentPage" in this.pagination
        ? this.pagination.currentPage < this.pages
        : false;
    }
  },
  async mounted() {
    this.loadItems();
    this.loaded = true;
  },
  methods: {
    download(date, type) {
      const query = type == "html" ? "html" : "pdf-base64";
      ApiService.get(`/reports/monthly-statement/${date}?type=${query}`).then(
        response => {
          const downloadLink = document.createElement("a");
          downloadLink.href = this.downloadLinkHref(response, type);
          downloadLink.download = `${date}.${type}`;
          downloadLink.click();
        }
      );
    },

    downloadLinkHref(response, type) {
      if (type == "html") {
        var blob = new Blob([response.data], { type: "text/html" });
        return window.URL.createObjectURL(blob);
      }
      return `data:application/pdf;base64,${response.data.data}`;
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
      const STATEMENTS_RESPONSE = await ApiService.get(
        `/reports/monthly-statement?'per-page'=2&page=${this.page}`
      );
      this.statements = STATEMENTS_RESPONSE.data.data.rows;

      this.pagination = STATEMENTS_RESPONSE.data.data.pagination;
      this.pagination.currentPage =
        (STATEMENTS_RESPONSE.data.data.pagination.totalCount -
          STATEMENTS_RESPONSE.data.data.pagination.firstRowNo) /
          STATEMENTS_RESPONSE.data.data.pagination.defaultPageSize +
        1;
    }
  }
};
</script>
