<script setup lang="ts">
const props = defineProps<{
    url: string;
    rel?: string;
    target?: string;
}>();
</script>

<template>
    <a
        class="text-blue-500 underline"
        :href="props.url"
        :target="props.target"
        :rel="props.rel"
    >
        <slot />
    </a>
</template>
