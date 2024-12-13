'use client';

import { useEditor, EditorContent } from '@tiptap/react';

import { extensions } from './extensions';
import './highlight-theme.css';
import './typography.css';

// TODO: 링크 + 이미지
export default function Editor() {
  const editor = useEditor({
    extensions,
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  return <EditorContent editor={editor} />;
}
