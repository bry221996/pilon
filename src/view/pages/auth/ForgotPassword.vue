<template>
  <div class="w-100">
    <div class="d-flex justify-content-center mb-5">
      <img src="/media/pilons/pilon_logo.svg" />
    </div>
    <!--begin::Signin-->
    <div class="login-form login-signin">
      <!--begin::Form-->
      <v-form>
        <v-container>
          <v-row>
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
          </v-row>
          <v-row class="mt-5">
            <v-text-field
              placeholder="example@email.com"
              class="pt-0"
              color="#707070"
              v-model.trim="$v.form.email.$model"
              :error="$v.form.email.$error"
              :messages="errorMessage"
            >
              <template slot="label">
                <strong>Email Address</strong>
              </template>
            </v-text-field>
          </v-row>

          <v-row>
            <v-btn
              rounded
              color="primary"
              :loading="isLoading"
              dark
              block
              large
              @click="onSubmit"
              >SUBMIT</v-btn
            >
          </v-row>
        </v-container>
      </v-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import ApiService from "@/core/services/api.service";

export default {
  name: "ForgotPassword",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null
      },
      responseStatus: "success",
      message: "",
      dismissCountDown: 0,
      isLoading: false
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  computed: {
    errorMessage() {
      if (!this.$v.form.email.$error) {
        return "";
      }
      return !this.$v.form.email.required
        ? "This field is required"
        : "This field should be a type of email";
    }
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      this.isLoading = true;

      ApiService.post("/user/password-reset-request", {
        email: this.form.email
      })
        .then(() => {
          this.message = "We have e-mailed your password reset link!";
          this.responseStatus = "success";
          this.form = {
            email: null
          };

          this.$nextTick(() => {
            this.$v.$reset();
          });
        })
        .catch(err => {
          const error = JSON.parse(err.response.data.data.message);
          this.message = error[Object.keys(error)[0]][0];
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
