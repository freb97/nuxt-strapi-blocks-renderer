import { renderBlocks } from '#strapi-blocks-renderer/utils';

import type { VNode } from 'vue';
import type { BlockNode } from '#strapi-blocks-renderer/types';

export type UseBlocksTextReturn = {
    text: VNode[];
};

export const useBlocksText = (blockNodes: BlockNode[]): UseBlocksTextReturn => {
    const textNodes: VNode[] = renderBlocks(blockNodes);

    return {
        text: textNodes,
    };
};
