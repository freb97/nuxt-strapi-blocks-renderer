import { h } from 'vue';

import type { VNode } from 'vue';
import type { BlockNode } from '../../../types';

export type UseBlocksTextReturn = {
    text: VNode;
};

export const useBlocksText = (blockNodes: BlockNode[]): UseBlocksTextReturn => {
    const text: VNode = h('div', {}, 'Text');

    return {
        text,
    };
};
