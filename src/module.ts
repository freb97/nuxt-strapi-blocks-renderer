import { defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'nuxt-strapi-blocks-renderer',
        configKey: 'strapiBlocksRenderer'
    },

    defaults: {},

    setup(options, nuxt) {

    }
})
