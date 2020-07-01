<template>
	<div class="row mt-5">
		<div class="col-12">
			<div class="p-5" style="background-color: #F2F3FF">
				<p class="text-primary mb-0 font-weight-boldest ls-2">MY CURRENT INVESTMENTS</p>
			</div>
		</div>
		<div class="col-12 mt-3">
			<investment v-for="(investment, index) in investments" :key="index" :investment="investment" />
		</div>
	</div>
</template>

<script>
import store from "@/core/services/store";
import { GET_CURRENT_INVESTMENTS } from "@/core/services/store/investments.module";
import { mapState } from "vuex";
import Investment from "@/view/content/investments/Investment.vue";

export default {
	name: "MyInvestments",
	async beforeRouteEnter(to, from, next) {
		await store.dispatch(GET_CURRENT_INVESTMENTS);
		next();
	},
	components: {
		Investment
	},
	computed: {
		...mapState({
			investments: state => state.investments.current
		})
	}
};
</script>
