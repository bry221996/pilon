<template>
  <div class="row">
    <div class="col-9">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <inline-svg
              class="w-100"
              src="media/pilons/pilon_company details.svg"
            ></inline-svg>
          </div>
          <div class="col-10">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.name.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.name.$error"
                      :messages="
                        $v.form.name.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">
                          COMPANY NAME
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.email.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.email.$error"
                      :messages="emailMessage"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">EMAIL</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.website.$model"
                      :error="$v.form.website.$error"
                      :disabled="fieldsIsDisabled"
                      :messages="websiteMessage"
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">Website</p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder="Address Line 1"
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.line1.$model"
                      :error="$v.form.line1.$error"
                      :disabled="fieldsIsDisabled"
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
                      placeholder="Address Line 2"
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
                      placeholder="123456"
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
                      placeholder="Country"
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
                      :loading="isSubmitting"
                      rounded
                      color="primary"
                      block
                      large
                      @click="update"
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
        src="media/pilons/pilon_company details_bg.svg"
      ></inline-svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required, url, email } from "vuelidate/lib/validators";
import { UPDATE_PROFILE } from "@/core/services/store/auth.module";

export default {
  name: "CompanyDetails",
  mixins: [validationMixin],
  data() {
    return {
      isSubmitting: false,
      form: {
        name: "",
        email: "",
        website: "",
        country_id: null,
        postal: "",
        line1: "",
        line2: ""
      }
    };
  },
  validations: {
    form: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      website: {
        required,
        url
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
      }
    }
  },
  computed: {
    ...mapState({
      business: state => state.auth.user.businessInfo,
      countries: state => state.auth.countries,
      fieldsIsDisabled: state => !state.auth.user.personalInfo.is_editable
    }),
    emailMessage() {
      if (this.$v.form.email.$error) {
        if (!this.$v.form.email.required) {
          return "This field is required";
        }

        if (!this.$v.form.email.email) {
          return "This field must be email";
        }
      }
      return "";
    },
    websiteMessage() {
      if (this.$v.form.website.$error) {
        if (!this.$v.form.website.required) {
          return "This field is required";
        }

        if (!this.$v.form.website.url) {
          return "This field must be url";
        }
      }
      return "";
    },
    formParams() {
      return {
        kyc_type: 4,
        businessInfo: {
          company: {
            name: this.form.name,
            email: this.form.email,
            website: this.form.website
          },
          registeredAddress: {
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
  mounted() {
    this.form.name = this.business.company.name;
    this.form.email = this.business.company.email;
    this.form.website = this.business.company.website;
    if (this.business.registeredAddress) {
      this.form.country_id = this.business.registeredAddress.country_id;
      this.form.postal = this.business.registeredAddress.postal;
      this.form.line1 = this.business.registeredAddress.line1;
      this.form.line2 = this.business.registeredAddress.line2;
    }
  },
  methods: {
    async update() {
      if (!this.fieldsIsDisabled) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) return;
        this.isSubmitting = true;
        await this.$store.dispatch(UPDATE_PROFILE, this.formParams);
        this.isSubmitting = false;
      }
      this.$router.push("/profile/credit-card");
    }
  }
};
</script>
