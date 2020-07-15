<template>
  <div class="row mt-5" v-if="isLoaded">
    <div class="col-12">
      <div class="p-5" style="background-color: #F2F3FF">
        <p class="text-primary mb-0 font-weight-boldest ls-2">
          FUNDING HISTORY
        </p>
      </div>
    </div>
    <div class="col-12 mt-3">
      <investment
        v-for="(investment, index) in investments"
        :key="index"
        :investment="investment"
      />
    </div>
  </div>
</template>

<script>
import { GET_INVESTMENTS_HISTORY } from "@/core/services/store/investments.module";
import { mapState } from "vuex";
import Investment from "@/view/content/investments/Investment.vue";

export default {
  name: "InvestmentHistory",
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    Investment
  },
  computed: {
    ...mapState({
      investments: state => state.investments.history
    })
  },
  async mounted() {
    await this.$store.dispatch(GET_INVESTMENTS_HISTORY);
    this.isLoaded = true;
  }
};
</script>
