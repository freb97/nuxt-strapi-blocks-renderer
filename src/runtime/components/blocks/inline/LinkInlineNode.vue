<script setup lang="ts">
    const props = defineProps<{
        url: string;
    }>();
</script>

<template>
    <a :href="props.url">
        <slot />
    </a>
</template>
