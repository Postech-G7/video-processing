import { Readable } from 'stream';
import { StorageInterface } from '../storage-interface';
export declare class GoogleCloudStorageService implements StorageInterface {
    private bucketName;
    constructor();
    upload(filePath: string, destination: string): Promise<string>;
    download(fileId: string): Promise<Readable>;
    delete(fileName: string): Promise<void>;
    listFiles(prefix?: string): Promise<string[]>;
}
