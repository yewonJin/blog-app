import { S3Client } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.MY_AWS_S3_BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
  },
});

export const S3_URL = `https://${process.env.MY_AWS_S3_BUCKET}.s3.${process.env.MY_AWS_S3_BUCKET_REGION}.amazonaws.com`;