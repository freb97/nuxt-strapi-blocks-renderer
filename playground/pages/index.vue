<script setup lang="ts">
    import sampleNodes from '../sampleNodes.json';
</script>

<template>
    <div>
        <h1>Strapi blocks text renderer</h1>

        <StrapiBlocksText :nodes="sampleNodes" />
    </div>
</template>
