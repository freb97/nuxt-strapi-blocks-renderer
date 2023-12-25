<script setup lang="ts">
    import { useBlocksText } from '../composables/useBlocksText';

    import type{ BlockNode } from '../../../types';

    const props = defineProps<{
        nodes: BlockNode[];
    }>();

    const { text: RenderText } = useBlocksText(props.nodes);
</script>

<template>
    <RenderText />
</template>
