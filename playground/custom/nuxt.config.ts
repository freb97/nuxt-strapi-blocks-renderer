export default defineNuxtConfig({
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
