<template>
  <div class="row" v-if="loaded">
    <div class="col-9">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <inline-svg
              class="w-100"
              src="media/pilons/pilon_cc.svg"
            ></inline-svg>
          </div>
          <div class="col-10">
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <div class="d-flex overflow-auto mb-5">
                    <div
                      v-for="(card, i) in cards"
                      :key="i"
                      class="p-1 rounded"
                      style="cursor: pointer"
                      @click="selectCard(card)"
                    >
                      <inline-svg
                        style="width: 150px"
                        height="100%"
                        src="media/pilons/pilon_credit_card.svg"
                      ></inline-svg>
                    </div>
                    <div class="p-1 rounded" style="width: 150px">
                      <div
                        class="h-100 w-100 d-flex"
                        style="cursor: pointer"
                        @click="addNew"
                      >
                        <div
                          class="d-flex my-1 w-100 rounded justify-content-center align-items-center"
                          style="background: #CCCCCC"
                        >
                          <p class="m-0 p-0 font-weight-boldest">ADD CARD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      :disabled="'id' in selectedCard"
                      v-model="$v.form.card_name.$model"
                      :error="$v.form.card_name.$error"
                      :messages="
                        $v.form.card_name.$error ? 'This field is requred' : ''
                      "
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">
                          NAME ON CARD
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      type="number"
                      :disabled="'id' in selectedCard"
                      v-model="$v.form.card_number.$model"
                      :error="$v.form.card_number.$error"
                      :messages="
                        $v.form.card_number.$error
                          ? 'This field is requred'
                          : ''
                      "
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">CARD NUMBER</p>
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
                      :disabled="'id' in selectedCard"
                      v-model="$v.form.ccv.$model"
                      :error="$v.form.ccv.$error"
                      type="number"
                      :messages="ccvMessage"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">CCV</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          color="#707070"
                          readonly
                          class="pt-0"
                          v-bind="attrs"
                          placeholder=" "
                          v-on="on"
                          v-model="$v.form.expiration_date.$model"
                          :error="$v.form.expiration_date.$error"
                          :disabled="'id' in selectedCard"
                          :messages="
                            $v.form.expiration_date.$error
                              ? 'This field is requred'
                              : ''
                          "
                        >
                          <template slot="label">
                            <p class="font-weight-boldest text-dark">
                              Expiration
                            </p>
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        no-title
                        scrollable
                        type="month"
                        :min="min"
                        v-model="form.expiration_date"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-checkbox
                      class="pt-0 mt-0"
                      :true-value="1"
                      :false-value="0"
                      :disabled="'id' in selectedCard"
                      label="Set as primary"
                      v-model.number="form.is_primary"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-row class="d-flex justify-content-end">
                  <v-col cols="6">
                    <v-btn
                      rounded
                      color="primary"
                      :loading="isSubmitting"
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
      <inline-svg class="w-100" src="media/pilons/pilon_cc_bg.svg"></inline-svg>
    </div>
  </div>
</template>

<script>
import { GET_AUTH_CREDIT_CARDS } from "@/core/services/store/auth.module";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import ApiService from "@/core/services/api.service";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "CreditCard",
  mixins: [validationMixin],
  data() {
    return {
      isSubmitting: false,
      selectedCard: {},
      menu: false,
      min: moment()
        .add(1, "month")
        .toISOString()
        .substr(0, 10),
      loaded: false,
      form: {
        card_name: "",
        card_number: "",
        ccv: null,
        expiration_date: null,
        is_primary: 0
      }
    };
  },
  validations: {
    form: {
      card_name: {
        required
      },
      card_number: {
        required
      },
      ccv: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(3)
      },
      expiration_date: {
        required
      }
    }
  },
  computed: {
    ...mapState({
      cards: state => state.auth.creditCards
    }),
    ccvMessage() {
      if (this.$v.form.ccv.$error) {
        if (!this.$v.form.ccv.required) {
          return "This field is required";
        }
        return "This field should have 3 digits";
      }
      return "";
    }
  },
  async mounted() {
    await this.$store.dispatch(GET_AUTH_CREDIT_CARDS);
    this.loaded = true;
    if (this.cards.length) {
      this.selectCard(this.cards[0]);
    }
  },
  methods: {
    async update() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      this.isSubmitting = true;
      if (Object.keys(this.selectedCard).length < 1) {
        await ApiService.post("/kyc/credit-card", this.form);
      }
      this.isSubmitting = false;
    },
    selectCard(card) {
      this.selectedCard = card;
      this.form.card_name = card.card_name;
      this.form.card_number = card.card_number;
      this.form.ccv = card.ccv;
      this.form.expiration_date = card.expiration_date;
      this.form.is_primary = card.is_primary;
    },
    addNew() {
      this.clearForm();
      this.selectedCard = {};
    },
    clearForm() {
      this.form = {
        card_name: "",
        card_number: "",
        ccv: null,
        expiration_date: null,
        is_primary: 0
      };
    }
  }
};
</script>
