<template>
  <div class="my-10 container-fluid" v-if="isLoaded">
    <div class="row justify-content-end">
      <div class="col-12 col-lg-4 mb-2 mb-sm-0">
        <b-card bg-variant="info" text-variant="white" class="p-0">
          <div style="position: absolute; right: 0.5rem; top: 0.5rem">
            <i class="fa fa-question-circle" style="color: white"></i>
          </div>
          <b-card-title class="mb-4">
            <strong>USD {{ userFunds.available | money_format }}</strong>
          </b-card-title>
          <b-card-text>FUNDS AVAILABLE</b-card-text>
        </b-card>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <div class="p-5" style="background-color: #f2f3ff">
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            FUNDS HISTORY
          </p>
        </div>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header py-2">
            <div class="table-responsive mb-0">
              <table class="table">
                <thead>
                  <tr>
                    <td
                      width="33%"
                      v-for="(header, index) in headers"
                      :key="index"
                    >
                      <span class="font-weight-boldest">{{ header }}</span>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive" v-if="hasData">
              <table class="table table-borderless">
                <tbody>
                  <template v-for="(history, index) in histories">
                    <tr
                      :key="`date-${index}`"
                      style="background: #f7f7f7"
                      class="mx-5"
                    >
                      <td colspan="3">{{ history.date }}</td>
                    </tr>

                    <tr
                      v-for="(row, indx) in history.rows"
                      :key="`row-${indx}-date-${history.date}`"
                      class="mx-5"
                    >
                      <td class="pl-8" width="33%">
                        {{ formatDate(row.created_at) }}
                      </td>
                      <td width="33%">{{ row.description }}</td>
                      <td width="33%">{{ row.amount | money_format }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <nav class="mt-10" v-if="hasData">
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
                    <a class="page-link" @click.prevent="setPage(page)">{{
                      page
                    }}</a>
                  </li>
                </template>
                <li class="page-item" :class="hasNextPage ? '' : 'disabled'">
                  <a class="page-link" @click.prevent="nextPage">Next</a>
                </li>
              </ul>
            </nav>
            <div class="col-12 mt-3 text-center" v-if="!hasData">
              <p>* * * No data * * *</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_FUND_HISTORIES } from "@/core/services/store/funds.module";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "FundsHistory",
  data() {
    return {
      page: 1,
      isLoaded: false,
      colWidths: [30, 30, 30],
      themes: ["warning", "success", "danger"],
      headers: ["DATE", "DESCRIPTION", "AMOUNT"]
    };
  },
  computed: {
    ...mapState({
      history: state => state.funds.history,
      pagination: state => state.funds.history.pagination,
      userFunds: state => state.auth.user.fundSummary,
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
        return `page=${this.page}`;
      }
    }),
    histories() {
      return Object.keys(this.history.rows).map(date => {
        return {
          date: date,
          rows: this.history.rows[date]
        };
      });
    },
    hasData() {
      return !!Object.keys(this.history.rows).length;
    }
  },
  async mounted() {
    await this.loadItems();
    this.isLoaded = true;
  },
  methods: {
    loadItems() {
      return this.$store.dispatch(GET_FUND_HISTORIES, this.query);
    },
    formatDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD MMM YYYY");
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
    }
  }
};
</script>
