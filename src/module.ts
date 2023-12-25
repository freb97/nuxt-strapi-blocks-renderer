import { addComponentsDir, addImports, createResolver, defineNuxtModule } from '@nuxt/kit';

import type { Nuxt } from '@nuxt/schema';

export type ModuleOptions = {
    prefix: string;
};

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'strapi-blocks-renderer',
        configKey: 'strapiBlocksRenderer',
    },

    defaults: {
        prefix: '',
    },

    setup(options: ModuleOptions, nuxt: Nuxt) {
        const { resolve } = createResolver(import.meta.url);

        const runtimeDirectory: string = resolve('./runtime');

        nuxt.options.alias['#strapi-blocks-renderer'] = resolve(runtimeDirectory);

        addImports([
            {
                name: 'useBlocksText',
                as: 'useBlocksText',
                from: resolve(runtimeDirectory, './composables/useBlocksText') },
        ]);

        addComponentsDir({
            path: resolve(runtimeDirectory, './components'),
            pathPrefix: false,
            prefix: options.prefix,
            global: true,
            priority: 0,
        });

        addComponentsDir({
            path: resolve(runtimeDirectory, './components/blocks'),
            pathPrefix: false,
            prefix: options.prefix,
            global: true,
            priority: -10,
        });
    },
});
