<template>
  <v-app v-if="loaded">
    <transition name="fade-in-up">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import { GET_INDUSTRIES, GET_RULES } from "@/core/services/store/rules.module";

export default {
  name: "AutoInvestIndex",
  data() {
    return {
      loaded: false
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch(GET_INDUSTRIES);
      await this.$store.dispatch(GET_RULES);
      this.loaded = true;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
