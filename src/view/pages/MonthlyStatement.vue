<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <div
          class="p-5 d-flex justify-content-between"
          style="background-color: #F2F3FF"
        >
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            MONTHLY STATEMENTS
          </p>
        </div>
      </div>
    </div>
    <div class="row mt-3 font-weight-boldest">
      <div class="col-6">Month</div>
      <div class="col-6">Action</div>
    </div>
    <hr />
    <div class="row pb-3" v-for="(month, index) in months" :key="index">
      <div class="col-6">{{ month }}</div>
      <div class="col-6 d-flex">
        <div
          class="d-flex align-items-center pr-3"
          style="border-right: 1px solid rgba(0, 0, 0, 0.1)"
        >
          <i class="mr-2 text-primary flaticon2-download-2"></i>
          <a href="/statement.pdf" download>PDF</a>
        </div>
        <div class="d-flex align-items-center pl-3">
          <i class="mr-2 text-primary flaticon2-download-2"></i>
          <router-link :to="getUrl(month)">HTML</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthlyStatement",
  data() {
    return {
      months: ["March 2020", "April 2020", "May 2020", "June 2020"]
    };
  },
  methods: {
    getUrl(name) {
      const url = name.replace(" ", "-");
      return `/statements/${url}`;
    }
  }
};
</script>
