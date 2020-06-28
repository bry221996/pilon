<template>
  <div class="my-10 container-fluid">
    <div class="row">
      <div class="col-12">
        <funds-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="p-5" style="background-color: #F2F3FF">
          <h6 class="text-primary mb-0">
            <strong>LATEST AVAILABLE INVESTMENTS</strong>
          </h6>
        </div>
      </div>
      <div class="col-12 mt-3">
        <investment />
        <investment />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="p-5 text-center" style="background-color: #E2F5FE">
          <h6 class="text-info mb-0">
            <strong>VIEW ALL</strong>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// E5F6FF
import FundsSummary from "@/view/content/dashboard/FundsSummary.vue";
import Investment from "@/view/content/investments/Investment.vue";
import store from "@/core/services/store";
import { GET_AUTH_USER } from "@/core/services/store/auth.module";

export default {
  name: "Dashboard",
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(GET_AUTH_USER);
    next();
  },
  components: {
    FundsSummary,
    Investment
  }
};
</script>
