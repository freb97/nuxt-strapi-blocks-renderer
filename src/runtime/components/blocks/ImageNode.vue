<script setup lang="ts">
    const props = defineProps<{
        image: any;
    }>();
</script>

<template>
    <img
        :src="props.image.url"
        :alt="props.image.alternativeText"
    >
</template>
