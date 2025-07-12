// Inline nodes

export interface TextInlineNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}

export interface LinkInlineNode {
    type: 'link';
    url: string;
    children: TextInlineNode[];
}

export interface ListItemInlineNode {
    type: 'list-item';
    children: DefaultInlineNode[];
}

export type DefaultInlineNode = TextInlineNode | LinkInlineNode;

// Typed nodes

export interface ParagraphBlockNode {
    type: 'paragraph';
    children: DefaultInlineNode[];
}

export interface HeadingBlockNode {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
}

export interface ListBlockNode {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
}

export interface QuoteBlockNode {
    type: 'quote';
    children: DefaultInlineNode[];
}

export interface CodeBlockNode {
    type: 'code';
    children: TextInlineNode[];
}

export interface ImageBlockNode {
    type: 'image';
    image: Record<string, string>;
    children: [{ type: 'text'; text: '' }];
}

export type BlockNode
    = ParagraphBlockNode
        | QuoteBlockNode
        | CodeBlockNode
        | HeadingBlockNode
        | ListBlockNode
        | ImageBlockNode;
