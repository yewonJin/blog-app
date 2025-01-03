import { HeadingNode, TipTapNode } from '@/entities/node';
import { cn } from '@/shared/utils';

type Props = {
  node: TipTapNode;
};

export function TableOfContents({ node }: Props) {
  if (!node.content) return null;

  const headingPaddings: { [key in HeadingNode['attrs']['id']]: string } = {
    1: '',
    2: '',
    3: 'pl-3',
    4: 'pl-5',
    5: 'pl-7',
    6: 'pl-9',
  };

  return (
    <div className="fixed pt-12">
      <h2 className="mb-4 text-xl font-semibold">목차</h2>
      <div className="flex flex-col gap-3">
        {node.content
          .filter((node): node is HeadingNode => node.type === 'heading')
          .map((heading) => (
            <a
              className={cn(
                'text-neutral-tertiary hover:text-neutral-secondary',
                headingPaddings[heading.attrs.level],
              )}
              key={heading.attrs.id}
              href={`#${heading.attrs.id}`}
            >
              {heading.content?.[0]?.text}
            </a>
          ))}
      </div>
    </div>
  );
}
