import { PostPreview } from '../models/postTypes';

export const sortByUpdatedAt = (a: PostPreview, b: PostPreview) => {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
};
