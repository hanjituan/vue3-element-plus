<template>

	<!--渐变背景 bg-gradient-to-br from-blue-500 to-green-500 -->
	<div class="p-0 bg-[#f3f3f3] w-full h-full flex justify-center items-center relative login-page z-index-1">

		<!-- <img src="@/assets/images/login-bg.jpg" alt=""> -->

		<el-form ref="loginFormRef" :model="loginForm" label-width="150" :rules="rules" size="large"
			label-position="top" class="w-500px bg-[#ffffffb6] text-[#262D30] p-8 shadow-md rounded-md ">

			<div class="py-4 font-bold text-xl text-center text-[#262D30] mb-4">
				我 element-plus + vue3 + ts + vite
			</div>

			<el-form-item label="用户名" prop="userName">
				<el-input v-model="loginForm.userName" class="login-form-item" placeholder="请输入用户名" clearable />
			</el-form-item>

			<el-form-item label="密码" prop="password">
				<el-input v-model="loginForm.password" class="login-form-item" placeholder="请输入密码" type="password" />
			</el-form-item>

			<el-form-item>
				<el-button class="w-120px" type='primary' @click='login' :loading="loading">登录</el-button>
				<el-button @click='reset'>重置</el-button>
			</el-form-item>
		</el-form>

		<div class="absolute w-400px right-10px -bottom-200px -z-index-1">
			<img class="w-full" src="@/assets/images/after.png" alt="">
		</div>
	</div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const emit = defineEmits(['update:visible', 'refresh'])
const router = useRouter()

const loading = ref(false)
const loginFormRef = ref<any>()

const loginForm = ref<any>({
	userName: undefined,
	password: undefined
})

const rules = reactive({
	userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const reset = () => {
	loginFormRef.value?.resetFields()
}

function loginRequest(params: any) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true)
		}, 1000 || params.dutation)
	})
}

const login = async () => {
	await loginFormRef?.value?.validate(async (valid: boolean) => {
		if (!valid) {
			return
		}
		try {
			loading.value = true
			await loginRequest(loginForm?.value)
			ElMessage.success('登录成功')
			router.push('layout')
		} catch (error) {
			console.log('confirmDialog:', error)
		} finally {
			loading.value = false
		}
	})
}

</script>

<style scoped>
.login-page {
	background-image: url('@/assets/images/login-bg.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

.login-form-item {
	padding: 0;
}

.login-form-item>>>.el-input__inner:focus {
	--tw-ring-color: transparent
}
</style>
