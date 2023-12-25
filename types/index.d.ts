// Module options

export type ModuleOptions = {};

// Inline nodes

export type TextInlineNode = {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};

export type LinkInlineNode = {
    type: 'link';
    url: string;
    children: TextInlineNode[];
};

export type ListItemInlineNode = {
    type: 'list-item';
    children: DefaultInlineNode[];
};

export type DefaultInlineNode = TextInlineNode | LinkInlineNode;

// Typed nodes

export type ParagraphBlockNode = {
    type: 'paragraph';
    children: DefaultInlineNode[];
};

export type HeadingBlockNode = {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
};

export type ListBlockNode = {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
};

export type QuoteBlockNode = {
    type: 'quote';
    children: DefaultInlineNode[];
};

export type CodeBlockNode = {
    type: 'code';
    children: TextInlineNode[];
};

export type ImageBlockNode = {
    type: 'image';
    image: any;
    children: [{ type: 'text'; text: '' }];
};

export type BlockNode =
    ParagraphBlockNode |
    QuoteBlockNode |
    CodeBlockNode |
    HeadingBlockNode |
    ListBlockNode |
    ImageBlockNode;
