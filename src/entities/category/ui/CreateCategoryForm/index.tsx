'use client';

import { useActionState } from 'react';

import { createCategoryAction } from '../../utils/formActions';

const initialState = {
  success: false,
  message: '',
  formData: new FormData(),
};

export function CreateCategoryForm() {
  const [state, formAction] = useActionState(
    createCategoryAction,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="카테고리 이름"
          className="w-36 rounded-md border-[1px] border-neutral-primary bg-neutral-primary px-4 py-2 outline-none"
          name="name"
        ></input>
        <button className="h-10 rounded-md bg-neutral-secondary px-3 py-1.5 hover:bg-neutral-tertiary">
          추가
        </button>
      </div>
    </form>
  );
}
