'use client';

import { useEditor, EditorContent, Editor as EditorType } from '@tiptap/react';

import { extensions } from './extensions';
import '@/shared/highlight-theme.css';
import '@/shared/typography.css';

type EditorProps = {
  onEditorUpdate: ({ editor }: { editor: EditorType }) => void;
};

// TODO: 이미지
export default function Editor({
  onEditorUpdate: handleEditorUpdate,
}: EditorProps) {
  const editor = useEditor({
    extensions,
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none !max-w-none',
      },
    },
    onUpdate: handleEditorUpdate,
  });

  return <EditorContent editor={editor} />;
}
