import type { ConcreteComponent, VNode } from 'vue';

import type {
    BlockNode,
    CodeBlockNode,
    DefaultInlineNode,
    HeadingBlockNode,
    ImageBlockNode,
    LinkInlineNode,
    ListBlockNode,
    ListItemInlineNode,
    ParagraphBlockNode,
    QuoteBlockNode,
    TextInlineNode,
} from '#strapi-blocks-renderer/types';

import type { ModuleOptions } from '#strapi-blocks-renderer/../module';

import { h, resolveComponent, useRuntimeConfig } from '#imports';

const prefix = (): string => {
    const { public: { strapiBlocksRenderer } } = useRuntimeConfig();

    return (strapiBlocksRenderer as ModuleOptions).blocksPrefix;
};

const getNodeText = (node: TextInlineNode): (VNode | string)[] => {
    const lines: (VNode | string)[] = [];

    node.text.split('\n').forEach((line: string, index: number, array: string[]): void => {
        lines.push(line);

        if (index !== array.length - 1) {
            lines.push(h('br'));
        }
    });

    return lines;
};

export const textInlineNode = (node: TextInlineNode): (VNode | string)[] | VNode => {
    const text: (VNode | string)[] = getNodeText(node);

    if (node.bold) return h(resolveComponent(`${prefix()}BoldInlineNode`), () => text);
    if (node.italic) return h(resolveComponent(`${prefix()}ItalicInlineNode`), () => text);
    if (node.underline) return h(resolveComponent(`${prefix()}UnderlineInlineNode`), () => text);
    if (node.strikethrough) return h(resolveComponent(`${prefix()}StrikethroughInlineNode`), () => text);
    if (node.code) return h(resolveComponent(`${prefix()}CodeInlineNode`), () => text);

    return text;
};

export const linkInlineNode = (node: LinkInlineNode): VNode => {
    const linkComponent: string | ConcreteComponent = resolveComponent(`${prefix()}LinkInlineNode`);

    return h(linkComponent, { url: node.url }, () => node.children.map((childNode: TextInlineNode) => {
        return textInlineNode(childNode);
    }));
};

export const defaultInlineNode = (node: DefaultInlineNode): (VNode | string)[] | VNode | undefined => {
    if (node.type === 'link') {
        return linkInlineNode(node);
    }
    else if (node.type === 'text') {
        return textInlineNode(node);
    }
};

export const listItemInlineNode = (node: ListItemInlineNode): VNode => {
    const listItemComponent: string | ConcreteComponent = resolveComponent(`${prefix()}ListItemInlineNode`);

    return h(listItemComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode),
    ));
};

export const headingBlockNode = (node: HeadingBlockNode): VNode => {
    const headingComponent: string | ConcreteComponent = resolveComponent(`${prefix()}Heading${node.level}Node`);

    return h(headingComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode),
    ));
};

export const paragraphBlockNode = (node: ParagraphBlockNode): VNode => {
    const paragraphComponent: string | ConcreteComponent = resolveComponent(`${prefix()}ParagraphNode`);

    return h(paragraphComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode),
    ));
};

export const codeBlockNode = (node: CodeBlockNode): VNode => {
    const codeComponent: string | ConcreteComponent = resolveComponent(`${prefix()}CodeNode`);

    return h(codeComponent, () => node.children.map(
        (childNode: TextInlineNode): (VNode | string)[] | VNode => textInlineNode(childNode),
    ));
};

export const quoteBlockNode = (node: QuoteBlockNode): VNode => {
    const quoteComponent: string | ConcreteComponent = resolveComponent(`${prefix()}QuoteNode`);

    return h(quoteComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode),
    ));
};

export const listBlockNode = (node: ListBlockNode): VNode => {
    const listType: string = node.format === 'ordered' ? 'OrderedListNode' : 'UnorderedListNode';
    const listComponent: string | ConcreteComponent = resolveComponent(prefix() + listType);

    return h(listComponent, () => node.children.map(
        (childNode: ListBlockNode | ListItemInlineNode): VNode | undefined => {
            if (childNode.type === 'list-item') {
                return listItemInlineNode(childNode);
            }

            return listBlockNode(childNode);
        },
    ));
};

export const imageBlockNode = (node: ImageBlockNode): VNode => {
    const imageComponent: string | ConcreteComponent = resolveComponent(`${prefix()}ImageNode`);

    return h(imageComponent, {
        image: node.image,
    });
};

export const renderBlocks = (blockNodes: BlockNode[]): VNode[] => {
    return blockNodes.map((blockNode: BlockNode): VNode => {
        switch (blockNode.type) {
            case 'heading': return headingBlockNode(blockNode);
            case 'code': return codeBlockNode(blockNode);
            case 'list': return listBlockNode(blockNode);
            case 'quote': return quoteBlockNode(blockNode);
            case 'image': return imageBlockNode(blockNode);
            default: return paragraphBlockNode(blockNode);
        }
    });
};
