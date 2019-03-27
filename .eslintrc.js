// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  // 'off' -> 0, 'warn' -> 1, 'error' -> 2
  rules: {
    // 设置：generator 的 * 前面禁止有空格，后面必须有
    'generator-star-spacing': [2, {
      before: false,
      after: true,
    }],
    // 设置：开发模式下允许使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 设置：一条语句后面必须要有分号
    'semi': [2, 'always'],
    // 设置：数组或对象键值对，多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': [2, 'always-multiline'],
    // 设置：必须使用单引号
    'quotes': [2, 'single'],
    // 忽略：缩进设置
    'indent': 0,
    // 忽略：函数名与括号之间必须有空格
    'space-before-function-paren': 0,
    // 忽略：一行结束后面不能有空格
    'no-trailing-spaces': 0,
    // 忽略：禁止使用特殊空白符
    'no-irregular-whitespace': 0,
    // 设置：解决iview中的Col组件闭合报错问题
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    // 忽略：驼峰式写法
    'camelcase': 0,
  }
};
