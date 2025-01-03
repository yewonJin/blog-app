import { TipTapNode } from '../models/interface';

const normalizeSpaces = (str: string) => {
  return str.replace(/\s{2,}/g, ' ');
};

const replaceSpaceWithDash = (str: string) => {
  return str.replace(/\s/g, '-');
};

export const generateHeadingIds = (node: TipTapNode) => {
  const headingIds: string[] = [];

  const children = node.content?.map((item) => {
    if (item.type === 'heading') {
      if (!item.content?.[0]?.text) return item;

      const headingId = replaceSpaceWithDash(
        normalizeSpaces(item.content[0].text),
      );
      headingIds.push(headingId);

      const duplicateCount = headingIds.filter((id) => id === headingId).length;

      return {
        ...item,
        attrs: {
          ...item.attrs,
          id:
            duplicateCount > 1
              ? `${headingId}-${duplicateCount - 1}`
              : headingId,
        },
      };
    }

    return item;
  });

  return { ...node, content: children };
};
