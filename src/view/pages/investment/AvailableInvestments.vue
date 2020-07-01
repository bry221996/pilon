<template>
	<div class="row mt-5">
		<div class="col-12">
			<div class="p-5" style="background-color: #F2F3FF">
				<p class="text-primary mb-0 font-weight-boldest ls-2">LATEST AVAILABLE INVESTMENTS</p>
			</div>
		</div>
		<div class="col-12 mt-3">
			        <project
          v-for="(project, index) in projects"
          :key="index"
          :project="project"
        />
		</div>
	</div>
</template>

<script>
import store from "@/core/services/store";
import { GET_AVAILABLE_PROJECTS } from "@/core/services/store/projects.module";
import { mapState } from "vuex";
import Project from "@/view/content/projects/Project.vue";

export default {
	name: "AvailableInvestments",
	async beforeRouteEnter(to, from, next) {
		await store.dispatch(GET_AVAILABLE_PROJECTS);
		next();
	},
	components: {
		Project
	},
	computed: {
		...mapState({
			projects: state => state.projects.available
		})
	}
};
</script>
