import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import {
  getHighlightedElements,
  getHighlightedLanguage,
  renderSyntaxHighlightedCode,
} from './highlight';
import { TipTapMarkHandlers, TipTapNodeHandlers } from './interface';
import { styleToObject } from '@/shared/utils';

export const markHandlers: TipTapMarkHandlers = {
  bold: (props) => <strong key={uuidv4()}>{props.children}</strong>,
  italic: (props) => <i key={uuidv4()}>{props.children}</i>,
  strike: (props) => <s key={uuidv4()}>{props.children}</s>,
  code: (props) => <code key={uuidv4()}>{props.children}</code>,
  link: (props) => (
    <a
      key={uuidv4()}
      target={props.node.attrs.traget}
      rel={props.node.attrs.rel}
      href={props.node.attrs.href}
    >
      {props.children}
    </a>
  ),
};

export const nodeHandlers: TipTapNodeHandlers = {
  doc: (props) => (
    <div
      key={uuidv4()}
      className="tiptap ProseMirror prose prose-lg m-5 focus:outline-none"
    >
      {props.children}
    </div>
  ),
  text: (props) => props.children,
  paragraph: (props) => <p key={uuidv4()}>{props.children}</p>,
  heading: (props) => {
    switch (props.node.attrs.level) {
      case 1:
        return <h1 key={uuidv4()}>{props.children}</h1>;
      case 2:
        return <h2 key={uuidv4()}>{props.children}</h2>;
      case 3:
        return <h3 key={uuidv4()}>{props.children}</h3>;
      case 4:
        return <h4 key={uuidv4()}>{props.children}</h4>;
      case 5:
        return <h5 key={uuidv4()}>{props.children}</h5>;
      case 6:
        return <h6 key={uuidv4()}>{props.children}</h6>;
    }
  },
  listItem: (props) => <li key={uuidv4()}>{props.children}</li>,
  orderedList: (props) => <ol key={uuidv4()}>{props.children}</ol>,
  bulletList: (props) => <ul key={uuidv4()}>{props.children}</ul>,
  codeBlock: (props) => {
    const language = getHighlightedLanguage(props);
    const highlightedElements = getHighlightedElements(props);

    return (
      <pre key={uuidv4()} className="hljs">
        <code className={`language-${language}`}>
          {renderSyntaxHighlightedCode(highlightedElements, [])}
        </code>
      </pre>
    );
  },
  horizontalRule: () => <hr />,
  blockquote: (props) => (
    <blockquote key={uuidv4()}>{props.children}</blockquote>
  ),
  image: (props) => (
    <Image
      key={uuidv4()}
      width={0}
      height={0}
      sizes="800px"
      alt="이미지"
      src={props.node.attrs.src}
      style={{ ...styleToObject(props.node.attrs.style) }}
    />
  ),
};
