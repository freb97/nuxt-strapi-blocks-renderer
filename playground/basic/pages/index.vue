<script setup lang="ts">
    import sampleNodes from '../../../src/runtime/.fixtures/sampleBlockNodes.json';

    import type { BlockNode } from '#strapi-blocks-renderer/types';

    const nodes = sampleNodes as BlockNode[];
</script>

<template>
    <div>
        <StrapiBlocksText :nodes="nodes" />
    </div>
</template>
