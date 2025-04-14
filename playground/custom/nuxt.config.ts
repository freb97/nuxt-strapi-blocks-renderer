export default defineNuxtConfig({
    modules: [
        '../../src/module',
        '@nuxtjs/tailwindcss',
    ],

    components: {
        dirs: [
            {
                path: '~/components/blocks',
                pathPrefix: false,
                global: true,
            },
            {
                path: '~/components',
                pathPrefix: false,
            },
        ],
    },

    runtimeConfig: {
        public: {
            strapiBlocksRenderer: {
                prefix: 'Custom',
                blocksPrefix: 'Custom',
            },
        },
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
