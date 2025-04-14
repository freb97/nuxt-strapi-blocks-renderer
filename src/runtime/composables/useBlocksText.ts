import type { BlockNode } from '#strapi-blocks-renderer/types';
import type { VNode } from 'vue';

import { useRuntimeConfig } from '#imports';
import { renderBlocks } from '#strapi-blocks-renderer/utils';

export interface UseBlocksTextReturn {
    text: VNode[];
}

export const useBlocksText = (blockNodes: BlockNode[]): UseBlocksTextReturn => {
    const prefix = useRuntimeConfig().public.strapiBlocksRenderer.blocksPrefix as string;

    const textNodes: VNode[] = renderBlocks(blockNodes, prefix);

    return {
        text: textNodes,
    };
};
