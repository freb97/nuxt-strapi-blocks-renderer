<script setup lang="ts">
import type { BlockNode } from '#strapi-blocks-renderer/types';

import sampleNodes from '#strapi-blocks-renderer/../.fixtures/sampleBlockNodes.json';

const nodes = sampleNodes as BlockNode[];
</script>

<template>
    <div>
        <StrapiBlocksText :nodes="nodes" />
    </div>
</template>
