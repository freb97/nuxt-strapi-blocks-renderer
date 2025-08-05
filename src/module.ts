import type { ComponentsDir, Nuxt, RuntimeConfig } from '@nuxt/schema';

import { addComponent, addComponentsDir, addImports, createResolver, defineNuxtModule } from '@nuxt/kit';
import { defu } from 'defu';

export interface ModuleOptions {
    prefix: string;
    blocksPrefix: string;
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-strapi-blocks-renderer',
        configKey: 'strapiBlocksRenderer',
        compatibility: {
            nuxt: '>=3.0.0',
        },
    },

    defaults: {
        prefix: '',
        blocksPrefix: 'StrapiBlocksText',
    },

    setup(options: ModuleOptions, nuxt: Nuxt) {
        const { resolve } = createResolver(import.meta.url);

        nuxt.options.alias['#strapi-blocks-renderer'] = resolve('./runtime');

        const runtimeConfig: RuntimeConfig = nuxt.options.runtimeConfig;

        runtimeConfig.public.strapiBlocksRenderer
            = defu(runtimeConfig.public.strapiBlocksRenderer as ModuleOptions, options);

        addImports([
            {
                name: 'useBlocksText',
                as: 'useBlocksText',
                from: resolve('./runtime/composables/useBlocksText'),
            },
        ]);

        addComponent({
            name: `${options.prefix}StrapiBlocksText`,
            filePath: resolve('./runtime/components/StrapiBlocksText.vue'),
            global: true,
        });

        addComponentsDir({
            path: resolve('./runtime/components/blocks'),
            pathPrefix: false,
            prefix: options.blocksPrefix,
            global: true,
            priority: 0,
        });

        nuxt.hook('components:dirs', (componentsDir: (string | ComponentsDir)[]) => {
            componentsDir.push({
                path: resolve('./runtime/components/blocks'),
                pathPrefix: false,
                prefix: options.blocksPrefix,
                global: true,
                priority: -10,
            });
        });
    },
});
