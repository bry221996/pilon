<template>
  <div class="container-fluid mt-5" v-if="loaded">
    <div class="row">
      <div class="col-12">
        <div
          class="p-5 d-flex justify-content-between"
          style="background-color: #F2F3FF"
        >
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            {{ notification.title }}
          </p>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <textarea
          class="form-control"
          rows="10"
          readonly
          :value="notification.message"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";

export default {
  name: "Notification",
  data() {
    return {
      loaded: false,
      notification: {}
    };
  },
  watch: {
    "$route.params.id": "fetchDetails"
  },
  mounted() {
    this.fetchDetails();
  },
  methods: {
    fetchDetails() {
      ApiService.get(`/notification/message/${this.$route.params.id}`).then(
        ({ data }) => {
          this.notification = data.data;
          this.loaded = true;
        }
      );
    }
  }
};
</script>
