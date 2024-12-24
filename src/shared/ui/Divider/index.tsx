import { cn } from '@/shared/utils';

interface DividerProps {
  className?: string;
  direction: 'horizontal' | 'vertical';
}

export function Divider({ className, direction }: DividerProps) {
  return (
    <div
      className={cn(
        'rounded-sm',
        direction === 'horizontal'
          ? 'h-0.5 bg-secondaryBackground'
          : 'w-0.5 bg-secondaryBackground',
        className,
      )}
    ></div>
  );
}
