<script setup lang="ts">
const props = defineProps<{
    url: string;
    rel?: string;
    target?: string;
}>();
</script>

<template>
    <a
        :href="props.url"
        :rel="props.rel"
        :target="props.target"
    >
        <slot />
    </a>
</template>
