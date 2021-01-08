// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
    browser: true
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
  rules: {
    // 变量名必须使用驼峰式
    // @off 暂不限制
    camelcase: 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-unused-vars': [2, {
    //   // 允许声明未使用变量
    //   vars: 'local',
    //   // 参数不检查
    //   args: 'none'
    // }],
    'no-unused-vars': [1, { vars: 'all', args: 'none' }], // 不能有声明后未被使用的变量或参数
    'no-new': 1, // 禁止在使用new构造一个实例后不赋值
    'no-new-func': 1, // 禁止使用new Function
    'no-new-object': 2, // 禁止使用new Object()
    'no-new-require': 2, // 禁止使用new require
    'no-new-wrappers': 2// 禁止使用new创建包装实例，new String new Boolean new Number
  }
}
