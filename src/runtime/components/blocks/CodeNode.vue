<script setup lang="ts">
const _props = defineProps<{
    language?: string;
}>();
</script>

<template>
    <pre><slot /></pre>
</template>
