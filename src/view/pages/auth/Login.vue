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
          <v-row class="mt-5">
            <v-text-field
              placeholder="example@email.com"
              class="pt-0"
              color="#707070"
              v-model="$v.form.username.$model"
              :error="$v.form.username.$error"
              :messages="
                $v.form.username.$error ? 'This field is required' : ''
              "
            >
              <template slot="label">
                <strong>Login ID</strong>
              </template>
            </v-text-field>
          </v-row>
          <v-row class="mt-5">
            <v-text-field
              type="password"
              placeholder="**********"
              class="pt-0"
              color="#707070"
              v-model="$v.form.password.$model"
              :error="$v.form.password.$error"
              :messages="
                $v.form.password.$error ? 'This field is required' : ''
              "
            >
              <template slot="label">
                <strong>Password</strong>
              </template>
            </v-text-field>
          </v-row>
          <v-row>
            <div
              role="alert"
              v-if="'password' in errors"
              class="alert alert-danger w-100"
            >
              <div
                class="alert-text"
                v-for="(error, i) in errors.password"
                :key="i"
              >
                {{ error }}
              </div>
            </div>
          </v-row>
          <v-row class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <v-checkbox></v-checkbox>
              <span class="text-primary"> Remember me.</span>
            </div>
            <router-link to="/forgot-password">Forgot Password</router-link>
          </v-row>
          <v-row>
            <v-btn
              :loading="isSubmitting"
              rounded
              color="primary"
              dark
              block
              large
              @click="onSubmit"
              >SIGN IN</v-btn
            >
          </v-row>
        </v-container>
      </v-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
import { mapState } from "vuex";
import { LOGIN, LOGOUT } from "@/core/services/store/auth.module";

import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "login",
  data() {
    return {
      form: {
        username: "ryan+700489@limestone.network",
        password: "aA123456!"
      },
      items: ["Investor"],
      isSubmitting: false
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        username: null,
        password: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      this.isSubmitting = true;

      const username = this.$v.form.username.$model;
      const password = this.$v.form.password.$model;

      // // clear existing errors
      this.$store.dispatch(LOGOUT);

      await this.$store
        .dispatch(LOGIN, { username, password })
        .then(() => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(() => {
          console.log("err");
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>
