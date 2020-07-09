<template>
  <v-app>
    <transition name="fade-in-up">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import { GET_AUTH_USER } from "@/core/services/store/auth.module";

export default {
  name: "FundsIndex",
  mounted() {
    this.$store.dispatch(GET_AUTH_USER)
  }
};
</script>
