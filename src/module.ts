import { addComponentsDir, addImports, createResolver, defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';

import type { ComponentsDir, Nuxt } from '@nuxt/schema';
import type { RuntimeConfig } from 'nuxt/schema';

export type ModuleOptions = {
    prefix: string;
    blocksPrefix: string;
};

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'strapi-blocks-renderer',
        configKey: 'strapiBlocksRenderer',
    },

    defaults: {
        prefix: '',
        blocksPrefix: 'StrapiBlocksText',
    },

    setup(options: ModuleOptions, nuxt: Nuxt) {
        const { resolve } = createResolver(import.meta.url);

        const runtimeDirectory: string = resolve('./runtime');

        nuxt.options.alias['#strapi-blocks-renderer'] = resolve(runtimeDirectory);

        const runtimeConfig: RuntimeConfig = nuxt.options.runtimeConfig;
        runtimeConfig.public = defu(runtimeConfig.public, {
            strapiBlocksRenderer: {
                prefix: options.prefix,
                blocksPrefix: options.blocksPrefix,
            },
        });

        addImports([{
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

        nuxt.hook('components:dirs', (componentsDir: (string | ComponentsDir)[]) => {
            componentsDir.push({
                path: resolve(runtimeDirectory, './components/blocks'),
                pathPrefix: false,
                prefix: options.blocksPrefix,
                global: true,
                priority: -10,
            });
        });
    },
});
