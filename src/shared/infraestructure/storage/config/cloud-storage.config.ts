import * as path from 'path';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();

const UPLOAD_DIR = process.env.GCLOUD_STORAGE_BUCKET || '';

// Create uploads directory if it doesn't exist (not applicable for Google Cloud Storage)

export const cloudStorage = storage.bucket(UPLOAD_DIR);

export const upload = async (filePath: string, destination: string): Promise<string> => {
  const [file] = await storage.bucket(UPLOAD_DIR).upload(filePath, {
    destination: destination,
  });
  return file.name;
};

export const download = async (filePath: string): Promise<Buffer> => {
  const file = await storage.bucket(UPLOAD_DIR).file(filePath);
  const [buffer] = await file.download();
  return buffer;
};

export const deleteFile = async (filePath: string): Promise<void> => {
  await storage.bucket(UPLOAD_DIR).file(filePath).delete();
};
