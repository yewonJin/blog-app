'use client';

import { Category, Post } from '@prisma/client';
import { useCallback, useMemo, useState } from 'react';

import { generateHeadingIds, TipTapNode } from '@/entities/node';
import { TiptapViewer, TableOfContents } from '@/features/viewer';
import { DateDisplay, Divider } from '@/shared/ui';

type Props = {
  post: Omit<Post, 'categoryId'> & {
    category: Category;
  };
};

export default function PostDetail({ post }: Props) {
  const [offsetTops, setOffsetTops] = useState<number[]>([]);

  const indexedNode = useMemo(() => {
    return generateHeadingIds(post.content as TipTapNode);
  }, [post]);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

      setOffsetTops(
        Array.from(node.children[0].children)
          .filter((node): node is HTMLElement =>
            headings.includes(node.nodeName),
          )
          .map((node) => node.offsetTop),
      );
    }
  }, []);

  return (
    <div className="mx-auto flex w-full justify-center gap-12">
      <div className="hidden w-[250px] 2xl:block"></div>
      <div className="flex w-[800px] flex-col gap-4">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold text-neutral-emphasis">
            {post.title}
          </h1>
          <DateDisplay date={new Date(post.updatedAt)} />
        </div>
        <Divider direction="horizontal" className="w-full" />
        <div ref={ref}>
          <TiptapViewer node={indexedNode} />
        </div>
      </div>
      <div className="hidden w-[250px] xl:block">
        <TableOfContents node={indexedNode} offsetTops={offsetTops} />
      </div>
    </div>
  );
}
