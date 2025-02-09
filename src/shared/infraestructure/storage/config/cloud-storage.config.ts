import { Storage } from '@google-cloud/storage';

const BUCKET_NAME = process.env.GCLOUD_STORAGE_BUCKET;

const storage =
  process.env.NODE_ENV === 'test' || !process.env.NODE_ENV
    ? new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFile: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      })
    : new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      });

export const cloudStorage = {
  storage,
  bucket: storage.bucket(BUCKET_NAME),
};
