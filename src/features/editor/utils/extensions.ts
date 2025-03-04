import { Extensions, mergeAttributes, Node } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const Video = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,
  parseHTML() {
    return [{ tag: 'video' }];
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['video', { controls: true, ...mergeAttributes(HTMLAttributes) }];
  },
});

export const extensions: Extensions = [
  Video,
  StarterKit,
  Link,
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: { class: 'hljs' },
  }),
  Image,
  ImageResize,
];
