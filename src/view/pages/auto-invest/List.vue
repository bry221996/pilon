<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <div
          class="p-5 d-flex justify-content-between"
          style="background-color: #F2F3FF"
        >
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            AUTO INVEST RULES
          </p>
          <i
            class="flaticon-add-circular-button text-primary"
            @click="$router.push('/auto-invest/create')"
          ></i>
        </div>
      </div>
    </div>
    <div class="row mt-3 font-weight-boldest">
      <div class="col-4">Rule Name</div>
      <div class="col-2">Interest Range</div>
      <div class="col-2">Tenure Months</div>
      <div class="col-2">Maximum Allocation</div>
      <div class="col-2">Status</div>
    </div>
    <hr />

    <div class="row my-3" v-for="(rule, index) in rules" :key="index">
      <div class="col-4">
        <router-link :to="`/auto-invest/${rule.id}`">
          {{ rule.name || "N/A" }}
        </router-link>
      </div>
      <div class="col-2">
        {{ rule.min_interest }}% - {{ rule.max_interest }}%
      </div>
      <div class="col-2">
        {{ rule.min_tenure }} - {{ rule.max_tenure }} months
      </div>
      <div class="col-2">$ {{ rule.max_allocation }}</div>
      <div class="col-2" v-html="getStatusDisplay(rule.is_enabled)"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AutoInvestList",
  computed: {
    ...mapState({
      rules: state => state.rules.list
    })
  },
  methods: {
    getStatusDisplay(status) {
      return status
        ? "<span class='badge badge-success'>Enabled</span>"
        : "<span class='badge badge-warning'>Disabled</span>";
    }
  }
};
</script>
