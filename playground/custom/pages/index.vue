<script setup lang="ts">
import type { BlockNode } from '#strapi-blocks-renderer/types';

import sampleNodes from '#strapi-blocks-renderer/../.fixtures/sampleBlockNodes.json';

const nodes = sampleNodes as BlockNode[];
</script>

<template>
    <div class="flex flex-col w-full p-8 lg:items-center">
        <NuxtLink
            to="https://github.com/freb97/nuxt-strapi-blocks-renderer"
            class="w-full flex items-center justify-between mb-12 lg:mb-24"
        >
            <img
                src="/assets/img/nuxt-strapi-blocks-renderer.png"
                class="w-auto h-6 md:h-10"
            >

            <h1 class="text-lg font-bold mt-1 md:text-2xl">
                Strapi Blocks Renderer
            </h1>
        </NuxtLink>

        <StrapiBlocksText :nodes="nodes" />
    </div>
</template>
