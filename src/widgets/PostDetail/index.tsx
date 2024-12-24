import { Post } from '@prisma/client';

import { TipTapNode } from '@/entities/node';
import { TiptapViewer } from '@/features/viewer';
import { DateDisplay, Divider } from '@/shared/ui';

type Props = {
  post: Post;
};

export default function PostDetail({ post }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <DateDisplay date={new Date(post.updatedAt)} />
      </div>
      <Divider direction="horizontal" className="w-full" />
      <TiptapViewer node={post.content as TipTapNode} />
    </div>
  );
}
