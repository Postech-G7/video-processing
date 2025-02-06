export declare const cloudStorage: {
    upload(filePath: string, destination: string): Promise<string>;
    download(filePath: string): Promise<Buffer>;
    delete(filePath: string): Promise<void>;
};
