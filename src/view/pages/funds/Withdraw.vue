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
            <strong>USD {{ funds.available | money_format }}</strong>
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
          :loading="isSubmiting"
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

    <v-dialog v-model="showSuccessDialog" persistent max-width="500">
      <v-card class="py-5">
        <div
          class="d-flex justify-content-center flex-column align-items-center"
        >
          <p
            style="font-size: 1.25rem"
            class="mt-5 modal-text font-weight-boldest"
          >
            Withdrawal Successful
          </p>
          <p class="modal-text">
            Funds will be debited to your account between 3-5 working days
          </p>
          <inline-svg
            width="50%"
            src="media/pilons/pilon_widrawal successful.svg"
          ></inline-svg>
          <v-btn
            style="text-transform: none"
            color="primary"
            squared
            @click="$router.push('/funds/overview')"
            >View Funds</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ApiService from "@/core/services/api.service";
export default {
  name: "FundsWithdraw",
  data() {
    return {
      showSuccessDialog: false,
      amount: null,
      isCalculatng: false,
      isSubmiting: false,
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
      this.isSubmiting = true;
      ApiService.post("/fund/request", {
        amount: this.amount,
        fee: this.fee,
        type: 2,
        transfer_no: this.businessInfo.bank.account_number
      })
        .then(() => (this.showSuccessDialog = true))
        .finally(() => (this.isSubmiting = false));
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
.modal-text {
  color: #1d8cc6 !important;
}
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
