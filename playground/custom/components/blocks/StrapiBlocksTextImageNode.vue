<script setup lang="ts">
const props = defineProps<{
    image: Record<string, string>;
}>();
</script>

<template>
    <img
        style="background: red;"
        :src="props.image.url"
        :alt="props.image.alternativeText"
        :width="props.image.width"
        :height="props.image.height"
    >
</template>
