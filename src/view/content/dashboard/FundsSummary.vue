<template>
  <KTCard class="shadow">
    <template v-slot:body>
      <div class="row">
        <div class="col">
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            <inline-svg
              class="mr-2"
              src="media/pilons/pilon_funds-blue.svg"
            ></inline-svg>
            YOUR OVERALL FUNDS
          </p>
        </div>
      </div>

      <!-- start:main-analytics -->
      <div class="row mt-5">
        <div
          class="col-12 col-lg-4 mb-2 mb-sm-0"
          v-for="analytics in mainAnalytics"
          :key="analytics.label"
        >
          <b-card
            :bg-variant="analytics.variant"
            text-variant="white"
            class="p-0"
          >
            <div style="position: absolute; right: 0.5rem; top: 0.5rem;">
              <i class="fa fa-question-circle" style="color: white"></i>
            </div>
            <b-card-title class="mb-4">
              <strong>USD {{ analytics.value | money_format }}</strong>
            </b-card-title>
            <b-card-text>{{ analytics.label }}</b-card-text>
          </b-card>
        </div>
      </div>
      <!-- end:main-analytics -->

      <div class="row mt-5 sub-analytics mx-0 py-5">
        <div
          class="col-12 col-lg-4 mb-2 mb-sm-0"
          v-for="analytics in subAnalytics"
          :key="analytics.label"
        >
          <div :class="analytics.class">
            <p class="mb-1 text-primary">
              <strong>{{ analytics.label }}</strong>
            </p>
            <p class="mb-0">
              <strong>{{ analytics.value }}</strong>
            </p>
          </div>
        </div>
      </div>
    </template>
  </KTCard>
</template>

<script>
import KTCard from "@/view/content/Card.vue";
import { mapState } from "vuex";

export default {
  name: "FundsSummary",
  components: {
    KTCard: KTCard
  },
  computed: {
    ...mapState({
      funds: state => state.auth.user.fundSummary
    }),
    mainAnalytics() {
      return [
        {
          label: "Funds Available",
          variant: "info",
          value: this.funds.available
        },
        {
          label: "Funds on Hold",
          variant: "warning",
          value: this.funds.on_hold
        },
        {
          label: "Invested Funds",
          variant: "success",
          value: this.funds.ongoing_investment_sum
        }
      ];
    },
    subAnalytics() {
      return [
        {
          label: "TOTAL INTEREST EARNED TILL DATE",
          class: "pl-6",
          value: `$ ${Number(this.funds.dividends.toFixed(1)).toLocaleString()}`
        },
        {
          label: "AVERAGE % RETURNS",
          class: "pl-9",
          value: this.funds.annualized_return
        },
        {
          label: "EXPECTED RETURNS THIS MONTH",
          class: "pl-12",
          value: `$ ${Number(
            this.funds.expected_next_return.toFixed(1)
          ).toLocaleString()}`
        }
      ];
    }
  }
};
</script>

<style scoped>
.sub-analytics {
  border-radius: 0.42rem;
  background-color: #e5f6ff;
}
</style>
