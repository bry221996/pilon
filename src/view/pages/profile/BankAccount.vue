<template>
  <div class="row">
    <div class="col-9">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <inline-svg
              class="w-100"
              src="media/pilons/pilon_bank_account.svg"
            ></inline-svg>
          </div>
          <div class="col-10">
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.account_name.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.account_name.$error"
                      :messages="
                        $v.form.account_name.$error
                          ? 'This field is requred'
                          : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">
                          BANK ACCOUNT HOLDER NAME
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.account_number.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.account_number.$error"
                      :messages="
                        $v.form.account_number.$error
                          ? 'This field is requred'
                          : ''
                      "
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">
                          BANK ACCOUNT NUMBER
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mb-5">
                  <v-col cols="12" class="py-0">
                    <v-radio-group
                      :column="false"
                      v-model="form.account_type"
                      :disabled="fieldsIsDisabled"
                    >
                      <v-radio value="1" class="mr-5">
                        <template slot="label" class="mb-0">
                          <p
                            class="font-weight-boldest text-dark mb-0 pt-1"
                            style="font-size: 1rem"
                          >
                            SAVINGS
                          </p>
                        </template>
                      </v-radio>
                      <v-radio value="2">
                        <template slot="label" class="mb-0">
                          <p
                            class="font-weight-boldest text-dark mb-0 pt-1"
                            style="font-size: 1rem"
                          >
                            CURRENT
                          </p>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      color="#707070"
                      :items="banks"
                      placeholder="Bank Name"
                      class="my-0 py-1"
                      v-model="$v.form.bank_name.$model"
                      :error="$v.form.bank_name.$error"
                      :disabled="fieldsIsDisabled"
                      :messages="
                        $v.form.bank_name.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">Bank</p>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      v-model="$v.form.branch_code.$model"
                      :disabled="fieldsIsDisabled"
                      :error="$v.form.branch_code.$error"
                      :messages="
                        $v.form.branch_code.$error
                          ? 'This field is requred'
                          : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">BANK Code</p>
                      </template>
                    </v-text-field>
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
                      >Submit</v-btn
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
        src="media/pilons/pilon_bank_account_bg.svg"
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

export default {
  name: "BankAccount",
  mixins: [validationMixin],
  data() {
    return {
      isSubmitting: false,
      banks: [],
      form: {
        branch_code: "",
        account_number: "",
        account_name: "",
        account_type: 2,
        bank_name: null
      }
    };
  },
  validations: {
    form: {
      branch_code: {
        required
      },
      account_number: {
        required
      },
      account_type: {
        required
      },
      account_name: {
        required
      },
      bank_name: {
        required
      }
    }
  },
  computed: {
    ...mapState({
      bank: state => state.auth.user.businessInfo.bank,
      fieldsIsDisabled: state => !state.auth.user.personalInfo.is_editable
    })
  },
  mounted() {
    ApiService.get("data-list?expand=banks").then(({ data }) => {
      this.banks = data.data.banks;

      if (this.bank) {
        this.form.account_name = this.bank.account_name;
        this.form.account_number = this.bank.account_number;
        this.form.branch_code = this.bank.branch_code;
        this.form.account_type = this.bank.account_type;
        if (this.banks.includes(this.bank.bank_name)) {
          this.form.bank_name = this.bank.bank_name;
        }
      }
    });
  },
  methods: {
    async update() {
      if (!this.fieldsIsDisabled) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) return;
        this.isSubmitting = true;
        await this.$store.dispatch(UPDATE_PROFILE, {
          kyc_type: 4,
          is_confirm: 1,
          businessInfo: {
            bank: this.form
          }
        });
        this.isSubmitting = false;
      }
      this.$router.push("/profile/personal-details");
    }
  }
};
</script>
