'use client';

import { useActionState } from 'react';

import { loginAction } from '../../utils/actions';

const initialState = {
  message: '',
};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto mt-16 w-[500px] bg-secondaryBackground p-16"
    >
      <h1 className="text-3xl font-semibold">로그인 페이지</h1>
      <div className="mt-8 flex flex-col gap-2">
        <label htmlFor="id">아이디</label>
        <input
          id="id"
          name="id"
          type="text"
          className="rounded-md bg-primaryBackground p-3 outline-none"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="id">패스워드</label>
        <input
          id="password"
          name="password"
          type="password"
          className="rounded-md bg-primaryBackground p-3 outline-none"
        />
      </div>
      <p className="my-3 h-6">{state.message}</p>
      <button className="w-full rounded-md bg-tertiaryBackground py-3">
        로그인
      </button>
    </form>
  );
}
