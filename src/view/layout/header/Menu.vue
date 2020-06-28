<template>
  <ul class="menu-nav">
    <li aria-haspopup="true" data-menu-toggle="hover" class="menu-item">
      <b-button
        squared
        variant="primary"
        class="mr-4 ml-4"
        style="padding-left: 50px; padding-right: 50px"
        >TOP UP FUNDS</b-button
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  }
};
</script>
