'use client';

import { useActionState, useEffect, useState } from 'react';
import { Category } from '@prisma/client';

import { UpdateCategoryItem } from '../UpdateCategoryItem';
import { updateCategoryAction } from '../../utils/action';

type Props = {
  categories: Category[];
};

const initialState = {
  success: false,
  message: '',
};

export function UpdateCategoryForm({ categories }: Props) {
  const [curEditingId, setCurEditingId] = useState<number | null>(null);
  const [state, formAction] = useActionState(
    updateCategoryAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      setCurEditingId(null);
    }
  }, [state]);

  const onButtonClick = (id: number | null) => {
    setCurEditingId(id);
  };

  return (
    <form action={formAction}>
      <ul className="grid grid-cols-4 gap-4">
        {categories.map((category) => (
          <UpdateCategoryItem
            key={category.id}
            category={category}
            isClicked={curEditingId === category.id}
            onButtonClick={onButtonClick}
          />
        ))}
      </ul>
    </form>
  );
}
