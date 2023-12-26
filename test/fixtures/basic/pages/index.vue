<script setup lang="ts">
    import sampleBlockNodes from '#strapi-blocks-renderer/.fixtures/sampleBlockNodes.json';
</script>

<template>
    <div>
        <StrapiBlocksText :nodes="sampleBlockNodes" />
    </div>
</template>
