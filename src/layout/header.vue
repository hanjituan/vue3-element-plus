<template>
	<div class="flex items-center  px-4">
		<!-- <img class="w-12 mr-4 rounded-full :hover:animate-spin" src="@/assets/images/head.png" alt="" /> -->
		<img class="w-12 mr-4 rounded-full" :src="imageSrc" alt="" :class="{ 'animate-spin': isHovering }"
			@mouseover="isHovering = true" @mouseleave="isHovering = false" />

		<div class="text-xl font-bold">
			后台管理系统
		</div>

		<div class="user-info ml-auto">
			<el-dropdown placement="top-start">
				<el-button> <el-icon>
						<Bell />
					</el-icon> </el-button>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>个人中心</el-dropdown-item>
						<el-dropdown-item>修改密码</el-dropdown-item>
						<el-dropdown-item>修改密码</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Bell } from '@element-plus/icons-vue'
import imageSrc from '@/assets/images/head.png';

const isHovering = ref(false)


</script>
<style lang="less" scoped></style>
