export default defineNuxtConfig({
    compatibilityDate: '2024-08-15',

    modules: [
        '../../src/module',
    ],

    typescript: {
        tsConfig: {
            compilerOptions: {
                resolveJsonModule: true,
            },
        },
    },

    components: {
        dirs: [
            {
                path: '~/components',
                pathPrefix: false,
            },
        ],
        global: true,
    },
});
