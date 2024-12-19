import React from 'react';
import { all, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

import { CodeBlockNode } from './interface';

export type HighlightElementChildren = (HightlightElement | HighlightText)[];

interface HighlightText {
  type: 'text';
  value: string;
}

interface HightlightElement {
  type: 'element';
  tagName: 'span';
  properties: { className: string[] };
  children: HighlightElementChildren;
}

export const getHighlightedLanguage = (props: {
  node: CodeBlockNode;
  children: React.ReactNode;
}) => {
  return props.node.attrs.language;
};

export const getHighlightedElements = (props: {
  node: CodeBlockNode;
  children: React.ReactNode;
}) => {
  const lowlight = createLowlight(all);

  lowlight.register('html', html);
  lowlight.register('css', css);
  lowlight.register('js', js);
  lowlight.register('ts', ts);

  const language = getHighlightedLanguage(props);
  const { children } = lowlight.highlight(
    language,
    props.node.content?.[0].text ?? '',
  );

  return children as HighlightElementChildren;
};

export const renderSyntaxHighlightedCode = (
  children: HighlightElementChildren,
  classNames: string[],
): React.ReactNode =>
  children.map((child, codeBlockIndex: number) => {
    if (classNames.length && child.type === 'text') {
      return React.createElement(
        'span',
        { key: codeBlockIndex, className: classNames.join(' ') },
        child.value,
      );
    }

    if (child.type === 'text') {
      return child.value;
    }

    const { properties } = child;
    const className = properties.className[0] as string;

    return renderSyntaxHighlightedCode(child.children, [
      ...classNames,
      className,
    ]);
  });
