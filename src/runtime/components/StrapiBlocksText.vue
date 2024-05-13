<script setup lang="ts">
    import { useBlocksText } from '#strapi-blocks-renderer/composables/useBlocksText';

    import type { VNode } from 'vue';
    import type { BlockNode } from '#strapi-blocks-renderer/types';

    const props = defineProps<{
        nodes: BlockNode[];
    }>();

    const { text } = useBlocksText(props.nodes);

    const RenderText = (): VNode[] => {
        return text;
    };
</script>

<template>
    <RenderText />
</template>
