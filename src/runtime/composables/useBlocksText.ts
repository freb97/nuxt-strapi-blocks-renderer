import type { BlockNode } from '#strapi-blocks-renderer/types';
import type { VNode } from 'vue';

import { renderBlocks } from '#strapi-blocks-renderer/utils';

export interface UseBlocksTextReturn {
    text: VNode[];
}

export const useBlocksText = (blockNodes: BlockNode[]): UseBlocksTextReturn => {
    const textNodes: VNode[] = renderBlocks(blockNodes);

    return {
        text: textNodes,
    };
};
