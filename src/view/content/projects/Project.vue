<template>
  <div class="row mb-10 pb-3">
    <div class="col-12">
      <div class="pb-2" style="border-bottom: 1px solid #dee2e6">
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
                <p>{{ project.companyInfo.company_name }}</p>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">EARLY REPAYMENT DUE</p>
                <p>{{ repaymentDate }}</p>
              </div>
            </td>
            <td style="border-top: none" width="26%">
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">TOTAL INVOICE AMOUNT</p>
                <p>$ {{ project.goal_amount | money_format }}</p>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">RETURNS</p>
                <p>{{ project.returns }} %</p>
              </div>
            </td>
            <td style="border-top: none" width="23%">
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">TENURE</p>
                <p>{{ project.loan.tenure_label }}</p>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">FUNDED</p>
                <v-progress-linear
                  :value="project.progress"
                  color="green"
                  height="12"
                >
                  <span style="font-size: 8px">{{ project.progress }}%</span>
                </v-progress-linear>
              </div>
            </td>

            <td style="border-top: none" width="16%" class="align-middle">
              <b-button
                size="sm"
                squared
                variant="success"
                @click="redirectToDetails"
                >FUND THIS INVOICE</b-button
              >
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Projects",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    repaymentDate() {
      return moment(
        this.project.invoice.early_payment_date,
        "YYYY/MM/DD"
      ).format("DD/MM/YYYY");
    }
  },
  methods: {
    redirectToDetails() {
      this.$router.push(`/projects/${this.project.id}`);
    }
  }
};
</script>
