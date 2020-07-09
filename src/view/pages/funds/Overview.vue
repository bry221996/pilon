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
            FUNDS OVERVIEW
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
                      v-for="(header, index) in headers"
                      :key="index"
                      :width="`${colWidths[index]}%`"
                    >
                      <span class="font-weight-boldest">{{ header }}</span>
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div class="card-body py-2">
            <div class="table-responsive">
              <table class="table table-borderless">
                <tbody>
                  <tr v-for="(fund, index) in funds" :key="index">
                    <td width="14%">
                      <div
                        class="btn btn-sm rounded-0"
                        :class="`btn-${themes[fund.status]}`"
                      >
                        {{ fund.status_label }}
                      </div>
                    </td>
                    <td width="14%">{{ fund.reference_no }}</td>
                    <td width="14%">{{ fund.created_at }}</td>
                    <td width="30%">{{ fund.description }}</td>
                    <td width="14%">${{ fund.amount | money_format }}</td>
                    <td width="14%">
                      <inline-svg
                        style="width: 2rem"
                        src="media/pilons/pilon_actions.svg"
                      ></inline-svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FundsSummary from "@/view/content/dashboard/FundsSummary.vue";
import { GET_FUND_REQUESTS } from "@/core/services/store/funds.module";
import { mapState } from "vuex";

export default {
  name: "FundsOverview",
  components: {
    FundsSummary
  },
  data() {
    return {
      isLoaded: false,
      colWidths: [14, 14, 14, 30, 14, 14, 14],
      themes: ["warning", "success", "danger"],
      headers: ["STATUS", "REF NO", "DATE", "DESCRIPTION", "AMOUNT", "ACTIONS"]
    };
  },
  computed: {
    ...mapState({
      funds: state => state.funds.list
    })
  },
  async mounted() {
    await this.$store.dispatch(GET_FUND_REQUESTS);
    this.isLoaded = true;
  }
};
</script>
