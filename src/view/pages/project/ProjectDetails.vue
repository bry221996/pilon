<template>
  <v-app>
    <div class="container-fluid my-10" v-if="isLoaded">
      <div class="row">
        <div class="col-12">
          <table class="table">
            <tr class="pb-3">
              <td class="pl-0" style="border-top: none" width="15%">
                <b-img
                  :src="project.companyInfo.photo"
                  fluid
                  alt="Fluid image"
                ></b-img>
              </td>
              <td style="border-top: none" width="20%">
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">COMPANY</p>
                  <p>{{ project.companyInfo.company_name || "N/A" }}</p>
                </div>
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">INVOICE DUE</p>
                  <p>{{ project.invoice.due_date }}</p>
                </div>
              </td>
              <td style="border-top: none" width="26%">
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">BUYER</p>
                  <p>{{ project.invoice.buyer.companyInfo.name || "N/A" }}</p>
                </div>
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">RETURNS</p>
                  <p>{{ project.returns }} % P.A.</p>
                </div>
              </td>
              <td style="border-top: none" width="23%">
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">TOTAL INVOICE AMOUNT</p>
                  <p>${{ project.invoice.total_amount | money_format }}</p>
                </div>
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">TENURE</p>
                  <p>{{ project.loan.tenure_label }}</p>
                </div>
              </td>
              <td style="border-top: none" width="16%">
                <p>Purchaser Profile</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 px-0 py-0 d-flex flex-row justify-content-between"
          style="background-color: #1d8cc61c; border: 1px dashed #1d8cc6"
        >
          <div
            class="flex-grow-1 py-6 px-6"
            style="background-color: #1d31c6; color: white"
          >
            <h4 class="card-title mb-4">
              <strong>USD {{ funds.available | money_format }}</strong>
            </h4>
            <p class="card-text">Funds Available</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong>USD {{ project.goal_amount | money_format }}</strong>
            </h4>
            <p class="card-text">Funding Amount</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong>USD {{ project.loan.interest | money_format }}</strong>
            </h4>
            <p class="card-text">Expected Returns</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong>{{ project.invoice.due_date }}</strong>
            </h4>
            <p class="card-text">Estimated Payment Date</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong
                >USD {{ project.available_funding_left | money_format }}</strong
              >
            </h4>
            <p class="card-text">Available Funding Left</p>
          </div>
          <div
            class="px-10 flex-column d-flex align-items-center justify-content-center"
          >
            <v-progress-linear
              :value="project.progress"
              color="green"
              height="12"
            >
              <span style="font-size: 8px">{{ project.progress }}%</span>
            </v-progress-linear>
            <b-button
              class="mt-2"
              size="large"
              squared
              variant="success"
              @click="showConfirmationDialog = true"
              >FUND THIS INVOICE</b-button
            >
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <v-expansion-panels v-model="suplierDetailsPanel">
          <v-expansion-panel key="0">
            <v-expansion-panel-header color="#F2F3FF">
              <p class="text-primary mb-0 font-weight-boldest ls-2 text-left">
                SUPPLIER DETAILS
              </p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="row pt-5">
                <div class="col-2">
                  <div class="d-flex justify-content-center">
                    <b-img
                      height="100%"
                      width="80%"
                      :src="project.companyInfo.photo"
                      fluid
                      alt="Fluid image"
                    ></b-img>
                  </div>
                </div>
                <div class="col-10">
                  <div class="d-flex justify-content-between">
                    <div class="flex-grow-1">
                      <div>
                        <p class="font-weight-boldest">COMPANY NAME</p>
                        <p>{{ project.companyInfo.company_name || "N/A" }}</p>
                      </div>
                      <div class>
                        <p class="font-weight-boldest">REGISTRATION NUMBER</p>
                        <p>
                          {{ project.companyInfo.registration_no || "N/A" }}
                        </p>
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <div>
                        <p class="font-weight-boldest">COMPANY ADDRESS</p>
                        <p>{{ address }}</p>
                      </div>
                      <div>
                        <p class="font-weight-boldest">COMPANY WEBSITE</p>
                        <p>{{ project.companyInfo.website || "N/A" }}</p>
                      </div>
                    </div>
                  </div>
                  <div class>
                    <p class="font-weight-boldest">ABOUT COMPANY</p>
                    <p>{{ project.companyInfo.director.full_name || "N/A" }}</p>
                  </div>
                  <div class>
                    <p class="font-weight-boldest">COMPANY DIRECTOR</p>
                    <p>{{ project.companyInfo.about_us || "N/A" }}</p>
                  </div>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <div class="row mt-5">
        <v-expansion-panels v-model="projectDetailsPanel">
          <v-expansion-panel>
            <v-expansion-panel-header color="#F2F3FF">
              <p class="text-primary mb-0 font-weight-boldest ls-2 text-left">
                PROJECT FACTSHEET
              </p>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="row my-5">
                <div class="col-12">
                  <p class="text-primary font-weight-boldest">
                    {{ project.companyInfo.company_name || "N/A" }}
                  </p>
                </div>
              </div>
              <div class="row mb-5">
                <div
                  class="col-12 d-flex flex-row justify-content-between align-items-end"
                >
                  <div class="flex-grow-1">
                    <div class="mb-10">
                      <p class="font-weight-boldest">AMOUNT</p>
                      <p>${{ project.goal_amount | money_format }}</p>
                    </div>
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #f2f3ff"
                      >
                        DESCRIPTION
                      </p>
                      <p>{{ project.description || "N/A" }}</p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div class="mb-10">
                      <p class="font-weight-boldest">SUBMISSION DATE</p>
                      <p>{{ project.invoice.submission_date }}</p>
                      <p></p>
                    </div>
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #f2f3ff"
                      >
                        INVOICE NO.
                      </p>
                      <p>{{ project.invoice.invoice_no }}</p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #f2f3ff"
                      >
                        INVOICE DATE
                      </p>
                      <p>{{ project.invoice.due_date }}</p>
                      <p></p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #f2f3ff"
                      >
                        INVOICE AMOUNT
                      </p>
                      <p>$ {{ project.invoice.total_amount | money_format }}</p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #f2f3ff"
                      >
                        EARLY REPAYMENT
                      </p>
                      <p>{{ project.invoice.early_payment_date || "N/A" }}</p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="
													border-bottom: 1px solid #f2f3ff;
													margin-bottom: 8px;
												"
                      >
                        ACTIONS
                      </p>
                      <b-button
                        size="large"
                        squared
                        variant="success"
                        @click="showConfirmationDialog = true"
                        >FUND THIS INVOICE</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row px-5 py-8 mb-5 d-flex flex-column"
                style="background-color: #fafafa"
              >
                <div class="d-flex align-items-center mb-5">
                  <p class="text-primary font-weight-boldest ls-2 mb-0 mr-5">
                    VERIFIED ON BLOCKCHAIN
                  </p>
                  <a
                    class="shadow p-4 rounded"
                    :href="
                      project.invoice.blockchain_verification.etherscan_url
                    "
                    target="_blank"
                    >{{ project.invoice.blockchain_verification.label }}</a
                  >
                </div>
                <p class="text-muted">
                  This invoice is certified. For proof of authenticity,
                  <a
                    :href="project.invoice.blockchain_verification.verify_url"
                    target="_blank"
                    >view this transaction here.</a
                  >
                </p>
              </div>

              <div class="row">
                <div class="col-12">
                  <p class="font-weight-boldest">TIMESTAMP</p>
                  <hr />
                </div>
              </div>
              <div class="activities d-flex justify-content-between flex-row">
                <div
                  class="flex-grow-1"
                  v-for="(activity, index) in project.invoice.activities"
                  :key="index"
                >
                  <p class="text-primary font-weight-boldest">
                    {{ index + 1 }}. {{ activity.title }}
                  </p>
                  <div class="d-flex flex-row">
                    <div class="mr-5">
                      <p class="text-primary font-weight-boldest">Timestamp</p>
                      <p class="text-primary font-weight-boldest">Company</p>
                      <p class="text-primary font-weight-boldest">Name</p>
                      <p class="text-primary font-weight-boldest">Postition</p>
                    </div>
                    <div>
                      <p>{{ activity.created_at }}</p>
                      <p>{{ activity.companyInfo.name }}</p>
                      <p>{{ activity.companyInfo.personnel }}</p>
                      <p>{{ activity.companyInfo.position }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-dialog v-model="showConfirmationDialog" persistent max-width="500">
        <v-card class="py-1">
          <i
            class="flaticon2-cross"
            style="position: absolute; right: 1rem; top: 1rem"
            @click="onCloseConfirmation"
          ></i>
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-10">
                <p
                  style="font-size: 1.25rem; color: #1d8cc6"
                  class="mt-5 modal-text font-weight-boldest text-primary text-center"
                >
                  Confirmation
                </p>
                <p class="modal-text text-center text-primary">
                  You are about to fund this invoice. Funding amount will be
                  deducted from your available balance.
                </p>

                <hr />

                <v-row>
                  <v-col cols="7" class="d-flex align-items-center">
                    <p class="mb-0">Funding Amount</p>
                  </v-col>
                  <v-col cols="5" class="d-flex align-items-center">
                    <v-text-field
                      label
                      style="font-size: 13px"
                      v-model.number="amount"
                      @input="calculateReturns"
                      placeholder
                      prefix="$"
                    ></v-text-field>
                    <button
                      style="padding: 0.25rem 0.5rem; max-height: 2rem"
                      class="btn btn-sm btn-info"
                      @click="setMax"
                    >
                      Max
                    </button>
                  </v-col>
                </v-row>

                <div class="d-flex justify-content-between">
                  <p>At rate %</p>
                  <p>{{ project.returns }} % P.A.</p>
                </div>

                <div class="d-flex justify-content-between">
                  <p>Repayment Date</p>
                  <p>{{ project.loan.repayment_start_date }}</p>
                </div>

                <div class="mb-10 d-flex justify-content-between">
                  <p>Tenure</p>
                  <p>{{ project.loan.tenure_label }}</p>
                </div>

                <div class="d-flex" v-if="message">
                  <p class="text-danger">{{ message }}</p>
                </div>

                <div
                  class="d-flex justify-content-between"
                  style="
										border-top: 1px solid rgba(0, 0, 0, 0.1);
										border-bottom: 1px solid rgba(0, 0, 0, 0.1);
									"
                >
                  <p
                    class="py-3 my-0 flex-grow-1 font-weight-boldest text-primary"
                    style="border-right: 1px solid rgba(0, 0, 0, 0.1)"
                  >
                    Expected Returns
                  </p>
                  <p class="ml-4 py-3 my-0 font-weight-boldest text-primary">
                    USD {{ returnValue }}
                  </p>
                </div>

                <div class="d-flex justify-content-center">
                  <v-btn
                    class="mt-5"
                    style="text-transform: none"
                    color="primary"
                    :loading="isSubmitting"
                    :disabled="isDisable"
                    squared
                    @click="fundInvoice"
                    >Proceed</v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showSuccessfulDialog" persistent max-width="500">
        <v-card class="py-5">
          <div
            class="d-flex justify-content-center flex-column align-items-center"
          >
            <p
              style="font-size: 1.25rem; color: #1d8cc6"
              class="mt-5 modal-text font-weight-boldest"
            >
              Funding Successful
            </p>
            <p class="modal-text" style="color: #1d8cc6">
              You have successfully funded the invoice.
            </p>
            <inline-svg
              width="40%"
              src="media/pilons/pilon_funding_successful.svg"
            ></inline-svg>
            <div class="d-flex justify-content-end px-4 w-100">
              <v-btn
                style="text-transform: none"
                color="primary"
                class="mr-2"
                squared
                @click="continueBrowsing"
                >Continue Browsing</v-btn
              >
              <v-btn
                style="text-transform: none"
                color="primary"
                squared
                @click="viewPortfolio"
                >View Current Portfolio</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import ApiService from "@/core/services/api.service";
import { mapState } from "vuex";
export default {
  name: "ProjectDetails",
  data() {
    return {
      returnValue: 0,
      suplierDetailsPanel: 0,
      projectDetailsPanel: 0,
      showConfirmationDialog: false,
      showSuccessfulDialog: false,
      isLoaded: false,
      isSubmitting: false,
      project: {},
      message: null,
      amount: null
    };
  },
  computed: {
    isDisable() {
      return this.amount
        ? this.amount > this.project.invoice.total_amount
        : true;
    },
    ...mapState({
      funds: state => state.auth.user.fundSummary
    }),
    address() {
      const {
        unit_no,
        line1,
        line2,
        country_name,
        postal
      } = this.project.companyInfo.address;
      return (
        unit_no + " " + line1 + " " + line2 + " " + country_name + " " + postal
      );
    }
  },
  async mounted() {
    const PROJECT_DETAILS_RESPONSE = await ApiService.get(
      `/crowd-funding/project/${this.$route.params.id}?expand=loan,invoice,companyInfo`
    );
    this.project = PROJECT_DETAILS_RESPONSE.data.data;
    this.isLoaded = true;
  },
  methods: {
    continueBrowsing() {
      this.showSuccessfulDialog = false;
      this.$router.push("/investments/available");
    },
    viewPortfolio() {
      this.showSuccessfulDialog = false;
      this.$router.push("/investments/user");
    },
    onCloseConfirmation() {
      this.message = null;
      this.showConfirmationDialog = false;
    },
    setMax() {
      this.amount = this.project.available_funding_left;
    },
    calculateReturns() {
      this.returnValue = 0;
      if (this.amount) {
        ApiService.post("/loan/calculator", {
          principal: this.amount,
          interest_rate: this.project.returns
        }).then(res => {
          this.returnValue = res.data.data.total_returns;
        });
      }
    },
    fundInvoice() {
      this.isSubmitting = true;
      ApiService.post("/crowd-funding/investment", {
        project_id: this.project.id,
        amount: this.amount
      })
        .then(() => {
          this.showConfirmationDialog = false;
          this.showSuccessfulDialog = true;
        })
        .catch(err => {
          this.message = err.response.data.data.message;
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  }
};
</script>
