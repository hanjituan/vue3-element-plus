<template>
	<div class="app-wraper border h-full w-full overflow-hidden flex flex-wrap">
		<Header class="w-full h-60px border" />
		<SideMenu class=" h-[calc(100%-60px)] overflow-auto" />
		<div class="main relative w-full h-[calc(100%-60px)] overflow-auto">
			<router-view />
			<Footer class="absolute bottom-0 left-0 border w-full h-40px flex justify-center items-center" />
		</div>
	</div>
</template>
<script lang="ts">
import Header from './header.vue';
import Footer from './footer.vue';
import { defineComponent } from 'vue';
import SideMenu from './SideMenu.vue';
export default defineComponent({
	name: 'Layout',
	components: {
		SideMenu,
		Header,
		Footer,
	},

	setup() {

		return
	}
});

</script>
<style scoped>
.app-wraper {
	border: 1px solid red;
}
</style>
