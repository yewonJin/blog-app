import { Tailwindest } from 'tailwindest';

import { cn } from '@/shared/utils';

type Props = {
  children: React.ReactNode;
  height?: Tailwindest['height'];
  maxHeight?: Tailwindest['maxHeight'];
};

export function ScrollableContainer({ children, height, maxHeight }: Props) {
  return (
    <div className={cn(height, maxHeight, 'scrollbar overflow-y-auto')}>
      {children}
    </div>
  );
}
