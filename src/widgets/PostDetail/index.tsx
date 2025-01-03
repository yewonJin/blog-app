import { Category, Post } from '@prisma/client';

import { TipTapNode, generateHeadingIds } from '@/entities/node';
import { TiptapViewer, TableOfContents } from '@/features/viewer';
import { DateDisplay, Divider } from '@/shared/ui';

type Props = {
  post: Omit<Post, 'categoryId'> & {
    category: Category;
  };
};

export default function PostDetail({ post }: Props) {
  const indexedNode = generateHeadingIds(post.content as TipTapNode);

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
        <TiptapViewer node={indexedNode as TipTapNode} />
      </div>
      <div className="hidden w-[250px] xl:block">
        <TableOfContents node={indexedNode} />
      </div>
    </div>
  );
}
