import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const styleToObject = (style: string) => {
  const styleObject: { [key: string]: string } = {};
  const regex = /([\w-]+)\s*:\s*([^;]+);?/g;

  let match;

  while ((match = regex.exec(style)) !== null) {
    const key = match[1].replace(/-([a-z])/g, (_, char) => char.toUpperCase()); // camelCase 변환
    const value = match[2].trim();
    styleObject[key] = value;
  }

  return styleObject;
};
