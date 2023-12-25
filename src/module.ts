import { addComponentsDir, addImports, createResolver, defineNuxtModule } from '@nuxt/kit';

import type { ModuleOptions } from '../types';

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-strapi-blocks-renderer',
        configKey: 'strapiBlocksRenderer',
    },

    defaults: {},

    setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);
        const resolveRuntimeModule = (path: string): string => resolve('./runtime', path);

        addImports([
            { name: 'useBlocksText', as: 'useBlocksText', from: resolveRuntimeModule('./composables/useBlocksText') },
        ]);

        addComponentsDir({
            path: resolve('./runtime/components'),
            pathPrefix: false,
            prefix: '',
            global: true,
        });
    },
});
