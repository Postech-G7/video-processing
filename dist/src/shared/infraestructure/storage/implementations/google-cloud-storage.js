"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCloudStorageService = void 0;
const fs = __importStar(require("fs"));
const cloud_storage_config_1 = require("../config/cloud-storage.config");
const not_found_error_1 = require("../../../domain/errors/not-found-error");
const bad_request_error_1 = require("../../../application/errors/bad-request-error");
class GoogleCloudStorageService {
    constructor() {
        this.bucketName = process.env.GCLOUD_STORAGE_BUCKET;
    }
    async upload(file, destination) {
        if (!file || !file.buffer) {
            throw new bad_request_error_1.BadRequestError('Video file not provided');
        }
        const fileUpload = cloud_storage_config_1.cloudStorage.file(destination + file.originalname);
        await fileUpload.save(file.buffer, {
            metadata: { contentType: file.mimetype },
            resumable: false,
        });
        return fileUpload.publicUrl();
    }
    async download(fileId) {
        const bucketName = this.bucketName;
        const fileName = `${fileId}.zip`;
        fs.mkdirSync('downloads', { recursive: true });
        const downloadOptions = {
            destination: './downloads/' + fileName,
        };
        const file = cloud_storage_config_1.cloudStorage.storage.bucket(bucketName).file(fileName);
        await file.download(downloadOptions);
        const filePath = `./downloads/${fileId}.zip`;
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', err => {
            console.error('File stream error:', err);
            throw new not_found_error_1.NotFoundError('File not found');
        });
        return fileStream;
    }
    async delete(fileName) {
        await cloud_storage_config_1.cloudStorage.file(fileName).delete();
    }
    async listFiles(prefix) {
        const [files] = await cloud_storage_config_1.cloudStorage.getFiles({ prefix });
        return files.map(file => file.name);
    }
}
exports.GoogleCloudStorageService = GoogleCloudStorageService;
//# sourceMappingURL=google-cloud-storage.js.map