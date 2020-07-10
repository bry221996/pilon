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
      <div class="col-2">Allocation</div>
      <div class="col-2">Status</div>
    </div>
    <hr />

    <div class="row my-3" v-for="(rule, index) in rules" :key="index">
      <div class="col-4">{{ rule.name }}</div>
      <div class="col-2">
        {{ rule.interest_range[0] }}% - {{ rule.interest_range[1] }}%
      </div>
      <div class="col-2">
        {{ rule.tenure[0] }} - {{ rule.tenure[1] }} months
      </div>
      <div class="col-2">$ {{ rule.allocation_limit | money_format }}</div>
      <div class="col-2" v-html="getStatusDisplay(rule.status)"></div>
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
