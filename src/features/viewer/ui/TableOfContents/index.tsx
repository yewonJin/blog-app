'use client';

import { useEffect, useState } from 'react';

import { HeadingNode, TipTapNode } from '@/entities/node';
import { cn } from '@/shared/utils';

type Props = {
  node: TipTapNode;
  offsetTops: number[];
};

export function TableOfContents({ node, offsetTops }: Props) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const onScroll = (offsets: number[]) => {
    setHighlightedIndex(
      offsets.filter((item) => item <= window.scrollY).length,
    );
  };

  useEffect(() => {
    if (!offsetTops) return;

    const handleScroll = () => onScroll(offsetTops);
    handleScroll();

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [offsetTops]);

  const headingPaddings: { [key in HeadingNode['attrs']['id']]: string } = {
    1: '',
    2: '',
    3: 'pl-3',
    4: 'pl-5',
    5: 'pl-7',
    6: 'pl-9',
  };

  if (!node.content) return null;

  return (
    <div className="fixed mt-4 border-l-[1px] border-neutral-secondary pl-4">
      <div
        className={cn(
          'absolute -left-[1px] h-6 w-[2px] rounded-sm bg-brand-primary duration-200',
          highlightedIndex === -1 ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          transform:
            highlightedIndex !== -1
              ? `translateY(${highlightedIndex * (20 + 12) + 42}px)`
              : '',
        }}
      ></div>
      <h2 className="mb-4 text-lg font-semibold">목차</h2>
      <div className="flex flex-col gap-3 text-sm">
        {node.content
          .filter((node): node is HeadingNode => node.type === 'heading')
          .map((heading, index) => (
            <a
              className={cn(
                'text-neutral-tertiary',
                headingPaddings[heading.attrs.level],
                index === highlightedIndex
                  ? 'text-neutral-primary'
                  : 'hover:text-neutral-secondary',
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
