'use client';

import { Category } from '@prisma/client';
import { CornerDownLeft, Pencil } from 'lucide-react';

type Props = {
  category: Category;
  isClicked: boolean;
  onButtonClick: (id: number | null) => void;
};

export function UpdateCategoryItem({
  category,
  isClicked,
  onButtonClick,
}: Props) {
  return (
    <li className="flex h-10 items-center justify-between gap-4 rounded-md bg-neutral-secondary px-3 py-2">
      {isClicked ? (
        <>
          <input
            type="number"
            hidden
            defaultValue={category.id}
            name="categoryId"
          />
          <input
            type="text"
            placeholder="카테고리 이름"
            className="w-32 rounded-md border-none bg-neutral-secondary outline-none"
            name="name"
            defaultValue={category.name}
          />
        </>
      ) : (
        <span>{category.name}</span>
      )}
      {isClicked ? (
        <button>
          <CornerDownLeft
            className="text-neutral-tertiary hover:cursor-pointer hover:text-neutral-secondary"
            width={20}
            height={20}
          />
        </button>
      ) : (
        <span onClick={() => onButtonClick(category.id)}>
          <Pencil
            className="text-neutral-tertiary hover:cursor-pointer hover:text-neutral-secondary"
            width={20}
            height={20}
          />
        </span>
      )}
    </li>
  );
}
