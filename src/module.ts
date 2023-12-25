import { defineNuxtModule } from '@nuxt/kit';

import type { Nuxt } from '@nuxt/schema';
import type { ModuleOptions } from '../types';

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-strapi-blocks-renderer',
        configKey: 'strapiBlocksRenderer',
    },

    defaults: {},

    setup(options: ModuleOptions, nuxt: Nuxt) {

    },
});
