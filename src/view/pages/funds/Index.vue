<template>
  <v-app>
    <transition name="fade-in-up">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import { GET_AUTH_USER, LOGOUT } from "@/core/services/store/auth.module";

export default {
  name: "FundsIndex",
  mounted() {
    this.$store.dispatch(GET_AUTH_USER).catch(() => {
      this.$store.dispatch(LOGOUT);
      this.$router.push({ name: "login" });
    });
  }
};
</script>
