// 文档可以看   https://pro.ant.design/blog/use-eslint-typescript-cn
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {},
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-self-compare': 0,
    'max-classes-per-file': 0,
    'no-underscore-dangle': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'class-methods-use-this': 0,
    'no-lonely-if': 0,
    'no-param-reassign': 0,
    'no-useless-escape': 0,
    'no-plusplus': 0,
    'react/no-typos': 0
  }
};
