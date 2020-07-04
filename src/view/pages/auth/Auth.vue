<template>
  <v-app>
    <div class="d-flex flex-column flex-root">
      <div
        class="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
        id="kt_login"
      >
        <!--begin::Content-->
        <div
          class="flex-row-fluid d-flex flex-column position-relative px-20 py-7 overflow-hidden"
        >
          <div class="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
            <router-view></router-view>
          </div>
        </div>
        <!--end::Content-->

        <!--begin::Aside-->
        <div
          class="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-15"
          style="background-position: right"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        >
          <!--begin: Aside Container -->
          <!--end: Aside Container -->
        </div>
        <!--begin::Aside-->
      </div>
    </div>
  </v-app>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import "@/assets/sass/pages/login/login-1.scss";
</style>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "auth",
  methods: {},
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters(["isAuthenticated"]),
    backgroundImage() {
      return process.env.BASE_URL + "media/pilons/pilon_login.jpg";
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push("/");
    }
  }
};
</script>
