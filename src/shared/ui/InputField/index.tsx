import { cn } from '@/shared/utils';

type Props = {
  type?: React.HTMLInputTypeAttribute;
  ref?: React.Ref<HTMLInputElement>;
  id?: string;
  name: string;
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  hidden?: boolean;
  className?: string;
};

export function InputField({
  type = 'text',
  ref,
  id,
  name,
  placeholder,
  defaultValue,
  hidden,
  className,
}: Props) {
  return (
    <input
      ref={ref}
      id={id}
      placeholder={placeholder}
      className={cn(
        'border-2 border-neutral-tertiary bg-neutral-primary p-2 outline-none',
        className,
      )}
      type={type}
      name={name}
      defaultValue={defaultValue}
      hidden={hidden}
    />
  );
}
