<template>
  <div class="my-10 container-fluid">
    <div class="row">
      <div class="col-12">
        <funds-summary />
      </div>
    </div>
  </div>
</template>

<script>
import FundsSummary from "@/view/content/dashboard/FundsSummary.vue";

export default {
  name: "FundsOverview",
  components: {
    FundsSummary
  }
};
</script>
