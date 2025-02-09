"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudStorage = void 0;
const storage_1 = require("@google-cloud/storage");
const BUCKET_NAME = process.env.GCLOUD_STORAGE_BUCKET;
const storage = process.env.NODE_ENV === "test" || !process.env.NODE_ENV
    ? new storage_1.Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_KEY_FILENAME,
    })
    : new storage_1.Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        credentials: JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY),
    });
exports.cloudStorage = {
    storage,
    bucket: storage.bucket(BUCKET_NAME),
};
//# sourceMappingURL=cloud-storage.config.js.map