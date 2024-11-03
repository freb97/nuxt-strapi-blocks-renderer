export default defineNuxtConfig({
    modules: [
        '../../src/module',
    ],

    components: {
        dirs: [
            {
                path: '~/components',
                pathPrefix: false,
            },
        ],
        global: true,
    },

    compatibilityDate: '2024-08-15',

    typescript: {
        tsConfig: {
            compilerOptions: {
                resolveJsonModule: true,
            },
        },
    },
});
