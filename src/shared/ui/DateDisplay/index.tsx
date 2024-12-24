'use client';

import { useMemo, useState } from 'react';

import { cn, getDateString, getRelativeTime } from '@/shared/utils';

type Props = {
  date: Date;
  className?: string;
};

export function DateDisplay({ date, className }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const relativeTime = useMemo(() => getRelativeTime(date), []);
  const dateString = useMemo(() => getDateString(date), []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <p
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn('text-md text-neutral-secondary', className)}
    >
      {isHovered ? dateString : relativeTime}
    </p>
  );
}
