import '@/shared/highlight-theme.css';
import '@/shared/typography.css';
import { markHandlers, nodeHandlers } from './handlers';
import {
  CodeBlockNode,
  HeadingNode,
  LinkMark,
  TextNode,
  TipTapMark,
  TipTapNode,
} from './interface';

type TipTapViewerProps = {
  node: TipTapNode;
};

const createMarkedContent = (
  marks: TipTapMark[],
  index: number,
  text: string,
): React.ReactNode => {
  if (marks[index]) {
    const mark = marks[index];

    if (mark.type === 'link') {
      return markHandlers['link']({
        node: mark as LinkMark,
        children: createMarkedContent(marks, index + 1, text),
      });
    } else {
      return markHandlers[mark.type]({
        node: mark as TipTapMark,
        children: createMarkedContent(marks, index + 1, text),
      });
    }
  }

  return text;
};

export default function TiptapViewer({
  node,
}: TipTapViewerProps): React.ReactNode {
  const children: React.ReactNode[] = [];

  if (node.content) {
    node.content.forEach((item) => {
      children.push(
        TiptapViewer({
          node: item,
        }),
      );
    });
  }

  if (node.type === 'text') {
    return nodeHandlers['text']({
      node: node as TextNode,
      children: node.marks
        ? createMarkedContent(node.marks, 0, node.text as string)
        : node.text,
    });
  } else if (node.type === 'codeBlock') {
    return nodeHandlers['codeBlock']({
      node: node as CodeBlockNode,
      children,
    });
  } else if (node.type === 'heading') {
    return nodeHandlers['heading']({
      node: node as HeadingNode,
      children,
    });
  } else if (node.type === 'paragraph' && !node.content) {
    return nodeHandlers[node.type]({
      node,
      children: <br className="ProseMirror-trailingBreak" />,
    });
  } else {
    return nodeHandlers[node.type]({
      node,
      children,
    });
  }
}
