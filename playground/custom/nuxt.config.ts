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
});
