<script setup lang="ts">
    import sampleNodes from '../sampleNodes.json';
</script>

<template>
    <div>
        <h1>Strapi blocks renderer text</h1>

        <StrapiBlocksText :nodes="sampleNodes" />
    </div>
</template>
