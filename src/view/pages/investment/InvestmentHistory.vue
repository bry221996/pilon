<template>
  <div class="row mt-5">
    <div class="col-12">
      <div class="p-5" style="background-color: #F2F3FF">
        <p class="text-primary mb-0">
          <strong>Investment History</strong>
        </p>
      </div>
    </div>
    <div class="col-12 mt-3">
      <investment />
      <investment />
    </div>
  </div>
</template>

<script>
import Investment from "@/view/content/investments/Investment.vue";

export default {
  name: "InvestmentHistory",
  components: {
    Investment
  }
};
</script>
