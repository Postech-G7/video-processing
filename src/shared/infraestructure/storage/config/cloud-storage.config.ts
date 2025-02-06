import * as fs from 'fs/promises';
import * as path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Create uploads directory if it doesn't exist
fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

export const cloudStorage = {
  async upload(filePath: string, destination: string): Promise<string> {
    const finalPath = path.join(UPLOAD_DIR, destination);
    await fs.copyFile(filePath, finalPath);
    return finalPath;
  },
  
  async download(filePath: string): Promise<Buffer> {
    return fs.readFile(filePath);
  },
  
  async delete(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }
};
