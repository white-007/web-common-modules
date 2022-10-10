module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    // define: true // 忽略define未定义
	},
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eslint-disable-next-line': 'off'
  }
}
