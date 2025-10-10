<script setup lang="ts">
const props = defineProps<{
    language?: string;
}>();
</script>

<template>
    <pre
        class="bg-gray-100 p-4 rounded-md mb-4"
        :class="`lang-${props.language || 'plaintext'}`"
    ><slot /></pre>
</template>
