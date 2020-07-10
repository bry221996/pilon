<template>
  <div class="row">
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
                  <v-col cols="5">
                    <inline-svg
                      height="100%"
                      class="w-100"
                      src="media/pilons/pilon_credit_card.svg"
                    ></inline-svg>
                  </v-col>
                  <v-col cols="3">
                    <inline-svg
                      height="100%"
                      class="w-100"
                      src="media/pilons/pilon_credit_card.svg"
                    ></inline-svg>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">
                          NAME ON CARD
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">CARD NUMBER</p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">CCV</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      class="my-0 py-1"
                      :items="months"
                      placeholder="MM"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">Month</p>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      class="my-0 py-1"
                      :items="years"
                      placeholder="YYYY"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">YEAR</p>
                      </template>
                    </v-select>
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
export default {
  name: "CreditCard",
  data() {
    return {
      months: [
        { value: 1, text: "January" },
        { value: 2, text: "February" },
        { value: 3, text: "March" },
        { value: 4, text: "April" },
        { value: 5, text: "May" },
        { value: 6, text: "June" },
        { value: 7, text: "July" },
        { value: 8, text: "August" },
        { value: 9, text: "September" },
        { value: 10, text: "October" },
        { value: 11, text: "November" },
        { value: 12, text: "December" }
      ]
    };
  },
  computed: {
    years() {
      return Array.from(new Array(20), (x, i) => i + 2020);
    }
  }
};
</script>
