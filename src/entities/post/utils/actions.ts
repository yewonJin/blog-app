'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';

import { s3, S3_URL } from './aws';

export const uploadImage = async (formData: FormData, fileName?: string) => {
  const files = formData.getAll('file') as File[];
  const urls: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const key = fileName || `${file.lastModified}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.MY_AWS_S3_BUCKET as string,
        Key: key,
        Body: buffer,
        ACL: 'public-read',
        ContentType: file.type,
      });

      await s3.send(command).then(() => urls.push(`${S3_URL}/${key}`));
    }),
  );

  return urls;
};
