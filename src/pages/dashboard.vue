<template>
	<div class="p-4">
		vue3 script setup
	</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

const init = () => {
	// 写的有缺陷
	var a = '1[3[a]2[b]3[c4[d]]]'

	const numberArr: string[] = [];
	const letterArr: string[] = [];

	/**
	 * 准备一个数组 numberArr，用于存放数字
	 * 准备一个数组 letterArr，用于存放字母
	 * 如果遇到数字，则将其存入 numberArr
	 * 如果遇到[ ，则将一个空字符串存入 letterArr
	 * 如果遇到字母, 则将 letterArr 的最后一个元素与字母拼接
	 * 如果遇到 ] , 则将numberArr 的最后一个元素弹出, 作为 letterArr 的最后一个元素的重复次数
	 */

	for (let index = 0; index < a.length; index++) {
		const element = a[index];
		if (!isNaN(Number(element))) {
			numberArr.push(element)
		}
		if (element == '[') {
			letterArr.push('')
		}
		// 如果 element 是字母
		if (isLetter(element)) {
			letterArr[letterArr.length - 1] = element
		}
		if (element == ']') {
			const num = numberArr.pop()
			const letter = letterArr.pop()
			letterArr[letterArr.length - 1] += letter.repeat(num)
		}
	}
}

// 定义一个函数，接受一个字符作为参数
function isLetter(character) {
	return /[a-zA-Z]/.test(character);
}

onMounted(() => {
	init()
});
</script>
<style lang="less" scoped></style>
