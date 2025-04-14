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
import type { ConcreteComponent, VNode } from 'vue';

import { h, resolveComponent } from 'vue';

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

export const textInlineNode = (node: TextInlineNode, prefix: string): (VNode | string)[] | VNode => {
    const text: (VNode | string)[] = getNodeText(node);

    if (node.bold) return h(resolveComponent(`${prefix}BoldInlineNode`), () => text);
    if (node.italic) return h(resolveComponent(`${prefix}ItalicInlineNode`), () => text);
    if (node.underline) return h(resolveComponent(`${prefix}UnderlineInlineNode`), () => text);
    if (node.strikethrough) return h(resolveComponent(`${prefix}StrikethroughInlineNode`), () => text);
    if (node.code) return h(resolveComponent(`${prefix}CodeInlineNode`), () => text);

    return text;
};

export const linkInlineNode = (node: LinkInlineNode, prefix: string): VNode => {
    const linkComponent: string | ConcreteComponent = resolveComponent(`${prefix}LinkInlineNode`);

    return h(linkComponent, { url: node.url }, () => node.children.map((childNode: TextInlineNode) => {
        return textInlineNode(childNode, prefix);
    }));
};

export const defaultInlineNode = (node: DefaultInlineNode, prefix: string): (VNode | string)[] | VNode | undefined => {
    if (node.type === 'link') {
        return linkInlineNode(node, prefix);
    }
    else if (node.type === 'text') {
        return textInlineNode(node, prefix);
    }
};

export const listItemInlineNode = (node: ListItemInlineNode, prefix: string): VNode => {
    const listItemComponent: string | ConcreteComponent = resolveComponent(`${prefix}ListItemInlineNode`);

    return h(listItemComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode, prefix),
    ));
};

export const headingBlockNode = (node: HeadingBlockNode, prefix: string): VNode => {
    const headingComponent: string | ConcreteComponent = resolveComponent(`${prefix}Heading${node.level}Node`);

    return h(headingComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode, prefix),
    ));
};

export const paragraphBlockNode = (node: ParagraphBlockNode, prefix: string): VNode => {
    const paragraphComponent: string | ConcreteComponent = resolveComponent(`${prefix}ParagraphNode`);

    return h(paragraphComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode, prefix),
    ));
};

export const codeBlockNode = (node: CodeBlockNode, prefix: string): VNode => {
    const codeComponent: string | ConcreteComponent = resolveComponent(`${prefix}CodeNode`);

    return h(codeComponent, () => node.children.map(
        (childNode: TextInlineNode): (VNode | string)[] | VNode => textInlineNode(childNode, prefix),
    ));
};

export const quoteBlockNode = (node: QuoteBlockNode, prefix: string): VNode => {
    const quoteComponent: string | ConcreteComponent = resolveComponent(`${prefix}QuoteNode`);

    return h(quoteComponent, () => node.children.map(
        (childNode: DefaultInlineNode) => defaultInlineNode(childNode, prefix),
    ));
};

export const listBlockNode = (node: ListBlockNode, prefix: string): VNode => {
    const listType: string = node.format === 'ordered' ? 'OrderedListNode' : 'UnorderedListNode';
    const listComponent: string | ConcreteComponent = resolveComponent(`${prefix}${listType}`);

    return h(listComponent, () => node.children.map(
        (childNode: ListBlockNode | ListItemInlineNode): VNode | undefined => {
            if (childNode.type === 'list-item') {
                return listItemInlineNode(childNode, prefix);
            }

            return listBlockNode(childNode, prefix);
        },
    ));
};

export const imageBlockNode = (node: ImageBlockNode, prefix: string): VNode => {
    const imageComponent: string | ConcreteComponent = resolveComponent(`${prefix}ImageNode`);

    return h(imageComponent, {
        image: node.image,
    });
};

export const renderBlocks = (blockNodes: BlockNode[], prefix: string): VNode[] => {
    return blockNodes.map((blockNode: BlockNode): VNode => {
        switch (blockNode.type) {
            case 'heading': return headingBlockNode(blockNode, prefix);
            case 'code': return codeBlockNode(blockNode, prefix);
            case 'list': return listBlockNode(blockNode, prefix);
            case 'quote': return quoteBlockNode(blockNode, prefix);
            case 'image': return imageBlockNode(blockNode, prefix);
            default: return paragraphBlockNode(blockNode, prefix);
        }
    });
};
