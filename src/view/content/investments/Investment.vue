<template>
  <div class="row mb-10 pb-3">
    <div class="col-12">
      <div class="pb-2" style="border-bottom: 1px solid #dee2e6">
        <table class="table">
          <tr class="pb-3">
            <td class="pl-0" style="border-top: none" width="15%">
              <b-img :src="investment.companyInfo.photo" fluid alt="Fluid image"></b-img>
            </td>
            <td style="border-top: none" width="20%">
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">COMPANY</p>
                <p>{{ investment.companyInfo.company_name }}</p>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">EARLY REPAYMENT DUE</p>
                <p>{{ investment.loan.maturity_date }}</p>
              </div>
            </td>
            <td style="border-top: none" width="26%">
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">
                  INVOICES AVAILABLE FOR FUNDING
                </p>
                <p>{{ investment.companyInfo.total_available_invoices }}</p>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">RETURNS</p>
                <p>{{ investment.loan.interest_rate }}</p>
              </div>
            </td>
            <td style="border-top: none" width="23%">
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">TOTAL INVOICE AMOUNT</p>
                <p>{{ investment.total_funded }}</p>
              </div>
              <div class="d-flex flex-column">
                <p class="mb-2 font-weight-boldest">TENURE</p>
                <p>{{ investment.loan.tenure_label }}</p>
              </div>
            </td>
            <td style="border-top: none" width="16%" class="align-middle">
              <b-button size="sm" squared variant="success"
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
export default {
  name: "Investment",
  props: {
    investment: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      const key = this.$vnode.key + 1;
      return `/media/project-logos/${key}.png`;
    }
  }
};
</script>
