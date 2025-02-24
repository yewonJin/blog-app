import { useEffect, useState } from 'react';

export const useHeadingHighlight = (offsetTops: number[]) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const onScroll = (offsets: number[]) => {
    setHighlightedIndex(
      offsets.filter((item) => item <= window.scrollY).length,
    );
  };

  useEffect(() => {
    const handleScroll = () => onScroll(offsetTops);
    handleScroll();

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [offsetTops]);

  return { highlightedIndex };
};
