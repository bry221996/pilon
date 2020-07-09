<template>
	<div class="my-10 container-fluid">
		<div class="row">
			<div class="col-8">
				<div class="links">
					<router-link
						v-for="(link, i) in links"
						:key="i"
						:to="link.to"
						class="btn btn-sm rounded-pill mr-3 px-5"
						exact-active-class="btn-info"
					>
						<strong>{{ link.display }}</strong>
					</router-link>
				</div>
			</div>

			<div class="col-4">
				<b-card bg-variant="info" text-variant="white" class="p-0">
					<div style="position: absolute; right: 0.5rem; top: 0.5rem;">
						<i class="fa fa-question-circle" style="color: white"></i>
					</div>
					<b-card-title>USD {{ funds.available | money_format }}</b-card-title>
					<b-card-text>Funds Available</b-card-text>
				</b-card>
			</div>
		</div>
		<transition name="fade-in-up">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { GET_AUTH_USER } from "@/core/services/store/auth.module";

export default {
	name: "Investments",
	data() {
		return {
			links: [
				{ display: "AVAILABLE INVESTMENTS", to: "/investments/available" },
				{ display: "MY INVESTMENTS", to: "/investments/user" },
				{ display: "INVESTMENTS HISTORY", to: "/investments/history" }
			]
		};
	},
	computed: {
		...mapState({
			funds: state => state.auth.user.fundSummary
		})
	},
	mounted() {
		this.$store.dispatch(GET_AUTH_USER);
	}
};
</script>
