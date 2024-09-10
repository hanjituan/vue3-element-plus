<template>
	<div class="flex items-center  px-4">

		<img class="w-12 mr-4 rounded-full" src="@/assets/images/head.png" alt=""
			:class="{ 'animate-spin': isHovering }" @mouseover="isHovering = true" @mouseleave="isHovering = false" />

		<div class="text-xl font-bold">
			vite-el-plus-admin
		</div>

		<div class="user-info ml-auto px-4 flex items-center gap-4">
			<el-button>
				<el-icon>
					<Bell />
				</el-icon>
			</el-button>

			<el-switch v-model="value2" class="mt-2" style="margin-left: 24px" inline-prompt :active-icon="Sunny"
				:inactive-icon="Close" />

			<el-dropdown placement="top-start" @command="handleCommand">
				<img class="w-12 rounded-full" src="@/assets/images/head.png" alt="">

				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item command="center">个人中心</el-dropdown-item>
						<el-dropdown-item command="password">修改密码</el-dropdown-item>
						<el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Bell, Close, Sunny } from '@element-plus/icons-vue'

const router = useRouter()
const isHovering = ref(false)

const value2 = ref(false)

const handleCommand = (type: string) => {
	if (type === 'logout') {
		// 退出登录
		router.push('/login')
	}
}
</script>
<style lang="less" scoped></style>
