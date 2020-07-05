<template>
  <v-app>
    <transition name="fade-in-up">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "FundsIndex"
};
</script>
