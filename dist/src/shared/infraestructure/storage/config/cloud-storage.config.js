"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.download = exports.upload = exports.cloudStorage = void 0;
const storage_1 = require("@google-cloud/storage");
const storage = new storage_1.Storage();
const UPLOAD_DIR = process.env.GCLOUD_STORAGE_BUCKET || '';
exports.cloudStorage = storage.bucket(UPLOAD_DIR);
const upload = async (filePath, destination) => {
    const [file] = await storage.bucket(UPLOAD_DIR).upload(filePath, {
        destination: destination,
    });
    return file.name;
};
exports.upload = upload;
const download = async (filePath) => {
    const file = await storage.bucket(UPLOAD_DIR).file(filePath);
    const [buffer] = await file.download();
    return buffer;
};
exports.download = download;
const deleteFile = async (filePath) => {
    await storage.bucket(UPLOAD_DIR).file(filePath).delete();
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=cloud-storage.config.js.map