'use client';

import { useEditor, EditorContent, Editor as EditorType } from '@tiptap/react';

import { extensions } from './extensions';
import '@/shared/highlight-theme.css';
import '@/shared/typography.css';
import { uploadImage } from '@/entities/post/utils/actions';

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
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files) {
          const files = event.dataTransfer.files;
          const formData = new FormData();

          Object.values(files).forEach((file) => {
            formData.append('file', file);
          });

          uploadImage(formData).then((res) => {
            const urls: string[] = res;

            urls.forEach((url) => {
              const { schema } = view.state;
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              if (coordinates) {
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                return view.dispatch(transaction);
              }
            });
          });
        }

        // 브라우저에 탭이 열리는 것을 방지
        event.preventDefault();
      },
    },
    onUpdate: handleEditorUpdate,
  });

  console.log(editor?.getJSON());

  return <EditorContent editor={editor} />;
}
