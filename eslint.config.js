import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
    features: {
        tooling: true,
        typescript: {
            strict: true,
        },
        stylistic: {
            indent: 4,
            semi: true,
        },
    },
}).override('nuxt/vue/rules', {
    rules: {
        'vue/block-lang': [ 'error', { script: { lang: 'ts' } } ],
        'vue/block-order': [ 'error', { order: [ 'script', 'template', 'style' ] } ],
        'vue/component-name-in-template-casing': [ 'error', 'PascalCase', { registeredComponentsOnly: false } ],
        'vue/multi-word-component-names': 'off',
        'vue/no-ref-object-reactivity-loss': 'error',
    },
}).override('nuxt/stylistic', {
    rules: {
        '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
        '@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
    },
}).override('nuxt/import/rules', {
    rules: {
        'import/order': [ 'error', {
            'groups': [
                'type',
                [ 'builtin', 'external' ],
                [ 'internal', 'parent', 'sibling', 'index', 'object' ],
            ],
            'newlines-between': 'always',
            'alphabetize': {
                order: 'asc',
            },
        } ],
    },
}).append({
    rules: {
        'prefer-template': [ 'error' ],
        'no-unused-vars': [ 'error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' } ],
    },
});
