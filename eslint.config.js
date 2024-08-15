import antfu from '@antfu/eslint-config';

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    files: ['**/*.vue'],
    rules: {
      'style/indent': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-indent': ['warn', 4],
      'vue/script-indent': ['warn', 4, {
        baseIndent: 1,
      }],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'style/indent': ['warn', 4],
    },
  },
  {
    rules: {
      'style/semi': ['warn', 'always'],
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
    },
  },
);
