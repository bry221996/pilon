<template>
	<div class="my-10 container-fluid">
		<div class="row">
			<div class="col-12">
				<funds-summary />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="p-5" style="background-color: #F2F3FF">
					<p class="text-primary mb-0 font-weight-boldest ls-2">LATEST AVAILABLE INVESTMENTS</p>
				</div>
			</div>
			<div class="col-12 mt-3">
				<investment v-for="(investment, index) in investments" :key="index" :investment="investment" />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="p-5 text-center" style="background-color: #E2F5FE">
					<p class="text-info mb-0 font-weight-boldest">VIEW ALL</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FundsSummary from "@/view/content/dashboard/FundsSummary.vue";
import Investment from "@/view/content/investments/Investment.vue";
import store from "@/core/services/store";
import { GET_AUTH_USER } from "@/core/services/store/auth.module";
import { GET_INVESTMENTS } from "@/core/services/store/investments.module";
import { mapState } from "vuex";

export default {
	name: "Dashboard",
	async beforeRouteEnter(to, from, next) {
		await store.dispatch(GET_AUTH_USER);
		await store.dispatch(GET_INVESTMENTS);
		next();
	},
	components: {
		FundsSummary,
		Investment
	},
	computed: {
		...mapState({
			investments: state => state.investments.list
		})
	},
};
</script>
