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
              placeholder="********"
              class="pt-0"
              type="password"
              color="#707070"
              v-model.trim="$v.form.password.$model"
              :error="$v.form.password.$error"
              :messages="errorMessage"
              label="New Password"
            >
            </v-text-field>
          </v-row>

          <v-row class="mt-5">
            <v-text-field
              placeholder="********"
              class="pt-0"
              type="password"
              color="#707070"
              v-model.trim="$v.form.confirmPassword.$model"
              :error="$v.form.confirmPassword.$error"
              :messages="
                $v.form.confirmPassword.$error ? 'Must be same as password' : ''
              "
              label="Confirm Password"
            >
            </v-text-field>
          </v-row>

          <v-row class="mb-5 d-flex align-items-center justify-content-center">
            <router-link to="/forgot-password"
              >Request new password reset link</router-link
            >
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import ApiService from "@/core/services/api.service";

export default {
  name: "ForgotPassword",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        password: null,
        confirmPassword: null
      },
      responseStatus: "success",
      message: "",
      dismissCountDown: 0,
      isLoading: false
    };
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    errorMessage() {
      if (!this.$v.form.password.$error) {
        return "";
      }
      return !this.$v.form.password.required
        ? "This field is required"
        : "Password should have 8 characters";
    }
  },
  methods: {
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;
      this.isLoading = true;

      ApiService.post("/user/password-reset", {
        password: this.form.password,
        token: this.$route.query.token
      })
        .then(() => {
          this.message = "Password Changed successfully";
          this.responseStatus = "success";
          this.form = {
            password: null,
            confirmPassword: null
          };

          setTimeout(() => {
            this.$router.push("login");
          }, 1000);

          this.$nextTick(() => {
            this.$v.$reset();
          });
        })
        .catch(err => {
          this.message = err.response.data.data.message;
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
