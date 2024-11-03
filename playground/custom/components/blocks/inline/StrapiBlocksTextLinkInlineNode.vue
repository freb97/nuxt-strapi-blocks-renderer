<script setup lang="ts">
const props = defineProps<{
    url: string;
}>();
</script>

<template>
    <a
        style="color: red;"
        :href="props.url"
    >
        <slot />
    </a>
</template>
