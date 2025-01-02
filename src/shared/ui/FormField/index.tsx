import { cn } from '@/shared/utils';

type Props = {
  name?: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
};

export function FormField({ name, label, children, className }: Props) {
  return (
    <div className={cn('mb-8 flex flex-col gap-2', className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-xl font-semibold text-neutral-secondary"
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
