<template>
	<div class="row">
		<div class="col-9">
			<div class="container-fluid">
				<div class="row">
					<div class="col-12">
						<b-alert
							variant="success"
							:show="dismissCountDown"
							dismissible
							@dismissed="dismissCountDown=0"
							@dismiss-count-down="countDownChanged"
						>User Profile Successfully Updated</b-alert>
					</div>
				</div>
				<div class="row">
					<div class="col-2">
						<inline-svg class="w-100" src="media/pilons/pilon_personal_details.svg"></inline-svg>
					</div>
					<div class="col-10">
						<v-form>
							<v-container>
								<v-row>
									<v-col cols="6">
										<v-text-field
											placeholder="Jason"
											class="pt-0"
											color="#707070"
											v-model="$v.form.first_name.$model"
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
											placeholder="Chua"
											class="pt-0"
											color="#707070"
											v-model="$v.form.last_name.$model"
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
											placeholder="jason@bsweep.com"
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
									<v-col cols="6">
										<v-text-field
											placeholder="+6512345678"
											class="pt-0"
											disabled
											color="#707070"
											:value="authUser.mobile_no"
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
											placeholder="Address Line 1"
											class="pt-0"
											color="#707070"
											v-model="$v.form.line1.$model"
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
											placeholder="Address Line 2"
											class="pt-0"
											color="#707070"
											v-model="$v.form.line2.$model"
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
											:disabled="$v.form.$anyError"
											color="primary"
											block
											large
											@click="updateProfile"
										>SAVE</v-btn>
									</v-col>
								</v-row>
							</v-container>
						</v-form>
					</div>
				</div>
			</div>
		</div>
		<div class="col-3">
			<inline-svg class="w-100" src="media/pilons/pilon_personal_details_bg.svg"></inline-svg>
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
	name: "PersonalDetails",
	mixins: [validationMixin],
	data() {
		return {
			dismissCountDown: 5,
			isSubmitting: false,
			countries: [],
			form: {
				first_name: "",
				last_name: "",
				country_id: 0,
				postal: "",
				line1: "",
				line2: ""
			},
			changePassword: false,
			currentPassword: "",
			newPassword: "",
			confirmPassword: ""
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
			}
		}
	},
	computed: {
		...mapState({
			authUser: state => state.auth.user
		}),
		formParams() {
			return {
				kyc_type: "personalInfo",
				personalInfo: {
					first_name: this.form.first_name,
					last_name: this.form.last_name,
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
		const GET_COUNTRIES_RESPONSE = await ApiService.get(
			"/data-list?expand=countries"
		);
		this.countries = GET_COUNTRIES_RESPONSE.data.data.countries.map(country => {
			return { text: country.name, value: parseInt(country.id) };
		});

		this.form.first_name = this.authUser.personalInfo.first_name;
		this.form.last_name = this.authUser.personalInfo.last_name;
		this.form.country_id = this.authUser.personalInfo.address.country_id;
		this.form.postal = this.authUser.personalInfo.address.postal;
		this.form.line1 = this.authUser.personalInfo.address.line1;
		this.form.line2 = this.authUser.personalInfo.address.line2;
	},
	methods: {
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
		},
		async updateProfile() {
			this.isSubmitting = true;
			await this.$store.dispatch(UPDATE_PROFILE, this.formParams);
      this.dismissCountDown = 5;
			this.isSubmitting = false;
		}
	}
};
</script>
