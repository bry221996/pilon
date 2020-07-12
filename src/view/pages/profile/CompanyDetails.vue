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
                      :value="business.company.name"
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
                      :value="business.company.email"
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
                      :value="business.company.office_no"
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">CONTACT</p>
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
                      :value="business.registeredAddress.line1"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">
                          ADDRESS LINE 1
                        </p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      :value="business.registeredAddress.line2"
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">
                          ADDRESS LINE 2
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
                      :value="business.registeredAddress.postal"
                    >
                      <template slot="label" class="ss">
                        <p class="font-weight-boldest text-dark">POSTCODE</p>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      placeholder=" "
                      class="pt-0"
                      color="#707070"
                      :value="business.registeredAddress.country_name"
                    >
                      <template slot="label">
                        <p class="font-weight-boldest text-dark">COUNTRY</p>
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
        src="media/pilons/pilon_company details_bg.svg"
      ></inline-svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CompanyDetails",
  computed: {
    ...mapState({
      business: state => state.auth.user.businessInfo
    })
  }
};
</script>
