// # ❌ 错误的提交信息
// git commit - m "更新代码"

// # ✅ 正确的提交信息
// git commit - m "feat: 添加暗黑模式支持"


module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				'feat',     // 新功能
				'fix',      // 修复bug
				'docs',     // 文档修改
				'style',    // 代码格式修改
				'refactor', // 代码重构
				'perf',     // 性能优化
				'test',     // 测试用例修改
				'chore',    // 其他修改
				'revert',   // 回滚
				'build',    // 打包
				'ci'        // CI配置
			]
		],
		'type-case': [2, 'always', 'lower'],
		'type-empty': [2, 'never'],
		'scope-empty': [0],
		'scope-case': [0],
		'subject-full-stop': [0],
		'subject-case': [0],
		'header-max-length': [0, 'always', 72]
	}
}
