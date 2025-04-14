<script setup lang="ts">
const props = defineProps<{
    url: string;
}>();
</script>

<template>
    <a
        class="text-blue-500 underline"
        :href="props.url"
        target="_blank"
        rel="noopener noreferrer"
    >
        <slot />
    </a>
</template>
