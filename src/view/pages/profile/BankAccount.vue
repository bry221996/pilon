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
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">
                          BANK ACCOUNT HOLDER NAME
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">
                          BANK ACCOUNT NUMBER
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-radio-group :column="false">
                      <v-radio value="radio-1" class="mr-5">
                        <template slot="label" class="mb-0">
                          <p
                            class="font-weight-boldest text-dark mb-0 pt-1"
                            style="font-size: 1rem"
                          >
                            SAVINGS
                          </p>
                        </template>
                      </v-radio>
                      <v-radio value="radio-1">
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
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">BANK NAME</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">BANK CODE</p>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field placeholder=" " class="pt-0" color="#707070">
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">BRANCH CODE</p>
                      </template>
                    </v-text-field>
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
export default {
  name: "BankAccount"
};
</script>
