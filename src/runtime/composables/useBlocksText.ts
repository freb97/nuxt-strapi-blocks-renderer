import type { VNode } from 'vue';
import type { BlockNode } from '#strapi-blocks-renderer/types';

import { renderBlocks } from '#strapi-blocks-renderer/utils';

export interface UseBlocksTextReturn {
    text: VNode[]
}

export const useBlocksText = (blockNodes: BlockNode[]): UseBlocksTextReturn => {
    const textNodes: VNode[] = renderBlocks(blockNodes);

    return {
        text: textNodes,
    };
};
