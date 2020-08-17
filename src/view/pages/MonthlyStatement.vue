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
    <div class="row pb-3" v-for="(statement, index) in statements" :key="index">
      <div class="col-6">{{ statement.label }}</div>
      <div class="col-6 d-flex">
        <div
          class="d-flex align-items-center pr-3"
          style="border-right: 1px solid rgba(0, 0, 0, 0.1)"
        >
          <a
            style="cursor: pointer"
            @click.prevent="download(statement.date, 'pdf')"
          >
            <i class="mr-2 text-primary flaticon2-download-2"></i>
            PDF
          </a>
        </div>
        <div class="d-flex align-items-center pl-3">
          <a
            style="cursor: pointer"
            @click.prevent="download(statement.date, 'html')"
          >
            <i class="mr-2 text-primary flaticon2-download-2"></i>
            HTML
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  name: "MonthlyStatement",
  data() {
    return {
      months: ["March 2020", "April 2020", "May 2020", "June 2020"],
      statements: []
    };
  },
  async mounted() {
    const STATEMENTS_RESPONSE = await ApiService.get(
      "/reports/monthly-statement"
    );
    this.statements = STATEMENTS_RESPONSE.data.data.rows;
    // this.downloadPdf("032020");
  },
  methods: {
    download(date, type) {
      const query = type == "html" ? "html" : "pdf-base64";
      ApiService.get(`/reports/monthly-statement/${date}?type=${query}`).then(
        response => {
          const downloadLink = document.createElement("a");
          downloadLink.href = this.downloadLinkHref(response, type);
          downloadLink.download = `${date}.${type}`;
          downloadLink.click();
        }
      );
    },

    downloadLinkHref(response, type) {
      if (type == "html") {
        var blob = new Blob([response.data], { type: "text/html" });
        return window.URL.createObjectURL(blob);
      }
      return `data:application/pdf;base64,${response.data.data}`;
    }
  }
};
</script>
