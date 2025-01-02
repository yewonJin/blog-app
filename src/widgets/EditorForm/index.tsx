'use client';

import { Category, Post } from '@prisma/client';
import { Editor as EditorType } from '@tiptap/react';
import { useActionState, useRef } from 'react';

import { TipTapNode } from '@/entities/node';
import { PostFormState, uploadImage } from '@/entities/post';
import { Editor } from '@/features/editor';
import { ScrollableContainer } from '@/shared/layout';

const initialState = {
  message: '',
  formData: new FormData(),
};

type Props = {
  post?: Post;
  categories: Category[];
  action: (
    prevState: PostFormState,
    formData: FormData,
  ) => Promise<PostFormState>;
};

export function EditorForm({ post, categories, action }: Props) {
  const [state, formAction] = useActionState(action, initialState);
  const contentInputRef = useRef<HTMLInputElement>(null);

  const onEditorUpdate = ({ editor }: { editor: EditorType }) => {
    if (!contentInputRef.current) return;
    contentInputRef.current.value = JSON.stringify(editor.getJSON());
  };

  const onThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !post) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    uploadImage(formData, `thumbnail-${post.id}.png`);
  };

  return (
    <form action={formAction}>
      <div className="mb-5 flex items-end justify-between">
        <input
          placeholder="제목을 입력해주세요..."
          className="border-b-2 border-neutral-tertiary bg-neutral-primary pb-2 text-3xl font-semibold outline-none"
          type="text"
          name="title"
          defaultValue={(state.formData.get('title') as string) ?? post?.title}
        />
        <select
          name="categoryId"
          className="w-24 rounded-md border-[1px] border-neutral-primary bg-neutral-primary px-2 py-2 outline-none"
        >
          {categories.map((category) => (
            <option
              className="border-neutral-primary hover:cursor-pointer"
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {post && <input id="id" name="id" defaultValue={post?.id} hidden />}
      <div className="mb-8 flex flex-col gap-2">
        <label
          htmlFor="slug"
          className="text-xl font-semibold text-neutral-secondary"
        >
          Slug
        </label>
        <input
          placeholder="슬러그를 입력해주세요.."
          className="border-2 border-neutral-tertiary bg-neutral-primary p-2 outline-none"
          type="text"
          name="slug"
          defaultValue={(state.formData.get('slug') as string) ?? post?.slug}
        />
      </div>
      <div className="mb-8 flex flex-col gap-2">
        <label
          htmlFor="preview"
          className="text-xl font-semibold text-neutral-secondary"
        >
          Preview
        </label>
        <textarea
          placeholder="프리뷰를 입력해주세요.."
          name="preview"
          defaultValue={
            (state.formData.get('preview') as string) ?? post?.preview
          }
          className="min-h-24 w-full border-2 border-neutral-tertiary bg-neutral-primary p-2 outline-none"
        />
      </div>
      <input
        id="content"
        name="content"
        ref={contentInputRef}
        defaultValue={
          (state.formData.get('content') as string) ??
          JSON.stringify(post?.content)
        }
        hidden
      />
      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold text-neutral-secondary">
          Content
        </label>
        <ScrollableContainer height="h-[60vh]" maxHeight="max-h-[60vh]">
          <Editor
            content={(post?.content as TipTapNode) ?? {}}
            onEditorUpdate={onEditorUpdate}
          />
        </ScrollableContainer>
      </div>

      <div className="flex items-center gap-2">
        <p>{state.message}</p>
        <button className="rounded-md bg-neutral-secondary px-4 py-2 hover:bg-neutral-tertiary">
          추가
        </button>
        {post?.id && (
          <div className="group relative">
            <div className="absolute bottom-12 hidden aspect-video w-80 bg-neutral-secondary group-hover:flex">
              <img
                width="100%"
                alt="post thumnail"
                src={`https://doromo-blog-app.s3.ap-northeast-2.amazonaws.com/thumbnail-${post.id}.png`}
              />
            </div>
            <label
              htmlFor="thumnail"
              className="flex h-full items-center justify-center rounded-md bg-neutral-secondary px-3 py-2 hover:cursor-pointer hover:bg-neutral-tertiary"
            >
              썸네일 업로드
            </label>
            <input
              type="file"
              id="thumnail"
              hidden
              onChange={onThumbnailUpload}
            ></input>
          </div>
        )}
      </div>
    </form>
  );
}
