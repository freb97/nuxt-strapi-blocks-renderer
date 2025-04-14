<script setup lang="ts">
import type { BlockNode } from '#strapi-blocks-renderer/types';

import sampleNodes from '#strapi-blocks-renderer/../.fixtures/sampleBlockNodes.json';

const nodes = sampleNodes as BlockNode[];
</script>

<template>
    <div class="flex flex-col w-full p-8 lg:items-center">
        <Header />

        <StrapiBlocksText :nodes="nodes" />
    </div>
</template>
