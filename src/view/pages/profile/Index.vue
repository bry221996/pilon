<template>
  <div class="my-10 container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="links">
          <router-link
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            class="btn btn-sm rounded-pill mr-3 px-5 font-weight-boldest"
            exact-active-class="btn-info"
            >{{ link.display }}</router-link
          >
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <div class="p-5" style="background-color: #F2F3FF">
          <p class="text-primary mb-0 font-weight-boldest text-uppercase">
            {{ headerTitle }}
          </p>
        </div>
      </div>
    </div>

    <v-app>
      <transition name="fade-in-up">
        <router-view></router-view>
      </transition>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      links: [
        { display: "PERSONAL DETAILS", to: "/profile/personal-details" },
        { display: "COMPANY DETAILS", to: "/profile/company-details" },
        { display: "CREDIT CARD", to: "/profile/credit-card" },
        { display: "BANK ACCOUNT", to: "/profile/bank-account" }
      ]
    };
  },
  computed: {
    ...mapState({
      funds: state => state.auth.user.fundSummary
    }),
    headerTitle() {
      return this.$route.name.replace("-", " ");
    }
  }
};
</script>
