<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-12">
        <div
          class="p-5 d-flex justify-content-between"
          style="background-color: #F2F3FF"
        >
          <p class="text-primary mb-0 font-weight-boldest ls-2">
            CREATE AUTO INVEST RULE
          </p>
        </div>
      </div>
    </div>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="form.name"
              label="Name of the rule"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="form.allocation_limit"
              type="number"
              label="Allocation Limit"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-card class="px-0 mx-0" flat color="transparent">
              <v-subheader>Interest Range (0%-20%)</v-subheader>

              <v-card-text class="px-0">
                <v-range-slider
                  v-model="form.interest_range"
                  thumb-label
                  min="1"
                  max="20"
                  ticks
                ></v-range-slider>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="px-0 mx-0" flat color="transparent">
              <v-subheader>Interest Tenure (1-12 months)</v-subheader>

              <v-card-text class="px-0">
                <v-range-slider
                  v-model="form.tenure"
                  thumb-label
                  min="1"
                  max="12"
                  ticks
                ></v-range-slider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-primary mb-0 font-weight-boldest">INDUSTRIES</p>
          </v-col>
        </v-row>
        <v-row v-for="row in 4" :key="row">
          <v-col class="py-0" v-for="col in 4" :key="col" cols="3">
            <v-checkbox
              v-model="form.industries"
              class="mt-0"
              :value="(row - 1) * 4 + (col - 1)"
            >
              <template slot="label" class="ss">
                <p style="font-size: 1rem" class="mb-0">
                  {{ industries[(row - 1) * 4 + (col - 1)] }}
                </p>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-content-end">
          <v-col cols="4">
            <v-btn :disabled="!formIsValid" :loading="isSubmitting" rounded color="primary" block large @click="addRule">SAVE</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ADD_RULE } from "@/core/services/store/rules.module";
export default {
  name: "AutoInvestCreate",
  data() {
    return {
      isSubmitting: false,
      form: {
        name: "",
        interest_range: [1, 20],
        tenure: [1, 12],
        allocation_limit: null,
        industries: [],
        status: true
      }
    };
  },
  computed: {
    ...mapState({
      industries: state => state.rules.industries
    }),
    formIsValid() {
      return !! this.form.name && !!this.form.allocation_limit && !!this.form.industries.length;
    }
  },
  methods: {
    addRule() {
      this.isSubmitting = true;
      this.$store.commit(ADD_RULE, this.form);
      this.isSubmitting = false;
      this.$router.push('/auto-invest');
    }
  }
};
</script>
