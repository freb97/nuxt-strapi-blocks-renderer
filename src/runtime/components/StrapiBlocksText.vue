<script setup lang="ts">
    import type { VNode } from 'vue';
    import type { BlockNode } from '#strapi-blocks-renderer/types';

    import { useBlocksText } from '#strapi-blocks-renderer/composables/useBlocksText';

    const props = defineProps<{
        nodes: BlockNode[]
    }>();

    const { text } = useBlocksText(props.nodes);

    const RenderText = (): VNode[] => {
        return text;
    };
</script>

<template>
    <RenderText />
</template>
