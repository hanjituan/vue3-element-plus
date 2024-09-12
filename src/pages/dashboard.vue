<template>
	<div>
		vue3 script setup
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
onMounted(() => {
	console.log('onMounted');
});
</script>
<style lang="less" scoped></style>
