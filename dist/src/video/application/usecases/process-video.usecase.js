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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessVideoUseCase = void 0;
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const bad_request_error_1 = require("../../../shared/application/errors/bad-request-error");
const cloud_storage_config_1 = require("../../../shared/infraestructure/storage/config/cloud-storage.config");
var ProcessVideoUseCase;
(function (ProcessVideoUseCase) {
    class UseCase {
        constructor(videoRepository) {
            this.videoRepository = videoRepository;
        }
        async createTempDir(id) {
            const tempDir = path.join(process.cwd(), 'temp', id);
            await fs.promises.mkdir(tempDir, { recursive: true });
            return tempDir;
        }
        async processVideo(videoPath, outputDir) {
            return new Promise((resolve, reject) => {
                const screenshots = [];
                (0, fluent_ffmpeg_1.default)(videoPath)
                    .on('end', () => resolve(screenshots))
                    .on('error', (err) => reject(err))
                    .on('screenshot', (filename) => {
                    screenshots.push(path.join(outputDir, filename));
                })
                    .screenshots({
                    count: 3,
                    folder: outputDir,
                    filename: 'screenshot-%i.png',
                });
            });
        }
        async createZipFile(screenshots, outputDir) {
            const zip = new adm_zip_1.default();
            screenshots.forEach((screenshot) => {
                zip.addLocalFile(screenshot);
            });
            const zipPath = path.join(outputDir, 'screenshots.zip');
            zip.writeZip(zipPath);
            return zipPath;
        }
        cleanup(tempDir) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
        async execute(input) {
            const { id } = input;
            const video = await this.videoRepository.findById(id);
            if (!video) {
                throw new bad_request_error_1.BadRequestError('Video not found');
            }
            const tempDir = await this.createTempDir(id);
            const videoPath = path.join(tempDir, path.basename(video.path));
            try {
                const videoBuffer = await (0, cloud_storage_config_1.download)(video.path);
                await fs.promises.writeFile(videoPath, videoBuffer);
                const screenshots = await this.processVideo(videoPath, tempDir);
                const zipPath = await this.createZipFile(screenshots, tempDir);
                const destination = `screenshots/${id}/screenshots.zip`;
                const zipUrl = await (0, cloud_storage_config_1.upload)(zipPath, destination);
                const url = `https://storage.googleapis.com/processed-videos-fiap/${destination}`;
                video.updateStatus('completed');
                await this.videoRepository.update(video);
                this.cleanup(tempDir);
                return { zipUrl: url };
            }
            catch (error) {
                this.cleanup(tempDir);
                video.updateStatus('failed');
                await this.videoRepository.update(video);
                throw error;
            }
        }
    }
    ProcessVideoUseCase.UseCase = UseCase;
})(ProcessVideoUseCase || (exports.ProcessVideoUseCase = ProcessVideoUseCase = {}));
//# sourceMappingURL=process-video.usecase.js.map