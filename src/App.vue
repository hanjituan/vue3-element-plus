<template>
	<div class="flex w-full h-full  bg-[#f3f3f3]">
		<SideMenu class="w-220px h-full bg-white p-4" />
		<HelloWorld class="flex-1  h-full" msg="Vite + Vue" />
	</div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import SideMenu from './components/SideMenu.vue'
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<style>
body,
html,
#app {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
