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

/** YYYY.MM.DD. X요일 형식의 날짜 리턴 */
export const getDateString = (date: Date) => {
  const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

  return `${date.toLocaleDateString()} ${WEEK_DAYS[date.getDay()]}요일`;
};

export const getRelativeTime = (date: Date) => {
  // const KR_OFFSET = 1000 * 60 * 60 * 9;
  const TIME_UNITS = ['초', '분', '시간', '일', '달', '년'];
  const TIME_BOUNDARIES = [
    1,
    60,
    60 * 60,
    60 * 60 * 24,
    60 * 60 * 24 * 30,
    60 * 60 * 24 * 30 * 12,
    Infinity,
  ];

  const elapsedTime = (new Date().getTime() - date.getTime()) / 1000;

  const index =
    TIME_BOUNDARIES.findIndex((x) => x > Math.floor(elapsedTime)) - 1;

  if (elapsedTime === 0) return '방금 전';

  return `${Math.floor(elapsedTime / TIME_BOUNDARIES[index])}${TIME_UNITS[index]} 전`;
};
