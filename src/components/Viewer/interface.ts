export type NodeTypes = keyof TipTapNodeHandlers;
export type MarkTypes = keyof TipTapMarkHandlers;

export type TipTapNodeHandlers = {
  doc: TipTapNodeHandler;
  blockquote: TipTapNodeHandler;
  paragraph: TipTapNodeHandler;
  text: TipTapNodeHandler<TextNode>;
  heading: TipTapNodeHandler<HeadingNode>;
  listItem: TipTapNodeHandler;
  orderedList: TipTapNodeHandler;
  bulletList: TipTapNodeHandler;
  codeBlock: TipTapNodeHandler<CodeBlockNode>;
  horizontalRule: TipTapNodeHandler;
};

export type TipTapMarkHandlers = {
  bold: TipTapMarkHandler;
  code: TipTapMarkHandler;
  italic: TipTapMarkHandler;
  strike: TipTapMarkHandler;
  link: TipTapMarkHandler<LinkMark>;
};

export type TipTapNode = {
  type: NodeTypes;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  text?: string;
};

export type TipTapMark = {
  type: MarkTypes;
  attrs?: Record<string, unknown>;
};

type TipTapMarkHandler<T extends TipTapMark = TipTapMark> = (props: {
  node: T;
  children: React.ReactNode;
}) => React.ReactNode;

type TipTapNodeHandler<T extends TipTapNode = TipTapNode> = (props: {
  node: T;
  children: React.ReactNode;
}) => React.ReactNode;

export interface LinkMark extends TipTapMark {
  type: 'link';
  attrs: { href: string; traget: string; rel: string };
}

export interface TextNode extends TipTapNode {
  type: 'text';
  text: string;
  content?: undefined;
}

export interface HeadingNode extends TipTapNode {
  type: 'heading';
  attrs: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export interface CodeBlockNode extends TipTapNode {
  type: 'codeBlock';
  attrs: {
    language: string;
  };
}
