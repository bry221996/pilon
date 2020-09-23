<template>
  <div class="row">
    <div class="col-9">
      <div class="container-fluid" v-if="loaded">
        <div class="row">
          <div class="col-12">
            <b-alert
              variant="success"
              :show="dismissCountDown"
              dismissible
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
              >User Profile Successfully Updated</b-alert
            >
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <inline-svg
              class="w-100"
              src="media/pilons/pilon_personal_details.svg"
            ></inline-svg>
          </div>
          <div class="col-10">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.first_name.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.first_name.$error"
                      :messages="
                        $v.form.first_name.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">FIRST NAME</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.last_name.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.last_name.$error"
                      :messages="
                        $v.form.last_name.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">LAST NAME</p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      disabled
                      :value="authUser.email"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">EMAIL</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6" class="d-flex">
                    <v-select
                      style="width: 4rem"
                      :items="countryCodes"
                      placeholder
                      item-value="code"
                      item-text="code"
                      class="my-0 py-1"
                      v-model="form.mobile_cc"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.mobile_no.$error"
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">MOBILE</p>
                      </template>
                    </v-select>
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.mobile_no.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.mobile_no.$error"
                      :messages="
                        $v.form.mobile_no.$error ? 'This field is requred' : ''
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.line1.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.line1.$error"
                      :messages="
                        $v.form.line1.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">ADDRESS</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.line2.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.line2.$error"
                      :messages="
                        $v.form.line2.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark"></p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.postal.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.postal.$error"
                      :messages="
                        $v.form.postal.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">POST CODE</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :items="countries"
                      placeholder
                      class="my-0 py-1"
                      v-model="$v.form.country_id.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.country_id.$error"
                      :messages="
                        $v.form.country_id.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">COUNTRY</p>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
                <v-row class="d-flex justify-content-end">
                  <v-col cols="6">
                    <v-btn
                      rounded
                      :loading="isSubmitting"
                      color="primary"
                      block
                      large
                      @click="updateProfile"
                      >Next</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <inline-svg
        class="w-100"
        src="media/pilons/pilon_personal_details_bg.svg"
      ></inline-svg>
    </div>
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import { UPDATE_PROFILE } from "@/core/services/store/auth.module";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "PersonalDetails",
  mixins: [validationMixin],
  data() {
    return {
      loaded: false,
      dismissCountDown: 0,
      isSubmitting: false,
      form: {
        first_name: "",
        last_name: "",
        country_id: 0,
        mobile_no: null,
        mobile_cc: null,
        postal: "",
        line1: "",
        line2: ""
      },
      changePassword: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      countryCodes: []
    };
  },
  validations: {
    form: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      country_id: {
        required
      },
      postal: {
        required
      },
      line1: {
        required
      },
      line2: {
        required
      },
      mobile_cc: {
        required
      },
      mobile_no: {
        required
      }
    }
  },
  computed: {
    ...mapState({
      authUser: state => state.auth.user,
      countries: state => state.auth.countries,
      fieldsIsDisabled: state => !state.auth.user.personalInfo.is_editable
    }),
    formParams() {
      return {
        kyc_type: 4,
        personalInfo: {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          mobile_no: this.form.mobile_no,
          mobile_cc: this.form.mobile_cc,
          address: {
            type: "",
            country_id: this.form.country_id,
            postal: this.form.postal,
            line1: this.form.line1,
            line2: this.form.line2
          }
        }
      };
    }
  },
  async mounted() {
    const COUNTRY_CODES_RESPONSE = await ApiService.get(
      "/data-list?expand=country-codes"
    );
    this.countryCodes = COUNTRY_CODES_RESPONSE.data.data["country-codes"];
    this.form.first_name = this.authUser.personalInfo.first_name;
    this.form.last_name = this.authUser.personalInfo.last_name;
    this.form.country_id = this.authUser.personalInfo.address.country_id;
    this.form.postal = this.authUser.personalInfo.address.postal;
    this.form.line1 = this.authUser.personalInfo.address.line1;
    this.form.line2 = this.authUser.personalInfo.address.line2;
    this.form.mobile_cc = this.authUser.personalInfo.mobile_cc;
    this.form.mobile_no = this.authUser.personalInfo.mobile_no;
    if (!this.form.mobile_no && !this.mobile_cc) {
      axios.get("https://ipapi.co/json/").then(({ data }) => {
        const location = this.countryCodes.find(
          c => c.name == data.country_name
        );
        if (location) {
          this.form.mobile_cc = location.code;
        }
      });
    }
    this.loaded = true;
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    async updateProfile() {
      if (!this.fieldsIsDisabled) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) return;
        this.isSubmitting = true;
        await this.$store.dispatch(UPDATE_PROFILE, this.formParams);
        this.dismissCountDown = 5;
        this.isSubmitting = false;
      }
      this.$router.push("/profile/company-details");
    }
  }
};
</script>
