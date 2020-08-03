<template>
  <v-app>
    <div class="container-fluid mt-5">
      <div class="row">
        <div class="col-12">
          <div
            class="p-5 d-flex justify-content-between"
            style="background-color: #F2F3FF"
          >
            <p class="text-primary mb-0 font-weight-boldest ls-2">
              CHANGE PASSWORD
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <b-alert
            :variant="responseStatus"
            :show="dismissCountDown"
            dismissible
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
            >{{ message }}</b-alert
          >
        </div>
      </div>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                type="password"
                label="Current Password"
                v-model="currentPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                type="password"
                label="New Password"
                v-model="newPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="password"
                label="Confirm Password"
                v-model="confirmPassword"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-content-end">
            <v-col cols="4">
              <v-btn
                :disabled="!isValid"
                :loading="isLoading"
                rounded
                color="primary"
                block
                large
                @click="changePassword"
                >SAVE</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-app>
</template>

<script>
import ApiService from "@/core/services/api.service";
import { mapState } from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      isLoading: false,
      responseStatus: "success",
      dismissCountDown: 0,
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      message: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    isValid() {
      return (
        !!this.currentPassword &&
        !!this.newPassword &&
        !!this.confirmPassword &&
        this.newPasswordIsConfirmed
      );
    },
    newPasswordIsConfirmed() {
      return this.confirmPassword === this.newPassword;
    }
  },
  methods: {
    changePassword() {
      this.isLoading = true;
      ApiService.put(`/user/${this.user.id}/change-password`, {
        current_password: this.currentPassword,
        new_password: this.newPassword
      })
        .then(() => {
          this.responseStatus = "success";
          this.message = "Password Changed Successfully";
          this.currentPassword = null;
          this.newPassword = null;
          this.confirmPassword = null;
        })
        .catch(err => {
          const error = JSON.parse(err.response.data.data.message);
          this.message = error[Object.keys(error)[0]][0];
          if (this.message == "Incorrect username or password.") {
            this.message = "Incorrect current password";
          }
          this.responseStatus = "danger";
        })
        .finally(() => {
          this.dismissCountDown = 5;
          this.isLoading = false;
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
  }
};
</script>
