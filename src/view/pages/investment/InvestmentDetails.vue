<template>
  <v-app>
    <div class="container-fluid my-10" v-if="isLoaded">
      <div class="row">
        <div class="col-12">
          <table class="table">
            <tr class="pb-3">
              <td class="pl-0" style="border-top: none" width="16%">
                <b-img
                  :src="investment.companyInfo.photo"
                  fluid
                  alt="Fluid image"
                ></b-img>
              </td>
              <td style="border-top: none" width="28%">
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">COMPANY</p>
                  <p>{{ investment.companyInfo.company_name || "N/A" }}</p>
                </div>
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">INVOICE DUE</p>
                  <p>{{ investment.invoice.due_date }}</p>
                </div>
              </td>
              <td style="border-top: none" width="28%">
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">BUYER</p>
                  <p>
                    {{ investment.invoice.buyer.companyInfo.name || "N/A" }}
                  </p>
                </div>
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">RETURNS</p>
                  <p>{{ investment.project.returns }} % P.A.</p>
                </div>
              </td>
              <td style="border-top: none" width="28%">
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">TOTAL INVOICE AMOUNT</p>
                  <p>${{ investment.invoice.total_amount | money_format }}</p>
                </div>
                <div class="d-flex flex-column">
                  <p class="mb-2 font-weight-boldest">TENURE</p>
                  <p>{{ investment.loan.tenure_label }}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 px-0 py-0 d-flex flex-row justify-content-between"
          style="background-color: #1D8CC61C; border: 1px dashed #1D8CC6;"
        >
          <div
            class="flex-grow-1 py-6 px-6"
            style="background-color: #1D31C6; color: white"
          >
            <h4 class="card-title mb-4">
              <strong>USD {{ funds.available | money_format }}</strong>
            </h4>
            <p class="card-text">Funds Available</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong>USD {{ investment.principal | money_format }}</strong>
            </h4>
            <p class="card-text">Investment Amount</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong>USD {{ investment.interest | money_format }}</strong>
            </h4>
            <p class="card-text">Expected Returns</p>
          </div>
          <div class="flex-grow-1 py-6 px-6">
            <h4 class="card-title mb-4">
              <strong>{{ investment.invoice.due_date }}</strong>
            </h4>
            <p class="card-text">Estimated Payment Date</p>
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
                      :src="investment.companyInfo.photo"
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
                        <p>
                          {{ investment.companyInfo.company_name || "N/A" }}
                        </p>
                      </div>
                      <div class>
                        <p class="font-weight-boldest">REGISTRATION NUMBER</p>
                        <p>
                          {{ investment.companyInfo.registration_no || "N/A" }}
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
                        <p>{{ investment.companyInfo.website || "N/A" }}</p>
                      </div>
                    </div>
                  </div>
                  <div class>
                    <p class="font-weight-boldest">ABOUT COMPANY</p>
                    <p>
                      {{ investment.companyInfo.director.full_name || "N/A" }}
                    </p>
                  </div>
                  <div class>
                    <p class="font-weight-boldest">COMPANY DIRECTOR</p>
                    <p>{{ investment.companyInfo.about_us || "N/A" }}</p>
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
                    {{ investment.companyInfo.company_name || "N/A" }}
                  </p>
                </div>
              </div>
              <div class="row mb-5">
                <div
                  class="col-12 d-flex flex-row justify-content-between align-items-end"
                >
                  <div class="flex-grow-1">
                    <div class="mb-10">
                      <p class="font-weight-boldest">INVESTMENT AMOUNT</p>
                      <p>${{ investment.principal | money_format }}</p>
                    </div>
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #F2F3FF"
                      >
                        DESCRIPTION
                      </p>
                      <p>{{ investment.description || "N/A" }}</p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div class="mb-10">
                      <p class="font-weight-boldest">SUBMISSION DATE</p>
                      <p>{{ investment.invoice.submission_date }}</p>
                      <p></p>
                    </div>
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #F2F3FF"
                      >
                        INVOICE NO.
                      </p>
                      <p>{{ investment.invoice.invoice_no }}</p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #F2F3FF"
                      >
                        INVOICE DATE
                      </p>
                      <p>{{ investment.invoice.due_date }}</p>
                      <p></p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #F2F3FF"
                      >
                        INVOICE AMOUNT
                      </p>
                      <p>
                        $ {{ investment.invoice.total_amount | money_format }}
                      </p>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <p
                        class="font-weight-boldest pb-5"
                        style="border-bottom: 1px solid #F2F3FF"
                      >
                        EARLY REPAYMENT
                      </p>
                      <p>
                        {{ investment.invoice.early_payment_date || "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row px-5 py-8 mb-5 d-flex flex-column"
                style="background-color: #FAFAFA"
              >
                <div class="d-flex align-items-center mb-5">
                  <p class="text-primary font-weight-boldest ls-2 mb-0 mr-5">
                    VERIFIED ON BLOCKCHAIN
                  </p>
                  <a
                    class="shadow p-4 rounded"
                    :href="
                      investment.invoice.blockchain_verification.etherscan_url
                    "
                    target="_blank"
                    >{{ investment.invoice.blockchain_verification.label }}</a
                  >
                </div>
                <p class="text-muted">
                  This invoice is certified. For proof of authenticity,
                  <a
                    :href="
                      investment.invoice.blockchain_verification.verify_url
                    "
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
                  v-for="(activity, index) in investment.invoice.activities"
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
    </div>
  </v-app>
</template>

<script>
import ApiService from "@/core/services/api.service";
import { mapState } from "vuex";
export default {
  name: "InvestmentDetails",
  data() {
    return {
      suplierDetailsPanel: 0,
      projectDetailsPanel: 0,
      showConfirmationDialog: false,
      showSuccessfulDialog: false,
      isLoaded: false,
      isSubmitting: false,
      investment: {}
    };
  },
  computed: {
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
      } = this.investment.companyInfo.address;
      return (
        unit_no + " " + line1 + " " + line2 + " " + country_name + " " + postal
      );
    }
  },
  async mounted() {
    const PROJECT_DETAILS_RESPONSE = await ApiService.get(
      `/crowd-funding/investment/${this.$route.params.id}?expand=loan,invoice,companyInfo,project`
    );
    this.investment = PROJECT_DETAILS_RESPONSE.data.data;
    this.isLoaded = true;
  },
  methods: {
    async fundInvoice() {
      this.isSubmitting = true;
      await ApiService.post("/crowd-funding/investment", {
        project_id: this.investment.id,
        amount: this.investment.invoice.total_amount
      });
      this.showConfirmationDialog = false;
      this.showSuccessfulDialog = true;
      this.isSubmitting = false;
    }
  }
};
</script>
