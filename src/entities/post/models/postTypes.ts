import { Prisma } from '@prisma/client';

export type PostFormState = {
  message: string;
  formData: FormData;
};

export type PostPreview = Prisma.PostGetPayload<{
  select: {
    title: true;
    category: true;
    preview: true;
    id: true;
    updatedAt: true;
    slug: true;
  };
}>;
