import { cn } from '@/shared/utils';

interface DividerProps {
  className?: string;
  direction: 'horizontal' | 'vertical';
}

export function Divider({ className, direction }: DividerProps) {
  return (
    <div
      className={cn(
        'bg-neutral-tertiary rounded-sm',
        direction === 'horizontal' ? 'h-0.5' : 'w-0.5',
        className,
      )}
    ></div>
  );
}
