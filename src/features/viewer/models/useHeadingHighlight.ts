import { useEffect, useState } from 'react';

export const useHeadingHighlight = (
  ref: React.RefObject<HTMLDivElement | null>,
) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const contentContainer = ref.current;

    if (!contentContainer) return;

    const HEADING_TAGS = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    const headingElements = Array.from(
      contentContainer.children[0].children,
    ).filter((node): node is HTMLElement =>
      HEADING_TAGS.includes(node.nodeName),
    );

    const downwardScrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.y < 100) {
          const currentHeading = entry.target as HTMLElement;
          const currentIndex = headingElements.indexOf(currentHeading);
          setHighlightedIndex(currentIndex);
        }
      },
      { rootMargin: '-70px 0px' },
    );

    const upwardScrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const currentHeading = entry.target as HTMLElement;
          const currentIndex = headingElements.indexOf(currentHeading);
          setHighlightedIndex(currentIndex - 1);
        }
      },
      { rootMargin: '-70px 0px' },
    );

    headingElements.forEach((heading) => {
      downwardScrollObserver.observe(heading);
      upwardScrollObserver.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        downwardScrollObserver.unobserve(heading);
        upwardScrollObserver.unobserve(heading);
      });
    };
  }, [ref]);

  const handleHeadingClick = (index: number) => {
    // 이동하는 중간에 Observe가 되어 콜백큐에 넣어 처리
    setTimeout(() => {
      setHighlightedIndex(index);
    }, 10);
  };

  return { highlightedIndex, handleHeadingClick };
};
