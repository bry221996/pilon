<template>
  <div class="container-fluid my-10" v-if="isLoaded">
    <v-form>
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <p class="font-weight-boldest mb-0">TOP UP AMOUNT</p>
            <div class="input-amount">
              <input
                type="number"
                placeholder="0.00"
                v-model="form.amount"
                @input="calculateFee"
              />
            </div>
            <p class="text-right font-weight-boldest">{{ feeDisplay }}</p>
          </div>
        </div>
        <div class="col-2"></div>
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
      <div class="row mt-5">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="row">
                <div class="col-2 px-5 d-flex flex-column">
                  <p class="text-muted">PAYMENT METHOD</p>
                  <v-btn
                    large
                    :color="
                      form.payment_type == paymentType.value ? 'success' : ''
                    "
                    v-for="(paymentType, index) in paymentTypes"
                    :key="index"
                    class="my-1"
                    @click="changePaymentType(paymentType.value)"
                    >{{ paymentType.display }}</v-btn
                  >
                </div>
                <template v-if="form.payment_type == 6">
                  <div class="col-4 px-5">
                    <p class="text-muted">SELECT CARD</p>
                    <inline-svg
                      v-for="(creditCard, index) in creditCards"
                      :key="`cc-${index}`"
                      class="w-100"
                      src="media/pilons/pilon_credit_card.svg"
                    ></inline-svg>
                  </div>
                  <div class="col-6">
                    <p class="text-muted">CARD DETAILS</p>
                    <v-container class="py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            color="#707070"
                            :value="seletectCard.card_name"
                            readonly
                            class="pt-0"
                          >
                            <template slot="label" class="ss">
                              <p class="font-weight-boldest text-dark">
                                NAME ON CARD
                              </p>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            color="#707070"
                            readonly
                            :value="seletectCard.card_number"
                            class="pt-0"
                          >
                            <template slot="label">
                              <p class="font-weight-boldest text-dark">
                                CARD NUMBER
                              </p>
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            color="#707070"
                            readonly
                            :value="seletectCard.ccv"
                            class="pt-0"
                          >
                            <template slot="label" class="ss">
                              <p class="font-weight-boldest text-dark">CCV</p>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            class="my-0 py-1"
                            :items="months"
                            readonly
                            :value="seletectCard.month"
                            placeholder="MM"
                          >
                            <template slot="label" class="ss">
                              <p class="font-weight-boldest text-dark">Month</p>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            class="my-0 py-1"
                            :items="years"
                            readonly
                            :value="seletectCard.year"
                            placeholder="YYYY"
                          >
                            <template slot="label" class="ss">
                              <p class="font-weight-boldest text-dark">YEAR</p>
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </template>
                <div class="col-10" v-else>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="#707070"
                        v-model="form.date_transferred"
                        :label="
                          form.payment_type == 2
                            ? 'Cheque Issue Date'
                            : 'Transfer Date'
                        "
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date_transferred"
                      no-title
                      scrollable
                    ></v-date-picker>
                  </v-menu>
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-text-field
                        color="#707070"
                        class="pt-0"
                        placeholder
                        :label="
                          form.payment_type == 2
                            ? 'Cheque Number'
                            : 'Transfer No'
                        "
                        v-model="form.transfer_no"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0">
                      <v-file-input
                        v-model="form.attachment"
                        :label="
                          form.payment_type == 2
                            ? 'Screenshots of Cheque'
                            : 'Screenshots of Bank Transfer'
                        "
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <v-row class="d-flex justify-content-end">
                <v-col cols="4">
                  <v-btn
                    rounded
                    :loading="isSubmitting"
                    :disabled="!formIsValid"
                    color="primary"
                    block
                    large
                    @click="submitTopUpRequest"
                    >SAVE</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </v-form>

    <v-dialog v-model="showSuccessDialog" persistent max-width="500">
      <v-card class="py-5">
        <div
          class="d-flex justify-content-center flex-column align-items-center"
        >
          <p
            style="font-size: 1.25rem"
            class="mt-5 modal-text font-weight-boldest"
          >
            Top Up Successful
          </p>
          <p class="modal-text">
            Funds will be debited to your account between 3-5 working days
          </p>
          <inline-svg
            width="50%"
            src="media/pilons/pilon_topup_successful.svg"
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
  name: "FundsTopUp",
  data() {
    return {
      showSuccessDialog: false,
      months: [
        { value: 1, text: "January" },
        { value: 2, text: "February" },
        { value: 3, text: "March" },
        { value: 4, text: "April" },
        { value: 5, text: "May" },
        { value: 6, text: "June" },
        { value: 7, text: "July" },
        { value: 8, text: "August" },
        { value: 9, text: "September" },
        { value: 10, text: "October" },
        { value: 11, text: "November" },
        { value: 12, text: "December" }
      ],
      isLoaded: false,
      isCalculatng: false,
      isSubmitting: false,
      creditCards: [],
      paymentTypes: [
        { display: "Credit Card", value: 6 },
        { display: "Bank Transfer", value: 1 },
        { display: "Cheque", value: 2 }
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      form: {
        type: 1,
        payment_type: 6,
        date_transferred: null,
        amount: null,
        fee: 0,
        transfer_no: null,
        attachment: null
      }
    };
  },
  computed: {
    ...mapState({
      funds: state => state.auth.user.fundSummary
    }),
    formIsValid() {
      if (parseInt(this.form.payment_type) < 6) {
        return (
          !!this.form.amount &&
          !!this.form.date_transferred &&
          !!this.form.transfer_no &&
          !!this.form.attachment
        );
      }
      return this.form.amount;
    },
    seletectCard() {
      return this.creditCards[0];
    },
    years() {
      return Array.from(new Array(20), (x, i) => i + 2020);
    },
    feeDisplay() {
      return this.isCalculatng
        ? "Calculating ..."
        : `Fee: ${this.form.fee.toFixed(2)}`;
    }
  },
  mounted() {
    ApiService.get("/kyc/credit-card")
      .then(({ data }) => {
        this.creditCards = data.data.rows.map(cc => {
          cc.year = parseInt(cc.expiration_date.split("-")[0]);
          cc.month = parseInt(cc.expiration_date.split("-")[1]);
          return cc;
        });
      })
      .finally(() => (this.isLoaded = true));
  },
  methods: {
    async submitTopUpRequest() {
      this.isSubmitting = true;
      let params = Object.assign({}, this.form);

      if (this.form.payment_type < 6) {
        delete params.attachment;
        var fileFormData = new FormData();
        fileFormData.append("file", this.form.attachment);

        const FILE_RESPONSE = await ApiService.post("/file", fileFormData);

        params.attachment_id = FILE_RESPONSE.data.data.id;
      } else {
        delete params.date_transferred;
        params.additional_data = {
          cc_id: this.seletectCard.id
        };
      }

      await ApiService.post("/fund/request", params);

      this.isSubmitting = false;
      this.showSuccessDialog = true;
    },
    calculateFee() {
      if (this.form.amount) {
        this.isCalculatng = true;
        ApiService.post("/fund/request/calculate-fee", {
          amount: this.form.amount,
          type: 1
        })
          .then(({ data }) => {
            this.form.fee = data.data.fee;
          })
          .finally(() => (this.isCalculatng = false));
      }
    },
    changePaymentType(type) {
      this.form.payment_type = type;
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
