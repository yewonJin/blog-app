'use client';

import { Post } from '@prisma/client';
import { Editor as EditorType } from '@tiptap/react';
import { useActionState, useRef } from 'react';

import { TipTapNode } from '@/entities/node';
import { Editor } from '@/features/editor';
import { ScrollableContainer } from '@/shared/layout';

const initialState = {
  message: '',
};

type Props = {
  post?: Post;
  action: (
    prevState: { message: string },
    formData: FormData,
  ) => Promise<{ message: string }>;
};

export function EditorForm({ post, action }: Props) {
  const [state, formAction] = useActionState(action, initialState);
  const contentInputRef = useRef<HTMLInputElement>(null);

  const onEditorUpdate = ({ editor }: { editor: EditorType }) => {
    if (!contentInputRef.current) return;
    contentInputRef.current.value = JSON.stringify(editor.getJSON());
  };

  return (
    <form action={formAction}>
      <div className="mb-5 flex justify-between">
        <input
          placeholder="제목을 입력해주세요..."
          className="border-b-[1px] border-secondaryBackground bg-primaryBackground pb-2 text-3xl font-semibold outline-none"
          type="text"
          name="title"
          defaultValue={post?.title}
        />
      </div>
      <input id="id" name="id" defaultValue={post?.id} hidden />
      <input
        id="content"
        name="content"
        ref={contentInputRef}
        defaultValue={JSON.stringify(post?.content)}
        hidden
      />
      <ScrollableContainer height="h-[80vh]" maxHeight="max-h-[80vh]">
        <Editor
          content={(post?.content as TipTapNode) ?? {}}
          onEditorUpdate={onEditorUpdate}
        />
      </ScrollableContainer>
      <div className="flex gap-2">
        <p>{state.message}</p>
        <button className="rounded-md bg-secondaryBackground px-4 py-2">
          추가
        </button>
      </div>
    </form>
  );
}
