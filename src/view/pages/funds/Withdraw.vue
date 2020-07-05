<template>
  <div class="container-fluid my-10">
    <div class="row justify-content-between">
      <div class="col-6">
        <div class="form-group mb-1">
          <p class="font-weight-boldest mb-0">WITHDRAW AMOUNT</p>
          <div class="input-amount">
            <input
              type="number"
              placeholder="0.00"
              v-model="amount"
              @input="calculateFee"
            />
          </div>
        </div>
        <p class="text-right font-weight-boldest">{{ feeDisplay }}</p>
      </div>
      <div class="col-12 col-lg-4 mb-2 mb-sm-0">
        <b-card bg-variant="info" text-variant="white" class="p-0">
          <div style="position: absolute; right: 0.5rem; top: 0.5rem;">
            <i class="fa fa-question-circle" style="color: white"></i>
          </div>
          <b-card-title class="mb-4">
            <strong>USD {{ funds.available }}</strong>
          </b-card-title>
          <b-card-text>FUNDS AVAILABLE</b-card-text>
        </b-card>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-6">
        <p class="font-weight-boldest mb-0 text-muted">TRANSFER TO</p>
        <p class="font-weight-boldest">
          Bank Account no. {{ businessInfo.bank.account_number }}
        </p>
        <v-btn
          :disabled="!!!amount"
          color="primary"
          block
          large
          @click="submitFundRequest"
          >SUBMIT</v-btn
        >
      </div>
      <div class="col-4">
        <inline-svg
          class="w-100"
          src="media/pilons/pilon_withdrawal.svg"
        ></inline-svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ApiService from "@/core/services/api.service";
export default {
  name: "FundsWithdraw",
  data() {
    return {
      amount: null,
      isCalculatng: false,
      fee: 0
    };
  },
  computed: {
    ...mapState({
      funds: state => state.auth.user.fundSummary,
      businessInfo: state => state.auth.user.businessInfo
    }),
    feeDisplay() {
      return this.isCalculatng
        ? "Calculating ..."
        : `Fee: ${this.fee.toFixed(2)}`;
    },
    params() {
      return {
        amount: this.amount,
        type: 2
      };
    }
  },
  methods: {
    submitFundRequest() {
      ApiService.post("/fund/request", {
        amount: this.amount,
        fee: this.fee,
        type: 2,
        transfer_no: this.businessInfo.bank.account_number
      }).then(() => this.$router.push("/funds/overview"));
    },
    calculateFee() {
      if (this.amount) {
        this.isCalculatng = true;
        ApiService.post("/fund/request/calculate-fee", this.params)
          .then(({ data }) => {
            this.fee = data.data.fee;
          })
          .finally(() => (this.isCalculatng = false));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.input-amount {
  border-bottom: 1px solid #737373;
  input {
    outline: 0;
    font-size: 3rem;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
