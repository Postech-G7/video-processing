export declare const cloudStorage: import("@google-cloud/storage").Bucket;
export declare const upload: (filePath: string, destination: string) => Promise<string>;
export declare const download: (filePath: string) => Promise<Buffer>;
export declare const deleteFile: (filePath: string) => Promise<void>;
