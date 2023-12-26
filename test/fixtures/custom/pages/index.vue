<script setup lang="ts">
    import sampleNodes from '#strapi-blocks-renderer/.fixtures/sampleBlockNodes.json';
</script>

<template>
    <div>
        <StrapiBlocksText :nodes="sampleNodes" />
    </div>
</template>
