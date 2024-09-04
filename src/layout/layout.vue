<template>
	<div class="app-wraper border h-full w-full overflow-hidden flex flex-wrap">
		<Header class="w-full h-60px border" />
		<SideMenu class=" h-[calc(100%-100px)] overflow-auto" />
		<div class="main">
			<router-view />
		</div>
		<Footer class="border w-full h-40px flex justify-center items-center" />
	</div>
</template>
<script lang="ts" setup>
import SideMenu from './SideMenu.vue';
import Header from './header.vue';
import Footer from './footer.vue';

</script>
<style scoped>
.app-wraper {
	border: 1px solid red;
}
</style>
