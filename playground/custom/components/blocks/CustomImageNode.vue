<script setup lang="ts">
const props = defineProps<{
    image: Record<string, string>;
}>();
</script>

<template>
    <img
        class="bg-gray-100 rounded-md overflow-hidden mb-4"
        :src="props.image.url"
        :alt="props.image.alternativeText"
        :width="props.image.width"
        :height="props.image.height"
    >
</template>
